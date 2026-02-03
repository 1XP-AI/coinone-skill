/**
 * Coinone WebSocket Client
 * Real-time market data streaming
 */

export type WebSocketChannel = 'ticker' | 'orderbook' | 'trades' | 'chart';

export interface WebSocketConfig {
  url?: string;
  reconnect?: boolean;
  reconnectInterval?: number;
}

export interface TickerMessage {
  channel: 'ticker';
  target_currency: string;
  quote_currency: string;
  last: string;
  high: string;
  low: string;
  volume: string;
  timestamp: number;
}

export interface OrderbookMessage {
  channel: 'orderbook';
  target_currency: string;
  quote_currency: string;
  bids: Array<{ price: string; qty: string }>;
  asks: Array<{ price: string; qty: string }>;
  timestamp: number;
}

export interface TradeMessage {
  channel: 'trades';
  target_currency: string;
  quote_currency: string;
  price: string;
  qty: string;
  is_seller_maker: boolean;
  timestamp: number;
}

export type WebSocketMessage = TickerMessage | OrderbookMessage | TradeMessage;

export interface CoinoneWebSocket {
  connect(): void;
  disconnect(): void;
  subscribe(channel: WebSocketChannel, pairs: string[]): void;
  unsubscribe(channel: WebSocketChannel, pairs: string[]): void;
  on(event: 'message', handler: (msg: WebSocketMessage) => void): void;
  on(event: 'error', handler: (err: Error) => void): void;
  on(event: 'open' | 'close', handler: () => void): void;
  isConnected(): boolean;
}

const DEFAULT_WS_URL = 'wss://stream.coinone.co.kr';

/**
 * Create a WebSocket client for Coinone
 * Note: Requires WebSocket support (Node.js 18+ or browser)
 */
export function createWebSocketClient(config: WebSocketConfig = {}): CoinoneWebSocket {
  const url = config.url ?? DEFAULT_WS_URL;
  const reconnect = config.reconnect ?? true;
  const reconnectInterval = config.reconnectInterval ?? 5000;

  let ws: WebSocket | null = null;
  let isConnectedFlag = false;
  const handlers: {
    message: Array<(msg: WebSocketMessage) => void>;
    error: Array<(err: Error) => void>;
    open: Array<() => void>;
    close: Array<() => void>;
  } = {
    message: [],
    error: [],
    open: [],
    close: []
  };

  const subscriptions: Map<string, Set<string>> = new Map();

  function connect() {
    if (typeof WebSocket === 'undefined') {
      throw new Error('WebSocket not supported in this environment');
    }

    ws = new WebSocket(url);

    ws.onopen = () => {
      isConnectedFlag = true;
      handlers.open.forEach(h => h());
      
      // Re-subscribe on reconnect
      subscriptions.forEach((pairs, channel) => {
        if (pairs.size > 0) {
          sendSubscribe(channel as WebSocketChannel, Array.from(pairs));
        }
      });
    };

    ws.onclose = () => {
      isConnectedFlag = false;
      handlers.close.forEach(h => h());
      
      if (reconnect) {
        setTimeout(connect, reconnectInterval);
      }
    };

    ws.onerror = () => {
      const error = new Error('WebSocket error');
      handlers.error.forEach(h => h(error));
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data as string) as WebSocketMessage;
        handlers.message.forEach(h => h(msg));
      } catch {
        // Ignore parse errors
      }
    };
  }

  function disconnect() {
    if (ws) {
      ws.close();
      ws = null;
      isConnectedFlag = false;
    }
  }

  function sendSubscribe(channel: WebSocketChannel, pairs: string[]) {
    if (ws && isConnectedFlag) {
      ws.send(JSON.stringify({
        type: 'subscribe',
        channel,
        pairs
      }));
    }
  }

  function sendUnsubscribe(channel: WebSocketChannel, pairs: string[]) {
    if (ws && isConnectedFlag) {
      ws.send(JSON.stringify({
        type: 'unsubscribe',
        channel,
        pairs
      }));
    }
  }

  function subscribe(channel: WebSocketChannel, pairs: string[]) {
    if (!subscriptions.has(channel)) {
      subscriptions.set(channel, new Set());
    }
    const channelPairs = subscriptions.get(channel)!;
    pairs.forEach(p => channelPairs.add(p));
    
    if (isConnectedFlag) {
      sendSubscribe(channel, pairs);
    }
  }

  function unsubscribe(channel: WebSocketChannel, pairs: string[]) {
    const channelPairs = subscriptions.get(channel);
    if (channelPairs) {
      pairs.forEach(p => channelPairs.delete(p));
    }
    
    if (isConnectedFlag) {
      sendUnsubscribe(channel, pairs);
    }
  }

  function on(event: string, handler: (...args: unknown[]) => void) {
    if (event === 'message') {
      handlers.message.push(handler as (msg: WebSocketMessage) => void);
    } else if (event === 'error') {
      handlers.error.push(handler as (err: Error) => void);
    } else if (event === 'open') {
      handlers.open.push(handler as () => void);
    } else if (event === 'close') {
      handlers.close.push(handler as () => void);
    }
  }

  function isConnected() {
    return isConnectedFlag;
  }

  return {
    connect,
    disconnect,
    subscribe,
    unsubscribe,
    on: on as CoinoneWebSocket['on'],
    isConnected
  };
}
