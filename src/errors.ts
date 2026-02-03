/**
 * Coinone API Error Codes
 * Reference: https://docs.coinone.co.kr/docs/error-code
 */

export const ERROR_CODES: Record<number, { en: string; kr: string }> = {
  // Access & Auth (4, 10, 12, 20-29, 40)
  4: { en: 'Blocked user access', kr: '제한된 사용자의 접근입니다' },
  10: { en: 'This IP address is not allowed', kr: '접근이 제한된 IP로부터의 요청입니다' },
  12: { en: 'Invalid access token', kr: '유효하지 않은 액세스 토큰입니다' },
  20: { en: 'This service does not exist', kr: '존재하지 않은 API 서비스입니다' },
  21: { en: 'Customers who need to register for API usage', kr: 'API 사용을 위한 등록이 필요합니다' },
  22: { en: 'This service is not approved', kr: '승인되지 않은 서비스입니다' },
  23: { en: 'Invalid App Secret', kr: '유효하지 않은 App Secret입니다' },
  24: { en: 'Invalid App Id', kr: '유효하지 않은 APP ID입니다' },
  40: { en: 'Invalid API permission', kr: '승인되지 않은 API 권한입니다' },
  50: { en: 'KYC verification required', kr: '코인원 KYC 인증 이후 API 이용이 가능합니다' },

  // Parameter & Format (101, 103-109, 111)
  101: { en: 'Invalid format', kr: '유효하지 않은 포맷입니다' },
  103: { en: 'Lack of Balance', kr: '잔고가 부족합니다' },
  104: { en: 'Order id does not exist', kr: '존재하지 않은 주문입니다' },
  105: { en: 'Price is not correct', kr: '올바르지 않은 가격입니다' },
  107: { en: 'Parameter error', kr: '파라메터 에러입니다' },
  108: { en: 'Unknown cryptocurrency', kr: '존재하지 않은 종목 심볼입니다' },
  109: { en: 'Unknown cryptocurrency pair', kr: '존재하지 않은 거래 종목입니다' },
  111: { en: 'Price difference too large', kr: '주문 가격과 현재 가격의 현격한 차이로 주문 불가' },

  // Order Status (116-118)
  116: { en: 'Already Traded', kr: '이미 체결된 주문입니다' },
  117: { en: 'Already Canceled', kr: '이미 취소된 주문입니다' },
  118: { en: 'Already Submitted', kr: '이미 등록된 주문입니다' },

  // V2 API Nonce (120-133)
  120: { en: 'V2 API payload is missing', kr: 'V2 API payload 값 입력이 필요합니다' },
  121: { en: 'V2 API signature is missing', kr: 'V2 API signature 값 입력이 필요합니다' },
  122: { en: 'V2 API nonce is missing', kr: 'V2 API nonce 값 입력이 필요합니다' },
  123: { en: 'V2 API signature is not correct', kr: 'V2 API signature 값이 올바르지 않습니다' },
  130: { en: 'V2 API Nonce must be a positive integer', kr: 'V2 API Nonce 값은 양의 숫자 값이어야 합니다' },
  131: { en: 'V2 API Nonce must be bigger than last nonce', kr: 'V2 API Nonce 값은 이전 Nonce 값보다 커야 합니다' },
  132: { en: 'Nonce already used', kr: '이미 사용된 Nonce 값입니다' },
  133: { en: 'Nonce must be in UUID format', kr: 'Nonce값은 UUID 포맷이어야 합니다' },

  // Withdrawal (151-162)
  151: { en: 'V1 Access token not acceptable for V2', kr: 'V1의 Access Token으로는 V2 API 이용이 불가합니다' },
  152: { en: 'Invalid address', kr: '유효하지 않은 주소입니다' },
  153: { en: 'Address detected by FDS', kr: 'FDS에 의해 제한된 주소입니다' },
  154: { en: 'API withdrawal address required', kr: 'API 출금 주소 등록이 필요한 주소입니다' },
  155: { en: 'CODE withdrawal requires deposit address', kr: 'CODE 솔루션 출금을 위해 입금주소 생성이 필요합니다' },
  156: { en: 'Withdrawal address does not exist', kr: '존재하지 않은 출금 주소입니다' },
  157: { en: 'Insufficient balance', kr: '잔액이 부족합니다' },
  158: { en: 'Minimum withdrawal quantity insufficient', kr: '최소 출금 가능 금액보다 부족합니다' },
  159: { en: 'Memo required for withdrawal', kr: '출금을 위해서는 Memo 입력이 필요합니다' },
  160: { en: 'Withdrawal/Deposit id is invalid', kr: '올바르지 않은 입출금 내역 식별 ID입니다' },
  161: { en: 'Price is required for LIMIT or STOP_LIMIT', kr: '지정가/예약 지정가 주문에 가격이 필요합니다' },
  162: { en: 'Qty is required for LIMIT/STOP_LIMIT or MARKET(SELL)', kr: '지정가/예약 지정가/시장가(매도) 주문에 수량이 필요합니다' },

  // Order (300-309)
  300: { en: 'Invalid order information', kr: '유효하지 않은 주문 정보입니다' },
  305: { en: 'Invalid quantity', kr: '잘못된 수량이 입력되었습니다' },
  306: { en: 'Cannot process orders below minimum amount', kr: '최소 수량 이하로는 주문이 불가합니다' },
  307: { en: 'Cannot process orders exceed maximum amount', kr: '최대 수량 이상으로는 주문이 불가합니다' },
  308: { en: 'Price is out of range', kr: '주문 가격이 허용 범위를 벗어났습니다' },
  309: { en: 'Qty is out of range', kr: '주문 수량이 허용 범위를 벗어났습니다' },

  // Withdrawal & Account Restrictions (3001-3018)
  3001: { en: 'Withdrawal suspended for this asset', kr: '출금이 일시적 혹은 영구적으로 정지된 가상자산입니다' },
  3002: { en: 'Withdrawal is rejected', kr: '출금이 특정 사유로 인해 거절된 상태입니다' },
  3003: { en: 'Exceed daily withdrawal limit', kr: '일일 출금 가능 수량을 초과 하였습니다' },
  3004: { en: 'Failed by 24-hour withdrawal delay policy', kr: '24시간 출금 지연제에 의한 출금가능 한도 초과로 출금이 제한됩니다' },
  3005: { en: 'Phone verification required', kr: '휴대폰 번호 인증 완료 하신 후에 재시도 부탁드립니다' },
  3006: { en: 'Withdrawal restricted for 72 hours after first KRW deposit', kr: '최초 원화 입금 후 72시간 동안은 가상자산 출금이 제한됩니다' },
  3007: { en: 'Balance error. Contact CS', kr: '잔고에 오류가 발생하였습니다. 고객 센터에 연락 부탁드립니다' },
  3009: { en: 'Account detected by FDS monitoring', kr: '이상거래에 탐지되어 이용할 수 없는 상태입니다' },
  3010: { en: 'Account is locked', kr: '계정 잠금으로 인해 출금이 불가한 경우입니다' },
  3012: { en: 'CODE error: withdrawal rejected by CODE solution', kr: 'CODE 솔루션에서 출금을 거절한 경우입니다' },
  3013: { en: 'CODE error: invalid parameter', kr: 'CODE 거래소/수취인 정보에서 에러가 발생한 경우입니다' },
  3014: { en: 'CODE error: address does not exist', kr: '입금 주소가 상대 VASP에서 찾을 수 없는 경우' },
  3015: { en: 'CODE error: recipient information mismatch', kr: '코인원/상대 VASP 수취인 정보가 다를 경우' },
  3016: { en: 'CODE error: recipient information invalid', kr: '주소록 수취인 정보 수정이 필요한 경우' },
  3017: { en: 'Whitelist address re-verification required', kr: 'KYC 재이행으로 출금주소 재확인이 필요한 경우입니다' },
  3018: { en: 'Register to whitelist/allowed address list', kr: '출금 허용 주소 또는 주소록에 추가 정보 등록이 필요합니다' },
};

export class CoinoneError extends Error {
  code: number;
  messageKr: string;

  constructor(code: number, customMessage?: string) {
    const errorInfo = ERROR_CODES[code];
    const message = customMessage || errorInfo?.en || `Unknown error code: ${code}`;
    super(message);
    this.name = 'CoinoneError';
    this.code = code;
    this.messageKr = errorInfo?.kr || message;
  }
}

export function getErrorMessage(code: number, lang: 'en' | 'kr' = 'en'): string {
  const errorInfo = ERROR_CODES[code];
  if (!errorInfo) return `Unknown error code: ${code}`;
  return lang === 'kr' ? errorInfo.kr : errorInfo.en;
}

export function isAuthError(code: number): boolean {
  return [4, 10, 12, 20, 21, 22, 23, 24, 40, 50].includes(code);
}

export function isNonceError(code: number): boolean {
  return [120, 121, 122, 123, 130, 131, 132, 133].includes(code);
}

export function isOrderError(code: number): boolean {
  return [103, 104, 105, 111, 116, 117, 118, 300, 305, 306, 307, 308, 309].includes(code);
}

export function isParameterError(code: number): boolean {
  return [101, 107, 108, 109].includes(code);
}

// Extended error codes (3차 확장)

// Token errors (25-29)
ERROR_CODES[8] = { en: 'Request Token Parameter is needed', kr: '토큰 파라미터 요청이 필요합니다' };
ERROR_CODES[25] = { en: 'Request Token does not exist', kr: '존재하지 않은 Request Token입니다' };
ERROR_CODES[26] = { en: 'Failed to delete Request Token', kr: 'Request Token 삭제를 실패하였습니다' };
ERROR_CODES[27] = { en: 'Access Token does not exist', kr: '존재하지 않은 Access Token입니다' };
ERROR_CODES[28] = { en: 'Failed to delete Access Token', kr: 'Access Token 삭제 실패하였습니다' };
ERROR_CODES[29] = { en: 'Failed to refresh Access Token', kr: 'Access Token을 리프레쉬하는데 실패하였습니다' };

// KYC/Service (51-53)
ERROR_CODES[51] = { en: 'This API is no longer available', kr: '더 이상 유효하지 않은 API입니다' };
ERROR_CODES[52] = { en: 'Real name account verification required', kr: '실명 계좌 인증을 완료하지 않은 고객입니다' };
ERROR_CODES[53] = { en: 'Order rejected by market monitoring', kr: '이상거래 의심 내역이 탐지되어 거래 불가' };

// Order fields (161-167)
ERROR_CODES[159] = { en: 'Memo required for withdrawal', kr: '출금을 위해서는 Memo 입력이 필요합니다' };
ERROR_CODES[160] = { en: 'Withdrawal/Deposit id is invalid', kr: '올바르지 않은 입출금 내역 식별 ID입니다' };
ERROR_CODES[161] = { en: 'price is required for LIMIT or STOP_LIMIT order', kr: '지정가/예약지정가 주문시 가격필드 필요' };
ERROR_CODES[162] = { en: 'qty is required for LIMIT/STOP_LIMIT/MARKET(SELL)', kr: '주문시 수량필드 필요' };
ERROR_CODES[163] = { en: 'post_only is required for LIMIT order', kr: '지정가 주문시 post_only필드 필요' };
ERROR_CODES[164] = { en: 'trigger_price is required for STOP_LIMIT order', kr: '예약지정가 주문시 trigger_price 필요' };
ERROR_CODES[165] = { en: 'amount is required for MARKET(BUY) order', kr: '시장가(매수) 주문시 총액필드 필요' };
ERROR_CODES[166] = { en: 'Not Supported Order Type', kr: '지원하지 않는 주문타입입니다' };
ERROR_CODES[167] = { en: 'trigger price and current price cannot be same', kr: '예약지정가 trigger_price가 현재가와 동일' };

// Withdrawal extended (202)
ERROR_CODES[202] = { en: 'Withdrawal quantity is not correct', kr: '올바르지 않은 출금 수량입니다' };

// Order extended (310-317)
ERROR_CODES[310] = { en: 'Unavailable price unit', kr: '가격 단위가 유효하지 않습니다' };
ERROR_CODES[312] = { en: 'Duplicated user_order_id', kr: '중복된 user_order_id' };
ERROR_CODES[313] = { en: 'order_id and user_order_id conflict', kr: 'order_id와 user_order_id가 함께 요청됨' };
ERROR_CODES[314] = { en: 'Invalid user_order_id (must be lowercase)', kr: '잘못된 user_order_id' };
ERROR_CODES[315] = { en: 'API does not support portfolio', kr: '포트폴리오를 지원하지 않는 API입니다' };
ERROR_CODES[316] = { en: 'Invalid range', kr: '조회 범위가 올바르지 않습니다' };
ERROR_CODES[317] = { en: 'Invalid size', kr: '조회 사이즈가 올바르지 않습니다' };

// Server (405)
ERROR_CODES[405] = { en: 'Server error', kr: '서버 에러가 발생하였습니다' };

// V2 Order API (1201-1206)
ERROR_CODES[1201] = { en: 'V2 order API only supports limit order', kr: 'v2는 지정가 주문만 지원' };
ERROR_CODES[1202] = { en: 'API deprecated, limit order only', kr: 'v2.1/order/info는 지정가만 지원' };
ERROR_CODES[1206] = { en: 'User not found', kr: '존재하지 않은 고객입니다' };

// Withdrawal 3000 series
ERROR_CODES[3001] = { en: 'Withdrawal suspended', kr: '출금이 정지된 가상자산입니다' };
ERROR_CODES[3002] = { en: 'Withdrawal rejected', kr: '출금이 거절되었습니다' };
ERROR_CODES[3003] = { en: 'Exceed daily withdrawal limit', kr: '일일 출금 가능 수량 초과' };
ERROR_CODES[3004] = { en: '24-hour withdrawal delay policy', kr: '24시간 출금 지연제 한도 초과' };
ERROR_CODES[3005] = { en: 'Phone verification required', kr: '휴대폰 번호 인증 완료 필요' };
ERROR_CODES[3006] = { en: 'Withdrawal restricted 72h after first KRW deposit', kr: '최초 원화 입금 후 72시간 출금 제한' };
ERROR_CODES[3007] = { en: 'Balance error', kr: '잔고에 오류가 발생하였습니다' };
ERROR_CODES[3009] = { en: 'Account detected by FDS', kr: '이상거래에 탐지되어 이용 불가' };
ERROR_CODES[3010] = { en: 'Account is locked', kr: '계정 잠금으로 출금 불가' };
ERROR_CODES[3012] = { en: 'CODE error: withdrawal rejected', kr: 'CODE 솔루션에서 출금 거절' };
ERROR_CODES[3013] = { en: 'CODE error: invalid parameter', kr: 'CODE 거래소/수취인 정보 에러' };
ERROR_CODES[3014] = { en: 'CODE error: address not found', kr: '입금 주소를 상대 VASP에서 못 찾음' };
ERROR_CODES[3015] = { en: 'CODE error: recipient info mismatch', kr: '수취인 정보 불일치' };
ERROR_CODES[3016] = { en: 'CODE error: recipient info invalid', kr: '수취인 정보 수정 필요' };
ERROR_CODES[3017] = { en: 'Whitelist address re-verification required', kr: '출금주소 재확인 필요' };
ERROR_CODES[3018] = { en: 'Register to whitelist required', kr: '출금 허용 주소 등록 필요' };

// Helper for withdrawal errors
export function isWithdrawalError(code: number): boolean {
  return (code >= 3001 && code <= 3018) || [152, 153, 154, 155, 156, 157, 158, 159, 160, 202].includes(code);
}
