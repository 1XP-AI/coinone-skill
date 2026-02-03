import { describe, it, expect } from 'vitest';
import { ERROR_CODES, isOrderError, isNonceError } from '../errors';

/**
 * Error Code Tests: 116~118, 120~123, 300~309
 * Assigned to: 주호진
 */

describe('Error Codes 116~118 - Order Status', () => {
  it('should have correct messages for order status', () => {
    expect(ERROR_CODES[116].en).toBe('Already Traded');
    expect(ERROR_CODES[117].en).toBe('Already Canceled');
    expect(ERROR_CODES[118].en).toBe('Already Submitted');
  });

  it('should classify as order errors', () => {
    expect(isOrderError(116)).toBe(true);
    expect(isOrderError(117)).toBe(true);
    expect(isOrderError(118)).toBe(true);
  });
});

describe('Error Codes 120~123 - V2 API payload/signature/nonce', () => {
  it('should have correct messages for nonce-related errors', () => {
    expect(ERROR_CODES[120].en).toBe('V2 API payload is missing');
    expect(ERROR_CODES[121].en).toBe('V2 API signature is missing');
    expect(ERROR_CODES[122].en).toBe('V2 API nonce is missing');
    expect(ERROR_CODES[123].en).toBe('V2 API signature is not correct');
  });

  it('should classify as nonce errors', () => {
    expect(isNonceError(120)).toBe(true);
    expect(isNonceError(121)).toBe(true);
    expect(isNonceError(122)).toBe(true);
    expect(isNonceError(123)).toBe(true);
  });
});

describe('Error Codes 300~309 - Order Rules', () => {
  it('should have correct messages for order constraints', () => {
    expect(ERROR_CODES[300].en).toBe('Invalid order information');
    expect(ERROR_CODES[305].en).toBe('Invalid quantity');
    expect(ERROR_CODES[306].en).toBe('Cannot process orders below minimum amount');
    expect(ERROR_CODES[307].en).toBe('Cannot process orders exceed maximum amount');
    expect(ERROR_CODES[308].en).toBe('Price is out of range');
    expect(ERROR_CODES[309].en).toBe('Qty is out of range');
  });

  it('should classify as order errors', () => {
    expect(isOrderError(300)).toBe(true);
    expect(isOrderError(305)).toBe(true);
    expect(isOrderError(306)).toBe(true);
    expect(isOrderError(307)).toBe(true);
    expect(isOrderError(308)).toBe(true);
    expect(isOrderError(309)).toBe(true);
  });
});
