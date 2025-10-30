export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen text-gray-800">
      <div className="mx-auto max-w-3xl px-6 py-20 pt-14">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-200 font-semibold mb-12">
          Last updated: October 2025
        </p>

        <p className=" mb-8 leading-relaxed">
          Welcome to <span className="font-semibold">MonkeDeals</span> — a
          user-owned, borderless, and Web3-powered deal discovery platform.
          MonkeDeals transforms real-world discounts into collectible, tradable
          NFTs that represent verifiable ownership and real savings.
        </p>

        <p className="mb-8 leading-relaxed">
          This Privacy Policy explains how we collect, use, and protect your
          information when you use our website, app, and related services
          (“Services”). By connecting your wallet or creating an account, you
          agree to this Privacy Policy.
        </p>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              1. Information We Collect
            </h2>

            <h3 className="font-medium text-lg mb-2">
              A. Information You Provide
            </h3>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Wallet Address:</strong> Used for authentication,
                on-chain transactions, and verifying ownership of NFTs or deals.
              </li>
              <li>
                <strong>Account Information:</strong> If you sign in through
                account abstraction, we may collect your email address and
                connected social profiles.
              </li>
              <li>
                <strong>Profile Information:</strong> Users can create profiles
                that may include usernames, avatars, and preferences.
              </li>
              <li>
                <strong>Merchant Information:</strong> We collect business name,
                business address, contact email, and other details needed to
                verify accounts and publish deals.
              </li>
            </ul>

            <h3 className="font-medium text-lg mt-6 mb-2">
              B. Automatically Collected Information
            </h3>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>On-chain Data:</strong> Public blockchain interactions
                such as minting or trading deals as NFTs.
              </li>
              <li>
                <strong>Device & Usage Data:</strong> Browser type, device
                model, OS, and general usage metrics.
              </li>
              <li>
                <strong>Cookies:</strong> Not used until you give explicit
                consent. Once approved, cookies may be used to enhance
                experience or analytics.
              </li>
            </ul>

            <h3 className="font-medium text-lg mt-6 mb-2">
              C. Third-Party Integrations
            </h3>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Wallet Provider:</strong> Reown (used to connect and
                authenticate wallets).
              </li>
              <li>
                <strong>Payment Processor:</strong> Helius or Solana Pay.
              </li>
              <li>
                <strong>Analytics Tools:</strong> Privacy-friendly analytics may
                be used to improve the platform.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                Operate, maintain, and improve MonkeDeals and its features.
              </li>
              <li>Authenticate wallet connections and verify NFT ownership.</li>
              <li>
                Facilitate deal creation, claiming, trading, and redemption.
              </li>
              <li>Enable communication between users and merchants.</li>
              <li>
                Detect, prevent, and address fraudulent or suspicious activity.
              </li>
              <li>Respond to support requests and technical issues.</li>
              <li>
                Send updates about features, deals, or improvements (opt-in
                only).
              </li>
            </ul>
            <p className="mt-3 text-gray-700">We never sell your data.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              3. Data on the Blockchain
            </h2>
            <p className="leading-relaxed">
              Transactions made on public blockchains (like Solana) are
              permanent and publicly visible. We do not control, modify, or
              delete blockchain data once recorded. Please avoid including
              personal information in on-chain messages or metadata — it will
              become public forever.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              4. How We Share Information
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Service Providers:</strong> For hosting, payment,
                analytics, or technical support.
              </li>
              <li>
                <strong>Legal Requirements:</strong> If required by law or to
                protect MonkeDeals and users.
              </li>
              <li>
                <strong>Other Users:</strong> Only public data from profiles or
                blockchain activity.
              </li>
            </ul>
            <p className="mt-3 text-gray-200">
              We do not sell or rent personal information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              5. User Ownership & Data Control
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                You own your wallet and assets — we never store private keys or
                seed phrases.
              </li>
              <li>You may disconnect your wallet anytime.</li>
              <li>
                If using email/social login, you can request deletion of
                off-chain data via{' '}
                <a
                  href="mailto:privacy@monkedeals.xyz"
                  className="text-primary underline"
                >
                  privacy@monkedeals.xyz
                </a>
                .
              </li>
              <li>
                Profile and merchant info can be edited through your dashboard.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              6. International Data Transfers
            </h2>
            <p className="leading-relaxed">
              MonkeDeals operates globally. Data may be processed in locations
              outside your country. We use reasonable safeguards to protect your
              information, following standard global data protection principles.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">7. Security</h2>
            <p className="leading-relaxed">
              We take security seriously. Sensitive data is encrypted during
              transmission and stored securely. Access controls and audits are
              in place to protect against unauthorized use. However, no system
              is completely secure, and you are responsible for securing your
              wallet and credentials.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              8. Children’s Privacy
            </h2>
            <p className="leading-relaxed">
              MonkeDeals is not intended for individuals under 18 years old. We
              do not knowingly collect personal data from minors. If such data
              is found, it will be deleted promptly.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">9. Your Rights</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Access, correct, or delete off-chain personal data.</li>
              <li>Withdraw consent for cookies or marketing.</li>
              <li>
                Contact us for data inquiries at{' '}
                <a
                  href="mailto:privacy@monkedeals.xyz"
                  className="text-primary underline"
                >
                  privacy@monkedeals.xyz
                </a>
                .
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              10. Changes to This Policy
            </h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy periodically. Changes will be
              posted on this page with the new effective date.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
            <p className="leading-relaxed">
              For privacy questions or requests, contact us at:{' '}
              <a
                href="mailto:privacy@monkedeals.xyz"
                className="text-primary underline"
              >
                privacy@monkedeals.xyz
              </a>
              .
            </p>
          </div>

          <div className="border-t border-border-default pt-8 mt-12">
            <p className="leading-relaxed">
              MonkeDeals is a decentralized application (dApp) that interacts
              with public blockchains. By using it, you acknowledge that
              blockchain transactions are public, immutable, and outside the
              control of MonkeDeals once broadcast. You are solely responsible
              for securing your wallet and digital assets.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
