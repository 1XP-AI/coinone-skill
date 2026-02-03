---
name: coinone-trading-assistant
version: 1.0.0
description: AI Trading Assistant for Coinone. Market analysis, balance tracking, and situational order execution.
homepage: https://github.com/1XP-AI/coinone-skill
metadata: {"openclaw":{"emoji":"💼","category":"finance","api_base":"https://api.coinone.co.kr"}}
---

# Coinone Trading Assistant

Your intelligent partner for optimal trading on Coinone. This skill goes beyond simple API calls, providing situational analysis to minimize slippage and manage risk.

## Skill Files

| File | Description |
|------|-------------|
| **SKILL.md** | Main instructions and API reference. |
| **TASKS.md** | Current development status and roadmap. |
| **RULES.md** | Project guidelines and standards. |
| **API.md** | Full Coinone API endpoint mapping. |

## 🚀 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/1XP-AI/coinone-skill.git
cd coinone-skill
npm install
```

### 2. Configuration
Set your Coinone API credentials in your environment or a secure config file:
- `COINONE_ACCESS_TOKEN`
- `COINONE_SECRET_KEY`

## 📊 Core Features

### Market Analysis
Analyze orderbook depth and spreads before placing orders.
- `analyzeMarket(quote, target)`: Returns depth analysis and spread.

### Smart Execution
Place orders based on real-time situational data.
- `executeOptimalOrder(side, amount, strategy)`: Handles slippage and partial fills.

### Risk Management
Built-in safety rails to prevent catastrophic errors.
- Balance validation before every order.
- Maximum slippage thresholds.

## 🛠️ Usage Examples

### Check Balance
"How much KRW do I have left on Coinone?"

### Optimal Buy
"Buy 1 BTC but keep the slippage under 0.5%."

## 🔒 Security
- API keys are handled locally.
- HMAC-SHA512 signatures are calculated for every private request.
- Nonce management (UUID v4) prevents replay attacks.

---
_Built with ❤️ by the 1XP-AI Team_
