# Example Usage

## Quick Start

### 1. Installation

```bash
npm install @1xp-ai/coinone-skill
```

### 2. Basic Usage (No API Key)

```typescript
import { getTicker, getOrderbook, analyzeMarket } from '@1xp-ai/coinone-skill';

// Get current BTC price
const ticker = await getTicker('BTC');
console.log(`BTC: ${Number(ticker.last).toLocaleString()} KRW`);

// Get orderbook
const orderbook = await getOrderbook('BTC');
console.log(`Best Bid: ${orderbook.bids[0].price}`);
console.log(`Best Ask: ${orderbook.asks[0].price}`);

// Analyze market
const analysis = analyzeMarket(orderbook);
console.log(`Spread: ${analysis.spreadPercent?.toFixed(2)}%`);
console.log(`Imbalance: ${analysis.imbalance?.toFixed(2)}`);
```

### 3. With API Key (Trading)

```typescript
import { getBalance, placeOrder, type CoinoneCredentials } from '@1xp-ai/coinone-skill';

const credentials: CoinoneCredentials = {
  accessToken: process.env.COINONE_ACCESS_TOKEN!,
  secretKey: process.env.COINONE_SECRET_KEY!
};

// Check balance
const balance = await getBalance(credentials);
console.log(`KRW: ${balance.krw.avail}`);

// Place limit order
const order = await placeOrder({
  side: 'BUY',
  targetCurrency: 'BTC',
  quoteCurrency: 'KRW',
  type: 'LIMIT',
  price: '50000000',
  qty: '0.001'
}, credentials);
console.log(`Order ID: ${order.order_id}`);
```

---

## AI Agent Examples

### "What's the current BTC price?"

```typescript
const ticker = await getTicker('BTC');
return `BTC is currently ${Number(ticker.last).toLocaleString()} KRW`;
```

### "Should I use LIMIT or MARKET order?"

```typescript
const orderbook = await getOrderbook('BTC');
const analysis = analyzeMarket(orderbook);
const recommendation = recommendOrderType(analysis.spreadPercent!, 0.5);
return `With ${analysis.spreadPercent?.toFixed(2)}% spread, I recommend ${recommendation}`;
```

### "Check slippage for buying 1 BTC"

```typescript
const orderbook = await getOrderbook('BTC');
const slippage = calculateSlippage(orderbook.asks, 1.0);
return `Expected slippage: ${slippage.slippagePercent.toFixed(2)}%`;
```

### "What's the market pressure?"

```typescript
import { analyzeSnapshot, getOrderbook, getRecentTrades } from '@1xp-ai/coinone-skill';

const orderbook = await getOrderbook('BTC');
const trades = await getRecentTrades('BTC');
const result = analyzeSnapshot('BTC', orderbook, trades);

return `MPI: ${result.MPI.toFixed(2)} (${result.MPI > 0 ? 'Bullish' : 'Bearish'})
Liquidity: ${result.liquidityScore}/100`;
```

---

## WebSocket Streaming

```typescript
import { createWebSocketClient } from '@1xp-ai/coinone-skill';

const ws = createWebSocketClient({ reconnect: true });

ws.on('message', (msg) => {
  if (msg.channel === 'ticker') {
    console.log(`${msg.target_currency}: ${msg.last}`);
  }
});

ws.subscribe('ticker', ['BTC', 'ETH']);
ws.connect();
```

---

## Order Validation

```typescript
import { validateOrderAuto } from '@1xp-ai/coinone-skill';

const validation = await validateOrderAuto('BTC', 50000000, 0.001);

if (!validation.valid) {
  console.error('Invalid order:', validation.errors);
} else {
  console.log('Order OK');
  console.log('Adjusted price:', validation.adjustedPrice);
  console.log('Adjusted qty:', validation.adjustedQty);
}
```

---

## CLI Usage

```bash
# Public commands (no API key)
coinone-skill ticker BTC
coinone-skill tickers
coinone-skill orderbook ETH
coinone-skill analyze BTC

# Private commands (API key required)
coinone-skill auth-test
coinone-skill balance
coinone-skill orders
coinone-skill fee
```

---

_Last updated: 2026-02-03_
