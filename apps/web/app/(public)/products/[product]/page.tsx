/* ╔════════════════════════════════════════════╗
   ║ FILE: Deal Details Page
   ║ DESC: Individual Page of a Deal/Promotion
   ║ CONTRIBUTOR: Open Source
   ╚════════════════════════════════════════════╝ */

import ProductDealDetail from 'components/ProductDealDetails';
import { notFound } from 'next/navigation';
import type { ProductDeal } from 'types';
import { productDeals } from 'types';

// 🎨 Interface / Props Definition
// =====================================
interface ProductPageProps {
  params: {
    product: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product: ProductDeal | undefined = productDeals.find(
    (deal) => deal.id === params.product || deal.slug === params.product,
  );

  if (!product) {
    console.log('No product found for', params.product);
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDealDetail deal={product!} />
    </div>
  );
}
