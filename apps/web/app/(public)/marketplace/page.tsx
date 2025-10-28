'use client';

import { CategoryLinks } from 'components/CategoryLinks';
import DealCard from 'components/DealCard';
import { productDeals } from 'types';

export default function MarketPlace() {
  return (
    <main className="min-h-screen   px-6 py-12">
      <CategoryLinks />
      <div className="container mx-auto flex flex-col items-center mt-16">
        <section className=" mx-auto mb-16">
          <h2 className="text-2xl font-semibold mb-4"> Deals</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
