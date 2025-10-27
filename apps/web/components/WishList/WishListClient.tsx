'use client';

import DealCard from 'components/DealCard';
import { useRootStore } from 'store';

export default function WishlistClient() {
  const wishlist = useRootStore((state) => state.wishlist);

  if (!wishlist || wishlist.length === 0) {
    return (
      <p className="text-center text-neutral-400 mt-10">No items yet 😔</p>
    );
  }

  return (
    <section className="grid h-full w-full auto-rows-[550px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-6">
      {wishlist.map((item) => (
        <DealCard key={item.id} deal={item} />
      ))}
    </section>
  );
}
