import type { FilterState } from 'components/MarketPlaceFilter';
import type { ProductDeal } from 'types';

/* ╔════════════════════════════════════════════╗
   ║                Parse Filters.              ║
   ╚════════════════════════════════════════════╝ */
export const parseFiltersFromParams = (
  searchParams: URLSearchParams,
  defaultFilters: FilterState,
): FilterState => {
  const newFilters: FilterState = { ...defaultFilters };

  if (searchParams.has('distance'))
    newFilters.distance = Number(searchParams.get('distance'));
  if (searchParams.has('location'))
    newFilters.location = searchParams.get('location') || '';
  if (searchParams.has('categories'))
    newFilters.categories = searchParams.get('categories')?.split(',') || [];
  if (searchParams.has('isGift'))
    newFilters.isGift = searchParams.get('isGift') === 'true';
  if (searchParams.has('priceMin') || searchParams.has('priceMax')) {
    newFilters.priceRange = [
      Number(searchParams.get('priceMin')) || 0,
      Number(searchParams.get('priceMax')) || 10000,
    ];
  }
  if (searchParams.has('dealScore'))
    newFilters.dealScore = Number(searchParams.get('dealScore'));
  if (searchParams.has('verifiedMerchant'))
    newFilters.verifiedMerchant =
      searchParams.get('verifiedMerchant') === 'true';
  if (searchParams.has('nftMintable'))
    newFilters.nftMintable = searchParams.get('nftMintable') === 'true';
  if (searchParams.has('trending'))
    newFilters.trending = searchParams.get('trending') === 'true';
  if (searchParams.has('transferable'))
    newFilters.transferable = searchParams.get('transferable') === 'true';
  if (searchParams.has('tradeable'))
    newFilters.tradeable = searchParams.get('tradeable') === 'true';
  if (searchParams.has('giftable'))
    newFilters.giftable = searchParams.get('giftable') === 'true';

  return newFilters;
};

/* ╔════════════════════════════════════════════╗
   ║      Convert Filters to Params             ║
   ╚════════════════════════════════════════════╝ */
export const filtersToParams = (filters: FilterState): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.distance) params.set('distance', String(filters.distance));
  if (filters.location) params.set('location', filters.location);
  if (filters.categories.length > 0)
    params.set('categories', filters.categories.join(','));
  if (filters.isGift !== null) params.set('isGift', String(filters.isGift));
  if (filters.priceRange[0] > 0)
    params.set('priceMin', String(filters.priceRange[0]));
  if (filters.priceRange[1] < 10000)
    params.set('priceMax', String(filters.priceRange[1]));
  if (filters.dealScore) params.set('dealScore', String(filters.dealScore));
  if (filters.verifiedMerchant) params.set('verifiedMerchant', 'true');
  if (filters.nftMintable) params.set('nftMintable', 'true');
  if (filters.trending) params.set('trending', 'true');
  if (filters.transferable) params.set('transferable', 'true');
  if (filters.tradeable) params.set('tradeable', 'true');
  if (filters.giftable) params.set('giftable', 'true');

  return params;
};

/* ╔════════════════════════════════════════════╗
   ║          Apply Filters to Deal             ║
   ╚════════════════════════════════════════════╝ */
export const applyDealFilters = (
  deals: ProductDeal[],
  filters: FilterState,
): ProductDeal[] => {
  return deals.filter((deal) => {
    if (filters.distance && deal.location.distanceFromCenter) {
      if (deal.location.distanceFromCenter > filters.distance) return false;
    }

    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      const matchesLocation =
        deal.location.city.toLowerCase().includes(locationLower) ||
        deal.location.state?.toLowerCase().includes(locationLower) ||
        deal.location.country.toLowerCase().includes(locationLower);
      if (!matchesLocation) return false;
    }

    if (filters.categories.length > 0) {
      if (!filters.categories.includes(deal.category)) return false;
    }

    if (
      deal.pricing.discountedPrice < filters.priceRange[0] ||
      deal.pricing.discountedPrice > filters.priceRange[1]
    )
      return false;

    if (filters.dealScore && deal.dealScore < filters.dealScore) return false;
    if (filters.verifiedMerchant && !deal.merchant.verifiedMerchant)
      return false;
    if (filters.nftMintable && !deal.nftDetails.mintable) return false;
    if (filters.trending && !deal.purchaseStats.trending) return false;
    if (filters.transferable && !deal.nftDetails.transferable) return false;

    return true;
  });
};
