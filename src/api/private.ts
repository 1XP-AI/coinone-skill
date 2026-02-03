/**
 * Coinone Private API
 * Account, balance, order management
 */

import { createHmac } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = 'https://api.coinone.co.kr';

export interface CoinoneCredentials {
  accessToken: string;
  secretKey: string;
}

export interface Balance {
  avail: string;
  balance: string;
}

export interface OrderRequest {
  side: 'BUY' | 'SELL';
  quoteCurrency: string;
  targetCurrency: string;
  type: 'LIMIT' | 'MARKET' | 'STOP_LIMIT';
  price?: string;
  qty?: string;
  amount?: string;
  postOnly?: boolean;
  triggerPrice?: string;
}

export interface OrderResponse {
  result: string;
  error_code: string;
  order_id: string;
}

/**
 * Create authenticated request headers
 */
function createAuthHeaders(
  payload: Record<string, unknown>,
  credentials: CoinoneCredentials
): { 'X-COINONE-PAYLOAD': string; 'X-COINONE-SIGNATURE': string; 'Content-type': string } {
  const payloadWithNonce = {
    ...payload,
    access_token: credentials.accessToken,
    nonce: uuidv4()
  };
  
  const encodedPayload = Buffer.from(JSON.stringify(payloadWithNonce)).toString('base64');
  const signature = createHmac('sha512', credentials.secretKey)
    .update(encodedPayload)
    .digest('hex');
  
  return {
    'Content-type': 'application/json',
    'X-COINONE-PAYLOAD': encodedPayload,
    'X-COINONE-SIGNATURE': signature
  };
}

/**
 * Get account balance
 */
export async function getBalance(credentials: CoinoneCredentials): Promise<Record<string, Balance>> {
  const payload = {};
  const headers = createAuthHeaders(payload, credentials);
  
  const response = await fetch(`${BASE_URL}/v2/account/balance`, {
    method: 'POST',
    headers
  });
  
  const data = await response.json();
  
  if (data.result !== 'success') {
    throw new Error(`API Error: ${data.errorCode}`);
  }
  
  return data;
}

/**
 * Place an order
 */
export async function placeOrder(
  order: OrderRequest,
  credentials: CoinoneCredentials
): Promise<OrderResponse> {
  const payload: Record<string, unknown> = {
    side: order.side,
    quote_currency: order.quoteCurrency,
    target_currency: order.targetCurrency,
    type: order.type
  };
  
  if (order.price) payload.price = order.price;
  if (order.qty) payload.qty = order.qty;
  if (order.amount) payload.amount = order.amount;
  if (order.postOnly !== undefined) payload.post_only = order.postOnly;
  if (order.triggerPrice) payload.trigger_price = order.triggerPrice;
  
  const headers = createAuthHeaders(payload, credentials);
  
  const response = await fetch(`${BASE_URL}/v2.1/order`, {
    method: 'POST',
    headers
  });
  
  return response.json();
}

/**
 * Cancel an order
 */
export async function cancelOrder(
  orderId: string,
  quoteCurrency: string,
  targetCurrency: string,
  credentials: CoinoneCredentials
): Promise<OrderResponse> {
  const payload = {
    order_id: orderId,
    quote_currency: quoteCurrency,
    target_currency: targetCurrency
  };
  
  const headers = createAuthHeaders(payload, credentials);
  
  const response = await fetch(`${BASE_URL}/v2.1/order/cancel`, {
    method: 'POST',
    headers
  });
  
  return response.json();
}
