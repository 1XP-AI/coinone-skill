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
  getAllBalances,
  getTradeFee,
  getActiveOrders,
  getOpenOrders,
  getCompletedOrders,
  getOrderDetail,
  getKRWHistory,
  getUserInfo,
  getVirtualAccount,
  getDepositAddress,
  placeOrder,
  cancelOrder,
  type CoinoneCredentials,
  type Balance,
  type OrderRequest,
  type OrderResponse,
  type OpenOrder,
  type CompletedOrder,
  type OrderDetail,
  type UserInfo,
  type VirtualAccount,
  type DepositAddress
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

// Analyzer
export {
  calculateOBI,
  calculateWOBI,
  calculateSpread,
  calculateLiquiditySlope,
  classifyTradeFlow,
  calculateVWAP,
  calculateVWAPDrift,
  detectTradeBurst,
  computeMarketPressureIndex,
  computeLiquidityScore,
  analyzeSnapshot,
  type OrderbookSnapshot,
  type Trade,
  type AnalysisResult
} from './analyzer.js';

// Validation
export {
  getValidationRules,
  roundToTickSize,
  validateOrder,
  validateOrderAuto,
  preCheckOrder,
  type OrderValidation,
  type ValidationRules
} from './validation.js';
