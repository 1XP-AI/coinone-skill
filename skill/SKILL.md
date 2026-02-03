---
name: coinone-trading-assistant
version: 1.0.0
description: AI Trading Assistant for Coinone. Market analysis, balance tracking, and situational order execution.
homepage: https://1xp-ai.github.io/coinone-skill/
repository: https://github.com/1XP-AI/coinone-skill
npm: https://www.npmjs.com/package/@1xp-ai/coinone-skill
metadata: {"openclaw":{"emoji":"💼","category":"finance","api_base":"https://api.coinone.co.kr"}}
---

# Coinone Trading Assistant

Your intelligent partner for optimal trading on Coinone. This skill goes beyond simple API wrappers, providing situational analysis to minimize slippage and manage risk.

## 📦 Installation

```bash
npm install @1xp-ai/coinone-skill
```

## 🔧 Configuration

Set your Coinone API credentials as environment variables:

```bash
export COINONE_ACCESS_TOKEN="your-access-token"
export COINONE_SECRET_KEY="your-secret-key"
```

## 🚀 Quick Start

```typescript
import { 
  getTicker, 
  getOrderbook, 
  analyzeMarket, 
  calculateSlippage,
  recommendOrderType,
  getBalance,
  placeOrder
} from '@1xp-ai/coinone-skill';

// 1. Check current price
const ticker = await getTicker('BTC');
console.log(`BTC Price: ${ticker.last} KRW`);

// 2. Analyze market conditions
const orderbook = await getOrderbook('BTC');
const analysis = analyzeMarket(orderbook);

console.log(`Spread: ${analysis.spreadPercent?.toFixed(2)}%`);
console.log(`Bid Depth: ${analysis.bidDepth} BTC`);
console.log(`Ask Depth: ${analysis.askDepth} BTC`);
console.log(`Imbalance: ${analysis.imbalance?.toFixed(2)}`);

// 3. Calculate slippage for your order size
const slippage = calculateSlippage(orderbook.asks, 0.5);
console.log(`Expected slippage: ${slippage.slippagePercent.toFixed(2)}%`);

// 4. Get order type recommendation
const orderType = recommendOrderType(analysis.spreadPercent!, 0.5);
console.log(`Recommended: ${orderType}`);
```

## ✨ Core Features

### 📊 Market Analysis
| Function | Description |
|----------|-------------|
| `getTicker(currency)` | Get current price info |
| `getAllTickers()` | Get all market tickers |
| `getOrderbook(currency)` | Get orderbook depth |
| `analyzeMarket(orderbook)` | Analyze spread, depth, imbalance |

### 🎯 Smart Order Execution
| Function | Description |
|----------|-------------|
| `calculateSlippage(levels, qty)` | Estimate execution slippage |
| `recommendOrderType(spread, threshold)` | LIMIT vs MARKET recommendation |
| `splitOrder(qty, maxSize)` | Split large orders |

### 🛡️ Risk Management
| Function | Description |
|----------|-------------|
| `checkRisk(params)` | Validate balance & min order |
| `maxBuyableQty(krw, price)` | Calculate max purchasable amount |

### 💰 Account Management
| Function | Description |
|----------|-------------|
| `getBalance(credentials)` | Get all balances |
| `placeOrder(order, credentials)` | Execute buy/sell order |
| `cancelOrder(orderId, credentials)` | Cancel pending order |

## 🤖 AI Agent Usage Examples

### "What's the current BTC price?"
```typescript
const ticker = await getTicker('BTC');
return `BTC is currently ${Number(ticker.last).toLocaleString()} KRW`;
```

### "Check my balance"
```typescript
const balance = await getBalance(credentials);
return `You have ${balance.krw.avail} KRW available`;
```

### "Should I use LIMIT or MARKET order?"
```typescript
const orderbook = await getOrderbook('BTC');
const analysis = analyzeMarket(orderbook);
const recommendation = recommendOrderType(analysis.spreadPercent!, 0.5);
return `With ${analysis.spreadPercent?.toFixed(2)}% spread, I recommend ${recommendation}`;
```

### "Buy 0.1 BTC with slippage check"
```typescript
const orderbook = await getOrderbook('BTC');
const slippage = calculateSlippage(orderbook.asks, 0.1);

if (slippage.slippagePercent > 0.5) {
  return `Warning: Slippage would be ${slippage.slippagePercent.toFixed(2)}%`;
}

const order = await placeOrder({
  side: 'BUY',
  targetCurrency: 'BTC',
  quoteCurrency: 'KRW',
  type: 'LIMIT',
  price: orderbook.asks[0].price,
  qty: '0.1'
}, credentials);

return `Order placed: ${order.order_id}`;
```

## 🔒 Security

- **Local key handling**: API keys never leave your environment
- **HMAC-SHA512**: All private requests are cryptographically signed
- **Nonce protection**: UUID v4 prevents replay attacks
- **No key storage**: Credentials passed per-request, never cached

## ⚠️ Safety Guidelines

1. **Always check balance** before placing orders
2. **Use slippage calculation** for large orders
3. **Prefer LIMIT orders** when spread is wide (>0.5%)
4. **Split large orders** to minimize market impact
5. **Never share API keys** in chat or logs

## 📚 Links

- [npm Package](https://www.npmjs.com/package/@1xp-ai/coinone-skill)
- [GitHub Repository](https://github.com/1XP-AI/coinone-skill)
- [API Documentation](https://github.com/1XP-AI/coinone-skill/blob/main/docs/API.md)

---

_Built with ❤️ by the 1XP-AI Team_
