/* ╔════════════════════════════════════════════╗
   ║ FILE: Category Page
   ║ DESC: Filter Page for each Component
   ║ CONTRIBUTOR: Open Source
   ╚════════════════════════════════════════════╝ */

'use client';

import { CategoryLinks } from 'components/CategoryLinks';
import DealCard from 'components/DealCard';
import { EmptyState } from 'components/EmptyState';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { productDeals } from 'types';

export default function CategoryPage() {
  // 🌿 State Management
  // =====================================
  const { category, subcategory } = useParams();
  const formattedCategory = String(category).toLowerCase();
  const formattedSubcategory = String(subcategory).toLowerCase();

  // ═══ 🌿 Filter Deals ═══
  const filteredDeals = useMemo(() => {
    return productDeals.filter((deal) => {
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
