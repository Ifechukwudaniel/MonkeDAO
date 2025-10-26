import DealCard from 'components/DealCard';
import { productDeals } from 'types';

async function FavoritesPage() {
  const user = {
    id: '12',
  };

  if (!user || !user?.id) {
    return <p>Sign in to add to favorites</p>;
  }

  return (
    <div className="h-full container mx-auto">
      <h2 className="text-3xl mt-12">WishLists</h2>
      <section className="grid h-full w-full auto-rows-[550px] grid-cols-4 gap-2 mt-6">
        {productDeals?.map((f) => (
          <DealCard key={f.id} deal={f} />
        ))}
      </section>
    </div>
  );
}

export default FavoritesPage;
