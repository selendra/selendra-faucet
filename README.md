# Selendra Faucet

A modern, full-stack faucet application for Selendra EVM blockchain supporting both Mainnet and Testnet networks.

## Features

- **Multi-Wallet Support** - Connect via MetaMask, Brave Wallet, SubWallet, Coinbase Wallet, Phantom, or WalletConnect
- **Auto-Fill Address** - Connected wallet address automatically populates the form
- **Dual Network Support** - Switch between Mainnet and Testnet
- **Network Switching** - Prompts to switch wallet network when changing faucet network
- **Modern UI** - Clean, minimalist design inspired by adj.news
- **Rate Limiting** - 1 hour for Mainnet (0.01 SEL), 24 hours for Testnet (10 tSEL)
- **Copyable Address** - Easy funding of the faucet wallet
- **Manual Entry Option** - Enter address manually without wallet connection
- **Explorer Links** - Direct transaction verification
- **TypeScript** - Full type safety across the stack

## Tech Stack

- **Frontend**: Vite + React 18 + TypeScript + Tailwind CSS
- **Wallet**: Wagmi + RainbowKit + Viem
- **Backend**: Express + TypeScript + ethers.js
- **Networks**: Selendra Mainnet (Chain ID 1961) & Testnet (Chain ID 1953)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file:

```bash
cp .env.example .env
```

Add your faucet wallet private key:

```env
PORT=3001
FAUCET_PRIVATE_KEY=your_private_key_here
```

**Note**: The same wallet is used for both Mainnet and Testnet.

### 3. Run Development Server

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001/api

### 4. Build for Production

```bash
npm run build        # Build frontend
npm run build:server # Build backend
npm start           # Run production server
```

## Project Structure

```
faucet/
├── server/ # Backend Express server
│ └── index.ts # Main server file with API endpoints
├── src/ # Frontend React application
│ ├── components/ # React components
│ │ ├── Header.tsx # Header component
│ │ ├── Footer.tsx # Footer component
│ │ ├── Faucet.tsx # Main faucet form component
│ │ └── \*.css # Component styles
│ ├── App.tsx # Main App component
│ ├── main.tsx # React entry point
│ └── index.css # Global styles
├── public/ # Static assets
├── index.html # HTML template
├── vite.config.ts # Vite configuration
├── tsconfig.json # TypeScript config (frontend)
├── tsconfig.server.json # TypeScript config (backend)
├── package.json # Dependencies and scripts
└── .env # Environment variables (create this)
```

## API Endpoints

### POST /api/faucet

Request testnet tokens for a Selendra address.

**Request Body:**

```json
{
  "address": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
}
```

### POST /api/faucet

Request tokens for a specific address and network.

**Request:**

```json
{
  "address": "0x...",
  "network": "mainnet" // or "testnet"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Successfully sent 0.01 SEL to your address",
  "txHash": "0x...",
  "amount": "0.01",
  "explorer": "https://explorer.selendra.org/tx/0x..."
}
```

### GET /api/info

Get faucet information for both networks.

**Response:**

```json
{
  "success": true,
  "networks": [
    {
      "name": "mainnet",
      "displayName": "Selendra Mainnet",
      "chainId": 1961,
      "faucetAddress": "0x...",
      "balance": "31.22",
      "faucetAmount": "0.01",
      "rateLimitHours": 1,
      "rpcEndpoint": "https://rpc.selendra.org",
      "explorer": "https://explorer.selendra.org"
    },
    {
      "name": "testnet",
      "displayName": "Selendra Testnet",
      "chainId": 1953,
      "faucetAddress": "0x...",
      "balance": "0.0",
      "faucetAmount": "10",
      "rateLimitHours": 24,
      "rpcEndpoint": "https://rpc-testnet.selendra.org",
      "explorer": "https://testnet-explorer.selendra.org"
    }
  ]
}
```

### GET /api/health

Check faucet service health.

**Response:**

```json
{
  "status": "healthy",
  "uptime": 12345
}
```

## Design Principles

Our design philosophy is inspired by **adj.news** - prioritizing clarity, functionality, and editorial minimalism.

### Core Principles

1. **Minimalism First**

   - Remove unnecessary visual elements
   - Every component serves a clear purpose
   - White space as a design tool, not an afterthought

2. **Sharp & Precise**

   - No rounded corners - sharp borders throughout
   - Clean geometric shapes
   - Precise alignment and spacing

3. **Typography-Led Design**

   - Bold, readable typography
   - System font stack for optimal performance
   - Clear hierarchy through font weight and size, not color

4. **Meaningful Color**

   - Black and white as the foundation
   - Color used sparingly for functional purpose
   - Mainnet (teal `#0db0a4`) vs Testnet (slate `#64748b`) differentiation
   - Red (`#ef4444`) for warnings and critical actions

5. **Editorial Feel**

   - Layout inspired by editorial design
   - Content-first approach
   - Clean, scannable information architecture

6. **Functional Interactions**
   - Subtle hover states
   - Clear interactive elements
   - Instant visual feedback (copy confirmations, loading states)

### Implementation

- **Color Scheme**:
  - Primary (Mainnet): Teal `#0db0a4`
  - Testnet: Slate Gray `#64748b`
  - Warning: Red `#ef4444`
  - Base: Black `#000000` & White `#ffffff`
- **Typography**: System fonts (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`)
- **Spacing**: Consistent 8px grid system via Tailwind utilities
- **Borders**: 1-2px solid borders, no border-radius
- **Shadows**: None - flat design throughout

## Security

- **Rate Limiting**: Per-network, per-address cooldowns
- **Balance Monitoring**: Automatic warnings for low balances
- **Private Key Security**: Environment variable configuration
- **Address Validation**: EVM address format verification

## Network Configuration

| Network | Chain ID | RPC Endpoint                     | Rate Limit | Amount   |
| ------- | -------- | -------------------------------- | ---------- | -------- |
| Mainnet | 1961     | https://rpc.selendra.org         | 1 hour     | 0.01 SEL |
| Testnet | 1953     | https://rpc-testnet.selendra.org | 24 hours   | 10 tSEL  |

## Docker Deployment

### Build Image

```bash
docker build -t selendra-faucet .
```

### Run Container

```bash
docker run -d \
  --name selendra-faucet \
  -p 3001:3001 \
  -e FAUCET_PRIVATE_KEY=your_private_key_here \
  selendra-faucet
```

### Using Docker Compose

Create a `docker-compose.yml`:

```yaml
version: "3.8"
services:
  faucet:
    build: .
    ports:
      - "3001:3001"
    environment:
      - FAUCET_PRIVATE_KEY=${FAUCET_PRIVATE_KEY}
    restart: unless-stopped
```

Run with:

```bash
docker-compose up -d
```

## License

MIT

## Links

- [Selendra Website](https://selendra.org)
- [Documentation](https://selendra.org/docs)
- [Block Explorer](https://explorer.selendra.org)
- [GitHub](https://github.com/selendra)
