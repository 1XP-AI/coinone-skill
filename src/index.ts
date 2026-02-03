/**
 * Coinone Trading Assistant Skill
 * AI-powered trading assistant for Coinone exchange
 */

// Public API
export {
  getTicker,
  getAllTickers,
  getOrderbook,
  getMarkets,
  getRecentTrades,
  getCurrencies,
  getChart,
  type Ticker,
  type OrderbookEntry,
  type Orderbook,
  type Market,
  type RecentTrade,
  type Currency,
  type ChartData
} from './api/public.js';

// Private API
export {
  getBalance,
  placeOrder,
  cancelOrder,
  type CoinoneCredentials,
  type Balance,
  type OrderRequest,
  type OrderResponse
} from './api/private.js';

// Trading Logic
export {
  analyzeMarket,
  calculateSlippage,
  recommendOrderType,
  splitOrder,
  checkRisk,
  maxBuyableQty,
  type OrderbookLevel,
  type Orderbook as TradingOrderbook,
  type MarketAnalysis,
  type SlippageResult,
  type OrderType,
  type RiskCheckInput
} from './trading.js';
