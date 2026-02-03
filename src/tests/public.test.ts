import { describe, it, expect, vi, beforeEach } from 'vitest';
import { 
  getTicker, 
  getAllTickers, 
  getOrderbook, 
  getMarkets, 
  getRecentTrades, 
  getCurrencies, 
  getChart 
} from '../api/public';

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Public API', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe('getTicker', () => {
    it('should fetch ticker for a specific currency', async () => {
      const mockResponse = {
        result: 'success',
        tickers: [{ target_currency: 'BTC', last: '50000000' }]
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const result = await getTicker('BTC');
      expect(result.last).toBe('50000000');
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.coinone.co.kr/public/v2/ticker_new/KRW/BTC',
        expect.objectContaining({
          headers: expect.objectContaining({ 'User-Agent': 'coinone-skill' })
        })
      );
    });

    it('should throw on API error', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ result: 'error', error_code: '4001' })
      });
      await expect(getTicker('BTC')).rejects.toThrow('API Error: 4001');
    });
  });

  describe('getAllTickers', () => {
    it('should fetch all tickers', async () => {
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

      const result = await getAllTickers();
      expect(result).toHaveLength(2);
    });

    it('should throw on API error', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ result: 'error', error_code: '4002' })
      });
      await expect(getAllTickers()).rejects.toThrow('API Error: 4002');
    });
  });

  describe('getOrderbook', () => {
    it('should fetch orderbook', async () => {
      const mockResponse = {
        result: 'success',
        bids: [{ price: '49900000', qty: '1.0' }],
        asks: [{ price: '50100000', qty: '1.0' }]
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const result = await getOrderbook('BTC');
      expect(result.bids).toHaveLength(1);
      expect(result.asks).toHaveLength(1);
    });
  });

  describe('getMarkets', () => {
    it('should fetch all markets', async () => {
      const mockResponse = {
        result: 'success',
        markets: [
          {
            quote_currency: 'KRW',
            target_currency: 'BTC',
            price_unit: '1000',
            qty_unit: '0.0001',
            min_order_amount: '5000',
            max_order_amount: '1000000000'
          }
        ]
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const result = await getMarkets('KRW');
      expect(result).toHaveLength(1);
      expect(result[0].target_currency).toBe('BTC');
    });

    it('should throw on API error', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ result: 'error', error_code: '4003' })
      });
      await expect(getMarkets()).rejects.toThrow('API Error: 4003');
    });
  });

  describe('getRecentTrades', () => {
    it('should fetch recent trades', async () => {
      const mockResponse = {
        result: 'success',
        transactions: [
          { timestamp: 1234567890, price: '50000000', qty: '0.1', is_seller_maker: false }
        ]
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const result = await getRecentTrades('BTC');
      expect(result).toHaveLength(1);
      expect(result[0].price).toBe('50000000');
    });

    it('should throw on API error', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ result: 'error', error_code: '4004' })
      });
      await expect(getRecentTrades('BTC')).rejects.toThrow('API Error: 4004');
    });
  });

  describe('getCurrencies', () => {
    it('should fetch all currencies', async () => {
      const mockResponse = {
        result: 'success',
        currencies: [
          { currency: 'BTC', name: 'Bitcoin', deposit_status: 1, withdraw_status: 1 }
        ]
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const result = await getCurrencies();
      expect(result).toHaveLength(1);
      expect(result[0].currency).toBe('BTC');
    });

    it('should throw on API error', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ result: 'error', error_code: '4005' })
      });
      await expect(getCurrencies()).rejects.toThrow('API Error: 4005');
    });
  });

  describe('getChart', () => {
    it('should fetch chart data', async () => {
      const mockResponse = {
        result: 'success',
        chart: [
          { timestamp: 1234567890, open: '49000000', high: '51000000', low: '48000000', close: '50000000' }
        ]
      };
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const result = await getChart('BTC');
      expect(result).toHaveLength(1);
      expect(result[0].close).toBe('50000000');
    });

    it('should throw on API error', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ result: 'error', error_code: '4006' })
      });
      await expect(getChart('BTC')).rejects.toThrow('API Error: 4006');
    });
  });
});
