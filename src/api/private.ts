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
  error_code?: string;
  errorCode?: string;
  order_id?: string;
}

export interface AllBalancesResponse {
  result: string;
  balances: Array<{ currency: string; avail: string; balance: string }>;
}

export interface TradeFeeResponse {
  result: string;
  maker_fee: string;
  taker_fee: string;
}

export interface ActiveOrdersResponse {
  result: string;
  active_orders: Array<{ order_id: string; side: string; price: string; qty: string }>;
}

export interface KRWHistoryResponse {
  result: string;
  transactions: Array<{ type: string; amount: string; timestamp: number }>;
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

function getErrorCode(data: Record<string, unknown>): string {
  const errorCode = data.error_code ?? data.errorCode ?? data.error_code;
  return typeof errorCode === 'string' ? errorCode : 'UNKNOWN';
}

async function parseJson(response: Response): Promise<Record<string, unknown>> {
  const data = (await response.json()) as Record<string, unknown>;
  if (data?.result && data.result !== 'success') {
    throw new Error(`API Error: ${getErrorCode(data)}`);
  }
  return data;
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

  const data = (await parseJson(response)) as Record<string, Balance>;

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

  return (await parseJson(response)) as unknown as OrderResponse;
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

  return (await parseJson(response)) as unknown as OrderResponse;
}

/**
 * Get all balances
 */
export async function getAllBalances(
  credentials: CoinoneCredentials
): Promise<AllBalancesResponse> {
  const payload = {};
  const headers = createAuthHeaders(payload, credentials);

  const response = await fetch(`${BASE_URL}/v2.1/account/balance`, {
    method: 'POST',
    headers
  });

  return (await parseJson(response)) as unknown as AllBalancesResponse;
}

/**
 * Get trading fees
 */
export async function getTradeFee(credentials: CoinoneCredentials): Promise<TradeFeeResponse> {
  const payload = {};
  const headers = createAuthHeaders(payload, credentials);

  const response = await fetch(`${BASE_URL}/v2.1/account/fee`, {
    method: 'POST',
    headers
  });

  return (await parseJson(response)) as unknown as TradeFeeResponse;
}

/**
 * Get active orders
 */
export async function getActiveOrders(
  quoteCurrency: string,
  targetCurrency: string,
  credentials: CoinoneCredentials
): Promise<ActiveOrdersResponse> {
  const payload = {
    quote_currency: quoteCurrency,
    target_currency: targetCurrency
  };
  const headers = createAuthHeaders(payload, credentials);

  const response = await fetch(`${BASE_URL}/v2.1/order/active_orders`, {
    method: 'POST',
    headers
  });

  return (await parseJson(response)) as unknown as ActiveOrdersResponse;
}

/**
 * Get KRW deposit/withdrawal history
 */
export async function getKRWHistory(
  fromTs: number,
  toTs: number,
  credentials: CoinoneCredentials
): Promise<KRWHistoryResponse> {
  const payload = {
    from_ts: fromTs,
    to_ts: toTs
  };
  const headers = createAuthHeaders(payload, credentials);

  const response = await fetch(`${BASE_URL}/v2.1/krw/history`, {
    method: 'POST',
    headers
  });

  return (await parseJson(response)) as unknown as KRWHistoryResponse;
}

// ============ Phase 6 Medium Priority APIs ============

// Open Orders (unfilled orders)
export interface OpenOrder {
  order_id: string;
  target_currency: string;
  quote_currency: string;
  side: 'buy' | 'sell';
  type: 'limit' | 'market';
  price: string;
  original_qty: string;
  remaining_qty: string;
  executed_qty: string;
  timestamp: number;
}

export interface OpenOrdersResponse {
  result: string;
  error_code?: string;
  open_orders: OpenOrder[];
}

export async function getOpenOrders(
  credentials: CoinoneCredentials,
  targetCurrency?: string,
  quoteCurrency = 'KRW'
): Promise<OpenOrder[]> {
  const payload: Record<string, unknown> = { quote_currency: quoteCurrency };
  if (targetCurrency) payload.target_currency = targetCurrency;
  
  const headers = createAuthHeaders(payload, credentials);
  const response = await fetch(`${BASE_URL}/v2.1/order/open_orders`, {
    method: 'POST',
    headers
  });
  
  const data = await parseJson(response) as unknown as OpenOrdersResponse;
  if (data.result !== 'success') {
    throw new Error(`API Error: ${getErrorCode(data as unknown as Record<string, unknown>)}`);
  }
  return data.open_orders;
}

// Completed Orders
export interface CompletedOrder {
  order_id: string;
  target_currency: string;
  quote_currency: string;
  side: 'buy' | 'sell';
  type: 'limit' | 'market';
  price: string;
  original_qty: string;
  executed_qty: string;
  fee: string;
  timestamp: number;
  completed_at: number;
}

export interface CompletedOrdersResponse {
  result: string;
  error_code?: string;
  completed_orders: CompletedOrder[];
}

export async function getCompletedOrders(
  credentials: CoinoneCredentials,
  targetCurrency?: string,
  quoteCurrency = 'KRW',
  limit = 20
): Promise<CompletedOrder[]> {
  const payload: Record<string, unknown> = { quote_currency: quoteCurrency, limit };
  if (targetCurrency) payload.target_currency = targetCurrency;
  
  const headers = createAuthHeaders(payload, credentials);
  const response = await fetch(`${BASE_URL}/v2.1/order/completed_orders`, {
    method: 'POST',
    headers
  });
  
  const data = await parseJson(response) as unknown as CompletedOrdersResponse;
  if (data.result !== 'success') {
    throw new Error(`API Error: ${getErrorCode(data as unknown as Record<string, unknown>)}`);
  }
  return data.completed_orders;
}

// Order Detail
export interface OrderDetail {
  order_id: string;
  target_currency: string;
  quote_currency: string;
  side: 'buy' | 'sell';
  type: 'limit' | 'market';
  price: string;
  original_qty: string;
  remaining_qty: string;
  executed_qty: string;
  status: 'open' | 'filled' | 'canceled' | 'partial_filled';
  fee: string;
  timestamp: number;
}

export interface OrderDetailResponse {
  result: string;
  error_code?: string;
  order: OrderDetail;
}

export async function getOrderDetail(
  credentials: CoinoneCredentials,
  orderId: string,
  targetCurrency: string,
  quoteCurrency = 'KRW'
): Promise<OrderDetail> {
  const payload = {
    order_id: orderId,
    target_currency: targetCurrency,
    quote_currency: quoteCurrency
  };
  
  const headers = createAuthHeaders(payload, credentials);
  const response = await fetch(`${BASE_URL}/v2.1/order/detail`, {
    method: 'POST',
    headers
  });
  
  const data = await parseJson(response) as unknown as OrderDetailResponse;
  if (data.result !== 'success') {
    throw new Error(`API Error: ${getErrorCode(data as unknown as Record<string, unknown>)}`);
  }
  return data.order;
}

// User Info
export interface UserInfo {
  user_id: string;
  email: string;
  mobile: string;
  level: number;
  security_level: number;
}

export interface UserInfoResponse {
  result: string;
  error_code?: string;
  user_info: UserInfo;
}

export async function getUserInfo(credentials: CoinoneCredentials): Promise<UserInfo> {
  const payload = {};
  const headers = createAuthHeaders(payload, credentials);
  const response = await fetch(`${BASE_URL}/v2/user/info`, {
    method: 'POST',
    headers
  });
  
  const data = await parseJson(response) as unknown as UserInfoResponse;
  if (data.result !== 'success') {
    throw new Error(`API Error: ${getErrorCode(data as unknown as Record<string, unknown>)}`);
  }
  return data.user_info;
}

// Virtual Account (KRW deposit)
export interface VirtualAccount {
  bank_name: string;
  account_number: string;
  account_holder: string;
}

export interface VirtualAccountResponse {
  result: string;
  error_code?: string;
  virtual_account: VirtualAccount;
}

export async function getVirtualAccount(credentials: CoinoneCredentials): Promise<VirtualAccount> {
  const payload = {};
  const headers = createAuthHeaders(payload, credentials);
  const response = await fetch(`${BASE_URL}/v2/account/virtual_account`, {
    method: 'POST',
    headers
  });
  
  const data = await parseJson(response) as unknown as VirtualAccountResponse;
  if (data.result !== 'success') {
    throw new Error(`API Error: ${getErrorCode(data as unknown as Record<string, unknown>)}`);
  }
  return data.virtual_account;
}

// Deposit Address (Crypto)
export interface DepositAddress {
  currency: string;
  address: string;
  memo?: string;
}

export interface DepositAddressResponse {
  result: string;
  error_code?: string;
  deposit_address: DepositAddress;
}

export async function getDepositAddress(
  credentials: CoinoneCredentials,
  currency: string
): Promise<DepositAddress> {
  const payload = { currency };
  const headers = createAuthHeaders(payload, credentials);
  const response = await fetch(`${BASE_URL}/v2/account/deposit_address`, {
    method: 'POST',
    headers
  });
  
  const data = await parseJson(response) as unknown as DepositAddressResponse;
  if (data.result !== 'success') {
    throw new Error(`API Error: ${getErrorCode(data as unknown as Record<string, unknown>)}`);
  }
  return data.deposit_address;
}
