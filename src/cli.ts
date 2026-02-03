#!/usr/bin/env node

import { argv } from 'node:process';
import { readFileSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { getTicker, getAllTickers, getOrderbook } from './api/public.js';
import {
	getBalance,
	getActiveOrders,
	getTradeFee,
	type CoinoneCredentials
} from './api/private.js';
import { analyzeMarket, calculateSlippage, recommendOrderType } from './trading.js';

function loadCredentials(): CoinoneCredentials | null {
	// Try credentials.json first
	const credPath = join(homedir(), '.config', 'coinone', 'credentials.json');
	if (existsSync(credPath)) {
		try {
			const content = readFileSync(credPath, 'utf-8');
			const creds = JSON.parse(content);
			if (creds.accessToken && creds.secretKey) {
				return creds as CoinoneCredentials;
			}
		} catch {
			// Fall through to env vars
		}
	}

	// Try environment variables
	const accessToken = process.env.COINONE_ACCESS_TOKEN;
	const secretKey = process.env.COINONE_SECRET_KEY;
	if (accessToken && secretKey) {
		return { accessToken, secretKey };
	}

	return null;
}

function printHelp(): void {
	console.log(`coinone-skill CLI

Usage:
  coinone-skill <command> [options]

Commands (No API key required):
  help                    Show this help message
  ticker <currency>       Get current price (e.g., ticker BTC)
  tickers                 Get all tickers sorted by volume
  orderbook <currency>    Get orderbook for currency
  analyze <currency>      Analyze market conditions

Commands (API key required):
  balance                 Show all balances
  auth-check              Verify API credentials
  orders <currency>       Show active orders for currency
  trade-fee               Show current trade fees
  
Credentials:
  1. Create ~/.config/coinone/credentials.json:
     {"accessToken": "...", "secretKey": "..."}
  2. Or set environment variables:
     COINONE_ACCESS_TOKEN, COINONE_SECRET_KEY

Examples:
  coinone-skill ticker BTC
  coinone-skill tickers
  coinone-skill analyze ETH
  coinone-skill balance
  coinone-skill auth-check
  coinone-skill orders BTC
  coinone-skill trade-fee
`);
}

async function main(): Promise<void> {
	const command = argv[2] ?? 'help';
	const arg = argv[3];

	try {
		switch (command) {
			case 'ticker': {
				if (!arg) {
					console.error('Error: Currency required. Example: coinone-skill ticker BTC');
					process.exit(1);
				}
				const ticker = await getTicker(arg.toUpperCase());
				console.log(`${arg.toUpperCase()}/KRW`);
				console.log(`  Price:  ${Number(ticker.last).toLocaleString()} KRW`);
				console.log(`  High:   ${Number(ticker.high).toLocaleString()} KRW`);
				console.log(`  Low:    ${Number(ticker.low).toLocaleString()} KRW`);
				console.log(`  Volume: ${ticker.target_volume}`);
				break;
			}

			case 'tickers': {
				const tickers = await getAllTickers();
				const sorted = tickers
					.filter(t => t.target_currency !== 'KRW')
					.sort((a, b) => Number(b.quote_volume) - Number(a.quote_volume))
					.slice(0, 10);
				
				console.log('Top 10 by Volume (KRW):');
				console.log('─'.repeat(50));
				for (const t of sorted) {
					const price = Number(t.last).toLocaleString().padStart(15);
					const vol = (Number(t.quote_volume) / 1e8).toFixed(1).padStart(8);
					console.log(`${t.target_currency.padEnd(6)} ${price} KRW  Vol: ${vol}억`);
				}
				break;
			}

			case 'orderbook': {
				if (!arg) {
					console.error('Error: Currency required. Example: coinone-skill orderbook BTC');
					process.exit(1);
				}
				const ob = await getOrderbook(arg.toUpperCase());
				console.log(`${arg.toUpperCase()}/KRW Orderbook`);
				console.log('─'.repeat(40));
				console.log('ASKS (Sell orders):');
				for (const ask of (ob.asks ?? []).slice(0, 5)) {
					console.log(`  ${Number(ask.price).toLocaleString()} KRW x ${ask.qty}`);
				}
				console.log('\nBIDS (Buy orders):');
				for (const bid of (ob.bids ?? []).slice(0, 5)) {
					console.log(`  ${Number(bid.price).toLocaleString()} KRW x ${bid.qty}`);
				}
				break;
			}

			case 'analyze': {
				if (!arg) {
					console.error('Error: Currency required. Example: coinone-skill analyze BTC');
					process.exit(1);
				}
				const orderbook = await getOrderbook(arg.toUpperCase());
				const analysis = analyzeMarket(orderbook);
				
				console.log(`${arg.toUpperCase()}/KRW Market Analysis`);
				console.log('─'.repeat(40));
				console.log(`Best Bid:    ${analysis.bestBid?.toLocaleString()} KRW`);
				console.log(`Best Ask:    ${analysis.bestAsk?.toLocaleString()} KRW`);
				console.log(`Spread:      ${analysis.spread?.toLocaleString()} KRW (${analysis.spreadPercent?.toFixed(3)}%)`);
				console.log(`Bid Depth:   ${analysis.bidDepth.toFixed(4)}`);
				console.log(`Ask Depth:   ${analysis.askDepth.toFixed(4)}`);
				console.log(`Imbalance:   ${analysis.imbalance?.toFixed(3)} (${analysis.imbalance! > 0 ? 'more buyers' : 'more sellers'})`);
				
				const slippage = calculateSlippage(orderbook.asks ?? [], 0.1);
				console.log(`\nSlippage (0.1 ${arg.toUpperCase()}):`);
				console.log(`  Avg Price: ${slippage.averagePrice.toLocaleString()} KRW`);
				console.log(`  Slippage:  ${slippage.slippagePercent.toFixed(4)}%`);
				
				const orderType = recommendOrderType(analysis.spreadPercent ?? 0, 0.5);
				console.log(`\nRecommendation: ${orderType} order`);
				break;
			}

			case 'balance': {
				const creds = loadCredentials();
				if (!creds) {
					console.error('Error: No credentials found.');
					console.error('');
					console.error('Setup credentials:');
					console.error('  1. Create ~/.config/coinone/credentials.json');
					console.error('     {"accessToken": "...", "secretKey": "..."}');
					console.error('  2. Or set COINONE_ACCESS_TOKEN and COINONE_SECRET_KEY');
					process.exit(1);
				}
				
				try {
					console.log('Loading balances...');
					const balances = await getBalance(creds);
					
					console.log('\nYour Balances:');
					console.log('─'.repeat(40));
					
					for (const [currency, data] of Object.entries(balances)) {
						const bal = Number(data.balance);
						if (bal > 0) {
							const avail = Number(data.avail);
							console.log(`${currency.toUpperCase().padEnd(6)} ${bal.toLocaleString().padStart(15)} (avail: ${avail.toLocaleString()})`);
						}
					}
				} catch (err) {
					console.error('Credentials invalid:', err instanceof Error ? err.message : err);
					process.exit(1);
				}
				break;
			}

			case 'auth-check': {
				const creds = loadCredentials();
				if (!creds) {
					console.error('Error: No credentials found.');
					process.exit(1);
				}
				try {
					await getBalance(creds);
					console.log('Credentials OK');
				} catch (err) {
					console.error('Credentials invalid:', err instanceof Error ? err.message : err);
					process.exit(1);
				}
				break;
			}

			case 'orders': {
				const creds = loadCredentials();
				if (!creds) {
					console.error('Error: No credentials found.');
					process.exit(1);
				}
				if (!arg) {
					console.error('Error: Currency required. Example: coinone-skill orders BTC');
					process.exit(1);
				}
				const orders = await getActiveOrders('KRW', arg.toUpperCase(), creds);
				console.log(`${arg.toUpperCase()}/KRW Active Orders`);
				console.log('─'.repeat(40));
				for (const o of orders.active_orders) {
					console.log(`${o.side.padEnd(4)} ${o.price} x ${o.qty} (id: ${o.order_id})`);
				}
				break;
			}

			case 'trade-fee': {
				const creds = loadCredentials();
				if (!creds) {
					console.error('Error: No credentials found.');
					process.exit(1);
				}
				const fee = await getTradeFee(creds);
				console.log('Trade Fees');
				console.log('─'.repeat(40));
				console.log(`Maker: ${fee.maker_fee}`);
				console.log(`Taker: ${fee.taker_fee}`);
				break;
			}

			case 'help':
			default:
				printHelp();
				break;
		}
	} catch (error) {
		console.error('Error:', error instanceof Error ? error.message : error);
		process.exit(1);
	}
}

main();
