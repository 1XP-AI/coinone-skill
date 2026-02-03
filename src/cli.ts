#!/usr/bin/env node
/**
 * Coinone CLI
 * Command-line interface for Coinone trading operations
 */

import { getTicker, getAllTickers, getOrderbook } from './api/public.js';
import { getBalance, placeOrder, cancelOrder } from './api/private.js';

const args = process.argv.slice(2);
const command = args[0];

async function main(): Promise<void> {
  try {
    switch (command) {
      case 'ticker': {
        const coin = args[1] || 'BTC';
        const ticker = await getTicker(coin);
        console.log(JSON.stringify(ticker, null, 2));
        break;
      }
      case 'tickers': {
        const tickers = await getAllTickers();
        console.log(JSON.stringify(tickers, null, 2));
        break;
      }
      case 'orderbook': {
        const coin = args[1] || 'BTC';
        const orderbook = await getOrderbook(coin);
        console.log(JSON.stringify(orderbook, null, 2));
        break;
      }
      case 'help':
      default:
        console.log(`
Coinone CLI - Trading Assistant

Usage:
  coinone <command> [options]

Commands:
  ticker [COIN]     Get ticker for a coin (default: BTC)
  tickers           Get all tickers
  orderbook [COIN]  Get orderbook for a coin (default: BTC)
  help              Show this help message

Private API commands require authentication:
  balance           Get account balance
  order             Place an order
  cancel            Cancel an order

Examples:
  coinone ticker BTC
  coinone orderbook ETH
        `);
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
