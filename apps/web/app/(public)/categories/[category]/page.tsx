'use client';

import { CategoryLinks } from 'components/CategoryLinks';
import DealCard from 'components/DealCard';
import { FolderOpen } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import type { ProductDeal } from 'types';
import { productDeals } from 'types';

const mockDeals: ProductDeal[] = productDeals;

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export const EmptyState = ({
  title = 'No items yet',
  message = 'Check back soon for new deals.',
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 pt-5 text-center">
      <div className="flex items-center justify-center w-24 h-24 mb-4 rounded-full bg-primary/10">
        <FolderOpen size={48} className="text-gray-400" />
      </div>
      <h2 className="text-lg mb-2 font-medium text-gray-800">{title}</h2>
      <p className="text-gray-200 font-semibold text-sm">{message}</p>
    </div>
  );
};

export default function CategoryPage() {
  const { category, subcategory } = useParams();
  const formattedCategory = String(category).toLowerCase();
  const formattedSubcategory = String(subcategory).toLowerCase();

  const filteredDeals = useMemo(() => {
    return mockDeals.filter((deal) => {
      const cat = deal.category.toLowerCase();
      const sub = deal.subCategory.toLowerCase();

      return (
        cat === formattedCategory ||
        sub === formattedCategory ||
        cat === formattedSubcategory ||
        sub === formattedSubcategory
      );
    });
  }, [formattedCategory, formattedSubcategory]);

  return (
    <div className="min-h-[80vh]  px-6 py-12">
      <CategoryLinks />
      <div className="container mx-auto mt-12 mb-5">
        <h1 className="text-4xl font-bold mb-8 mx-auto capitalize text-center">
          {formattedCategory} Deals
        </h1>

        {filteredDeals.length === 0 ? (
          <EmptyState
            title={`No ${formattedCategory} deals yet`}
            message="Check back soon — new deals are on the way."
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {filteredDeals.map((deal) => (
              <DealCard deal={deal} key={deal.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
