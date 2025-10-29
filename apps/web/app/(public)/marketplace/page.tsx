'use client';

import { CategoryLinks } from 'components/CategoryLinks';
import DealCard from 'components/DealCard';
import MarketplaceFilter, { FilterState } from 'components/MarketPlaceFilter';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { ProductDeal, productDeals } from 'types';

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

export default function MarketPlace() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // Initialize filters from URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const newFilters: FilterState = { ...defaultFilters };

    if (params.has('distance'))
      newFilters.distance = Number(params.get('distance'));
    if (params.has('location'))
      newFilters.location = params.get('location') || '';
    if (params.has('categories'))
      newFilters.categories = params.get('categories')?.split(',') || [];
    if (params.has('isGift'))
      newFilters.isGift = params.get('isGift') === 'true';
    if (params.has('priceMin') || params.has('priceMax')) {
      newFilters.priceRange = [
        Number(params.get('priceMin')) || 0,
        Number(params.get('priceMax')) || 10000,
      ];
    }
    if (params.has('dealScore'))
      newFilters.dealScore = Number(params.get('dealScore'));
    if (params.has('verifiedMerchant'))
      newFilters.verifiedMerchant = params.get('verifiedMerchant') === 'true';
    if (params.has('nftMintable'))
      newFilters.nftMintable = params.get('nftMintable') === 'true';
    if (params.has('trending'))
      newFilters.trending = params.get('trending') === 'true';
    if (params.has('transferable'))
      newFilters.transferable = params.get('transferable') === 'true';
    if (params.has('tradeable'))
      newFilters.tradeable = params.get('tradeable') === 'true';
    if (params.has('giftable'))
      newFilters.giftable = params.get('giftable') === 'true';

    setFilters(newFilters);
  }, [searchParams]);

  // Update URL params when filters change
  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);

    const params = new URLSearchParams();

    if (newFilters.distance)
      params.set('distance', String(newFilters.distance));
    if (newFilters.location) params.set('location', newFilters.location);
    if (newFilters.categories.length > 0)
      params.set('categories', newFilters.categories.join(','));
    if (newFilters.isGift !== null)
      params.set('isGift', String(newFilters.isGift));
    if (newFilters.priceRange[0] > 0)
      params.set('priceMin', String(newFilters.priceRange[0]));
    if (newFilters.priceRange[1] < 10000)
      params.set('priceMax', String(newFilters.priceRange[1]));
    if (newFilters.dealScore)
      params.set('dealScore', String(newFilters.dealScore));
    if (newFilters.verifiedMerchant) params.set('verifiedMerchant', 'true');
    if (newFilters.nftMintable) params.set('nftMintable', 'true');
    if (newFilters.trending) params.set('trending', 'true');
    if (newFilters.transferable) params.set('transferable', 'true');
    if (newFilters.tradeable) params.set('tradeable', 'true');
    if (newFilters.giftable) params.set('giftable', 'true');

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Filter deals based on active filters
  const filteredDeals = useMemo(() => {
    return productDeals.filter((deal: ProductDeal) => {
      // Distance filter
      if (filters.distance && deal.location.distanceFromCenter) {
        if (deal.location.distanceFromCenter > filters.distance) return false;
      }

      // Location filter (search in city, state, country)
      if (filters.location) {
        const locationLower = filters.location.toLowerCase();
        const matchesLocation =
          deal.location.city.toLowerCase().includes(locationLower) ||
          deal.location.state?.toLowerCase().includes(locationLower) ||
          deal.location.country.toLowerCase().includes(locationLower);
        if (!matchesLocation) return false;
      }

      // Category filter
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(deal.category)) return false;
      }

      // Gift filter (you'll need to add a isGift property to your ProductDeal type)
      // if (filters.isGift !== null) {
      //   if (deal.isGift !== filters.isGift) return false;
      // }

      // Price range filter
      if (
        deal.pricing.discountedPrice < filters.priceRange[0] ||
        deal.pricing.discountedPrice > filters.priceRange[1]
      ) {
        return false;
      }

      // Deal score filter
      if (filters.dealScore && deal.dealScore < filters.dealScore) {
        return false;
      }

      // Verified merchant filter
      if (filters.verifiedMerchant && !deal.merchant.verifiedMerchant) {
        return false;
      }

      // NFT mintable filter
      if (filters.nftMintable && !deal.nftDetails.mintable) {
        return false;
      }

      // Trending filter
      if (filters.trending && !deal.purchaseStats.trending) {
        return false;
      }

      // Transferable filter
      if (filters.transferable && !deal.nftDetails.transferable) {
        return false;
      }

      // Tradeable filter (you'll need to add this property to NFTDetails)
      // if (filters.tradeable && !deal.nftDetails.tradeable) {
      //   return false;
      // }

      // Giftable filter (you'll need to add this property to NFTDetails)
      // if (filters.giftable && !deal.nftDetails.giftable) {
      //   return false;
      // }

      return true;
    });
  }, [filters, productDeals]);

  return (
    <main className="min-h-screen px-6 py-12">
      <CategoryLinks />
      <div className="container mx-auto flex space-x-6 mt-16">
        <MarketplaceFilter
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />
        <section className="flex-1 mb-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Deals</h2>
            <p className="text-sm text-gray-600">
              {filteredDeals.length}{' '}
              {filteredDeals.length === 1 ? 'deal' : 'deals'} found
            </p>
          </div>
          {filteredDeals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No deals match your filters
              </p>
              <button
                onClick={() => handleFiltersChange(defaultFilters)}
                className="mt-4 text-blue-600 hover:text-blue-700"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
