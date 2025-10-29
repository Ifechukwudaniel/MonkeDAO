import { ProductDeal } from 'types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// -------------------- Types --------------------
interface CartItem {
  id: string;
  deal: ProductDeal;
  optionId: string;
  quantity: number;
}

export interface Location {
  name: string;
  lat: number;
  lng: number;
}

interface RootStore {
  // Wishlist
  wishlist: ProductDeal[];
  toggleWishlist: (deal: ProductDeal) => void;
  isInWishlist: (id: string) => boolean;

  // Cart
  cart: CartItem[];
  addToCart: (deal: ProductDeal, optionId: string) => void;
  removeFromCart: (id: string, optionId?: string) => void;
  updateQuantity: (id: string, optionId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Location
  location: Location | null;
  setLocation: (location: Location) => void;
  clearLocation: () => void;
}

// -------------------- Store --------------------
export const useRootStore = create<RootStore>()(
  persist(
    (set, get) => ({
      // --- Wishlist ---
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

      // --- Cart ---
      cart: [],
      addToCart: (deal, optionId) =>
        set((state) => {
          const existing = state.cart.find(
            (item) => item.id === deal.id && item.optionId === optionId,
          );

          if (existing) {
            // increment quantity
            return {
              cart: state.cart.map((item) =>
                item.id === deal.id && item.optionId === optionId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }

          return {
            cart: [...state.cart, { id: deal.id, deal, optionId, quantity: 1 }],
          };
        }),

      removeFromCart: (id, optionId) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) =>
              !(item.id === id && (!optionId || item.optionId === optionId)),
          ),
        })),

      updateQuantity: (id, optionId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id && item.optionId === optionId
              ? { ...item, quantity: Math.max(quantity, 1) }
              : item,
          ),
        })),

      clearCart: () => set({ cart: [] }),

      getCartTotal: () =>
        get().cart.reduce((total, item) => {
          const option =
            item.deal.options.find((o) => o.id === item.optionId) ??
            item.deal.options[0];
          const price =
            option?.discountedPrice ?? item.deal.pricing.discountedPrice;
          return total + price * item.quantity;
        }, 0),

      getCartCount: () =>
        get().cart.reduce((count, item) => count + item.quantity, 0),

      // --- Location ---
      location: null,
      setLocation: (location) => set({ location }),
      clearLocation: () => set({ location: null }),
    }),
    {
      name: 'root-store', // everything persisted together
    },
  ),
);
