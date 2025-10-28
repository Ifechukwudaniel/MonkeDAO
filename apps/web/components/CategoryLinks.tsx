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
      { name: 'Flights', href: '/categories/flights' },
      { name: 'Hotels', href: '/categories/hotels' },
      { name: 'Crypto Events', href: '/categories/crypto-events' },
    ],
  },
  {
    name: 'Experiences',
    href: '/category/experiences',
    icon: <Ticket size={18} />,
    sub: [
      { name: 'Concerts', href: '/categories/concerts' },
      { name: 'Festivals', href: '/categories/festivals' },
      { name: 'Workshops', href: '/categories/workshops' },
    ],
  },
  {
    name: 'Digital Goods',
    href: '/category/digital-goods',
    icon: <ShoppingBag size={18} />,
    sub: [
      { name: 'Software Licenses', href: '/categories/software' },
      { name: 'Gaming Items', href: '/categories/gaming' },
      { name: 'Subscriptions', href: '/categories/subscriptions' },
    ],
  },
  {
    name: 'Rewards & Cashback',
    href: '/category/rewards',
    icon: <Wallet size={18} />,
    sub: [
      { name: 'Merchant Tokens', href: '/categories/tokens' },
      { name: 'Cashback NFTs', href: '/categories/cashback' },
      { name: 'Loyalty Badges', href: '/categories/badges' },
    ],
  },
  {
    name: 'Luxury & Lifestyle',
    href: '/category/luxury',
    icon: <Gift size={18} />,
    sub: [
      { name: 'Fashion Drops', href: '/categories/fashion' },
      { name: 'Fine Dining', href: '/categories/dining' },
      { name: 'Exclusive Access', href: '/categories/exclusive' },
    ],
  },
  {
    name: 'NFT Collectibles',
    href: '/category/collectibles',
    icon: <Sparkles size={18} />,
    sub: [
      { name: 'Deal NFTs', href: '/categories/deals' },
      { name: 'Event Passes', href: '/categories/passes' },
      { name: 'Limited Editions', href: '/categories/limited' },
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
    <nav ref={menuRef} className="w-full border-b border-border-default">
      <div className="flex flex-wrap justify-center gap-4 px-4 py-3">
        {categories.map((cat) => (
          <div key={cat.name} className="relative">
            <button
              onClick={() => toggleCategory(cat.name)}
              className="flex items-center gap-2 rounded-full border border-border-default px-4 py-2 text-sm font-medium text-gray-800 transition-all hover:bg-[#4A8F5D10]"
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
              <div className="absolute left-0 mt-2 w-48 rounded-md border border-border-default bg-secondary shadow-md">
                {cat.sub.map((sub) => (
                  <Link
                    key={sub.name}
                    href={sub.href}
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-primary/10 border-b-2 border-t-2 border-transparent hover:border-primary"
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
