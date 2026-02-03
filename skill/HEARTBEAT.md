# Coinone Heartbeat 💓

*Periodic check-in for price monitoring and portfolio tracking*

Add this to your agent's heartbeat routine for automated trading assistance.

---

## Quick Check

```typescript
import { getTicker, getBalance } from '@1xp-ai/coinone-skill';

// 1. Check current prices
const btcTicker = await getTicker('BTC');
console.log(`BTC: ${Number(btcTicker.last).toLocaleString()} KRW`);

// 2. Check portfolio (if credentials available)
const balance = await getBalance(credentials);
console.log(`Available KRW: ${balance.krw.avail}`);
```

---

## Heartbeat Integration

### Step 1: Add to your heartbeat file

```markdown
## Coinone (every 1-4 hours)
If time since last Coinone check > 1 hour:
1. Check price alerts
2. Review portfolio status
3. Update lastCoinoneCheck timestamp
```

### Step 2: Track state

```json
// memory/coinone-state.json
{
  "lastCheck": null,
  "priceAlerts": [
    { "currency": "BTC", "above": 100000000, "below": 80000000 }
  ],
  "lastPrices": {}
}
```

---

## Price Alert System

### Set Alerts

```typescript
const alerts = [
  { currency: 'BTC', above: 100000000 },  // Alert if BTC > 100M KRW
  { currency: 'ETH', below: 3000000 }     // Alert if ETH < 3M KRW
];

const ticker = await getTicker('BTC');
const price = Number(ticker.last);

for (const alert of alerts) {
  if (alert.above && price > alert.above) {
    console.log(`🚨 ${alert.currency} above ${alert.above}!`);
    // Notify owner
  }
  if (alert.below && price < alert.below) {
    console.log(`🚨 ${alert.currency} below ${alert.below}!`);
    // Notify owner
  }
}
```

---

## Portfolio Monitoring

### Daily Summary

```typescript
import { getBalance, getTicker } from '@1xp-ai/coinone-skill';

async function portfolioSummary(credentials) {
  const balances = await getBalance(credentials);
  let totalKRW = Number(balances.krw.balance);

  for (const [currency, data] of Object.entries(balances)) {
    if (currency !== 'krw' && Number(data.balance) > 0) {
      const ticker = await getTicker(currency.toUpperCase());
      const value = Number(data.balance) * Number(ticker.last);
      totalKRW += value;
      console.log(`${currency.toUpperCase()}: ${data.balance} (₩${value.toLocaleString()})`);
    }
  }

  console.log(`Total Portfolio: ₩${totalKRW.toLocaleString()}`);
  return totalKRW;
}
```

---

## When to Alert Your Human

**Do alert:**
- Price alert triggered (above/below threshold)
- Significant portfolio change (>5% in 24h)
- Open order filled
- API errors or issues

**Don't alert:**
- Normal price fluctuations
- Routine balance checks
- Successful automated actions

---

## Response Format

If nothing special:
```
HEARTBEAT_OK - Coinone checked. BTC: ₩95,000,000 (+0.5%)
```

If alert triggered:
```
🚨 BTC Alert! Price dropped below ₩80,000,000. Current: ₩79,500,000.
Action needed?
```

If portfolio update:
```
📊 Daily Portfolio Summary:
- BTC: 0.5 (₩47,500,000)
- ETH: 2.0 (₩7,000,000)
- KRW: ₩5,000,000
Total: ₩59,500,000 (+3.2% today)
```

---

## Heartbeat Frequency

| Check Type | Recommended | Notes |
|------------|-------------|-------|
| Price check | 1-4 hours | More frequent during volatility |
| Portfolio summary | Once daily | Morning recommended |
| Alert evaluation | Every heartbeat | Fast check |
| Full analysis | On request | Manual trigger |

---

_Stay informed without being overwhelmed._
