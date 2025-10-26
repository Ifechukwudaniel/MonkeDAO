'use client';

import { Clock, Search, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

export const Searchbar = () => {
  // 🌿 State Management
  // =====================================
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 🔁 handle outside click
  // =====================================
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ⬢ Search Handler
  // =====================================
  const handleSearch = () => {
    setIsOpen(false);
    if (searchTerm.trim()) router.push(`/search?q=${searchTerm}`);
  };

  // ⬢ Keyboard Enter Key Handler
  // =====================================
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  // 💭 dummy placeholder search history
  const mockHistory = [
    'Shoes',
    'Phones',
    'Travel Deals',
    'Headphones',
    'Restaurants',
  ];

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search for deals, products, stores..."
          className="w-full rounded-xl border border-gray-300 py-2 pl-12 pr-4 text-gray-900 transition duration-150 ease-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#184623]"
        />
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 transform text-gray-400"
          size={20}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
        >
          {searchTerm.trim() ? (
            <div className="p-4">
              <h3 className="mb-2 text-sm font-semibold text-gray-900">
                Search Results
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-500 italic">
                  No results found (yet 😅)
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">
                  Recent Searches
                </h3>
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-xs text-orange-500 hover:text-orange-600"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-2">
                {mockHistory.map((item, i) => (
                  <Link
                    key={i}
                    href={`/search?q=${item}`}
                    className="flex items-center rounded-md p-2 hover:bg-gray-50"
                  >
                    <Clock size={16} className="mr-2 text-gray-400" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
