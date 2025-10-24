'use client';
import {
  Heart,
  MessageCircle,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { ProductDeal } from '../types';

export const DealCard: React.FC<{ deal: ProductDeal }> = ({ deal }) => {
  const [imgError, setImgError] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  const handleLike = () => {
    if (disliked) setDisliked(false);
    setLiked(!liked);
  };

  const handleDislike = () => {
    if (liked) setLiked(false);
    setDisliked(!disliked);
  };

  return (
    <article className="w-full max-w-sm rounded-xl overflow-hidden border border-[#C4C4C4] bg-white/5 backdrop-blur-sm p-3 hover:shadow-md transition-all duration-200">
      {/* Banner */}
      <div className="relative h-48 w-full rounded-lg overflow-hidden">
        {!imgError ? (
          <Image
            src={deal.bannerImage}
            alt={deal.title}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-neutral-100 text-neutral-400 text-sm">
            Image unavailable
          </div>
        )}

        <div className="absolute left-3 top-3 bg-[#f3efcd] border border-black text-black px-3 py-1 rounded-full text-xs font-semibold">
          {deal.pricing.discountPercentage}% OFF
        </div>

        <button
          onClick={() => setWishlist(!wishlist)}
          className="absolute right-3 top-3 text-white hover:text-[#86C994] transition"
        >
          {wishlist ? <Heart fill="#86C994" /> : <Heart />}
        </button>
      </div>

      {/* Body */}
      <div className="py-3">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2">
          {deal.title}
        </h3>
        <p className="text-sm text-neutral-500 mt-1 line-clamp-2">
          {deal.shortDescription}
        </p>

        {/* Price Section */}
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-neutral-400">From</p>
            <p className="font-semibold text-[#4A8E5D]">
              {deal.pricing.currency} {deal.pricing.discountedPrice}
              <span className="text-xs text-neutral-400 ml-1 line-through">
                {deal.pricing.originalPrice}
              </span>
            </p>
          </div>
          <div className="text-xs text-neutral-500">
            by <span className="font-medium">{deal.merchant.name}</span>
          </div>
        </div>

        {/* Social Stats */}
        <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-3">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-sm ${
                liked ? 'text-[#4A8E5D]' : 'text-neutral-500'
              }`}
            >
              <ThumbsUp className="w-4 h-4" /> {liked ? '1' : '0'}
            </button>

            <button
              onClick={handleDislike}
              className={`flex items-center gap-1 text-sm ${
                disliked ? 'text-red-500' : 'text-neutral-500'
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1 text-sm text-neutral-500">
              <MessageCircle className="w-4 h-4" />
              {deal.reviews.length}
            </div>
          </div>

          <button className="text-neutral-500 hover:text-neutral-700 transition">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default DealCard;
