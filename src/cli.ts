#!/usr/bin/env node

import { argv } from 'node:process';

function printHelp(): void {
	console.log(`coinone-skill CLI

Usage:
  coinone-skill <command> [options]

Commands:
  help        Show this help message

Examples:
  coinone-skill help
`);
}

const command = argv[2] ?? 'help';

switch (command) {
	case 'help':
	default:
		printHelp();
		break;
}
