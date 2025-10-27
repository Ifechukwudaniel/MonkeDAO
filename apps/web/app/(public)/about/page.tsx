'use client';

export const AboutPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-[#184623]">
          Welcome to MonkeDeal
        </h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          MonkeDeal is the next-generation deal discovery platform, powered by
          Web3. Every promotion you see is a collectible, tradable NFT that
          grants real-world savings — from flights and hotels to restaurants and
          shopping sprees. We turn everyday discounts into digital assets you
          can own, trade, and share.
        </p>
      </section>

      {/* How It Works */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#184623]">
          How MonkeDeal Works
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            MonkeDeal wraps every promotion as a{' '}
            <strong>transferable NFT</strong>. That means you can claim deals,
            resell them, gift them, or verify ownership anytime — all tracked
            on-chain for transparency.
          </p>
          <p>
            Merchants create promotions through our dashboard, set limits, and
            control issuance. Users browse, claim, and manage their deals
            securely in their wallets.
          </p>
          <p>
            We aggregate real-world deals from flights, hotels, shopping,
            restaurants, and experiences, making discovery fun, social, and
            fully decentralized.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#184623]">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
          <div className="bg-white/5 p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold mb-2">NFT Promotions</h3>
            <p>
              Every deal is a verifiable NFT with metadata like discount %,
              expiry, and merchant info.
            </p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Merchant Dashboard</h3>
            <p>
              Easily create promotions, track redemptions, and control issuance
              & limits.
            </p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Marketplace & Wallet</h3>
            <p>
              Users can claim, resell, or gift deals while managing them
              securely in their wallets.
            </p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Social Discovery</h3>
            <p>
              Share, rate, and comment on deals to create a community-driven
              discovery experience.
            </p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Geo-based Deals</h3>
            <p>
              Discover deals near you using location services, from your city to
              global hotspots.
            </p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Redemption Tracking</h3>
            <p>
              Redeem deals via QR code or on-chain verification, ensuring
              single-use and authenticity.
            </p>
          </div>
        </div>
      </section>

      {/* Why MonkeDeal */}
      <section className="space-y-4 text-gray-700">
        <h2 className="text-2xl font-semibold text-[#184623]">
          Why MonkeDeal?
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Trustless and transparent deal economy powered by blockchain.</li>
          <li>Ownership and liquidity: resell or gift your deals anytime.</li>
          <li>User-friendly merchant tools to issue promotions at scale.</li>
          <li>Social and community-driven discovery for maximum engagement.</li>
          <li>Geo-location support to find deals near you.</li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-[#184623]">
          Get Started with MonkeDeal
        </h2>
        <p className="text-gray-700">
          Join the decentralized deal revolution. Claim your first NFT deal,
          explore offers near you, and become part of the MonkeDeal community
          today!
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
