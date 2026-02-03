/**
 * Coinone Public API
 * Market data, orderbook, ticker information
 */

const BASE_URL = 'https://api.coinone.co.kr';
const USER_AGENT = 'coinone-skill';

function fetchWithUA(url: string, init?: RequestInit): Promise<Response> {
  return globalThis.fetch(url, {
    ...init,
    headers: {
      'User-Agent': USER_AGENT,
      ...(init?.headers ?? {})
    }
  });
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

export interface Ticker {
  quote_currency: string;
  target_currency: string;
  timestamp: number;
  high: string;
  low: string;
  first: string;
  last: string;
  quote_volume: string;
  target_volume: string;
}

export interface OrderbookEntry {
  price: string;
  qty: string;
}

export interface Orderbook {
  timestamp: number;
  quote_currency: string;
  target_currency: string;
  bids: OrderbookEntry[];
  asks: OrderbookEntry[];
}

/**
 * Fetch ticker for a specific coin
 */
export async function getTicker(targetCurrency: string, quoteCurrency = 'KRW'): Promise<Ticker> {
  const url = `${BASE_URL}/public/v2/ticker_new/${quoteCurrency}/${targetCurrency}`;
  const response = await fetchWithUA(url);
  const data = (await parseJson(response)) as { tickers: Ticker[] };

  return data.tickers[0];
}

/**
 * Fetch all tickers for a market
 */
export async function getAllTickers(quoteCurrency = 'KRW'): Promise<Ticker[]> {
  const url = `${BASE_URL}/public/v2/ticker_new/${quoteCurrency}`;
  const response = await fetchWithUA(url);
  const data = (await parseJson(response)) as { tickers: Ticker[] };

  return data.tickers;
}

/**
 * Fetch orderbook for a specific coin
 */
export async function getOrderbook(
  targetCurrency: string,
  quoteCurrency = 'KRW',
  size: 5 | 10 | 15 | 16 = 15
): Promise<Orderbook> {
  const url = `${BASE_URL}/public/v2/orderbook/${quoteCurrency}/${targetCurrency}?size=${size}`;
  const response = await fetchWithUA(url);
  const data = (await parseJson(response)) as unknown as Orderbook;

  return data;
}

// Markets
export interface Market {
  quote_currency: string;
  target_currency: string;
  price_unit: string;
  qty_unit: string;
  min_order_amount: string;
  max_order_amount: string;
  maintenance_status: number;
}

export async function getMarkets(quoteCurrency = 'KRW'): Promise<Market[]> {
  const response = await fetchWithUA(`https://api.coinone.co.kr/public/v2/markets/${quoteCurrency}`);
  const data = (await parseJson(response)) as { markets: Market[] };

  return data.markets;
}

// Recent Trades
export interface RecentTrade {
  timestamp: number;
  price: string;
  qty: string;
  is_seller_maker: boolean;
}

export async function getRecentTrades(targetCurrency: string, quoteCurrency = 'KRW'): Promise<RecentTrade[]> {
  const response = await fetchWithUA(`https://api.coinone.co.kr/public/v2/trades/${quoteCurrency}/${targetCurrency}`);
  const data = (await parseJson(response)) as { transactions: RecentTrade[] };

  return data.transactions;
}

// Currencies
export interface Currency {
  currency: string;
  name: string;
  deposit_status: number;
  withdraw_status: number;
}

export async function getCurrencies(): Promise<Currency[]> {
  const response = await fetchWithUA('https://api.coinone.co.kr/public/v2/currencies');
  const data = (await parseJson(response)) as { currencies: Currency[] };

  return data.currencies;
}

// Chart (Candlestick)
export interface ChartData {
  timestamp: number;
  open: string;
  high: string;
  low: string;
  close: string;
  target_volume: string;
  quote_volume: string;
}

export async function getChart(
  targetCurrency: string, 
  quoteCurrency = 'KRW',
  interval = '1h'
): Promise<ChartData[]> {
  const response = await fetchWithUA(
    `https://api.coinone.co.kr/public/v2/chart/${quoteCurrency}/${targetCurrency}?interval=${interval}`
  );
  const data = (await parseJson(response)) as { chart: ChartData[] };

  return data.chart;
}
