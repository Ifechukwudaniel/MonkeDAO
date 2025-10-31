/* ╔════════════════════════════════════════════╗
   ║ FILE: Deal Details Page
   ║ DESC: Individual Page of a Deal/Promotion
   ║ CONTRIBUTOR: Open Source
   ╚════════════════════════════════════════════╝ */

import ProductDealDetail from 'components/ProductDealDetails';
import { notFound } from 'next/navigation';
import { productDeals } from 'types';

// 🎨 Interface / Props Definition
// =====================================
interface ProductPageProps {
  params: Promise<{ product: string }> | { product: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { product } = await params;

  const deal = productDeals.find((d) => d.id === product || d.slug === product);

  if (!deal) {
    console.log('No product found for', product);
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDealDetail deal={deal} />
    </div>
  );
}
