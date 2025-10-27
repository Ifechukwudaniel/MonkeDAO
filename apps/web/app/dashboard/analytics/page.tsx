import { MerchantAnalytics } from 'components/Analytics';

export default function Analytics() {
  // 🌿 Demo data
  const salesData = [
    { date: '2025-10-20', sales: 1200, redemptions: 80, avgDiscount: 15 },
    { date: '2025-10-21', sales: 1500, redemptions: 110, avgDiscount: 12 },
    { date: '2025-10-22', sales: 1800, redemptions: 130, avgDiscount: 18 },
    { date: '2025-10-23', sales: 2000, redemptions: 170, avgDiscount: 10 },
    { date: '2025-10-24', sales: 1600, redemptions: 140, avgDiscount: 14 },
  ];

  const nftData = [
    { date: '2025-10-20', minted: 50, transferred: 10 },
    { date: '2025-10-21', minted: 70, transferred: 15 },
    { date: '2025-10-22', minted: 90, transferred: 25 },
    { date: '2025-10-23', minted: 120, transferred: 40 },
    { date: '2025-10-24', minted: 100, transferred: 35 },
  ];

  const topDeals = [
    { title: '50% Off Flight to Lagos', sales: 120, redemptions: 95 },
    { title: 'Free Headphones with Laptop', sales: 80, redemptions: 60 },
    { title: '20% Off Pizza Delivery', sales: 200, redemptions: 150 },
  ];

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
