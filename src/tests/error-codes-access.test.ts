import { describe, it, expect } from 'vitest';
import { ERROR_CODES, isAuthError } from '../errors';

/**
 * Error Code Tests: 20~29, 40~53 (Access/Auth/KYC Errors)
 * Assigned to: 도라미
 */

describe('Error Codes 4, 10, 12 - Basic Access', () => {
  describe('Error 4: Blocked user access', () => {
    it('should have correct error messages', () => {
      expect(ERROR_CODES[4].en).toBe('Blocked user access');
      expect(ERROR_CODES[4].kr).toBe('제한된 사용자의 접근입니다');
    });

    it('should be classified as auth error', () => {
      expect(isAuthError(4)).toBe(true);
    });
  });

  describe('Error 10: IP not allowed', () => {
    it('should have correct error messages', () => {
      expect(ERROR_CODES[10].en).toBe('This IP address is not allowed');
      expect(ERROR_CODES[10].kr).toBe('접근이 제한된 IP로부터의 요청입니다');
    });

    it('should be classified as auth error', () => {
      expect(isAuthError(10)).toBe(true);
    });
  });

  describe('Error 12: Invalid access token', () => {
    it('should have correct error messages', () => {
      expect(ERROR_CODES[12].en).toBe('Invalid access token');
      expect(ERROR_CODES[12].kr).toBe('유효하지 않은 액세스 토큰입니다');
    });

    it('should be classified as auth error', () => {
      expect(isAuthError(12)).toBe(true);
    });
  });
});

describe('Error Codes 20~29 - Service/Token Errors', () => {
  describe('Error 20: Service does not exist', () => {
    it('should have correct error messages', () => {
      expect(ERROR_CODES[20].en).toBe('This service does not exist');
      expect(ERROR_CODES[20].kr).toBe('존재하지 않은 API 서비스입니다');
    });

    it('should be classified as auth error', () => {
      expect(isAuthError(20)).toBe(true);
    });
  });

  describe('Error 21: API registration needed', () => {
    it('should have correct error messages', () => {
      expect(ERROR_CODES[21].en).toBe('Customers who need to register for API usage');
      expect(ERROR_CODES[21].kr).toBe('API 사용을 위한 등록이 필요합니다');
    });

    it('should be classified as auth error', () => {
      expect(isAuthError(21)).toBe(true);
    });
  });

  describe('Error 22: Service not approved', () => {
    it('should have correct error messages', () => {
      expect(ERROR_CODES[22].en).toBe('This service is not approved');
      expect(ERROR_CODES[22].kr).toBe('승인되지 않은 서비스입니다');
    });

    it('should be classified as auth error', () => {
      expect(isAuthError(22)).toBe(true);
    });
  });

  describe('Error 23: Invalid App Secret', () => {
    it('should have correct error messages', () => {
      expect(ERROR_CODES[23].en).toBe('Invalid App Secret');
      expect(ERROR_CODES[23].kr).toBe('유효하지 않은 App Secret입니다');
    });

    it('should be classified as auth error', () => {
      expect(isAuthError(23)).toBe(true);
    });
  });

  describe('Error 24: Invalid App Id', () => {
    it('should have correct error messages', () => {
      expect(ERROR_CODES[24].en).toBe('Invalid App Id');
      expect(ERROR_CODES[24].kr).toBe('유효하지 않은 APP ID입니다');
    });

    it('should be classified as auth error', () => {
      expect(isAuthError(24)).toBe(true);
    });
  });
});

describe('Error Codes 40~53 - Permission/KYC Errors', () => {
  describe('Error 40: Invalid API permission', () => {
    it('should have correct error messages', () => {
      expect(ERROR_CODES[40].en).toBe('Invalid API permission');
      expect(ERROR_CODES[40].kr).toBe('승인되지 않은 API 권한입니다');
    });

    it('should be classified as auth error', () => {
      expect(isAuthError(40)).toBe(true);
    });
  });

  describe('Error 50: KYC verification required', () => {
    it('should have correct error messages', () => {
      expect(ERROR_CODES[50].en).toBe('KYC verification required');
      expect(ERROR_CODES[50].kr).toBe('코인원 KYC 인증 이후 API 이용이 가능합니다');
    });

    it('should be classified as auth error', () => {
      expect(isAuthError(50)).toBe(true);
    });
  });
});
