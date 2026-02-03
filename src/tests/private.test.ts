/**
 * Private API Tests
 * TDD: Write tests first
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getBalance,
  placeOrder,
  cancelOrder,
  getAllBalances,
  getTradeFee,
  getActiveOrders,
  getKRWHistory,
  type CoinoneCredentials,
  type OrderRequest
} from '../api/private';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock credentials
const mockCredentials: CoinoneCredentials = {
  accessToken: 'test-access-token',
  secretKey: 'test-secret-key'
};

describe('Coinone Private API', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe('getBalance', () => {
    it('should fetch account balance', async () => {
      const mockResponse = {
        result: 'success',
        errorCode: '0',
        btc: { avail: '1.5', balance: '2.0' },
        krw: { avail: '1000000', balance: '1000000' }
      };
      
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });
      
      const balance = await getBalance(mockCredentials);
      
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.coinone.co.kr/v2/account/balance',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-type': 'application/json',
            'X-COINONE-PAYLOAD': expect.any(String),
            'X-COINONE-SIGNATURE': expect.any(String)
          })
        })
      );
      expect(balance.btc.avail).toBe('1.5');
    });

    it('should throw error on API failure', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ result: 'error', errorCode: '4002' })
      });
      
      await expect(getBalance(mockCredentials)).rejects.toThrow('API Error: 4002');
    });
  });

  describe('placeOrder', () => {
    it('should place a LIMIT BUY order', async () => {
      const mockResponse = {
        result: 'success',
        error_code: '0',
        order_id: 'test-order-id-123'
      };
      
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });
      
      const order: OrderRequest = {
        side: 'BUY',
        quoteCurrency: 'KRW',
        targetCurrency: 'BTC',
        type: 'LIMIT',
        price: '50000000',
        qty: '0.1',
        postOnly: true
      };
      
      const response = await placeOrder(order, mockCredentials);
      
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.coinone.co.kr/v2.1/order',
        expect.objectContaining({ method: 'POST' })
      );
      expect(response.order_id).toBe('test-order-id-123');
    });

    it('should place a MARKET SELL order', async () => {
      const mockResponse = {
        result: 'success',
        error_code: '0',
        order_id: 'test-order-id-456'
      };
      
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });
      
      const order: OrderRequest = {
        side: 'SELL',
        quoteCurrency: 'KRW',
        targetCurrency: 'ETH',
        type: 'MARKET',
        qty: '1.0'
      };
      
      const response = await placeOrder(order, mockCredentials);
      
      expect(response.order_id).toBe('test-order-id-456');
    });

    it('should place a STOP_LIMIT order with trigger price', async () => {
      const mockResponse = {
        result: 'success',
        error_code: '0',
        order_id: 'test-order-id-789'
      };
      
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });
      
      const order: OrderRequest = {
        side: 'SELL',
        quoteCurrency: 'KRW',
        targetCurrency: 'BTC',
        type: 'STOP_LIMIT',
        price: '48000000',
        qty: '0.5',
        triggerPrice: '49000000'
      };
      
      const response = await placeOrder(order, mockCredentials);
      
      expect(response.order_id).toBe('test-order-id-789');
    });
  });

  describe('cancelOrder', () => {
    it('should cancel an existing order', async () => {
      const mockResponse = {
        result: 'success',
        error_code: '0',
        order_id: 'cancelled-order-id',
        price: '50000000',
        qty: '0.1',
        canceled_qty: '0.1'
      };
      
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });
      
      const response = await cancelOrder(
        'test-order-id',
        'KRW',
        'BTC',
        mockCredentials
      );
      
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.coinone.co.kr/v2.1/order/cancel',
        expect.objectContaining({ method: 'POST' })
      );
      expect(response.order_id).toBe('cancelled-order-id');
    });
  });
});

  // ===== NEW TESTS FOR ADDITIONAL ENDPOINTS =====

  describe('getAllBalances', () => {
    it('should fetch all asset balances', async () => {
      const mockResponse = {
        result: 'success',
        balances: [
          { currency: 'BTC', avail: '1.0', balance: '1.5' },
          { currency: 'ETH', avail: '10.0', balance: '10.0' }
        ]
      };
      
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });
      
      const response = await getAllBalances(mockCredentials);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.coinone.co.kr/v2.1/account/balance',
        expect.objectContaining({ method: 'POST' })
      );
      expect(response.balances).toHaveLength(2);
    });
  });

  describe('getTradeFee', () => {
    it('should fetch trading fees', async () => {
      const mockResponse = {
        result: 'success',
        maker_fee: '0.001',
        taker_fee: '0.002'
      };
      
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });
      
      const response = await getTradeFee(mockCredentials);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.coinone.co.kr/v2.1/account/fee',
        expect.objectContaining({ method: 'POST' })
      );
      expect(parseFloat(response.taker_fee)).toBeGreaterThan(parseFloat(response.maker_fee));
    });
  });

  describe('getActiveOrders', () => {
    it('should fetch list of active orders', async () => {
      const mockResponse = {
        result: 'success',
        active_orders: [
          { order_id: 'test-123', side: 'BUY', price: '50000000', qty: '0.1' }
        ]
      };
      
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });
      
      const response = await getActiveOrders('KRW', 'BTC', mockCredentials);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.coinone.co.kr/v2.1/order/active_orders',
        expect.objectContaining({ method: 'POST' })
      );
      expect(response.active_orders[0].side).toBe('BUY');
    });
  });

  describe('getKRWHistory', () => {
    it('should fetch KRW deposit/withdrawal history', async () => {
      const mockResponse = {
        result: 'success',
        transactions: [
          { type: 'deposit', amount: '1000000', timestamp: 1234567890 }
        ]
      };
      
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });
      
      const response = await getKRWHistory(0, 9999999999, mockCredentials);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.coinone.co.kr/v2.1/krw/history',
        expect.objectContaining({ method: 'POST' })
      );
      expect(response.transactions[0].type).toBe('deposit');
    });
  });
