# Coinone API Reference (Updated)

## Base URL
```
https://api.coinone.co.kr
```

## Public API V2 (No Auth Required)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/public/v2/range_units/{quote}/{target}` | GET | Get tick size units |
| `/public/v2/markets/{quote}` | GET | List all markets for a quote currency |
| `/public/v2/market/{quote}/{target}` | GET | Get specific market information |
| `/public/v2/orderbook/{quote}/{target}` | GET | Get orderbook (depth) |
| `/public/v2/recent_completed_orders/{quote}/{target}` | GET | Get recent trades |
| `/public/v2/ticker_new/{quote}` | GET | Get all tickers for a quote currency |
| `/public/v2/ticker_new/{quote}/{target}` | GET | Get single ticker |
| `/public/v2/ticker_utc/{quote}` | GET | Get all tickers (UTC time) |
| `/public/v2/ticker_utc/{quote}/{target}` | GET | Get single ticker (UTC time) |
| `/public/v2/currencies` | GET | List all supported currencies |
| `/public/v2/currencies/{symbol}` | GET | Get currency details |
| `/public/v2/chart/{quote}/{target}` | GET | Get OHLCV candle data |

---

## Private API V2.1 (Auth Required)

### Authentication
Headers:
- `X-COINONE-PAYLOAD`: Base64(JSON.stringify(payload))
- `X-COINONE-SIGNATURE`: HMAC-SHA512(payload, secret_key)

Required in Payload:
- `access_token`: API Token
- `nonce`: UUID v4

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/v2.1/account/balance/all` | POST | Get all asset balances |
| `/v2.1/account/trade_fee` | POST | Get trading fees |
| `/v2.1/order` | POST | Place LIMIT, MARKET, or STOP_LIMIT order |
| `/v2.1/order/cancel` | POST | Cancel an order |
| `/v2.1/order/active_orders` | POST | List active (open) orders |
| `/v2.1/transaction/krw/history` | POST | KRW deposit/withdrawal history |
| `/v2.1/transaction/coin/withdrawal` | POST | Withdraw coins |

---

## Coverage Priorities (Gap vs Coinone API)

### High Priority
- Public metadata: `/public/v2/markets`, `/public/v2/market`, `/public/v2/currencies`, `/public/v2/currency`, `/public/v2/range_units`
- Recent trades + chart: `/public/v2/trades`, `/public/v2/chart`
- Ticker expansion: `/public/v2/ticker_new` (all), `/public/v2/ticker` (single), optional `/public/v2/utc_ticker(s)`

### Medium Priority
- Order state/history: `/v2.1/order/active_orders`, `/v2.1/order/open_orders`, `/v2.1/order/completed_orders`, `/v2.1/order/detail`, `/v2.1/order/info`
- Fees: `/v2.1/account/trade_fee`, `/v2.1/account/trade_fee/{pair}`
- Account/deposit info: `/v2/user/info`, `/v2/account/virtual_account`, `/v2/account/deposit_address`

### Low / Advanced
- KRW/Coin deposit & withdrawal history
- Withdrawal address book / limits / execution
- Reward APIs: `/v2.1/order/reward/*`
- Websocket: public (orderbook/ticker/trade/chart), private (myorder/myasset)

---

## Websocket (Stream)
- **Base URL**: `wss://stream.coinone.co.kr` (To be confirmed)
- **Channels**: ticker, orderbook, trades

---

## Error Codes
| Code | Description |
|------|-------------|
| 0 | Success |
| 4001 | Invalid parameter |
| 4002 | Invalid access token |
| 4003 | Invalid nonce |

_Reference: https://docs.coinone.co.kr_
