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
