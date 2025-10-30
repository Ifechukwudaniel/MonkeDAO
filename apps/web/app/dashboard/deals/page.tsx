/* ╔════════════════════════════════════════════╗
   ║ FILE: Merchant Deals Page
   ║ DESC: Find Deals Created
   ║ CONTRIBUTOR: Open Source
   ╚════════════════════════════════════════════╝ */

import { Button } from '@monkedeals/ui/components/button';
import { PackageSearch } from 'lucide-react';

/* ╔════════════════════════════════════════════╗
   ║ ⬢ Empty Deal State
   ╚════════════════════════════════════════════╝ */
export const EmptyDealsState = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 border rounded-sm border-border-default">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/30">
        <PackageSearch className="h-12 w-12 text-gray-800" />
      </div>

      <h2 className="text-xl font-semibold text-foreground">
        No deals posted yet
      </h2>
      <p className="mt-2 text-sm text-gray-200 max-w-sm">
        When you add your first deal, it’ll show up here. Start attracting
        customers by posting one now.
      </p>
      <Button className="mt-6 bg-primary uppercase text-sm font-semibold px-5 text-white">
        Create new Deal
      </Button>
    </div>
  );
};

/* ╔════════════════════════════════════════════╗
   ║ ⬢ Main Deal Component
   ╚════════════════════════════════════════════╝ */
export default function Deals() {
  return (
    <div>
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-2xl">My deals</h2>
        <Button
          type="submit"
          className="mt-4 bg-primary hover:bg-[#3e7a4e]  text-sm uppercase font-semibold text-white inline-block "
        >
          Create new Deal
        </Button>
      </div>

      <EmptyDealsState />
    </div>
  );
}
