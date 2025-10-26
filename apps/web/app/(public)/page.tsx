'use client';

import Link from 'next/link';
import { CategoryLinks } from '../../components/CategoryLinks';
import DealCard from '../../components/DealCard';
import { productDeals } from '../../types';

export default function HomePage() {
  const trendingDeals = productDeals
    .filter((deal) => deal.purchaseStats.trending)
    .slice(0, 5);
  const featuredDeals = productDeals.slice(0, 3);

  return (
    <main className="min-h-screen   px-6 py-12">
      <CategoryLinks />
      <div className="container mx-auto flex flex-col items-center">
        <section className=" mx-auto text-center mb-16 mt-12">
          <h1 className="text-5xl font-bold mb-4 mx-auto">
            Discover the best onchain deals
          </h1>
          <p className=" text-base max-w-140 mx-auto text-center">
            From digital collectibles to real-world rewards — explore exclusive
            deals, early drops, and unique access passes you won’t find anywhere
            else.
          </p>
        </section>

        <section className=" mx-auto mb-16">
          <h2 className="text-2xl font-semibold mb-4">Trending Now</h2>
          <div className="flex gap-6 overflow-x-auto pb-2">
            {trendingDeals.map((deal) => (
              <div key={deal.id} className="min-w-[280px] flex-shrink-0">
                <DealCard deal={deal} />
              </div>
            ))}
          </div>
        </section>

        <section className=" mx-auto mb-16">
          <h2 className="text-2xl font-semibold mb-4">Featured Deals</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
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
      </div>
    </main>
  );
}
