/* ╔════════════════════════════════════════════╗
   ║ FILE: Merchant Analysis               
   ║ DESC: Analysis details page
   ║ CONTRIBUTOR: Open Source                              
   ╚════════════════════════════════════════════╝ */

import { MerchantAnalytics } from 'components/Analytics';
import { nftData, salesData, topDeals } from 'data';

export default function Analytics() {
  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Merchant Analytics</h1>
      <MerchantAnalytics
        salesData={salesData}
        nftData={nftData}
        topDeals={topDeals}
      />
    </div>
  );
}
