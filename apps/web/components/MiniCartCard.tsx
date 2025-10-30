'use client';
import { Heart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { ProductDeal } from 'types';

interface MiniCartItemProps {
  product: ProductDeal;
  quantity: number;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, qty: number) => void;
}

export const QuantitySelector = ({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (newQty: number) => void;
}) => {
  const increment = () => onChange(quantity + 1);
  const decrement = () => onChange(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        onClick={decrement}
        className="w-6 h-6 flex items-center justify-center rounded border hover:bg-gray-100 transition"
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        onClick={increment}
        className="w-6 h-6 flex items-center justify-center rounded border hover:bg-gray-100 transition"
      >
        +
      </button>
    </div>
  );
};

export const MiniCartCard: React.FC<MiniCartItemProps> = ({
  product,
  quantity,
  onRemove,
  onQuantityChange,
}) => {
  const [wishlist, setWishlist] = useState(false);

  return (
    <div className=" gap-3 p-3  items-center border  border-[#C4C4C4]   hover:border-[#4A8F5D] hover:bg-[#86C99440]">
      <div className="flex gap-3">
        <div className="relative w-20 h-20 flex-shrink-0">
          <Image
            src={product.bannerImage}
            alt={product.title}
            fill
            className="object-cover rounded-md"
          />
          <button
            onClick={() => setWishlist(!wishlist)}
            className="absolute top-1 right-1 p-1 bg-white/80 rounded-full shadow hover:bg-white transition"
          >
            <Heart fill={wishlist ? '#f87171' : undefined} size={16} />
          </button>
        </div>
        <div>
          <div className="flex flex-col justify-center h-full">
            <h3 className="text-base font-semibold line-clamp-2">
              {product.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {product.merchant?.name}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between h-full border-t border-[#C4C4C4]  mt-2">
        <div className="flex justify-between items-center mt-2">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-foreground">
              $
              {product.pricing?.discountedPrice ??
                product?.pricing?.originalPrice}
              {product.pricing?.discountedPrice && (
                <span className="text-xs text-muted-foreground line-through ml-1">
                  ${product.pricing.originalPrice}
                </span>
              )}
            </h3>
          </div>

          <div className="flex space-x-3">
            <QuantitySelector
              quantity={quantity}
              onChange={(qty) => onQuantityChange(product.id, qty)}
            />
            <button
              onClick={() => onRemove(product.id)}
              className="p-1 hover:bg-red-100 rounded transition"
            >
              <Trash2 size={16} className="text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
