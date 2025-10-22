'use client';

import Link from 'next/link';
import DealCard from '../components/DealCard';
import { deals } from '../data/deals';

export default function HomePage() {
  const trendingDeals = deals.filter((deal) => deal.isTrending);
  const featuredDeals = deals.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#0b3d2e] text-white px-6 py-12">
      <section className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          Discover the best onchain deals
        </h1>
        <p className="text-neutral-300 text-lg">
          From NFTs to real-world perks — find exclusive offers, drops, and
          access all in one place.
        </p>
      </section>

      <section className="max-w-6xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-4">🔥 Trending Now</h2>
        <div className="flex gap-6 overflow-x-auto pb-2">
          {trendingDeals.map((deal) => (
            <div key={deal.id} className="min-w-[280px] flex-shrink-0">
              <DealCard {...deal} />
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-4">✨ Featured Deals</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDeals.map((deal) => (
            <DealCard key={deal.id} {...deal} />
          ))}
        </div>
      </section>

      <section className="text-center mt-16">
        <Link
          href="/feed"
          className="inline-block bg-white text-[#0b3d2e] font-semibold px-6 py-3 rounded-lg hover:bg-neutral-200 transition"
        >
          Browse All Deals →
        </Link>
      </section>
    </main>
  );
}
