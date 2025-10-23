'use client';

import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-white text-[#0b3d2e] border-t border-[#0b3d2e]/10 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8">
        {/* Project Info */}
        <div>
          <h2 className="text-xl font-semibold">DealFeed</h2>
          <p className="text-sm text-neutral-500 mt-1 max-w-sm">
            A Web3-powered deal discovery platform turning real-world discounts
            into collectible digital assets.
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/home" className="hover:underline">
            Home
          </Link>
          <Link href="/feed" className="hover:underline">
            Deals
          </Link>
          <Link href="#" className="hover:underline">
            About
          </Link>
        </nav>
      </div>

      {/* Credits / Disclaimer */}
      <div className="border-t border-[#0b3d2e]/10 px-6 py-5 text-center text-xs text-neutral-500 leading-relaxed">
        <p>
          Built as part of the{' '}
          <a
            href="https://monkedao.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0b3d2e] font-medium hover:underline"
          >
            MonkeDAO Hackathon
          </a>
          . This project is independently developed and not officially
          affiliated with MonkeDAO or its partners.
        </p>
        <p className="mt-1">
          © {new Date().getFullYear()} DealFeed. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
