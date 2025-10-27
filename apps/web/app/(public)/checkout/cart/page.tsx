'use client';

import { MiniCartCard } from 'components/MiniCartCard';
import { useState } from 'react';

interface Product {
  id: string;
  title: string;
  merchant: string;
  image: string;
  price: number;
  discountedPrice?: number;
  quantity: number;
}

export default function CartPage() {
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
    <div className="container mx-auto">
      <h3 className="text-3xl mb-8">Carts</h3>
      <div className="flex flex-col gap-3 max-h-96 overflow-y-auto ">
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
    </div>
  );
}
