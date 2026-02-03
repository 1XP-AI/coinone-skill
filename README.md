# Coinone Trading Skill

AI-powered trading assistant skill for Coinone exchange.

## Features

- **Public API**: Market data, ticker, orderbook
- **Private API**: Balance, order management
- **Smart Trading**: AI-assisted optimal order execution

## Setup

```bash
npm install --include=dev
```

## Development

```bash
# Build
npm run build

# Watch build
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint
npm run lint
```

## CLI

```bash
npm run build
./dist/cli.js help
```

## Tech Stack

- TypeScript
- ESLint
- Vitest (TDD)
- Husky (git hooks)

## License

MIT
