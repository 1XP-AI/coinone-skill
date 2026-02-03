# Integration Tests

## Overview

This document outlines the integration test scenarios for the Coinone Trading Assistant Skill.
These tests verify end-to-end workflows combining multiple API calls and trading logic.

---

## Test Scenarios

### 1. Full Trading Flow

**Scenario**: Complete buy order execution from market analysis to order confirmation.

```
Steps:
1. Fetch current ticker price for BTC/KRW
2. Fetch orderbook to analyze market depth
3. Check available KRW balance
4. Calculate optimal order parameters
5. Execute buy order
6. Verify order placement response
```

**Expected Outcome**: Order successfully placed with order_id returned.

---

### 2. Smart Order Execution (E2E)

**Scenario**: AI-assisted optimal order type selection based on market conditions.

```
Steps:
1. Fetch orderbook data
2. Calculate spread percentage
3. Analyze market depth and imbalance
4. Estimate slippage for target quantity
5. Decide order type (LIMIT vs MARKET)
6. If slippage > threshold: use LIMIT with optimal price
7. If slippage <= threshold: use MARKET for immediate execution
8. Execute order with selected parameters
```

**Expected Outcome**: Order type automatically selected based on market conditions.

---

### 3. Risk Management Integration

**Scenario**: Order rejection when risk checks fail.

#### 3.1 Insufficient Balance

```
Steps:
1. Fetch available balance
2. Calculate order amount (exceeds balance)
3. Attempt to place order
```

**Expected Outcome**: Order rejected with "Insufficient balance" error.

#### 3.2 Slippage Threshold Exceeded

```
Steps:
1. Fetch orderbook with low liquidity
2. Calculate slippage for large order
3. Compare with configured threshold (e.g., 0.5%)
4. If exceeded, warn user or abort
```

**Expected Outcome**: Warning issued or order aborted when slippage exceeds threshold.

#### 3.3 Minimum Order Amount

```
Steps:
1. Attempt to place order below minimum (< 5000 KRW)
2. Validate order parameters
```

**Expected Outcome**: Order rejected with "Below minimum order amount" error.

---

### 4. Order Management Flow

**Scenario**: Place, monitor, and cancel an order.

```
Steps:
1. Place a LIMIT order at price below market
2. Fetch active orders to verify placement
3. Wait for partial fill or timeout
4. Cancel remaining order
5. Verify cancellation response
```

**Expected Outcome**: Order lifecycle managed successfully.

---

### 5. Market Analysis Pipeline

**Scenario**: Comprehensive market analysis before trading decision.

```
Steps:
1. Fetch all tickers for KRW market
2. Identify top movers (highest volume/change)
3. For selected coin, fetch detailed orderbook
4. Calculate: spread, depth, imbalance
5. Fetch recent trades for momentum analysis
6. Generate trading recommendation
```

**Expected Outcome**: Structured analysis report with actionable insights.

---

## Test Data Requirements

- **Mock Credentials**: Test access token and secret key
- **Mock Responses**: Predefined API responses for consistent testing
- **Test Environment**: Isolated from production (use testnet if available)

---

## Implementation Status

| Scenario | Unit Tests | Integration Test | Status |
|----------|------------|------------------|--------|
| Full Trading Flow | ✅ | ⏳ | Pending |
| Smart Order E2E | ✅ | ⏳ | Pending |
| Risk Management | ✅ | ⏳ | Pending |
| Order Management | ⏳ | ⏳ | Pending |
| Market Analysis | ⏳ | ⏳ | Pending |

---

_Last updated: 2026-02-03_
