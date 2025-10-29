'use client';

import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="  border-t border-[#1f492a] bg-[#0C2A14] mt-20 text-white">
      <div className=" mx-auto grid grid-cols-3 items-center sm:items-start justify-between gap-8">
        {/* Project Info */}
        <div className="px-6 py-10 ">
          <h2 className="text-xl font-bold text-secondary">Monke Deals</h2>
          <p className="text-xs font-medium text-text-translucent  mt-1 max-w-sm">
            A Web3-powered deal discovery platform turning real-world discounts
            into collectible digital assets.
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4 text-sm font-medium border-l border-[#1f492a]  text-text-translucent px-6 py-10 ">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/marketplace" className="hover:text-white">
            Discover Deals
          </Link>
          <Link href="/stake" className="hover:text-white">
            Staking
          </Link>
          <Link href="/merchant" className="hover:text-white">
            Become a Merchant
          </Link>
          <Link href="/dashboard" className="hover:text-white">
            Merchant Dashboard
          </Link>
        </nav>

        <nav className="flex flex-col gap-4 text-sm font-medium border-l h-full border-[#1f492a]  text-text-translucent px-6 py-10 ">
          <Link href="/about" className="hover:text-white">
            About
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms of Service
          </Link>
          <Link href="/privacy-policy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/" className="hover:text-white">
            Github
          </Link>
        </nav>
      </div>

      {/* Credits / Disclaimer */}
      <div className="border-t border-[#1f492a] px-6 py-5 text-center text-xs text-text-translucent font-medium leading-relaxed ">
        <p>
          Built as part of the{' '}
          <a
            href="https://monkedao.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-tertiary font-medium hover:underline"
          >
            MonkeDAO Hackathon
          </a>
          . This project is independently developed and not officially
          affiliated with MonkeDAO or its partners.
        </p>
        <p className="mt-1">© {new Date().getFullYear()} Monkedeals</p>
      </div>
    </footer>
  );
};
