import { describe, it, expect } from 'vitest';
import { ERROR_CODES, CoinoneError, getErrorMessage, isAuthError, isNonceError } from '../errors';

/**
 * Error Code Tests: 12x/13x, 151~162 (Auth/Nonce/Withdrawal)
 * Assigned to: 주호진
 */

describe('Error Codes 12x/13x - Auth & Nonce', () => {
  it('should include auth errors', () => {
    expect(ERROR_CODES[12].en).toBe('Invalid access token');
    expect(isAuthError(12)).toBe(true);
  });

  it('should include nonce errors', () => {
    expect(ERROR_CODES[120].en).toBe('V2 API payload is missing');
    expect(ERROR_CODES[121].en).toBe('V2 API signature is missing');
    expect(ERROR_CODES[122].en).toBe('V2 API nonce is missing');
    expect(ERROR_CODES[123].en).toBe('V2 API signature is not correct');
    expect(ERROR_CODES[130].en).toBe('V2 API Nonce must be a positive integer');
    expect(ERROR_CODES[133].en).toBe('Nonce must be in UUID format');
    expect(isNonceError(130)).toBe(true);
    expect(isNonceError(133)).toBe(true);
  });
});

describe('Error Codes 151~162 - Withdrawal & Order Requirements', () => {
  it('should include withdrawal/auth requirements', () => {
    expect(ERROR_CODES[151].en).toBe('V1 Access token not acceptable for V2');
    expect(ERROR_CODES[152].en).toBe('Invalid address');
    expect(ERROR_CODES[153].en).toBe('Address detected by FDS');
    expect(ERROR_CODES[154].en).toBe('API withdrawal address required');
    expect(ERROR_CODES[156].en).toBe('Withdrawal address does not exist');
  });

  it('should include withdrawal constraints', () => {
    expect(ERROR_CODES[157].en).toBe('Insufficient balance');
    expect(ERROR_CODES[158].en).toBe('Minimum withdrawal quantity insufficient');
    expect(ERROR_CODES[159].en).toBe('Memo required for withdrawal');
    expect(ERROR_CODES[160].en).toBe('Withdrawal/Deposit id is invalid');
  });

  it('should include order field requirements', () => {
    expect(ERROR_CODES[161].en).toBe('Price is required for LIMIT or STOP_LIMIT');
    expect(ERROR_CODES[162].en).toBe('Qty is required for LIMIT/STOP_LIMIT or MARKET(SELL)');
  });
});

describe('CoinoneError for auth/nonce', () => {
  it('should return Korean messages when requested', () => {
    expect(getErrorMessage(130, 'kr')).toBe('V2 API Nonce 값은 양의 숫자 값이어야 합니다');
    expect(getErrorMessage(161, 'kr')).toBe('지정가/예약 지정가 주문에 가격이 필요합니다');
  });

  it('should populate error metadata', () => {
    const error = new CoinoneError(130);
    expect(error.code).toBe(130);
    expect(error.message).toBe('V2 API Nonce must be a positive integer');
    expect(error.messageKr).toBe('V2 API Nonce 값은 양의 숫자 값이어야 합니다');
  });
});
