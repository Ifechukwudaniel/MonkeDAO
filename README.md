# MonkeDeals

A decentralized NFT-based deal marketplace enabling transparent, verifiable, and tradeable promotions through Web3 technology.

## Overview

MonkeDeals revolutionizes traditional discount platforms by creating a trustless, transparent, and liquid deal economy. Unlike centralized platforms like Groupon that trap users with non-transferable coupons, MonkeDeals leverages blockchain technology to provide:

- **Verifiable NFT Promotions**: Each deal is minted as an NFT with on-chain verification
- **Transparent Redemption Tracking**: All redemptions are recorded on the Solana blockchain
- **Liquid Ownership**: Deals can be transferred, traded, or gifted freely
- **Merchant Control**: Full control over issuance limits and deal parameters
- **Global Discovery**: Users can discover, collect, and share deals worldwide

## Architecture

This project implements a full-stack Web3 application with:

- **Smart Contracts**: Rust-based Solana programs using Anchor framework
- **Backend Services**: NestJS APIs with GraphQL support
- **Frontend**: Next.js web application with Web3 wallet integration
- **Database**: PostgreSQL with TypeORM for off-chain data
- **Blockchain**: Solana for NFT minting, transfers, and redemption verification

For detailed architecture documentation, design choices, and technical implementation details, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## Technology Stack

### Blockchain

- **Network**: Solana (Devnet/Mainnet)
- **Smart Contract Language**: Rust
- **Framework**: Anchor
- **RPC Provider**: Helius

### Backend

- **Framework**: NestJS
- **API**: GraphQL (Apollo Server)
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Wallet Integration**: Reown WalletKit
- **Maps**: Google Maps API
- **Payment**: MoonPay integration

### Infrastructure

- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Containerization**: Docker
- **CI/CD**: GitHub Actions

## Project Structure

```
monkedeals/
├── apps/
│   ├── contracts/              # Solana smart contracts (Anchor)
│   │   ├── programs/
│   │   │   └── contracts/
│   │   │       └── src/
│   │   │           ├── instructions/  # Program instructions
│   │   │           ├── error/         # Custom error types
│   │   │           └── lib.rs         # Program entry point
│   │   └── tests/              # Smart contract tests
│   │
│   ├── graphql-api/            # GraphQL API service
│   │   └── src/
│   │       ├── modules/        # Feature modules
│   │       │   ├── auth/       # Authentication
│   │       │   ├── deal/       # Deal management
│   │       │   ├── merchant/   # Merchant operations
│   │       │   ├── user/       # User management
│   │       │   └── comment/    # Comments & reviews
│   │       ├── guards/         # Auth guards
│   │       └── schema.gql      # GraphQL schema
│   │
│   └── web/                    # Next.js frontend
│       ├── app/
│       │   ├── (public)/       # Public routes
│       │   └── dashboard/      # Merchant dashboard
│       ├── components/         # React components
│       └── store/              # State management
|       └── utils/              # App Utils
|       └── types/              # Types
│
├── packages/
│   ├── api/                    # Shared API utilities
│   ├── graphql/                # GraphQL utilities
│   ├── postgresql-typeorm/     # Database configuration
│   │   ├── entities/           # TypeORM entities
│   │   ├── migrations/         # Database migrations
│   │   ├── seeds/              # Database seeders
│   │   └── factories/          # Test data factories
│   ├── nest-common/            # Shared NestJS modules
│   ├── ui/                     # Shared UI components
│   ├── eslint-config/          # ESLint configurations
│   └── typescript-config/      # TypeScript configurations
│
├── .docker/                    # Docker configurations
├── tools/                      # Development tools
└── .github/                    # GitHub workflows
```

## Prerequisites

- **Node.js**: >= 18.x
- **pnpm**: >= 8.x
- **Docker**: Latest version (for local development)
- **Rust**: Latest stable (for smart contract development)
- **Solana CLI**: >= 1.18.x
- **Anchor CLI**: >= 0.29.x
- **PostgreSQL**: 15.x (or use Docker)

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/Ifechukwudaniel/MonkeDAO
cd monkedao
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Configuration

Create environment files for each service:

#### GraphQL API (apps/graphql-api/.env)

```bash
cp apps/graphql-api/.env.example apps/graphql-api/.env
```

Required variables:

```env
# Application
NODE_ENV=development
PORT=8888

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/monkedeals
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=monkedeals

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d

# Solana
SOLANA_RPC_URL=https://api.devnet.solana.com
HELIUS_API_KEY=your-helius-api-key
```

#### Web Frontend (apps/web/.env)

```bash
cp apps/web/.env.example apps/web/.env
```

Required variables:

```env
# API
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8888/graphql

# Solana
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com

# Wallet
NEXT_PUBLIC_REOWN_PROJECT_ID=your-reown-project-id

# Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Payment
NEXT_PUBLIC_MOONPAY_API_KEY=your-moonpay-api-key
```

#### Smart Contracts (apps/contracts/.env)

```bash
# Create if needed
ANCHOR_PROVIDER_URL=https://api.devnet.solana.com
ANCHOR_WALLET=~/.config/solana/id.json
```

### 4. Database Setup

Using Docker:

```bash
docker compose -f .docker/docker-compose.local.yml up -d
```

Or install PostgreSQL locally and run:

```bash
# Run migrations
pnpm --filter @repo/postgresql-typeorm migration:run

# Seed database
pnpm --filter @repo/postgresql-typeorm seed:run
```

### 5. Smart Contract Setup

```bash
# Build contracts
cd apps/contracts
anchor build

# Run tests
anchor test

# Deploy to devnet
anchor deploy --provider.cluster devnet
```

## Quick Start

### Using the start script (Recommended)

```bash
chmod +x start.sh
./start.sh
```

This will:

1. Start PostgreSQL (if using Docker)
2. Run database migrations
3. Start the GraphQL API on port 8888
4. Start the Next.js frontend on port 4000
5. Watch for changes in all packages

### Manual Start

Start all services:

```bash
pnpm dev
```

Start specific services:

```bash
# GraphQL API only
pnpm dev --filter=graphql-api

# Frontend only
pnpm dev --filter=web

# Smart contracts (watch mode)
cd apps/contracts && anchor watch
```

### Access Points

- **Frontend**: http://localhost:4000
- **GraphQL API**: http://localhost:8888/graphql
- **GraphQL Playground**: http://localhost:8888/graphql (in development)

## Development

### Running Tests

```bash
# All tests
pnpm test

# Specific app tests
pnpm test --filter=graphql-api
pnpm test --filter=web

# Smart contract tests
cd apps/contracts && anchor test

# E2E tests
pnpm test:e2e
```

### Code Quality

```bash
# Lint all packages
pnpm lint

# Format code
pnpm format

# Type check
pnpm type-check
```

### Database Operations

```bash
# Create new migration
pnpm --filter @repo/postgresql-typeorm migration:generate

# Run migrations
pnpm --filter @repo/postgresql-typeorm migration:run

# Revert migration
pnpm --filter @repo/postgresql-typeorm migration:revert

# Seed database
pnpm --filter @repo/postgresql-typeorm seed:run
```

### Smart Contract Development

```bash
cd apps/contracts

# Build contracts
anchor build

# Test contracts
anchor test

# Deploy to devnet
anchor deploy --provider.cluster devnet

# Deploy to mainnet
anchor deploy --provider.cluster mainnet
```

## Building for Production

### Build All Applications

```bash
pnpm build
```

### Build Specific Applications

```bash
# GraphQL API
pnpm build --filter=graphql-api

# Frontend
pnpm build --filter=web

# Smart contracts
cd apps/contracts && anchor build --verifiable
```

## Deployment

### Frontend (Vercel)

1. Connect repository to Vercel
2. Configure environment variables
3. Set build command: `pnpm build --filter=web`
4. Set output directory: `apps/web/.next`
5. Deploy

**Environment Variables Required**:

- All variables from `apps/web/.env.example`
- Set `NODE_ENV=production`
- Update RPC URLs to mainnet

### GraphQL API (Vercel/Railway)

**Vercel**:

1. Create new project
2. Set root directory: `apps/graphql-api`
3. Build command: `pnpm build --filter=graphql-api`
4. Configure environment variables
5. Deploy

**Railway**:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
cd apps/graphql-api
railway up
```

**Environment Variables Required**:

- All variables from `apps/graphql-api/.env.example`
- Update `DATABASE_URL` to production database
- Set secure `JWT_SECRET`
- Use mainnet RPC URLs

### Smart Contracts (Solana)

**Devnet Deployment**:

```bash
cd apps/contracts
anchor deploy --provider.cluster devnet
```

**Mainnet Deployment**:

```bash
# Ensure you have sufficient SOL for deployment
solana balance

# Build verifiable
anchor build --verifiable

# Deploy
anchor deploy --provider.cluster mainnet

# Verify deployment
anchor verify <program-id>
```

**Post-Deployment**:

1. Update program IDs in frontend configuration
2. Update program IDs in backend configuration
3. Initialize program accounts if required
4. Test all program instructions on deployed program

### Database Migration

For production database:

```bash
# Set production DATABASE_URL
export DATABASE_URL=your-production-url

# Run migrations
pnpm --filter @repo/postgresql-typeorm migration:run
```

### CI/CD Pipeline

GitHub Actions workflows are configured for:

- **Continuous Integration** (.github/workflows/ci.yml)
  - Linting
  - Type checking
  - Unit tests
  - Build verification
- **Deployment** (Configure as needed)
  - Automatic deployment on main branch
  - Preview deployments for PRs

## API Documentation

### GraphQL API

Access the GraphQL Playground at `http://localhost:8888/graphql` to explore:

- Available queries
- Mutations
- Subscriptions
- Schema documentation

Key endpoints:

- User authentication
- Deal creation and management
- NFT minting operations
- Redemption verification
- Marketplace listings

### Smart Contract Instructions

Key program instructions:

- `create_collection`: Initialize NFT collection for deals
- `mint_collection`: Mint deal NFTs
- `redeem_nft`: Redeem a deal NFT
- `check_redemption`: Verify redemption status
- `deal_token`: Manage deal token operations

## Key Features

### For Merchants

- Create and manage deal campaigns
- Mint deal NFTs with custom parameters
- Set redemption limits and expiry
- Track redemption analytics
- QR code-based redemption verification

### For Users

- Discover deals globally
- Purchase and collect deal NFTs
- Transfer/gift deals to others
- Trade deals on marketplace
- Verify deal authenticity on-chain
- Redeem deals at merchant locations

### Web3 Integration

- Solana wallet connection (Phantom, Solflare, etc.)
- NFT minting and transfers
- On-chain redemption tracking
- Decentralized ownership verification
- Integration with Solana SPL Token program

## Troubleshooting

### Common Issues

**Database Connection Issues**:

```bash
# Check PostgreSQL is running
docker ps

# Restart database
docker compose -f .docker/docker-compose.local.yml restart
```

**Port Already in Use**:

```bash
# Kill process on port
lsof -ti:4000 | xargs kill -9  # Frontend
lsof -ti:8888 | xargs kill -9  # API
```

**Smart Contract Build Failures**:

```bash
# Clean build
cd apps/contracts
anchor clean
anchor build
```

**Wallet Connection Issues**:

- Ensure wallet extension is installed
- Check network matches (devnet/mainnet)
- Verify Reown project ID is configured

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow ESLint configuration
- Write tests for new features
- Update documentation
- Use conventional commits
- Ensure all tests pass

## Security

- Never commit `.env` files
- Keep dependencies updated
- Use secure RPC endpoints for mainnet
- Implement rate limiting for APIs
- Validate all user inputs
- Audit smart contracts before mainnet deployment

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## Support

For issues and questions:

- Create an issue on GitHub
- Check existing documentation
- Review architecture document for design decisions

## Acknowledgments

Built with:

- [Turborepo](https://turbo.build/)
- [NestJS](https://nestjs.com/)
- [Next.js](https://nextjs.org/)
- [Solana](https://solana.com/)
- [Anchor](https://www.anchor-lang.com/)
- [TypeORM](https://typeorm.io/)
