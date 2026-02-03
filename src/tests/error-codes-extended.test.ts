import { describe, it, expect } from 'vitest';
import { ERROR_CODES, isWithdrawalError } from '../errors';

/**
 * Error Code Tests: Extended (3차 확장)
 * Token (8, 25-29), KYC (51-53), Order fields (159-167)
 * Order extended (202, 310-317), Server (405), V2 API (1201-1206)
 * Withdrawal 3000 series (3001-3018)
 * Assigned to: 도라미
 */

describe('Error Codes - Token (8, 25-29)', () => {
  it('should have error 8', () => {
    expect(ERROR_CODES[8].en).toBe('Request Token Parameter is needed');
  });

  it('should have errors 25-29', () => {
    expect(ERROR_CODES[25]).toBeDefined();
    expect(ERROR_CODES[26]).toBeDefined();
    expect(ERROR_CODES[27]).toBeDefined();
    expect(ERROR_CODES[28]).toBeDefined();
    expect(ERROR_CODES[29]).toBeDefined();
  });
});

describe('Error Codes - KYC/Service (51-53)', () => {
  it('should have errors 51-53', () => {
    expect(ERROR_CODES[51].en).toBe('This API is no longer available');
    expect(ERROR_CODES[52].en).toBe('Real name account verification required');
    expect(ERROR_CODES[53].en).toBe('Order rejected by market monitoring');
  });
});

describe('Error Codes - Order fields (159-167)', () => {
  it('should have errors 159-167', () => {
    expect(ERROR_CODES[159]).toBeDefined();
    expect(ERROR_CODES[160]).toBeDefined();
    expect(ERROR_CODES[161]).toBeDefined();
    expect(ERROR_CODES[162]).toBeDefined();
    expect(ERROR_CODES[163]).toBeDefined();
    expect(ERROR_CODES[164]).toBeDefined();
    expect(ERROR_CODES[165]).toBeDefined();
    expect(ERROR_CODES[166]).toBeDefined();
    expect(ERROR_CODES[167]).toBeDefined();
  });
});

describe('Error Codes - Order extended (202, 310-317)', () => {
  it('should have error 202', () => {
    expect(ERROR_CODES[202].en).toBe('Withdrawal quantity is not correct');
  });

  it('should have errors 310-317', () => {
    expect(ERROR_CODES[310]).toBeDefined();
    expect(ERROR_CODES[312]).toBeDefined();
    expect(ERROR_CODES[313]).toBeDefined();
    expect(ERROR_CODES[314]).toBeDefined();
    expect(ERROR_CODES[315]).toBeDefined();
    expect(ERROR_CODES[316]).toBeDefined();
    expect(ERROR_CODES[317]).toBeDefined();
  });
});

describe('Error Codes - Server (405) and V2 API (1201-1206)', () => {
  it('should have error 405', () => {
    expect(ERROR_CODES[405].en).toBe('Server error');
  });

  it('should have V2 API errors', () => {
    expect(ERROR_CODES[1201]).toBeDefined();
    expect(ERROR_CODES[1202]).toBeDefined();
    expect(ERROR_CODES[1206]).toBeDefined();
  });
});

describe('Error Codes - Withdrawal 3000 series', () => {
  const withdrawalCodes = [3001, 3002, 3003, 3004, 3005, 3006, 3007, 3009, 3010, 3012, 3013, 3014, 3015, 3016, 3017, 3018];

  it.each(withdrawalCodes)('should have error %i', (code) => {
    expect(ERROR_CODES[code]).toBeDefined();
    expect(ERROR_CODES[code].en).toBeTruthy();
    expect(ERROR_CODES[code].kr).toBeTruthy();
  });

  it('should classify 3000 series as withdrawal errors', () => {
    withdrawalCodes.forEach(code => {
      expect(isWithdrawalError(code)).toBe(true);
    });
  });

  it('should classify 152-160 as withdrawal errors', () => {
    [152, 153, 154, 155, 156, 157, 158, 159, 160].forEach(code => {
      expect(isWithdrawalError(code)).toBe(true);
    });
  });

  it('should not classify non-withdrawal errors', () => {
    expect(isWithdrawalError(101)).toBe(false);
    expect(isWithdrawalError(300)).toBe(false);
  });
});
