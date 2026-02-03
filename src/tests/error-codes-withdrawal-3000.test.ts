import { describe, it, expect } from 'vitest';
import { ERROR_CODES } from '../errors';

/**
 * Error Code Tests: 3001~3018 (Withdrawal & Account Restrictions)
 * Assigned to: 차무희
 */

describe('Error Codes 3001~3018 - Withdrawal & Account Restrictions', () => {
  it('should have messages for withdrawal suspension/limits', () => {
    expect(ERROR_CODES[3001].en).toBe('Withdrawal suspended');
    expect(ERROR_CODES[3002].en).toBe('Withdrawal rejected');
    expect(ERROR_CODES[3003].en).toBe('Exceed daily withdrawal limit');
    expect(ERROR_CODES[3004].en).toBe('24-hour withdrawal delay policy');
  });

  it('should have messages for verification/lock states', () => {
    expect(ERROR_CODES[3005].en).toBe('Phone verification required');
    expect(ERROR_CODES[3006].en).toBe('Withdrawal restricted 72h after first KRW deposit');
    expect(ERROR_CODES[3007].en).toBe('Balance error');
    expect(ERROR_CODES[3009].en).toBe('Account detected by FDS');
    expect(ERROR_CODES[3010].en).toBe('Account is locked');
  });

  it('should have messages for CODE solution errors', () => {
    expect(ERROR_CODES[3012].en).toBe('CODE error: withdrawal rejected');
    expect(ERROR_CODES[3013].en).toBe('CODE error: invalid parameter');
    expect(ERROR_CODES[3014].en).toBe('CODE error: address not found');
    expect(ERROR_CODES[3015].en).toBe('CODE error: recipient info mismatch');
    expect(ERROR_CODES[3016].en).toBe('CODE error: recipient info invalid');
  });

  it('should have messages for whitelist requirements', () => {
    expect(ERROR_CODES[3017].en).toBe('Whitelist address re-verification required');
    expect(ERROR_CODES[3018].en).toBe('Register to whitelist required');
  });
});
