# Coinone API Reference

## Base URL
```
https://api.coinone.co.kr
```

## Public API (No Auth Required)

### Get Single Ticker
```
GET /public/v2/ticker_new/{quote_currency}/{target_currency}
```
**Example**: `GET /public/v2/ticker_new/KRW/BTC`

**Response**:
```json
{
  "result": "success",
  "tickers": [{
    "quote_currency": "KRW",
    "target_currency": "BTC",
    "last": "50000000",
    "high": "51000000",
    "low": "49000000",
    "quote_volume": "1000000000",
    "target_volume": "20.5"
  }]
}
```

### Get All Tickers
```
GET /public/v2/ticker_new/{quote_currency}
```
**Example**: `GET /public/v2/ticker_new/KRW`

### Get Orderbook
```
GET /public/v2/orderbook/{quote_currency}/{target_currency}?size={5|10|15|16}
```
**Example**: `GET /public/v2/orderbook/KRW/BTC?size=15`

**Response**:
```json
{
  "result": "success",
  "bids": [{"price": "49900000", "qty": "1.5"}],
  "asks": [{"price": "50100000", "qty": "2.0"}]
}
```

---

## Private API (Auth Required)

### Authentication
All private API requests require:
- `X-COINONE-PAYLOAD`: Base64 encoded JSON payload
- `X-COINONE-SIGNATURE`: HMAC-SHA512(payload, secret_key)

**Payload must include**:
- `access_token`: Your API access token
- `nonce`: UUID v4 (unique per request)

### Get Balance
```
POST /v2/account/balance
```

### Place Order
```
POST /v2.1/order
```

**Payload**:
```json
{
  "access_token": "...",
  "nonce": "uuid-v4",
  "side": "BUY|SELL",
  "quote_currency": "KRW",
  "target_currency": "BTC",
  "type": "LIMIT|MARKET|STOP_LIMIT",
  "price": "50000000",
  "qty": "0.1"
}
```

### Cancel Order
```
POST /v2.1/order/cancel
```

**Payload**:
```json
{
  "access_token": "...",
  "nonce": "uuid-v4",
  "order_id": "uuid",
  "quote_currency": "KRW",
  "target_currency": "BTC"
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 0 | Success |
| 4001 | Invalid parameter |
| 4002 | Invalid access token |
| 4003 | Invalid nonce |

---

_Reference: https://docs.coinone.co.kr_
