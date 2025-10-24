'use client';

import {
  ChevronDown,
  ChevronUp,
  Gift,
  Plane,
  ShoppingBag,
  Sparkles,
  Ticket,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

interface SubCategory {
  name: string;
  href: string;
}

interface Category {
  name: string;
  href: string;
  icon: React.ReactNode;
  sub?: SubCategory[];
}

const categories: Category[] = [
  {
    name: 'Travel',
    href: '/category/travel',
    icon: <Plane size={18} />,
    sub: [
      { name: 'Flights', href: '/category/travel/flights' },
      { name: 'Hotels', href: '/category/travel/hotels' },
      { name: 'Crypto Events', href: '/category/travel/crypto-events' },
    ],
  },
  {
    name: 'Experiences',
    href: '/category/experiences',
    icon: <Ticket size={18} />,
    sub: [
      { name: 'Concerts', href: '/category/experiences/concerts' },
      { name: 'Festivals', href: '/category/experiences/festivals' },
      { name: 'Workshops', href: '/category/experiences/workshops' },
    ],
  },
  {
    name: 'Digital Goods',
    href: '/category/digital-goods',
    icon: <ShoppingBag size={18} />,
    sub: [
      { name: 'Software Licenses', href: '/category/digital-goods/software' },
      { name: 'Gaming Items', href: '/category/digital-goods/gaming' },
      { name: 'Subscriptions', href: '/category/digital-goods/subscriptions' },
    ],
  },
  {
    name: 'Rewards & Cashback',
    href: '/category/rewards',
    icon: <Wallet size={18} />,
    sub: [
      { name: 'Merchant Tokens', href: '/category/rewards/tokens' },
      { name: 'Cashback NFTs', href: '/category/rewards/cashback' },
      { name: 'Loyalty Badges', href: '/category/rewards/badges' },
    ],
  },
  {
    name: 'Luxury & Lifestyle',
    href: '/category/luxury',
    icon: <Gift size={18} />,
    sub: [
      { name: 'Fashion Drops', href: '/category/luxury/fashion' },
      { name: 'Fine Dining', href: '/category/luxury/dining' },
      { name: 'Exclusive Access', href: '/category/luxury/exclusive' },
    ],
  },
  {
    name: 'NFT Collectibles',
    href: '/category/collectibles',
    icon: <Sparkles size={18} />,
    sub: [
      { name: 'Deal NFTs', href: '/category/collectibles/deals' },
      { name: 'Event Passes', href: '/category/collectibles/passes' },
      { name: 'Limited Editions', href: '/category/collectibles/limited' },
    ],
  },
];

export const CategoryLinks = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleCategory = (name: string) => {
    setOpenCategory(openCategory === name ? null : name);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenCategory(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav ref={menuRef} className="w-full border-b border-gray-200">
      <div className="flex flex-wrap justify-center gap-4 px-4 py-3">
        {categories.map((cat) => (
          <div key={cat.name} className="relative">
            <button
              onClick={() => toggleCategory(cat.name)}
              className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100"
            >
              {cat.icon}
              <span>{cat.name}</span>
              {openCategory === cat.name ? (
                <ChevronUp size={16} className="ml-1 text-gray-500" />
              ) : (
                <ChevronDown size={16} className="ml-1 text-gray-500" />
              )}
            </button>

            {openCategory === cat.name && cat.sub && (
              <div className="absolute left-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-md">
                {cat.sub.map((sub) => (
                  <Link
                    key={sub.name}
                    href={sub.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};
