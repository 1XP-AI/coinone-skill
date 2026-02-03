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

## Phase 3: Trading Logic 🔄

| Task | Assignee | Status |
|------|----------|--------|
| Trading Logic Unit Tests (TDD) | @dorami | ✅ |
| Trading Logic Design Draft | @hojin | 🔄 |
| Market analysis utilities | @hojin | ⏳ |
| Slippage calculation | @hojin | ⏳ |
| Smart order execution | @hojin | ⏳ |
| Risk management | @hojin | ⏳ |
| CLI interface refinement | @hojin | ⏳ |

## Phase 4: Skill Packaging ⏳

| Task | Assignee | Status |
|------|----------|--------|
| SKILL.md creation | @muhee | ⏳ |
| Strategy guide documentation | @muhee | ⏳ |
| Integration tests | @dorami | ⏳ |
| Package and release | @muhee | ⏳ |

---

## PM Check-in Log

| Date | Time | Status Summary |
|------|------|----------------|
| 2026-02-03 | 20:20 | Initial setup complete. Public/Private API implementation finished. Moving to Private API tests and Trading logic. |
| 2026-02-03 | 20:33 | Private API tests completed. Svelte UI task replaced with CLI refinement (project is CLI-only). |
| 2026-02-03 | 20:45 | Systematic API Listing complete. Full endpoint mapping documented in docs/API.md. |
| 2026-02-03 | 20:55 | Trading Logic Unit Tests (22/22) completed by Dorami. Ho-jin starting design draft. |

---

## Issues

- **Auth Issue**: Encountered a transient Cloud Code Assist API 401 error. Investigating internal tool credentials.

---

## Notes

- All commits and external docs must be in English
- TDD: Write tests before implementation
- PM checks progress every hour

---

_Last updated: 2026-02-03_
