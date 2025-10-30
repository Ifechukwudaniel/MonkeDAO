/* ╔════════════════════════════════════════════╗
   ║ FILE: Deal Locator Page
   ║ DESC: This page shows you deal maps
   ║ CONTRIBUTOR: Open Source
   ╚════════════════════════════════════════════╝ */

'use client';

import { DealLocator } from 'components/DealMap';
import 'react-dropdown/style.css';
import { productDeals } from 'types';

export default function Store() {
  return (
    <>
      <DealLocator stores={productDeals.map((deal) => ({ deal }))} />
    </>
  );
}
