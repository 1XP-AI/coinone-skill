#!/usr/bin/env node

import { argv } from 'node:process';
import { getTicker, getAllTickers, getOrderbook } from './api/public.js';
import { analyzeMarket, calculateSlippage, recommendOrderType } from './trading.js';

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
  
Examples:
  coinone-skill ticker BTC
  coinone-skill tickers
  coinone-skill orderbook ETH
  coinone-skill analyze BTC
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
				
				// Slippage for 0.1 unit
				const slippage = calculateSlippage(orderbook.asks ?? [], 0.1);
				console.log(`\nSlippage (0.1 ${arg.toUpperCase()}):`);
				console.log(`  Avg Price: ${slippage.averagePrice.toLocaleString()} KRW`);
				console.log(`  Slippage:  ${slippage.slippagePercent.toFixed(4)}%`);
				
				// Recommendation
				const orderType = recommendOrderType(analysis.spreadPercent ?? 0, 0.5);
				console.log(`\nRecommendation: ${orderType} order`);
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
