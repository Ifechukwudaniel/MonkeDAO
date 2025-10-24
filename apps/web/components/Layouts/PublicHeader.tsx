'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ActionIcons } from '../ActionIcons';
import ConnectButton from '../ConnectButton';
import { Searchbar } from '../Searchbar';

// 🎨 Interface / Props Definition
// =====================================
const NavItems = [
  { label: 'Deals', href: '/' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Merchants', href: '/merchants' },
  { label: 'Community', href: '/community' },
  { label: 'About', href: '/about' },
];

// Header Component
// =====================================
export const PublicHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full mt-1 bg-transparent ">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
        {/* ✦ BRAND LOGO ✦ */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image
              src="/monkedeals-logo.svg"
              alt="MonkeDeals Logo"
              fill
              className="object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <span className="font-semibold text-lg text-neutral-800">
            MonkeDeals
          </span>
        </Link>

        <Searchbar />

        {/* ✦ CONNECT BUTTON ✦ */}
        <div className="hidden md:flex items-center">
          <ActionIcons />
          <ConnectButton />
        </div>

        {/* ✦ MENU TOGGLE ✦ */}
        <button
          className="md:hidden text-neutral-800"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ✦ MOBILE NAVIGATION ✦ */}
      {menuOpen && (
        <div className="md:hidden ">
          <nav className="flex flex-col p-4 gap-4">
            {NavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#ffffff60]  font-medium text-sm transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-neutral-200">
              <ConnectButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
