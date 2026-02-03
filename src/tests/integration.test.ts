/**
 * Integration Tests
 * E2E workflows combining API calls and trading logic
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getTicker, getOrderbook } from '../api/public';
import { getBalance, placeOrder, type CoinoneCredentials } from '../api/private';
import { analyzeMarket, calculateSlippage, recommendOrderType, checkRisk, maxBuyableQty } from '../trading';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

const mockCredentials: CoinoneCredentials = {
  accessToken: 'test-token',
  secretKey: 'test-secret'
};

describe('Integration Tests', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe('Full Trading Flow', () => {
    it('should execute complete buy flow: ticker → orderbook → balance → order', async () => {
      // Step 1: Fetch ticker
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve({
          result: 'success',
          tickers: [{ target_currency: 'BTC', last: '50000000' }]
        })
      });
      
      const ticker = await getTicker('BTC');
      expect(ticker.last).toBe('50000000');
      
      // Step 2: Fetch orderbook
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve({
          result: 'success',
          bids: [{ price: '49900000', qty: '1.0' }],
          asks: [{ price: '50100000', qty: '1.0' }]
        })
      });
      
      const orderbook = await getOrderbook('BTC');
      
      // Step 3: Analyze market
      const analysis = analyzeMarket(orderbook);
      expect(analysis.spread).toBe(200000);
      expect(analysis.spreadPercent).toBeCloseTo(0.4, 1);
      
      // Step 4: Check balance (mocked)
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve({
          result: 'success',
          krw: { avail: '1000000', balance: '1000000' }
        })
      });
      
      const balance = await getBalance(mockCredentials);
      const availableKRW = parseFloat(balance.krw.avail);
      
      // Step 5: Calculate max buyable
      const currentPrice = parseFloat(ticker.last);
      const maxQty = maxBuyableQty(availableKRW, currentPrice);
      expect(maxQty).toBe(0.02);
      
      // Step 6: Place order (mocked)
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve({
          result: 'success',
          order_id: 'integration-test-order-123'
        })
      });
      
      const orderResponse = await placeOrder({
        side: 'BUY',
        quoteCurrency: 'KRW',
        targetCurrency: 'BTC',
        type: 'LIMIT',
        price: '49900000',
        qty: '0.01'
      }, mockCredentials);
      
      expect(orderResponse.order_id).toBe('integration-test-order-123');
    });
  });

  describe('Smart Order E2E', () => {
    it('should recommend LIMIT order when spread is wide', async () => {
      // Wide spread orderbook
      const orderbook = {
        bids: [{ price: '49000000', qty: '2.0' }],
        asks: [{ price: '51000000', qty: '2.0' }]
      };
      
      const analysis = analyzeMarket(orderbook);
      // Spread: 2M / 49M = ~4%
      expect(analysis.spreadPercent).toBeGreaterThan(1);
      
      const orderType = recommendOrderType(analysis.spreadPercent!, 0.5);
      expect(orderType).toBe('LIMIT');
    });

    it('should recommend MARKET order when spread is tight', async () => {
      // Tight spread orderbook
      const orderbook = {
        bids: [{ price: '49990000', qty: '5.0' }],
        asks: [{ price: '50010000', qty: '5.0' }]
      };
      
      const analysis = analyzeMarket(orderbook);
      // Spread: 20K / 50M = 0.04%
      expect(analysis.spreadPercent).toBeLessThan(0.1);
      
      const orderType = recommendOrderType(analysis.spreadPercent!, 0.5);
      expect(orderType).toBe('MARKET');
    });

    it('should calculate slippage and warn when exceeded', () => {
      // Low liquidity orderbook
      const asks = [
        { price: '50000000', qty: '0.1' },
        { price: '50500000', qty: '0.1' },
        { price: '51000000', qty: '0.1' }
      ];
      
      const result = calculateSlippage(asks, 0.25, 50000000);
      // Average price higher than base due to eating through levels
      expect(result.slippagePercent).toBeGreaterThan(0.5);
      
      const threshold = 0.5;
      const shouldWarn = result.slippagePercent > threshold;
      expect(shouldWarn).toBe(true);
    });
  });

  describe('Risk Management Integration', () => {
    it('should reject order when balance insufficient', async () => {
      const availableKRW = 100000; // 100K KRW
      const orderAmount = 500000; // 500K KRW
      
      const riskCheck = checkRisk({
        availableKRW,
        orderAmount,
        minOrderKRW: 5000
      });
      
      expect(riskCheck.isValid).toBe(false);
      expect(riskCheck.reasons).toContain('INSUFFICIENT_BALANCE');
    });

    it('should reject order below minimum amount', () => {
      const riskCheck = checkRisk({
        availableKRW: 1000000,
        orderAmount: 3000, // Below 5000 KRW minimum
        minOrderKRW: 5000
      });
      
      expect(riskCheck.isValid).toBe(false);
      expect(riskCheck.reasons).toContain('BELOW_MIN_ORDER');
    });

    it('should pass risk check for valid order', () => {
      const riskCheck = checkRisk({
        availableKRW: 1000000,
        orderAmount: 100000,
        minOrderKRW: 5000
      });
      
      expect(riskCheck.isValid).toBe(true);
      expect(riskCheck.reasons).toHaveLength(0);
    });
  });

  describe('Market Analysis Pipeline', () => {
    it('should analyze complete market state', () => {
      const orderbook = {
        bids: [
          { price: '49900000', qty: '1.0' },
          { price: '49800000', qty: '2.0' },
          { price: '49700000', qty: '3.0' }
        ],
        asks: [
          { price: '50100000', qty: '0.5' },
          { price: '50200000', qty: '1.0' },
          { price: '50300000', qty: '1.5' }
        ]
      };
      
      const analysis = analyzeMarket(orderbook);
      
      // Spread analysis
      expect(analysis.spread).toBe(200000);
      expect(analysis.spreadPercent).toBeCloseTo(0.4, 1);
      
      // Depth analysis
      expect(analysis.bidDepth).toBe(6.0);
      expect(analysis.askDepth).toBe(3.0);
      
      // Imbalance: (6-3)/(6+3) = 0.333 (more buyers)
      expect(analysis.imbalance).toBeCloseTo(0.333, 2);
      
      // Slippage for large buy order
      const slippage = calculateSlippage(orderbook.asks, 2.5);
      expect(slippage.filledQty).toBe(2.5);
      expect(slippage.slippagePercent).toBeGreaterThan(0);
    });
  });
});
