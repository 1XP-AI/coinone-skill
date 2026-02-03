# @1xp-ai/coinone-skill

[![npm version](https://img.shields.io/npm/v/@1xp-ai/coinone-skill.svg)](https://www.npmjs.com/package/@1xp-ai/coinone-skill)
[![npm downloads](https://img.shields.io/npm/dm/@1xp-ai/coinone-skill.svg)](https://www.npmjs.com/package/@1xp-ai/coinone-skill)
[![Coverage](https://img.shields.io/badge/Coverage-90%25-brightgreen.svg)](https://github.com/1XP-AI/coinone-skill)
[![Tests](https://github.com/1XP-AI/coinone-skill/actions/workflows/ci.yml/badge.svg)](https://github.com/1XP-AI/coinone-skill/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

> 🤖 AI Trading Assistant for Coinone Exchange

An intelligent trading skill that goes beyond simple API wrappers. Provides situational analysis, slippage calculation, and risk management for optimal trade execution.

## 📦 Installation

```bash
npm install @1xp-ai/coinone-skill
```

## 🚀 Quick Start

```typescript
import { 
  getTicker, 
  getOrderbook, 
  analyzeMarket, 
  calculateSlippage,
  recommendOrderType 
} from '@1xp-ai/coinone-skill';

// Get current BTC price
const ticker = await getTicker('BTC');
console.log(`BTC/KRW: ${ticker.last}`);

// Analyze market conditions
const orderbook = await getOrderbook('BTC');
const analysis = analyzeMarket(orderbook);

console.log(`Spread: ${analysis.spreadPercent?.toFixed(2)}%`);
console.log(`Market Imbalance: ${analysis.imbalance?.toFixed(2)}`);

// Get order recommendation
const orderType = recommendOrderType(analysis.spreadPercent!, 0.5);
console.log(`Recommended: ${orderType} order`);
```

## ✨ Features

### 📊 Market Analysis
- Real-time ticker, orderbook, and trade data
- Spread/depth/imbalance metrics
- OHLCV chart data

### 🎯 Smart Order Execution
- Slippage calculation before order
- Order type recommendation (LIMIT vs MARKET)
- Large order splitting

### 🛡️ Risk Management
- Balance/limits validation
- Minimum order checks
- Slippage threshold warnings


- Public WS client with auto-reconnect

### 📄 Error Codes
- Error code reference included in `skill/ERROR_CODES.md`

## 📖 API Reference (Summary)

> **Quote currency defaults to `KRW`** unless specified.

### Public API (No auth required)

| Function | Description |
|----------|-------------|
| `getTicker(target, quote?)` | Get current price |
| `getAllTickers(quote?)` | Get all market tickers |
| `getOrderbook(target, quote?, size?)` | Orderbook depth |
| `getRecentTrades(target, quote?)` | Recent trades |
| `getChart(target, quote?, interval?)` | OHLCV chart data |
| `getMarkets(quote?)` | Markets list |
| `getMarketInfo(target, quote?)` | Single market info |
| `getCurrencies()` | Supported currencies |
| `getRangeUnits(quote?)` | Tick/qty units |
| `getUTCTicker(target, quote?)` | UTC ticker (single) |
| `getAllUTCTickers(quote?)` | UTC tickers (all) |

### Private API (Auth required)

| Function | Description |
|----------|-------------|
| `getBalance(credentials)` | Account balances |
| `placeOrder(order, credentials)` | Place buy/sell order |
| `cancelOrder(orderId, credentials)` | Cancel an order |
| `getOpenOrders(quote, target, credentials)` | Open orders |
| `getCompletedOrders(quote, target, credentials)` | Completed orders |

### Trading & Analyzer

| Function | Description |
|----------|-------------|
| `analyzeMarket(orderbook)` | Market conditions |
| `calculateSlippage(levels, qty)` | Expected slippage |
| `recommendOrderType(spread, threshold)` | LIMIT/MARKET recommendation |
| `checkRisk(params)` | Risk validation |
| `splitOrder(qty, maxSize)` | Split large orders |
| `analyzeSnapshot(symbol, orderbook, trades)` | Advanced microstructure metrics |

## 🔐 Authentication

**Timezone:** All time fields/examples use **KST (Asia/Seoul)** unless noted.


```typescript
import { getBalance, placeOrder } from '@1xp-ai/coinone-skill';

const credentials = {
  accessToken: process.env.COINONE_ACCESS_TOKEN!,
  secretKey: process.env.COINONE_SECRET_KEY!
};

const balance = await getBalance(credentials);
```

## 🧪 Testing

```bash
# Run all tests
npm test

# With coverage
npm run coverage
```

**Coverage:** 94.62% statements ✅

## 📁 Project Structure

```
coinone-skill/
├── src/
│   ├── api/
│   │   ├── public.ts    # Public API endpoints
│   │   └── private.ts   # Authenticated endpoints
│   ├── trading.ts       # Trading logic & analysis
│   └── index.ts         # Main exports
├── skill/               # Skill documentation (GitHub Pages)
│   ├── SKILL.md
│   ├── SECURITY.md
│   ├── HEARTBEAT.md
│   └── package.json
└── docs/                # Internal documentation
    ├── API.md
    ├── VERSIONING.md
    └── TASKS.md
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feat/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature (bumps minor version)
- `fix:` Bug fix (bumps patch version)
- `feat!:` / `BREAKING CHANGE:` Breaking change (bumps major version)
- `docs:` Documentation only
- `chore:` Maintenance

## 📄 License

MIT © [1XP-AI](https://github.com/1XP-AI)

## 🔗 Links

- [📘 Skill Documentation](https://1xp-ai.github.io/coinone-skill/)
- [📦 npm Package](https://www.npmjs.com/package/@1xp-ai/coinone-skill)
- [🐛 Issues](https://github.com/1XP-AI/coinone-skill/issues)

---

Built with ❤️ by the 1XP-AI Team
