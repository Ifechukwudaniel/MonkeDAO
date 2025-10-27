'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useRootStore } from 'store';
import { MiniCart } from './MiniCart';
import { MiniNotificationIcon } from './MiniNotification';

interface ActionIconProps {
  icon: React.ReactNode;
  count?: number;
  href: string;
  label: string;
}

const ActionIcon = ({ icon, count, href, label }: ActionIconProps) => (
  <Link
    href={href}
    className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:bg-green-100/10 transition-colors"
    aria-label={label}
  >
    {icon}
    {count && count > 0 && (
      <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[#184623] px-1 text-[10px] font-bold text-white">
        {count > 9 ? '9+' : count}
      </span>
    )}
  </Link>
);

export const ActionIcons = () => {
  const wishlist = useRootStore((state) => state.wishlist);
  const wishlistCount = wishlist.length;
  const cartCount = 5;
  const notifCount = 12;

  return (
    <div className="flex items-center gap-3 mr-4">
      <ActionIcon
        icon={<Heart size={20} />}
        count={wishlistCount}
        href="/wishlist"
        label="Wishlist"
      />
      <MiniCart />

      <MiniNotificationIcon />
    </div>
  );
};
