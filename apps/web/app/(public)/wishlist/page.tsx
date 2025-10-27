import WishlistClient from 'components/WishList/WishListClient';

export default function WishlistPage() {
  const user = { id: '12' };

  if (!user || !user.id) {
    return (
      <p className="text-center text-neutral-500 mt-10">
        Sign in to view your wishlist
      </p>
    );
  }

  return (
    <div className="h-full container mx-auto">
      <h2 className="text-3xl mt-12 font-semibold">Wishlist</h2>
      <WishlistClient />
    </div>
  );
}
