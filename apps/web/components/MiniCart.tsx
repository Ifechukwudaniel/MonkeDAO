'use client';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useRootStore } from 'store';
import { MiniCartCard } from './MiniCartCard';
import { PopoverBox } from './PopOver';

interface Product {
  id: string;
  title: string;
  merchant: string;
  image: string;
  price: number;
  discountedPrice?: number;
  quantity: number;
}

export const MiniCart = () => {
  const { cart, removeFromCart, updateQuantity } = useRootStore();
  console.log('Rendering MiniCart', cart);

  return (
    <PopoverBox
      trigger={
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:bg-green-100/10 transition-colors ">
          <ShoppingCart size={20} />
          {cart && cart?.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#184623] px-1 text-[10px] font-bold text-white">
              {cart && cart?.length}
            </span>
          )}
        </div>
      }
    >
      <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
        {cart && cart?.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">
            Your cart is empty.
          </p>
        ) : (
          <>
            {cart &&
              cart?.map((item) => (
                <MiniCartCard
                  key={item.deal.id}
                  product={item.deal}
                  quantity={item.quantity}
                  onRemove={removeFromCart}
                  onQuantityChange={(id, qty) =>
                    updateQuantity(id, item.optionId, qty)
                  }
                />
              ))}
            <Link
              href="/checkout/cart"
              className="text-xs text-white text-center mt-4 py-3  bg-[#4A8F5D] rounded-md px-5 hover:bg-[#3e7a4e] transition-colors font-semibold uppercase cursor-pointer"
            >
              Proceed to checkout
            </Link>
          </>
        )}
      </div>
    </PopoverBox>
  );
};
