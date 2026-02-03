import { describe, it, expect } from 'vitest';
import { roundToTickSize, validateOrder, preCheckOrder, type ValidationRules } from '../validation';

describe('Validation', () => {
  const mockRules: ValidationRules = {
    priceUnit: 1000,
    qtyUnit: 0.0001,
    minQty: 0.001,
    maxQty: 100,
    minOrderAmount: 5000,
    maxOrderAmount: 1000000000
  };

  describe('roundToTickSize', () => {
    it('should round price to tick size', () => {
      expect(roundToTickSize(50500, 1000)).toBe(51000);
      expect(roundToTickSize(50499, 1000)).toBe(50000);
      expect(roundToTickSize(50000, 1000)).toBe(50000);
    });

    it('should round quantity to tick size', () => {
      expect(roundToTickSize(0.00055, 0.0001)).toBeCloseTo(0.0006, 4);
      expect(roundToTickSize(0.00014, 0.0001)).toBeCloseTo(0.0001, 4);
    });
  });

  describe('validateOrder', () => {
    it('should validate a valid order', () => {
      const result = validateOrder(50000000, 0.01, mockRules);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject order below min quantity', () => {
      const result = validateOrder(50000000, 0.0001, mockRules);
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('below minimum');
    });

    it('should reject order above max quantity', () => {
      const result = validateOrder(50000000, 200, mockRules);
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('exceeds maximum');
    });

    it('should reject order below min amount', () => {
      const result = validateOrder(1000, 0.001, mockRules);
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('below minimum');
    });

    it('should add warning when price is adjusted', () => {
      const result = validateOrder(50000500, 0.01, mockRules);
      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.adjustedPrice).toBe('50001000');
    });
  });

  describe('preCheckOrder', () => {
    it('should pass valid order', () => {
      const result = preCheckOrder(50000000, 0.01, mockRules);
      expect(result.valid).toBe(true);
    });

    it('should fail invalid order with reason', () => {
      const result = preCheckOrder(50000000, 0.0001, mockRules);
      expect(result.valid).toBe(false);
      expect(result.reason).toContain('minimum');
    });
  });
});

// Additional validation tests for coverage
describe('Additional Validation Tests', () => {
  describe('getValidationRules', () => {
    it('should throw when no range unit found', async () => {
      const { vi } = await import('vitest');
      const mockPublic = await import('../api/public');
      
      vi.spyOn(mockPublic, 'getRangeUnits').mockResolvedValue([]);
      vi.spyOn(mockPublic, 'getMarketInfo').mockResolvedValue({
        quote_currency: 'KRW',
        target_currency: 'BTC',
        min_order_amount: '5000',
        max_order_amount: '1000000000',
        maintenance_status: 0,
        order_book_units: []
      });

      const { getValidationRules } = await import('../validation');
      await expect(getValidationRules('UNKNOWN')).rejects.toThrow('No range unit found');
      
      vi.restoreAllMocks();
    });
  });

  describe('validateOrderAuto', () => {
    it('should validate order with auto-fetched rules', async () => {
      const { vi } = await import('vitest');
      const mockPublic = await import('../api/public');
      
      vi.spyOn(mockPublic, 'getRangeUnits').mockResolvedValue([{
        quote_currency: 'KRW',
        target_currency: 'BTC',
        price_unit: '1000',
        qty_unit: '0.0001',
        min_qty: '0.001',
        max_qty: '100'
      }]);
      vi.spyOn(mockPublic, 'getMarketInfo').mockResolvedValue({
        quote_currency: 'KRW',
        target_currency: 'BTC',
        min_order_amount: '5000',
        max_order_amount: '1000000000',
        maintenance_status: 0,
        order_book_units: []
      });

      const { validateOrderAuto } = await import('../validation');
      const result = await validateOrderAuto('BTC', 50000000, 0.01);
      expect(result.valid).toBe(true);
      
      vi.restoreAllMocks();
    });
  });
});
