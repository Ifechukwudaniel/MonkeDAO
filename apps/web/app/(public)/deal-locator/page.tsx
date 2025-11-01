/* ╔════════════════════════════════════════════╗
   ║ FILE: Deal Locator Page
   ║ DESC: This page shows you deal maps
   ║ CONTRIBUTOR: Open Source
   ╚════════════════════════════════════════════╝ */

'use client';

import { DealLocator } from 'components/DealMap';
import 'react-dropdown/style.css';
import { productDeals } from 'types';

export default function DealLocatorPage() {
  return (
    <>
      <div>
        <h1 className="mx-auto uppercase mt-16 font-bold text-center text-3xl mb-16">
          Find deals near you
        </h1>
      </div>
      <DealLocator deals={productDeals} />
    </>
  );
}
