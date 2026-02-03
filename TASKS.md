# Tasks

> All commits and external documents must be written in English.
> Use TDD (tests first). Husky enforces `lint` on pre-commit and `test` on pre-push.

## Milestones

### M0 — Project Setup (Week 0)
- [x] Repository created
- [x] RULES.md added
- [x] SvelteKit (TypeScript) scaffold
- [x] ESLint configured
- [x] Vitest configured
- [x] Husky hooks (pre-commit lint, pre-push test)

### M1 — Public API Layer
- [ ] Define API client interface (public endpoints)
- [ ] Implement ticker endpoints
- [ ] Implement orderbook endpoints
- [ ] Unit tests for public API client

### M2 — Private API Layer (Auth)
- [ ] Define signing utilities (payload + HMAC-SHA512)
- [ ] Implement balance endpoints
- [ ] Implement order placement/cancel
- [ ] Unit tests for private API client

### M3 — Trading Assistant Workflow
- [ ] Decision flow: market data → risk checks → order strategy
- [ ] Order management (status, partial fills, cancel/replace)
- [ ] Tests for decision logic

### M4 — QA & Hardening
- [ ] Error handling & retry strategy
- [ ] Rate-limit/nonce handling
- [ ] Integration test plan

## Open Questions
- [ ] Confirm target environments (prod/test)
- [ ] Confirm required private API scopes
- [ ] Confirm strategy constraints (slippage tolerance, max order size)
