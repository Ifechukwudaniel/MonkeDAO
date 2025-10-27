'use client';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
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
  const [cartItems, setCartItems] = useState<Product[]>([
    {
      id: '1',
      title: 'Wireless Headphones',
      merchant: 'Tech Store',
      image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
      price: 120,
      discountedPrice: 99,
      quantity: 1,
    },
    {
      id: '2',
      title: 'Smart Watch',
      merchant: 'Gadget Hub',
      image:
        'https://images.pexels.com/photos/8720270/pexels-photo-8720270.jpeg',
      price: 200,
      quantity: 2,
    },
  ]);

  const handleRemove = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id: string, qty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)),
    );
  };

  return (
    <PopoverBox
      trigger={
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:bg-green-100/10 transition-colors ">
          <ShoppingCart size={20} />
          {cartItems.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#184623] px-1 text-[10px] font-bold text-white">
              {cartItems.length}
            </span>
          )}
        </div>
      }
    >
      <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
        {cartItems.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">
            Your cart is empty.
          </p>
        ) : (
          cartItems.map((item) => (
            <MiniCartCard
              key={item.id}
              product={item}
              onRemove={handleRemove}
              onQuantityChange={handleQuantityChange}
            />
          ))
        )}
      </div>
    </PopoverBox>
  );
};
