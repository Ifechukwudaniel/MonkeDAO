/* ╔════════════════════════════════════════════╗
   ║ FILE: Wishlist
   ║ DESC: Save deals to Wishlists
   ║ CONTRIBUTOR: Open Source
   ╚════════════════════════════════════════════╝ */

import WishlistClient from 'components/WishList/WishListClient';

export default function WishlistPage() {
  return (
    <div className="h-full container mx-auto">
      <h2 className="text-3xl mt-12 font-semibold">Wishlist</h2>
      <WishlistClient />
    </div>
  );
}
