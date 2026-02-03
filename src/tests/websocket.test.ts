import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createWebSocketClient } from '../websocket';

type MockInstance = {
  url: string;
  send: ReturnType<typeof vi.fn>;
  close: ReturnType<typeof vi.fn>;
  onopen?: () => void;
  onclose?: () => void;
  onmessage?: (event: { data: string }) => void;
  onerror?: () => void;
};

let instances: MockInstance[] = [];

class MockWebSocket {
  url: string;
  send = vi.fn();
  close = vi.fn();
  onopen?: () => void;
  onclose?: () => void;
  onmessage?: (event: { data: string }) => void;
  onerror?: () => void;

  constructor(url: string) {
    this.url = url;
    instances.push(this as unknown as MockInstance);
  }
}

describe('WebSocket Client', () => {
  const originalWebSocket = global.WebSocket;

  beforeEach(() => {
    instances = [];
    // @ts-expect-error mock
    global.WebSocket = MockWebSocket;
  });

  afterEach(() => {
    global.WebSocket = originalWebSocket;
    vi.useRealTimers();
  });

  it('should throw if WebSocket is not supported', () => {
    // @ts-expect-error test no WebSocket
    global.WebSocket = undefined;
    const client = createWebSocketClient();
    expect(() => client.connect()).toThrow('WebSocket not supported');
  });

  it('should subscribe after connect and send subscribe message', () => {
    const client = createWebSocketClient({ reconnect: false });

    client.subscribe('ticker', ['BTC']);
    client.connect();

    // simulate open
    const ws = instances[0];
    ws.onopen?.();

    expect(ws.send).toHaveBeenCalledWith(
      JSON.stringify({ type: 'subscribe', channel: 'ticker', pairs: ['BTC'] })
    );
  });

  it('should emit message handler on valid JSON', () => {
    const client = createWebSocketClient({ reconnect: false });
    const handler = vi.fn();
    client.on('message', handler);

    client.connect();
    const ws = instances[0];
    ws.onopen?.();

    ws.onmessage?.({ data: JSON.stringify({ channel: 'ticker', target_currency: 'BTC' }) });

    expect(handler).toHaveBeenCalled();
  });

  it('should reconnect after close when enabled', () => {
    vi.useFakeTimers();
    const client = createWebSocketClient({ reconnect: true, reconnectInterval: 100 });

    client.connect();
    const ws = instances[0];
    ws.onopen?.();
    ws.onclose?.();

    vi.advanceTimersByTime(100);

    expect(instances.length).toBe(2);
  });
});
