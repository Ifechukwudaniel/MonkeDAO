import DealCard from 'components/DealCard';
import MarketplaceFilter, { FilterState } from 'components/MarketPlaceFilter';
import type { ProductDeal } from 'types';

interface MarketplaceProps {
  filters: FilterState;
  filteredDeals: ProductDeal[];
  onFiltersChange: (filters: FilterState) => void;
  defaultFilters: FilterState;
}

export const Marketplace = ({
  filters,
  filteredDeals,
  onFiltersChange,
  defaultFilters,
}: MarketplaceProps) => {
  return (
    <div className="container mx-auto flex space-x-6 mt-16">
      <MarketplaceFilter filters={filters} onFiltersChange={onFiltersChange} />

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
            <p className="text-gray-500 text-lg">No deals match your filters</p>
            <button
              onClick={() => onFiltersChange(defaultFilters)}
              className="mt-4 text-primary hover:text-primary"
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
  );
};
