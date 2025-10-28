'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import type { ProductDeal } from 'types';
import { productDeals } from 'types';

const mockDeals: ProductDeal[] = productDeals;

interface EmptyStateProps {
  title?: string;
  message?: string;
  imageSrc?: string;
}

export const EmptyState = ({
  title = 'No items yet',
  message = 'Check back soon for new deals.',
  imageSrc = '/empty-state.svg',
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Image
        src={imageSrc}
        alt={title}
        width={160}
        height={160}
        className="opacity-80 mb-4"
      />
      <h2 className="text-lg font-medium text-gray-800">{title}</h2>
      <p className="text-gray-500 text-sm">{message}</p>
    </div>
  );
};

export default function CategoryPage() {
  const { category, subcategory } = useParams();
  const formattedCategory = String(category).toLowerCase();
  const formattedSubcategory = String(subcategory).toLowerCase();

  const filteredDeals = useMemo(
    () =>
      mockDeals.filter(
        (deal) =>
          deal.category.toLowerCase() === formattedCategory &&
          deal.subCategory.toLowerCase() === formattedSubcategory,
      ),
    [formattedCategory, formattedSubcategory],
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6 capitalize">
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
            <div
              key={deal.id}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
            >
              <div className="relative w-full h-40 rounded-lg overflow-hidden mb-3">
                <Image
                  src={deal.bannerImage}
                  alt={deal.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium text-lg truncate">{deal.title}</h3>
              <p className="text-sm text-gray-500 truncate">
                {deal.shortDescription}
              </p>
              <p className="text-base font-semibold mt-2">
                {deal.pricing.discountedPrice} {deal.pricing.currency}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
