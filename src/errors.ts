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
