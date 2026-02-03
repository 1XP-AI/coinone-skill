# Tasks

## Project: Coinone Trading Assistant Skill

### Status Legend
- ✅ Done
- 🔄 In Progress
- ⏳ Pending
- ❌ Blocked

---

## Phase 1: Project Setup ✅

| Task | Assignee | Status |
|------|----------|--------|
| Create GitHub repo (1XP-AI/coinone-skill) | @hojin | ✅ |
| Add collaborators | @hojin | ✅ |
| Git config setup | @dorami | ✅ |
| TypeScript configuration | @dorami | ✅ |
| ESLint setup | @dorami | ✅ |
| Husky git hooks (pre-commit, pre-push) | @dorami | ✅ |
| Vitest TDD setup | @dorami | ✅ |
| RULES.md creation | @dorami | ✅ |

## Phase 2: Core API Implementation ✅

| Task | Assignee | Status |
|------|----------|--------|
| Public API - Ticker | @dorami | ✅ |
| Public API - Orderbook | @dorami | ✅ |
| Private API - Balance | @dorami | ✅ |
| Private API - Place Order | @dorami | ✅ |
| Private API - Cancel Order | @dorami | ✅ |
| Public API Tests | @dorami | ✅ |
| Private API Tests | @dorami | ✅ |
| Systematic API Listing | @muhee | ✅ |
| Public API (getMarkets/getRecentTrades/getCurrencies/getChart) | @dorami | ✅ |
| Private API (getAllBalances/getTradeFee/getActiveOrders/getKRWHistory) | @hojin | 🔄 |

## Phase 3: Trading Logic ✅

| Task | Assignee | Status |
|------|----------|--------|
| Trading Logic Unit Tests (TDD) | @dorami | ✅ |
| Trading Logic Design Draft | @hojin | ✅ |
| Market analysis utilities | @hojin | ✅ |
| Slippage calculation | @hojin | ✅ |
| Smart order execution | @hojin | ✅ |
| Risk management | @hojin | ✅ |
| Integration tests (scenarios doc) | @dorami | ✅ |
| Integration tests (implementation) | @dorami | ✅ |

## Phase 4: Skill Packaging ✅

| Task | Assignee | Status |
|------|----------|--------|
| SKILL.md creation | @muhee | ✅ |
| skill/ folder separation (public docs) | @dorami | ✅ |
| GitHub Pages setup | @dorami | ✅ |
| npm package preparation | @dorami | ✅ |
| npm publish workflow | @dorami | ✅ |
| npm v1.0.0 published | @team | ✅ |
| Versioning policy | @dorami | ✅ |
| Auto version bump (Conventional Commits) | @dorami | ✅ |
| README enhancement | @dorami | ✅ |

## Phase 5: Documentation & Polish 🔄

| Task | Assignee | Status |
|------|----------|--------|
| Code coverage badge | @dorami | ⏳ |
| SKILL.md enhancement (moltbook reference) | @muhee | ⏳ |
| CLI interface refinement | @hojin | 🔄 |
| Example usage documentation | @team | ⏳ |
| credentials.json auth docs (SKILL.md) | @dorami | ✅ |
| CLI credentials.json auto-loading | @dorami | ✅ |
| CLI commands (ticker/tickers/orderbook/analyze/balance) | @dorami | ✅ |
| API error mapping checklist (docs/code/tests) | @muhee | 🔄 |
| API error response standardization (error_code vs errorCode) | @muhee | 🔄 |
| analyze 고도화 (orderbook+trades 기반 지표/스코어) | @muhee | 🔄 |
| analyze 문서화 (지표 정의/출력 스키마) | @muhee | 🔄 |

---

## Phase 6: API Parity & Coverage 🔄

| Task | Assignee | Status |
|------|----------|--------|
| Public metadata endpoints (markets/market/currencies/currency/range_units) | @team | ⏳ |
| Trades + chart endpoints (trades/chart) | @team | ⏳ |
| Ticker expansion (ticker_new all, ticker single, optional utc_ticker) | @team | ⏳ |
| Order state/history endpoints (active/open/completed/detail/info) | @team | ⏳ |
| Fees endpoints (trade_fee, trade_fee/{pair}) | @team | ⏳ |
| Account/deposit info (user info, virtual account, deposit address) | @team | ⏳ |
| Deposit/withdraw history + address book/limits | @team | ⏳ |
| Reward APIs (/v2.1/order/reward/*) | @team | ⏳ |
| Websocket coverage (public + private) | @team | ⏳ |
| Trading utils: order validation with range_units + market info | @team | ⏳ |

---

## Completed Milestones

- ✅ **v1.0.0 Released** (2026-02-03)
  - npm: [@1xp-ai/coinone-skill](https://www.npmjs.com/package/@1xp-ai/coinone-skill)
  - Docs: [1xp-ai.github.io/coinone-skill](https://1xp-ai.github.io/coinone-skill/)
  - Tests: 38/38 passing

---

## Links

- **npm**: https://www.npmjs.com/package/@1xp-ai/coinone-skill
- **GitHub Pages**: https://1xp-ai.github.io/coinone-skill/
- **Repository**: https://github.com/1XP-AI/coinone-skill

---

_Last updated: 2026-02-03 22:16 KST_
