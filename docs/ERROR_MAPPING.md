# API Error Mapping Checklist

This checklist ensures API error handling is consistent across **docs**, **code**, and **tests**.

## 1) Response Schema Normalization
- [x] Handle both `error_code` and `errorCode` in responses
- [x] Treat `result !== 'success'` as error
- [x] Provide a clear error message with code

## 2) Public API (src/api/public.ts)
- [x] `getTicker` → throws on error
- [x] `getAllTickers` → throws on error
- [x] `getOrderbook` → throws on error
- [x] `getMarkets` → throws on error
- [x] `getMarketInfo` → throws on error
- [x] `getRecentTrades` → throws on error
- [x] `getCurrencies` → throws on error
- [x] `getCurrencyInfo` → throws on error
- [x] `getChart` → throws on error
- [x] `getRangeUnits` → throws on error
- [x] `getUTCTicker` → throws on error
- [x] `getAllUTCTickers` → throws on error

## 3) Private API (src/api/private.ts)
- [x] `getBalance`
- [x] `getAllBalances`
- [x] `getTradeFee`
- [x] `getTradeFeeByPair`
- [x] `getActiveOrders`
- [x] `getOpenOrders`
- [x] `getCompletedOrders`
- [x] `getOrderDetail`
- [x] `getOrderInfo`
- [x] `getUserInfo`
- [x] `getVirtualAccount`
- [x] `getDepositAddress`
- [x] `getKRWHistory`
- [x] `getCoinDepositHistory`
- [x] `getCoinWithdrawalHistory`
- [x] `getWithdrawalAddressBook`
- [x] `getWithdrawalLimits`
- [x] `getTradingRewards`
- [x] `getStakingRewards`
- [x] `getAirdropRewards`
- [x] `getRewardSummary`

## 4) Tests Coverage
- [x] Public API error tests exist
- [x] Private API error tests exist
- [x] CLI command error handling covered

## 5) Docs Alignment
- [x] `docs/API.md` lists endpoints
- [x] `skill/SKILL.md` references functions
- [ ] Add error code table updates if Coinone publishes new codes

## 6) Next Checks (Before Release)
- [ ] Run full test suite
- [ ] Verify CI is green
- [ ] Reconcile docs vs. exported SDK functions

---

## Coinone API Error Codes

| Code | Message (EN) | Message (KR) |
|------|--------------|--------------|
| 4 | Blocked user access | 제한된 사용자의 접근입니다 |
| 8 | Request Token Parameter is needed | 토큰 파라미터 요청이 필요합니다 |
| 10 | This IP address is not allowed | 접근이 제한된 IP로부터의 요청입니다 |
| 12 | Invalid access token | 유효하지 않은 액세스 토큰입니다 |
| 20 | This service does not exist | 존재하지 않은 API 서비스입니다 |
| 21 | Customers who need to register for API usage | API 사용을 위한 등록이 필요합니다 |
| 22 | This service is not approved | 승인되지 않은 서비스입니다 |
| 23 | Invalid App Secret | 유효하지 않은 App Secret입니다 |
| 24 | Invalid App Id | 유효하지 않은 APP ID입니다 |
| 40 | Invalid API permission | 승인되지 않은 API 권한입니다 |
| 50 | KYC verification required | 코인원 KYC 인증 이후 API 이용이 가능합니다 |
| 101 | Invalid format | 유효하지 않은 포맷입니다 |
| 103 | Lack of Balance | 잔고가 부족합니다 |
| 104 | Order id does not exist | 존재하지 않은 주문입니다 |
| 105 | Price is not correct | 올바르지 않은 가격입니다 |
| 107 | Parameter error | 파라메터 에러입니다 |
| 108 | Unknown cryptocurrency | 존재하지 않은 종목 심볼입니다 |
| 109 | Unknown cryptocurrency pair | 존재하지 않은 거래 종목입니다 |
| 111 | Price difference too large | 주문 가격과 현재 가격의 현격한 차이로 주문 불가 |
| 116 | Already Traded | 이미 체결된 주문입니다 |
| 117 | Already Canceled | 이미 취소된 주문입니다 |
| 118 | Already Submitted | 이미 등록된 주문입니다 |
| 120 | V2 API payload is missing | V2 API payload 값 입력이 필요합니다 |
| 121 | V2 API signature is missing | V2 API signature 값 입력이 필요합니다 |
| 122 | V2 API nonce is missing | V2 API nonce 값 입력이 필요합니다 |
| 123 | V2 API signature is not correct | V2 API signature 값이 올바르지 않습니다 |
| **130** | **V2 API Nonce must be a positive integer** | **V2 API Nonce 값은 양의 숫자 값이어야 합니다** |
| 131 | V2 API Nonce must be bigger than last nonce | V2 API Nonce 값은 이전 Nonce 값보다 커야 합니다 |
| 132 | Nonce already used | 이미 사용된 Nonce 값입니다 |
| 133 | Nonce must be in UUID format | Nonce값은 UUID 포맷이어야 합니다 |
| 151 | V1 Access token not acceptable for V2 | V1의 Access Token으로는 V2 API 이용이 불가합니다 |
| 152 | Invalid address | 유효하지 않은 주소입니다 |
| 157 | Insufficient balance | 잔액이 부족합니다 |
| 158 | Minimum withdrawal quantity insufficient | 최소 출금 가능 금액보다 부족합니다 |
| 300 | Invalid order information | 유효하지 않은 주문 정보입니다 |
| 305 | Invalid quantity | 잘못된 수량이 입력되었습니다 |
| 306 | Cannot process orders below minimum amount | 최소 수량 이하로는 주문이 불가합니다 |
| 307 | Cannot process orders exceed maximum amount | 최대 수량 이상으로는 주문이 불가합니다 |
| 308 | Price is out of range | 주문 가격이 허용 범위를 벗어났습니다 |
| 309 | Qty is out of range | 주문 수량이 허용 범위를 벗어났습니다 |

_Reference: https://docs.coinone.co.kr/docs/error-code_
