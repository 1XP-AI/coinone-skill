import { describe, it, expect } from 'vitest';
import { 
  ERROR_CODES, 
  CoinoneError, 
  getErrorMessage, 
  isParameterError, 
  isOrderError 
} from '../errors';

/**
 * Error Code Tests: 10x, 103~109 (Parameter & Order Errors)
 * Assigned to: 도라미
 */

describe('Error Codes 10x - Parameter Errors', () => {
  describe('Error 101: Invalid format', () => {
    it('should have correct error messages', () => {
      expect(ERROR_CODES[101].en).toBe('Invalid format');
      expect(ERROR_CODES[101].kr).toBe('유효하지 않은 포맷입니다');
    });

    it('should be classified as parameter error', () => {
      expect(isParameterError(101)).toBe(true);
    });
  });

  describe('Error 107: Parameter error', () => {
    it('should have correct error messages', () => {
      expect(ERROR_CODES[107].en).toBe('Parameter error');
      expect(ERROR_CODES[107].kr).toBe('파라메터 에러입니다');
    });

    it('should be classified as parameter error', () => {
      expect(isParameterError(107)).toBe(true);
    });
  });

  describe('Error 108: Unknown cryptocurrency', () => {
    it('should have correct error messages', () => {
      expect(ERROR_CODES[108].en).toBe('Unknown cryptocurrency');
      expect(ERROR_CODES[108].kr).toBe('존재하지 않은 종목 심볼입니다');
    });

    it('should be classified as parameter error', () => {
      expect(isParameterError(108)).toBe(true);
    });
  });

  describe('Error 109: Unknown cryptocurrency pair', () => {
    it('should have correct error messages', () => {
      expect(ERROR_CODES[109].en).toBe('Unknown cryptocurrency pair');
      expect(ERROR_CODES[109].kr).toBe('존재하지 않은 거래 종목입니다');
    });

    it('should be classified as parameter error', () => {
      expect(isParameterError(109)).toBe(true);
    });
  });
});

describe('Error Codes 103~109 - Order/Balance Errors', () => {
  describe('Error 103: Lack of Balance', () => {
    it('should have correct error messages', () => {
      expect(ERROR_CODES[103].en).toBe('Lack of Balance');
      expect(ERROR_CODES[103].kr).toBe('잔고가 부족합니다');
    });

    it('should be classified as order error', () => {
      expect(isOrderError(103)).toBe(true);
    });
  });

  describe('Error 104: Order id does not exist', () => {
    it('should have correct error messages', () => {
      expect(ERROR_CODES[104].en).toBe('Order id does not exist');
      expect(ERROR_CODES[104].kr).toBe('존재하지 않은 주문입니다');
    });

    it('should be classified as order error', () => {
      expect(isOrderError(104)).toBe(true);
    });
  });

  describe('Error 105: Price is not correct', () => {
    it('should have correct error messages', () => {
      expect(ERROR_CODES[105].en).toBe('Price is not correct');
      expect(ERROR_CODES[105].kr).toBe('올바르지 않은 가격입니다');
    });

    it('should be classified as order error', () => {
      expect(isOrderError(105)).toBe(true);
    });
  });
});

describe('CoinoneError class', () => {
  it('should create error with code and message', () => {
    const error = new CoinoneError(103);
    expect(error.code).toBe(103);
    expect(error.message).toBe('Lack of Balance');
    expect(error.messageKr).toBe('잔고가 부족합니다');
    expect(error.name).toBe('CoinoneError');
  });

  it('should allow custom message', () => {
    const error = new CoinoneError(103, 'Custom error message');
    expect(error.message).toBe('Custom error message');
  });

  it('should handle unknown error code', () => {
    const error = new CoinoneError(9999);
    expect(error.message).toBe('Unknown error code: 9999');
  });
});

describe('getErrorMessage helper', () => {
  it('should return English message by default', () => {
    expect(getErrorMessage(103)).toBe('Lack of Balance');
  });

  it('should return Korean message when specified', () => {
    expect(getErrorMessage(103, 'kr')).toBe('잔고가 부족합니다');
  });

  it('should handle unknown error code', () => {
    expect(getErrorMessage(9999)).toBe('Unknown error code: 9999');
  });
});
