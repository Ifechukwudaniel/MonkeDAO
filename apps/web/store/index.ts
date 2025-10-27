'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProductDeal } from '../types';

interface RootState {
  wishlist: ProductDeal[];
  toggleWishlist: (deal: ProductDeal) => void;
  isInWishlist: (id: string) => boolean;
}

export const useRootStore = create<RootState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      toggleWishlist: (deal) => {
        const { wishlist } = get();
        const exists = wishlist.some((item) => item.id === deal.id);

        if (exists) {
          set({ wishlist: wishlist.filter((item) => item.id !== deal.id) });
        } else {
          set({ wishlist: [...wishlist, deal] });
        }
      },
      isInWishlist: (id) => get().wishlist.some((item) => item.id === id),
    }),
    {
      name: 'root-store',
    },
  ),
);
