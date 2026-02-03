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

// Phase 6 API Tests
describe('Phase 6 APIs', () => {
  describe('getOpenOrders', () => {
    it('should fetch open orders', async () => {
      const mockResponse = {
        result: 'success',
        open_orders: [{ order_id: '123', target_currency: 'BTC' }]
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const { getOpenOrders } = await import('../api/private');
      const result = await getOpenOrders(mockCredentials);
      expect(result).toHaveLength(1);
    });

    it('should throw on error', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ result: 'error', error_code: '4001' })
      });
      const { getOpenOrders } = await import('../api/private');
      await expect(getOpenOrders(mockCredentials)).rejects.toThrow('API Error');
    });
  });

  describe('getCompletedOrders', () => {
    it('should fetch completed orders', async () => {
      const mockResponse = {
        result: 'success',
        completed_orders: [{ order_id: '456', target_currency: 'ETH' }]
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const { getCompletedOrders } = await import('../api/private');
      const result = await getCompletedOrders(mockCredentials);
      expect(result).toHaveLength(1);
    });
  });

  describe('getOrderDetail', () => {
    it('should fetch order detail', async () => {
      const mockResponse = {
        result: 'success',
        order: { order_id: '789', status: 'filled' }
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const { getOrderDetail } = await import('../api/private');
      const result = await getOrderDetail(mockCredentials, '789', 'BTC');
      expect(result.order_id).toBe('789');
    });
  });

  describe('getUserInfo', () => {
    it('should fetch user info', async () => {
      const mockResponse = {
        result: 'success',
        user_info: { user_id: 'user123', email: 'test@test.com' }
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const { getUserInfo } = await import('../api/private');
      const result = await getUserInfo(mockCredentials);
      expect(result.user_id).toBe('user123');
    });
  });

  describe('getVirtualAccount', () => {
    it('should fetch virtual account', async () => {
      const mockResponse = {
        result: 'success',
        virtual_account: { bank_name: 'KB', account_number: '123456' }
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const { getVirtualAccount } = await import('../api/private');
      const result = await getVirtualAccount(mockCredentials);
      expect(result.bank_name).toBe('KB');
    });
  });

  describe('getDepositAddress', () => {
    it('should fetch deposit address', async () => {
      const mockResponse = {
        result: 'success',
        deposit_address: { currency: 'BTC', address: 'bc1qxyz' }
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const { getDepositAddress } = await import('../api/private');
      const result = await getDepositAddress(mockCredentials, 'BTC');
      expect(result.address).toBe('bc1qxyz');
    });
  });

  describe('getCoinDepositHistory', () => {
    it('should fetch deposit history', async () => {
      const mockResponse = {
        result: 'success',
        deposits: [{ txid: 'tx123', currency: 'BTC' }]
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const { getCoinDepositHistory } = await import('../api/private');
      const result = await getCoinDepositHistory(mockCredentials);
      expect(result).toHaveLength(1);
    });
  });

  describe('getCoinWithdrawalHistory', () => {
    it('should fetch withdrawal history', async () => {
      const mockResponse = {
        result: 'success',
        withdrawals: [{ txid: 'tx456', currency: 'ETH' }]
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const { getCoinWithdrawalHistory } = await import('../api/private');
      const result = await getCoinWithdrawalHistory(mockCredentials);
      expect(result).toHaveLength(1);
    });
  });

  describe('getWithdrawalAddressBook', () => {
    it('should fetch address book', async () => {
      const mockResponse = {
        result: 'success',
        addresses: [{ id: '1', currency: 'BTC', address: 'bc1q123' }]
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const { getWithdrawalAddressBook } = await import('../api/private');
      const result = await getWithdrawalAddressBook(mockCredentials);
      expect(result).toHaveLength(1);
    });
  });

  describe('getWithdrawalLimits', () => {
    it('should fetch withdrawal limits', async () => {
      const mockResponse = {
        result: 'success',
        limits: [{ currency: 'BTC', daily_limit: '10' }]
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const { getWithdrawalLimits } = await import('../api/private');
      const result = await getWithdrawalLimits(mockCredentials);
      expect(result).toHaveLength(1);
    });
  });

  describe('Reward APIs', () => {
    it('should fetch trading rewards', async () => {
      const mockResponse = {
        result: 'success',
        rewards: [{ currency: 'BTC', amount: '0.001' }]
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const { getTradingRewards } = await import('../api/private');
      const result = await getTradingRewards(mockCredentials);
      expect(result).toHaveLength(1);
    });

    it('should fetch staking rewards', async () => {
      const mockResponse = {
        result: 'success',
        rewards: [{ currency: 'ETH', amount: '0.01', apy: '5.0' }]
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const { getStakingRewards } = await import('../api/private');
      const result = await getStakingRewards(mockCredentials);
      expect(result).toHaveLength(1);
    });

    it('should fetch airdrop rewards', async () => {
      const mockResponse = {
        result: 'success',
        rewards: [{ currency: 'TOKEN', amount: '100' }]
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const { getAirdropRewards } = await import('../api/private');
      const result = await getAirdropRewards(mockCredentials);
      expect(result).toHaveLength(1);
    });

    it('should fetch reward summary', async () => {
      const mockResponse = {
        result: 'success',
        summary: [{ currency: 'KRW', total_trading_reward: '1000' }]
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const { getRewardSummary } = await import('../api/private');
      const result = await getRewardSummary(mockCredentials);
      expect(result).toHaveLength(1);
    });
  });
});
