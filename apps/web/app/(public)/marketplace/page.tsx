/* ╔════════════════════════════════════════════╗
   ║ FILE: MarketPlace Page
   ║ DESC: Server Component wrapper
   ║ CONTRIBUTOR: Open Source
   ╚════════════════════════════════════════════╝ */

import MarketPlaceClient from 'components/MarketPlace/client';
import { Suspense } from 'react';

export default function MarketPlacePage() {
  return (
    <Suspense fallback={<div>Loading marketplace...</div>}>
      <MarketPlaceClient />
    </Suspense>
  );
}
