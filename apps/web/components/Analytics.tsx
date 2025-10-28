'use client';

import React from 'react';
import {
  Bar,
  BarChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// 🎨 Interface / Props Definition
// =====================================
interface MerchantAnalyticsProps {
  salesData: {
    date: string;
    sales: number;
    redemptions: number;
    avgDiscount: number;
  }[];
  nftData: { date: string; minted: number; transferred: number }[];
  topDeals: { title: string; sales: number; redemptions: number }[];
}

interface StatCardProps {
  label: string;
  value: string | number;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => (
  <div className="flex-1  rounded-sm p-4  border border-border-default ">
    <p className={`text-xs font-medium text-gray-200`}>{label}</p>
    <h3 className={`text-xl font-bold mt-1 `}>{value}</h3>
  </div>
);

export const MerchantAnalytics: React.FC<MerchantAnalyticsProps> = ({
  salesData,
  nftData,
  topDeals,
}) => {
  const totalSales = salesData.reduce((acc, cur) => acc + cur.sales, 0);
  const totalRedemptions = salesData.reduce(
    (acc, cur) => acc + cur.redemptions,
    0,
  );
  const avgDiscount = (
    salesData.reduce((acc, cur) => acc + cur.avgDiscount, 0) / salesData.length
  ).toFixed(1);
  const totalMinted = nftData.reduce((acc, cur) => acc + cur.minted, 0);
  const totalTransferred = nftData.reduce(
    (acc, cur) => acc + cur.transferred,
    0,
  );

  return (
    <div className="space-y-8 p-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Sales"
          value={`$${totalSales}`}
          color="text-green-600"
        />
        <StatCard
          label="Total Redemptions"
          value={totalRedemptions}
          color="text-orange-500"
        />
        <StatCard
          label="Average Discount Claimed"
          value={`${avgDiscount}%`}
          color="text-blue-600"
        />
        <StatCard
          label="NFTs Minted"
          value={totalMinted}
          color="text-purple-600"
        />
        <StatCard
          label="NFTs Transferred"
          value={totalTransferred}
          color="text-pink-600"
        />
      </div>

      {/* Sales & Redemption Trends */}
      <div className="border-border-default p-6 rounded-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Sales & Redemption Trends
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={salesData}>
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(val) => `${val}%`}
              tick={{ fontSize: 12 }}
            />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#4A8E5D"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="redemptions"
              stroke="#FFA500"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="avgDiscount"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* NFT Activity */}
      <div className="border-border-default p-6 rounded-sm border">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          NFT Deal Activity
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={nftData}>
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="minted" fill="#4A8E5D" />
            <Bar dataKey="transferred" fill="#FFA500" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Performing Deals */}
      <div className="border-border-default p-6 rounded-sm border">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Top Performing Deals
        </h3>
        <ul className="space-y-2">
          {topDeals.map((deal, i) => (
            <li
              key={i}
              className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50"
            >
              <span className="text-sm font-medium">{deal.title}</span>
              <div className="text-sm text-gray-500 flex gap-4">
                <span>Sales: {deal.sales}</span>
                <span>Redemptions: {deal.redemptions}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
