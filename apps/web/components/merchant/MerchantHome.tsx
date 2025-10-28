'use client';

import DealCard from 'components/DealCard';
import { BarChart3, Heart, ShoppingCart, Ticket, Users } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { productDeals } from 'types';

// --------------------------
// 1️⃣ Stat Card
// --------------------------
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
}

const StatCard = ({ title, value, icon, trend }: StatCardProps) => (
  <div className=" border border-border-default rounded-sm p-4 flex flex-col justify-between hover:shadow-md transition-all duration-200">
    <div className="flex items-center justify-between">
      <div className="text-gray-700">{icon}</div>
      <div className="text-right">
        <h2 className="text-2xl font-bold text-gray-200">{value}</h2>
        {trend && <p className="text-xs text-green-500">{trend}</p>}
      </div>
    </div>
    <p className="mt-2 text-sm text-gray-800">{title}</p>
  </div>
);

// --------------------------
// 2️⃣ Quick Action Button
// --------------------------
interface ActionButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const ActionButton = ({ label, icon, onClick }: ActionButtonProps) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl hover:bg-green-100 transition"
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </button>
);

// --------------------------
// 3️⃣ Mini Deal Card
// --------------------------
interface DealCardMiniProps {
  title: string;
  image: string;
  discount: number;
  redeemed?: number;
}

const DealCardMini = ({
  title,
  image,
  discount,
  redeemed,
}: DealCardMiniProps) => (
  <div className="w-full max-w-[200px] bg-white/5 backdrop-blur-sm border border-gray-200 rounded-xl p-2 flex flex-col gap-2 hover:shadow-md transition">
    <Image
      src={image}
      alt={title}
      width={200}
      height={120}
      className="rounded-lg object-cover"
    />
    <p className="text-sm font-semibold line-clamp-2">{title}</p>
    <div className="flex justify-between text-xs text-gray-500">
      <span>{discount}% OFF</span>
      {redeemed !== undefined && <span>{redeemed} redeemed</span>}
    </div>
  </div>
);

// --------------------------
// 4️⃣ Recent Activity Item
// --------------------------
interface ActivityItemProps {
  user: string;
  action: string;
  deal: string;
  time: string;
}

const ActivityItem = ({ user, action, deal, time }: ActivityItemProps) => (
  <div className="flex items-center justify-between p-2 rounded-sm hover:bg-primary/10  border border-transparent hover:border-primary transition">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
        {user.charAt(0)}
      </div>
      <p className="text-sm text-gray-700">
        <span className="font-medium">{user}</span> {action}{' '}
        <span className="font-semibold">{deal}</span>
      </p>
    </div>
    <p className="text-xs text-gray-400">{time}</p>
  </div>
);

// --------------------------
// 5️⃣ Merchant Dashboard Home
// --------------------------
export const MerchantDashboardHome = () => {
  // Dummy Data
  const stats = [
    {
      title: 'Active NFT Deals',
      value: 12,
      icon: <Ticket size={24} />,
      trend: '+5%',
    },
    {
      title: 'Deals Redeemed',
      value: 87,
      icon: <ShoppingCart size={24} />,
      trend: '+12%',
    },
    { title: 'Users Holding NFTs', value: 142, icon: <Users size={24} /> },
    {
      title: 'Revenue Generated',
      value: '$3,420',
      icon: <BarChart3 size={24} />,
      trend: '+8%',
    },
  ];

  const quickActions = [
    {
      label: 'Create Deal',
      icon: <Ticket size={18} />,
      onClick: () => console.log('Create Deal'),
    },
    {
      label: 'View Marketplace',
      icon: <Heart size={18} />,
      onClick: () => console.log('Marketplace'),
    },
    {
      label: 'View Redemptions',
      icon: <ShoppingCart size={18} />,
      onClick: () => console.log('Redemptions'),
    },
  ];

  const topDeals = [
    {
      title: '50% off Flight to Lagos',
      image: '/dummy-flight.jpg',
      discount: 50,
      redeemed: 12,
    },
    {
      title: '30% off iPhone 15',
      image: '/dummy-phone.jpg',
      discount: 30,
      redeemed: 8,
    },
    {
      title: 'Buy 1 Get 1 Pizza',
      image: '/dummy-pizza.jpg',
      discount: 50,
      redeemed: 25,
    },
  ];

  const recentActivity = [
    {
      user: 'Alice',
      action: 'claimed',
      deal: '50% off Flight to Lagos',
      time: '2h ago',
    },
    {
      user: 'Bob',
      action: 'redeemed',
      deal: 'Buy 1 Get 1 Pizza',
      time: '3h ago',
    },
    {
      user: 'Charlie',
      action: 'resold',
      deal: '30% off iPhone 15',
      time: '5h ago',
    },
  ];

  return (
    <div className="space-y-6 p-6 ">
      {/* 1️⃣ Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard
            key={i}
            title={s.title}
            value={s.value}
            icon={s.icon}
            trend={s.trend}
          />
        ))}
      </div>

      {/* 3️⃣ Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="border border-border-default rounded-sm p-4 min-h-[200px] flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            Sales Over Time
          </h3>
          <div className="flex-1 flex items-center justify-center text-gray-200">
            {/* TODO: Mini Chart */}
            Chart placeholder
          </div>
        </div>
        <div className="border border-border-default rounded-sm p-4 min-h-[200px] flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            Recent Activity
          </h3>
          <div className="flex-1 flex-col flex  justify-center text-gray-200">
            {recentActivity.map((act, i) => (
              <ActivityItem key={i} {...act} />
            ))}
          </div>
        </div>
      </div>

      {/* 4️⃣ Top Deals */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Top Deals</h3>
        <div className="flex gap-4 overflow-x-auto">
          {productDeals?.map((f) => (
            <DealCard key={f.id} deal={f} />
          ))}
        </div>
      </div>
    </div>
  );
};
