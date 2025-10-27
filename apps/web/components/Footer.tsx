'use client';

import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="  border-t border-[#1f492a] bg-[#0C2A14] mt-20 text-white">
      <div className=" mx-auto grid grid-cols-2 items-center sm:items-start justify-between gap-8">
        {/* Project Info */}
        <div className="px-6 py-10 ">
          <h2 className="text-xl font-semibold text-white">Monke Deals</h2>
          <p className="text-sm  mt-1 max-w-sm">
            A Web3-powered deal discovery platform turning real-world discounts
            into collectible digital assets.
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-6 text-sm font-medium border-l border-[#1f492a]  px-6 py-10 ">
          <Link href="/home" className="hover:underline">
            Home
          </Link>
          <Link href="/feed" className="hover:underline">
            Deals
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/dashboard" className="hover:underline">
            Merchant Dashboard
          </Link>
        </nav>
      </div>

      {/* Credits / Disclaimer */}
      <div className="border-t border-[#1f492a] px-6 py-5 text-center text-xs text-white leading-relaxed">
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
