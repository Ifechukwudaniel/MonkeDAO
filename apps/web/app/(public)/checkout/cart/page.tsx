/* ╔════════════════════════════════════════════╗
   ║ FILE: Cart Page
   ║ DESC: Page to view Carts
   ║ CONTRIBUTOR: Open Source
   ╚════════════════════════════════════════════╝ */

import { MiniCartCard } from 'components/MiniCartCard';
import { useRootStore } from 'store';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useRootStore();

  return (
    <div className="container mx-auto">
      <h3 className="text-3xl mb-8">Carts</h3>
      <div className="flex flex-col gap-3 max-h-96 overflow-y-auto ">
        {cart?.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">
            Your cart is empty.
          </p>
        ) : (
          cart.map((item) => (
            <MiniCartCard
              quantity={item.quantity}
              key={item.id}
              product={item.deal}
              onRemove={removeFromCart}
              onQuantityChange={(id, qty) =>
                updateQuantity(id, item.optionId, qty)
              }
            />
          ))
        )}
      </div>
    </div>
  );
}
