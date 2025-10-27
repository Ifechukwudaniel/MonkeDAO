import ProductDealDetail from '../../../../components/ProductDealDetails';
import type { ProductDeal } from '../../../../types';
import { productDeals } from '../../../../types';

interface ProductPageProps {
  params: {
    product: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  console.log('params.id:', params.product);

  const product: ProductDeal | undefined = productDeals.find(
    (deal) => deal.id === params.product || deal.slug === params.product,
  );

  /*   if (!product) {
    console.log('No product found for', params.id);
    notFound();
  } */

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDealDetail deal={product!} />
    </div>
  );
}
