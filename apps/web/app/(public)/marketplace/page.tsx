/* ╔════════════════════════════════════════════╗
   ║ FILE: MarketPlace Page
   ║ DESC: All Deals + Search and Filters
   ║ CONTRIBUTOR: Open Source
   ╚════════════════════════════════════════════╝ */

'use client';
import { CategoryLinks } from 'components/CategoryLinks';
import { Marketplace } from 'components/MarketPlace';
import type { FilterState } from 'components/MarketPlaceFilter';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { productDeals } from 'types';
import {
  applyDealFilters,
  filtersToParams,
  parseFiltersFromParams,
} from 'utils/marketplace';

// 🎨 Constants
// =====================================
const defaultFilters: FilterState = {
  distance: null,
  location: '',
  categories: [],
  isGift: null,
  priceRange: [0, 10000],
  dealScore: null,
  verifiedMerchant: false,
  nftMintable: false,
  trending: false,
  transferable: false,
  tradeable: false,
  giftable: false,
};

export default function MarketPlacePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // ⬢ 🧭 Load filters from URL params
  // =====================================
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const newFilters = parseFiltersFromParams(params, defaultFilters);
    setFilters(newFilters);
  }, [searchParams]);

  // ⬢ 🔄 Update URL params when filters change
  // =====================================
  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    const params = filtersToParams(newFilters);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // 🧠 Filter logic
  // =====================================
  const filteredDeals = useMemo(
    () => applyDealFilters(productDeals, filters),
    [filters],
  );

  return (
    <main className="min-h-screen px-6 py-12">
      <CategoryLinks />
      <Marketplace
        filters={filters}
        filteredDeals={filteredDeals}
        onFiltersChange={handleFiltersChange}
        defaultFilters={defaultFilters}
      />
    </main>
  );
}
