# Coinone API Error Codes

Source: https://docs.coinone.co.kr/docs/error-code

> Use this table to map numeric error codes to human‑readable meaning.

## Access & Auth
- **4**: Blocked user access (제한된 사용자의 접근입니다)
- **8**: Request Token parameter is needed (토큰 파라미터 요청이 필요 합니다)
- **10**: This IP address is not allowed (접근이 제한된 IP로부터의 요청입니다)
- **12**: Invalid access token (유효하지 않은 액세스 토큰입니다)
- **20**: This service does not exist (존재하지 않은 API 서비스입니다)
- **21**: API usage registration required (API 사용을 위한 등록이 필요합니다)
- **22**: This service is not approved (승인되지 않은 서비스입니다)
- **23**: Invalid App Secret (유효하지 않은 App Secret입니다)
- **24**: Invalid App Id (유효하지 않은 APP ID입니다)
- **25**: Request Token does not exist (존재하지 않은 Request Token입니다)
- **26**: Failed to delete Request Token (Request Token 삭제 실패)
- **27**: Access Token does not exist (존재하지 않은 Access Token입니다)
- **28**: Failed to delete Access Token (Access Token 삭제 실패)
- **29**: Failed to refresh Access Token (Access Token 리프레시 실패)
- **40**: Invalid API permission (승인되지 않은 API 권한입니다)
- **50**: KYC verification required (KYC 인증 이후 API 이용 가능)
- **51**: This API is no longer available (더 이상 유효하지 않은 API)
- **52**: Real-name account verification required (실명 계좌 인증 필요)
- **53**: Order rejected by market monitoring (이상거래 의심 내역)

## Parameter / Format
- **101**: Invalid format (유효하지 않은 포맷)
- **107**: Parameter error (파라미터 에러)
- **108**: Unknown cryptocurrency (존재하지 않은 종목 심볼)
- **109**: Unknown cryptocurrency pair (존재하지 않은 거래 종목)

## Order / Balance
- **103**: Lack of balance (잔고 부족)
- **104**: Order id does not exist (존재하지 않은 주문)
- **105**: Price is not correct (올바르지 않은 가격)
- **111**: Price difference too large (주문 가격과 현재 가격의 차이 큼)
- **116**: Already traded (이미 체결된 주문)
- **117**: Already canceled (이미 취소된 주문)
- **118**: Already submitted (이미 등록된 주문)

## V2 Nonce / Signature
- **120**: V2 payload missing
- **121**: V2 signature missing
- **122**: V2 nonce missing
- **123**: V2 signature invalid
- **130**: V2 nonce must be positive integer
- **131**: V2 nonce must be bigger than last nonce
- **132**: Nonce already used
- **133**: Nonce must be UUID format

## Withdrawal / Address
- **151**: V1 token not acceptable for V2
- **152**: Invalid address
- **153**: Address detected by FDS
- **154**: API withdrawal address required
- **155**: CODE withdrawal requires deposit address
- **156**: Withdrawal address does not exist
- **157**: Insufficient balance
- **158**: Minimum withdrawal quantity insufficient
- **159**: Memo required for withdrawal
- **160**: Withdrawal/Deposit id is invalid
- **161**: Price required for LIMIT/STOP_LIMIT
- **162**: Qty required for LIMIT/STOP_LIMIT or MARKET(SELL)
- **163**: post_only required for LIMIT order
- **164**: trigger_price required for STOP_LIMIT
- **165**: amount required for MARKET(BUY)
- **166**: Not supported order type
- **167**: trigger price equals current price
- **202**: Withdrawal quantity is not correct

## Order Rules
- **300**: Invalid order information
- **305**: Invalid quantity
- **306**: Orders below minimum amount
- **307**: Orders exceed maximum amount
- **308**: Price is out of range
- **309**: Qty is out of range
- **310**: Unavailable price unit (check range_units)
- **312**: Duplicated user_order_id
- **313**: user_order_id and order_id cannot be requested together
- **314**: Invalid user_order_id (lowercase only, length 제한)
- **315**: Portfolio not supported
- **316**: Invalid range
- **317**: Invalid size
- **405**: Server error

## V2/V2.1 Order Query
- **1201**: V2 order API only supports limit orders
- **1202**: Deprecated API only supports limit order
- **1206**: User not found

## Withdrawal 3000 Series
- **3001**: Withdrawal suspended for this asset
- **3002**: Withdrawal rejected
- **3003**: Exceed daily withdrawal limit
- **3004**: 24‑hour withdrawal delay policy
- **3005**: Phone verification required
- **3006**: Withdrawal restricted 72h after first KRW deposit
- **3007**: Balance error (contact CS)
- **3009**: Account detected by FDS monitoring
- **3010**: Account is locked
- **3012**: CODE error: withdrawal rejected
- **3013**: CODE error: invalid parameter
- **3014**: CODE error: address does not exist
- **3015**: CODE error: recipient info mismatch
- **3016**: CODE error: recipient info invalid
- **3017**: Whitelist address re‑verification required
- **3018**: Register to whitelist/allowed address list
