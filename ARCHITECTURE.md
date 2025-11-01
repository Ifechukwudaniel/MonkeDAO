# \*\*MonkeDeal Architecture

## **Overview**

MonkeDeal is building the next evolution of the discount and promotion platform — think Groupon, but **user-owned, borderless, and Web3-powered**. Our platform allows promotions to exist as **verifiable, transferable NFTs** that can be collected, redeemed, or resold. The goal is to create a **trustless, transparent, and liquid deal economy** where merchants maintain control over issuance and users can browse, claim, and share deals globally.

We designed the platform to be **immediately familiar to mainstream users** while integrating advanced Web3 functionality, making it accessible to both crypto-native users and newcomers.

---

## **Frontend Design & Implementation**

**Stack:** Next.js, React, TypeScript, TailwindCSS (MonkeDAO brand kit), Jest for unit testing, ESLint with strict typing, React Query/Apollo for data fetching.

**Key Features Implemented:**

- **Home / Deal Feed:**
  - Users can **search, filter, and browse** deals seamlessly.
  - Social interactions include **liking, commenting, and sharing** deals.
  - The UI is designed to follow traditional Web2 promotion platforms to minimize friction for mainstream users.

- **Merchant Dashboard:**
  - Merchants can track active promotions, create new deals, and view user engagement metrics.
  - Deal creation automatically mints NFT coupons with detailed metadata (discount %, expiry, merchant ID, redemption rules).

- **Authentication & Wallet Integration:**
  - Powered by **Re-own wallet abstraction**, allowing crypto-native users to sign in with their wallets.
  - Non-crypto users can sign up via **Google or social login**, and purchase USDC through a fiat on-ramp, ensuring a simple experience.

- **Staking & Rewards:**
  - Users can stake platform tokens to earn rewards using **Streamflow**, enabling gamification and long-term engagement.

**Design & UX Choices:**

- Mobile-first responsive design.
- Navigation allows **browsing deals without signing in** to reduce barriers.
- Tested with **Lighthouse, PageSpeed Insights, WebPageTest, and Axe** for performance, SEO, and accessibility.
- Monorepo structure ensures scalable and maintainable code while allowing independent development of frontend, backend, and smart contracts.

---

## **Backend Architecture**

**Stack:** NestJS + Next.js API routes, TypeORM, Postgres.

**Responsibilities Implemented / Planned:**

- **User & Merchant Management:** Secure storage of profiles, authentication tokens, and on-ramp transactions.
- **Deals & NFT Metadata:** Store deal info, redemption status, and ownership tracking.
- **Social Layer:** CRUD for comments, likes, and user interactions.
- **Staking & Rewards:** Integrates with Streamflow for user staking and reward distribution.

**Security & Reliability Measures:**

- JWT/session-based authentication for social and wallet logins. ✅
- Rate-limiting and request validation. ✅
- SQL injection prevention via TypeORM parameterized queries. ✅
- Future enhancements: two-factor authentication, audit logs, wallet signature verification. ⬜

**Backend Goals:**

- Provide a clean, secure API for frontend consumption.
- Facilitate NFT minting, redemption verification, and on-chain data retrieval.
- Support merchant analytics dashboards for deal tracking and engagement metrics.

---

## **Smart Contract Layer (Rust + Anchor on Solana)**

**Core Responsibilities:**

- **NFT Promotions:** Mint each deal as a tradable NFT with verifiable ownership.
- **Redemption Tracking:** Record on-chain redemption status for each coupon.
- **Staking Mechanism:** Platform token staking with rewards tracked on-chain.
- **Ownership Transfer:** Enable users to resell or gift NFTs.

**Design Philosophy:**

- Keep contracts **minimal yet extensible**.
- Ensure security by **limiting minting to authorized merchants** and restricting staking/claiming logic to valid users.
- Future plans include **reward tiers, expiry handling, and advanced group deal logic**.

---

## **Web3 Integration & Accessibility**

- **Abstracted Blockchain Complexity:**
  - Users interact with the platform like a traditional Web2 app; wallet connections, NFT minting, and staking are seamless behind the scenes.
  - Fiat-to-crypto on-ramp ensures mainstream accessibility, with USDC used to reduce confusion.

- **NFT Coupon System:**
  - Coupons are minted with **rich metadata**: discount %, expiry, merchant ID, redemption rules.
  - Fully tradable and transferable on supported marketplaces.

- **Redemption Verification:**
  - Off-chain verification combined with on-chain attestation ensures **single-use redemption while remaining secure and auditable**.

---

## **Testing, Performance & Quality Assurance**

- **Frontend:** Unit tests with Jest, linting with ESLint for type consistency, strict TypeScript configuration.
- **Performance & Accessibility:** Lighthouse audits, PageSpeed Insights, Axe accessibility testing, WebPageTest for real-world performance.
- **Backend:** TypeORM input validation, rate-limiting, SQL injection protection, JWT/session auth.
- **Contracts:** Security and validation enforced in Anchor; staking and redemption logic verified on testnet.
- **Future Plans:** Full end-to-end testing (Cypress / Playwright) to ensure critical flows are robust.

---

## **Monorepo & Scalability**

```
/monkedeals
  /apps
    /frontend-web       # Next.js + React + Tailwind
    /backend-api        # NestJS + TypeORM + Postgres
    /contracts          # Anchor + Rust
  /packages
    /ui-kit             # MonkeDAO brand components
    /utils              # Shared helpers and utilities
```

- Modular architecture ensures **easy extension and maintainability**.
- Each part is independently deployable, but fully integrated for seamless frontend-backend-contract communication.
- Future scalability includes adding **geo-based deals, group promotions, AI recommendations, and cross-platform NFT marketplaces**.

---

## **Key Design Philosophy**

- **Trustless & Transparent:** Users own NFTs representing deals; ownership and redemption are verifiable.
- **Accessible & Familiar:** Web2-inspired UX reduces learning curve for mainstream users.
- **Scalable & Extensible:** Monorepo architecture supports multiple apps while keeping the codebase maintainable.
- **Secure:** End-to-end type safety, secure authentication, input validation, and on-chain verification.

---
