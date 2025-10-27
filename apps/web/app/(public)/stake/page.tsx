'use client';

import { Button } from '@monkedeals/ui/components/button';
import { Card, CardContent } from '@monkedeals/ui/components/card';
import { Coins, Gift, LineChart, Wallet } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function StakingDashboard() {
  const [stakedNFTs, setStakedNFTs] = useState<number[]>([]);

  const mockNFTs = [
    {
      id: 1,
      title: "20% Off John's Diner",
      image: '/images/diner.jpg',
      rewardRate: '8% APY',
      status: 'Unstaked',
    },
    {
      id: 2,
      title: '50% Off Spa Voucher',
      image: '/images/spa.jpg',
      rewardRate: '10% APY',
      status: 'Staked',
    },
  ];

  const analyticsData = [
    { name: 'Mon', rewards: 200 },
    { name: 'Tue', rewards: 350 },
    { name: 'Wed', rewards: 400 },
    { name: 'Thu', rewards: 280 },
    { name: 'Fri', rewards: 500 },
  ];

  const toggleStake = (id: number) => {
    setStakedNFTs((prev) =>
      prev.includes(id) ? prev.filter((nftId) => nftId !== id) : [...prev, id],
    );
  };

  return (
    <div className="p-6 space-y-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Wallet />} label="Total NFTs Staked" value="12" />
        <StatCard
          icon={<Coins />}
          label="Total Rewards Earned"
          value="1,450 $MNKD"
        />
        <StatCard icon={<LineChart />} label="APY Rate" value="8.3%" />
        <StatCard icon={<Gift />} label="Active Promotions" value="3" />
      </div>

      {/* NFT Cards */}
      <section>
        <h2 className="text-lg font-semibold mb-4">My Deal NFTs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {mockNFTs.map((nft) => {
            const isStaked = stakedNFTs.includes(nft.id);
            return (
              <Card
                key={nft.id}
                className="overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <Image
                  src={nft.image}
                  alt={nft.title}
                  width={400}
                  height={250}
                  className="object-cover w-full h-40"
                />
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-semibold text-gray-900">{nft.title}</h3>
                  <p className="text-sm text-gray-500">
                    Reward: {nft.rewardRate}
                  </p>
                  <p
                    className={`text-xs font-medium ${
                      isStaked ? 'text-green-600' : 'text-gray-400'
                    }`}
                  >
                    {isStaked ? 'Currently Staked' : 'Unstaked'}
                  </p>
                  <div className="pt-2">
                    <Button
                      onClick={() => toggleStake(nft.id)}
                      className={`w-full ${
                        isStaked
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      {isStaked ? 'Unstake' : 'Stake NFT'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Reward Analytics */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Rewards Analytics</h2>
        <Card className="p-4">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analyticsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="rewards" fill="#4A8F5D" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </section>
    </div>
  );
}

const StatCard = ({ icon, label, value }) => (
  <Card className="p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition">
    <div className="p-3 bg-[#4A8F5D20] text-[#4A8F5D] rounded-xl">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <h3 className="text-xl font-semibold text-gray-900">{value}</h3>
    </div>
  </Card>
);
