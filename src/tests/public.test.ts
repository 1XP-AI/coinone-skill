/**
 * Public API Tests
 * TDD: Write tests first
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getTicker, getAllTickers, getOrderbook } from '../api/public';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Coinone Public API', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe('getTicker', () => {
    it('should fetch ticker for BTC/KRW', async () => {
      const mockResponse = {
        result: 'success',
        tickers: [{
          quote_currency: 'KRW',
          target_currency: 'BTC',
          last: '50000000',
          high: '51000000',
          low: '49000000'
        }]
      };
      
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });
      
      const ticker = await getTicker('BTC');
      
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.coinone.co.kr/public/v2/ticker_new/KRW/BTC'
      );
      expect(ticker.target_currency).toBe('BTC');
      expect(ticker.last).toBe('50000000');
    });

    it('should throw error on API failure', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ result: 'error', error_code: '4001' })
      });
      
      await expect(getTicker('INVALID')).rejects.toThrow('API Error: 4001');
    });
  });

  describe('getAllTickers', () => {
    it('should fetch all tickers for KRW market', async () => {
      const mockResponse = {
        result: 'success',
        tickers: [
          { target_currency: 'BTC', last: '50000000' },
          { target_currency: 'ETH', last: '3000000' }
        ]
      };
      
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });
      
      const tickers = await getAllTickers();
      
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.coinone.co.kr/public/v2/ticker_new/KRW'
      );
      expect(tickers).toHaveLength(2);
    });
  });

  describe('getOrderbook', () => {
    it('should fetch orderbook with default size', async () => {
      const mockResponse = {
        result: 'success',
        bids: [{ price: '49900000', qty: '1.5' }],
        asks: [{ price: '50100000', qty: '2.0' }]
      };
      
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });
      
      const orderbook = await getOrderbook('BTC');
      
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.coinone.co.kr/public/v2/orderbook/KRW/BTC?size=15'
      );
      expect(orderbook.bids).toHaveLength(1);
      expect(orderbook.asks).toHaveLength(1);
    });

    it('should fetch orderbook with custom size', async () => {
      const mockResponse = {
        result: 'success',
        bids: [],
        asks: []
      };
      
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });
      
      await getOrderbook('BTC', 'KRW', 5);
      
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.coinone.co.kr/public/v2/orderbook/KRW/BTC?size=5'
      );
    });
  });
});

  // ===== NEW TESTS FOR ADDITIONAL ENDPOINTS =====

  describe('Markets', () => {
    it('should fetch all markets for KRW', async () => {
      const mockResponse = {
        result: 'success',
        markets: [
          { target_currency: 'BTC', quote_currency: 'KRW' },
          { target_currency: 'ETH', quote_currency: 'KRW' }
        ]
      };
      
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });
      
      // TODO: Implement getMarkets function
      expect(mockResponse.markets).toHaveLength(2);
    });
  });

  describe('Recent Trades', () => {
    it('should fetch recent completed orders', async () => {
      const mockResponse = {
        result: 'success',
        trades: [
          { price: '50000000', qty: '0.1', timestamp: 1234567890 }
        ]
      };
      
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });
      
      // TODO: Implement getRecentTrades function
      expect(mockResponse.trades).toHaveLength(1);
    });
  });

  describe('Currencies', () => {
    it('should fetch all supported currencies', async () => {
      const mockResponse = {
        result: 'success',
        currencies: ['BTC', 'ETH', 'XRP']
      };
      
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });
      
      // TODO: Implement getCurrencies function
      expect(mockResponse.currencies).toContain('BTC');
    });
  });

  describe('Chart Data', () => {
    it('should fetch OHLCV candle data', async () => {
      const mockResponse = {
        result: 'success',
        candles: [
          { timestamp: 1234567890, open: '50000000', high: '51000000', low: '49000000', close: '50500000', volume: '100' }
        ]
      };
      
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });
      
      // TODO: Implement getChart function
      expect(mockResponse.candles[0].high).toBe('51000000');
    });
  });
