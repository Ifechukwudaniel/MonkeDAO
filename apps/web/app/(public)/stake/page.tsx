'use client';

import {
  Clock,
  Coins,
  Gift,
  Info,
  Lock,
  Ticket,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';
import { useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function StakingPage() {
  const [selectedTab, setSelectedTab] = useState('token');
  const [stakeAmount, setStakeAmount] = useState('');
  const [stakeDuration, setStakeDuration] = useState('90');

  const rewardsData = [
    { day: 0, rewards: 0 },
    { day: 30, rewards: 120 },
    { day: 60, rewards: 260 },
    { day: 90, rewards: 420 },
    { day: 120, rewards: 600 },
    { day: 150, rewards: 800 },
    { day: 180, rewards: 1020 },
  ];

  // Calculate APY based on duration
  const getAPY = (duration) => {
    switch (duration) {
      case '30':
        return 12;
      case '90':
        return 25;
      case '180':
        return 45;
      default:
        return 12;
    }
  };

  // Calculate tier based on duration
  const getTier = (duration) => {
    switch (duration) {
      case '30':
        return 'BRONZE';
      case '90':
        return 'SILVER';
      case '180':
        return 'GOLD';
      default:
        return 'BRONZE';
    }
  };

  // Calculate estimated rewards
  const calculateRewards = () => {
    if (!stakeAmount || isNaN(stakeAmount)) return '0';
    const amount = parseFloat(stakeAmount);
    const apy = getAPY(stakeDuration);
    const days = parseInt(stakeDuration);
    const dailyRate = apy / 365 / 100;
    const rewards = amount * dailyRate * days;
    return rewards.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-[#fcfbf2] text-gray-900">
      {/* Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lock className="w-10 h-10 text-[#4a8f5d]" strokeWidth={1.5} />
            <h1 className="text-4xl font-bold tracking-tight">
              EARN WHILE YOU HOLD
            </h1>
          </div>
          <p className="text-base font-medium text-gray-200 max-w-2xl mx-auto ">
            Stake your platform tokens or NFT deals to earn rewards.
            <br />
            Turn your unused deals into passive income.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedTab('token')}
            className={`px-8 py-3 font-bold transition-all border-2 ${
              selectedTab === 'token'
                ? 'bg-[#4a8f5d] text-white border-[#4a8f5d]'
                : 'bg-white text-gray-700 border-[#c4c4c4] hover:border-[#4a8f5d]'
            }`}
          >
            <Coins className="w-5 h-5 inline mr-2" strokeWidth={1.5} />
            PLATFORM_TOKEN_STAKING
          </button>
          <button
            onClick={() => setSelectedTab('nft')}
            className={`px-8 py-3 font-bold transition-all border-2 ${
              selectedTab === 'nft'
                ? 'bg-[#4a8f5d] text-white border-[#4a8f5d]'
                : 'bg-white text-gray-700 border-[#c4c4c4] hover:border-[#4a8f5d]'
            }`}
          >
            <Ticket className="w-5 h-5 inline mr-2" strokeWidth={1.5} />
            NFT_DEAL_STAKING
          </button>
        </div>

        {/* Token Staking Section */}
        {selectedTab === 'token' && (
          <div className="max-w-7xl mx-auto">
            {/* Pool Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white border-2 border-[#c4c4c4] p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="w-4 h-4 text-[#4a8f5d]" strokeWidth={1.5} />
                  <span className="text-xs text-gray-600 font-bold">
                    TVL_LOCKED
                  </span>
                </div>
                <div className="text-2xl font-bold text-[#4a8f5d]">
                  2,450,000
                </div>
                <div className="text-xs text-gray-600 mt-1">DEAL_TOKENS</div>
              </div>

              <div className="bg-white border-2 border-[#c4c4c4] p-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp
                    className="w-4 h-4 text-[#4a8f5d]"
                    strokeWidth={1.5}
                  />
                  <span className="text-xs text-gray-600 font-bold">
                    POOL_APY
                  </span>
                </div>
                <div className="text-2xl font-bold text-[#4a8f5d]">12-45%</div>
                <div className="text-xs text-gray-600 mt-1">
                  BASED_ON_LOCK_PERIOD
                </div>
              </div>

              <div className="bg-white border-2 border-[#c4c4c4] p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-[#4a8f5d]" strokeWidth={1.5} />
                  <span className="text-xs text-gray-600 font-bold">
                    TOTAL_STAKERS
                  </span>
                </div>
                <div className="text-2xl font-bold text-[#4a8f5d]">1,847</div>
                <div className="text-xs text-gray-600 mt-1">ACTIVE_USERS</div>
              </div>

              <div className="bg-white border-2 border-[#c4c4c4] p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Gift className="w-4 h-4 text-[#4a8f5d]" strokeWidth={1.5} />
                  <span className="text-xs text-gray-600 font-bold">
                    REWARDS_IN_POOL
                  </span>
                </div>
                <div className="text-2xl font-bold text-[#4a8f5d]">580,000</div>
                <div className="text-xs text-gray-600 mt-1">DEAL_TOKENS</div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - User Stats & Chart */}
              <div className="lg:col-span-2 space-y-6">
                {/* User Staking Card */}
                <div className="bg-white border-2 border-[#c4c4c4] p-6">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Wallet
                      className="w-5 h-5 text-[#4a8f5d]"
                      strokeWidth={1.5}
                    />
                    YOUR_STAKING_POSITION
                  </h3>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="border-2 border-[#c4c4c4] p-4">
                      <div className="text-xs text-gray-600 mb-2">
                        STAKED_AMOUNT
                      </div>
                      <div className="text-xl font-bold text-[#4a8f5d]">
                        0.00
                      </div>
                      <div className="text-xs text-gray-600 mt-1">DEAL</div>
                    </div>
                    <div className="border-2 border-[#c4c4c4] p-4">
                      <div className="text-xs text-gray-600 mb-2">
                        EARNED_REWARDS
                      </div>
                      <div className="text-xl font-bold text-[#4a8f5d]">
                        0.00
                      </div>
                      <div className="text-xs text-gray-600 mt-1">DEAL</div>
                    </div>
                    <div className="border-2 border-[#c4c4c4] p-4">
                      <div className="text-xs text-gray-600 mb-2">
                        CURRENT_TIER
                      </div>
                      <div className="text-xl font-bold text-gray-400">
                        NONE
                      </div>
                      <div className="text-xs text-gray-600 mt-1">-</div>
                    </div>
                  </div>

                  <div className="bg-[#fcfbf2] border-2 border-[#c4c4c4] p-4">
                    <div className="text-xs text-gray-600 mb-2">
                      &gt; WALLET_BALANCE
                    </div>
                    <div className="text-2xl font-bold">0.00 DEAL</div>
                  </div>
                </div>

                {/* Rewards Projection Chart */}
                <div className="bg-white border-2 border-[#c4c4c4] p-6">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <TrendingUp
                      className="w-5 h-5 text-[#4a8f5d]"
                      strokeWidth={1.5}
                    />
                    REWARDS_PROJECTION_[180_DAYS]
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={rewardsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#c4c4c4" />
                      <XAxis
                        dataKey="day"
                        stroke="#666"
                        style={{ fontFamily: 'monospace', fontSize: '12px' }}
                        label={{
                          value: 'DAYS',
                          position: 'insideBottom',
                          offset: -5,
                          style: { fontFamily: 'monospace' },
                        }}
                      />
                      <YAxis
                        stroke="#666"
                        style={{ fontFamily: 'monospace', fontSize: '12px' }}
                        label={{
                          value: 'REWARDS',
                          angle: -90,
                          position: 'insideLeft',
                          style: { fontFamily: 'monospace' },
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          fontFamily: 'monospace',
                          backgroundColor: '#fcfbf2',
                          border: '2px solid #c4c4c4',
                        }}
                        labelFormatter={(value) => `DAY_${value}`}
                        formatter={(value) => [`${value}_DEAL`, 'REWARDS']}
                      />
                      <Line
                        type="monotone"
                        dataKey="rewards"
                        stroke="#4a8f5d"
                        strokeWidth={3}
                        dot={{ fill: '#4a8f5d', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="text-xs text-gray-600 text-center mt-4">
                    &gt; BASED_ON_10,000_DEAL_STAKED_AT_45%_APY
                  </div>
                </div>

                {/* Tier Benefits */}
                <div className="bg-white border-2 border-[#c4c4c4] p-6">
                  <h3 className="text-xl font-bold mb-6">
                    STAKING_TIERS_&_BENEFITS
                  </h3>
                  <div className="space-y-4">
                    <div className="border-2 border-[#c4c4c4] p-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold">BRONZE_TIER</span>
                        <span className="text-sm text-gray-600">
                          30_DAYS | 12%_APY
                        </span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="text-gray-600">
                          &gt; 2% cashback on purchases
                        </div>
                        <div className="text-gray-600">
                          &gt; Early access to flash deals
                        </div>
                      </div>
                    </div>
                    <div className="border-2 border-[#4a8f5d] bg-[#fcfbf2] p-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold">SILVER_TIER</span>
                        <span className="text-sm text-gray-600">
                          90_DAYS | 25%_APY
                        </span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="text-gray-600">
                          &gt; 5% cashback on purchases
                        </div>
                        <div className="text-gray-600">
                          &gt; Exclusive VIP deals
                        </div>
                        <div className="text-gray-600">
                          &gt; Voting rights on listings
                        </div>
                      </div>
                    </div>
                    <div className="border-2 border-[#c4c4c4] p-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold">GOLD_TIER</span>
                        <span className="text-sm text-gray-600">
                          180_DAYS | 45%_APY
                        </span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="text-gray-600">
                          &gt; 10% cashback on purchases
                        </div>
                        <div className="text-gray-600">
                          &gt; Whitelist for partner drops
                        </div>
                        <div className="text-gray-600">
                          &gt; Priority customer support
                        </div>
                        <div className="text-gray-600">
                          &gt; Full governance power
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Staking Form */}
              <div className="lg:col-span-1">
                <div className="bg-white border-2 border-[#4a8f5d] p-6 sticky top-6">
                  <h3 className="text-xl font-bold mb-6">STAKE_DEAL_TOKENS</h3>

                  {/* Amount Input */}
                  <div className="mb-6">
                    <label className="text-sm font-bold text-gray-600 block mb-2">
                      STAKE_AMOUNT
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full border-2 border-[#c4c4c4] p-3 font-bold text-lg focus:outline-none focus:border-[#4a8f5d]"
                      />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-[#4a8f5d] hover:underline">
                        MAX
                      </button>
                    </div>
                    <div className="text-xs text-gray-600 mt-2">
                      BALANCE: 0.00 DEAL
                    </div>
                  </div>

                  {/* Duration Selection */}
                  <div className="mb-6">
                    <label className="text-sm font-bold text-gray-600 block mb-3">
                      STAKING_DURATION
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between border-2 border-[#c4c4c4] p-3 cursor-pointer hover:border-[#4a8f5d] transition-colors">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="duration"
                            value="30"
                            checked={stakeDuration === '30'}
                            onChange={(e) => setStakeDuration(e.target.value)}
                            className="w-4 h-4"
                          />
                          <div>
                            <div className="font-bold text-sm">30_DAYS</div>
                            <div className="text-xs text-gray-600">
                              BRONZE_TIER
                            </div>
                          </div>
                        </div>
                        <div className="font-bold text-[#4a8f5d]">12%</div>
                      </label>

                      <label className="flex items-center justify-between border-2 border-[#c4c4c4] p-3 cursor-pointer hover:border-[#4a8f5d] transition-colors">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="duration"
                            value="90"
                            checked={stakeDuration === '90'}
                            onChange={(e) => setStakeDuration(e.target.value)}
                            className="w-4 h-4"
                          />
                          <div>
                            <div className="font-bold text-sm">90_DAYS</div>
                            <div className="text-xs text-gray-600">
                              SILVER_TIER
                            </div>
                          </div>
                        </div>
                        <div className="font-bold text-[#4a8f5d]">25%</div>
                      </label>

                      <label className="flex items-center justify-between border-2 border-[#c4c4c4] p-3 cursor-pointer hover:border-[#4a8f5d] transition-colors">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="duration"
                            value="180"
                            checked={stakeDuration === '180'}
                            onChange={(e) => setStakeDuration(e.target.value)}
                            className="w-4 h-4"
                          />
                          <div>
                            <div className="font-bold text-sm">180_DAYS</div>
                            <div className="text-xs text-gray-600">
                              GOLD_TIER
                            </div>
                          </div>
                        </div>
                        <div className="font-bold text-[#4a8f5d]">45%</div>
                      </label>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-[#fcfbf2] border-2 border-[#c4c4c4] p-4 mb-6">
                    <div className="text-xs font-bold text-gray-600 mb-3">
                      STAKING_SUMMARY
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">AMOUNT:</span>
                        <span className="font-bold">
                          {stakeAmount || '0.00'}_DEAL
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">DURATION:</span>
                        <span className="font-bold">{stakeDuration}_DAYS</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">APY:</span>
                        <span className="font-bold text-[#4a8f5d]">
                          {getAPY(stakeDuration)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">TIER:</span>
                        <span className="font-bold">
                          {getTier(stakeDuration)}
                        </span>
                      </div>
                      <div className="border-t-2 border-[#c4c4c4] pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">EST_REWARDS:</span>
                          <span className="font-bold text-[#4a8f5d]">
                            {calculateRewards()}_DEAL
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stake Button */}
                  <button className="w-full bg-[#4a8f5d] hover:bg-[#3d7a4d] text-white font-bold py-4 transition-all border-2 border-[#4a8f5d] mb-4">
                    STAKE_TOKENS
                  </button>

                  {/* Info */}
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>&gt; Tokens will be locked for selected period</div>
                    <div>&gt; Rewards accumulate daily</div>
                    <div>&gt; Early unstaking incurs 20% penalty</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NFT Staking Section */}
        {selectedTab === 'nft' && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white border-2 border-[#c4c4c4] p-8 relative">
              {/* Coming Soon Badge */}
              <div className="absolute top-0 right-0 bg-[#4a8f5d] text-white px-6 py-2 font-bold text-sm border-l-2 border-b-2 border-[#c4c4c4]">
                [COMING_SOON]
              </div>

              <div className="flex items-start gap-4 mb-8 pb-6 border-b-2 border-[#c4c4c4]">
                <div className="border-2 border-[#4a8f5d] p-3">
                  <Ticket
                    className="w-8 h-8 text-[#4a8f5d]"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2 tracking-tight">
                    NFT_DEAL_STAKING [ADVANCED]
                  </h2>
                  <p className="text-gray-700">
                    &gt; Stake your unused NFT deals directly and earn from
                    merchant-funded reward pools
                  </p>
                </div>
              </div>

              {/* How It Works */}
              <div className="bg-[#fcfbf2] border-2 border-[#c4c4c4] p-6 mb-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Info className="w-5 h-5 text-[#4a8f5d]" strokeWidth={1.5} />
                  HOW_IT_WILL_WORK
                </h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="border-2 border-[#4a8f5d] w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold mb-2 text-sm">OWN_NFT_DEALS</h4>
                      <p className="text-xs text-gray-600">
                        Purchase or collect deal NFTs from merchants
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="border-2 border-[#4a8f5d] w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold mb-2 text-sm">
                        CHOOSE_MERCHANT_POOL
                      </h4>
                      <p className="text-xs text-gray-600">
                        Stake in pools with highest APY or best rewards
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="border-2 border-[#4a8f5d] w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold mb-2 text-sm">
                        EARN_WHILE_LOCKED
                      </h4>
                      <p className="text-xs text-gray-600">
                        NFT locked, expiry paused, rewards accumulate
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="border-2 border-[#4a8f5d] w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold mb-2 text-sm">
                        UNSTAKE_AND_REDEEM
                      </h4>
                      <p className="text-xs text-gray-600">
                        Get NFT back + rewards, then use your deal
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Example Pools */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-6">
                  EXAMPLE_MERCHANT_POOLS
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-[#fcfbf2] border-2 border-[#c4c4c4] p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 border-2 border-[#4a8f5d] flex items-center justify-center font-bold text-xl">
                        S
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">
                          SPOTIFY_PREMIUM_POOL
                        </h4>
                        <p className="text-sm text-gray-600">
                          3_MONTH_SUBSCRIPTION_DEAL
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between pb-2 border-b border-[#c4c4c4]">
                        <span className="text-gray-600">APY:</span>
                        <span className="text-2xl font-bold text-[#4a8f5d]">
                          35%
                        </span>
                      </div>
                      <div className="flex items-center justify-between pb-2 border-b border-[#c4c4c4]">
                        <span className="text-gray-600">POOL_REWARDS:</span>
                        <span className="font-bold">25,000_DEAL</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">CURRENTLY_STAKED:</span>
                        <span className="font-bold">342_NFTs</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#fcfbf2] border-2 border-[#c4c4c4] p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 border-2 border-[#4a8f5d] flex items-center justify-center font-bold text-xl">
                        A
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">
                          AMAZON_$50_GIFT_CARD_POOL
                        </h4>
                        <p className="text-sm text-gray-600">
                          $50_SHOPPING_CREDIT
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between pb-2 border-b border-[#c4c4c4]">
                        <span className="text-gray-600">APY:</span>
                        <span className="text-2xl font-bold text-[#4a8f5d]">
                          18%
                        </span>
                      </div>
                      <div className="flex items-center justify-between pb-2 border-b border-[#c4c4c4]">
                        <span className="text-gray-600">POOL_REWARDS:</span>
                        <span className="font-bold">50,000_DEAL</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">CURRENTLY_STAKED:</span>
                        <span className="font-bold">1,247_NFTs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Stake NFTs */}
              <div className="bg-[#fcfbf2] border-2 border-[#c4c4c4] p-6 mb-8">
                <h3 className="text-xl font-bold mb-6">
                  WHY_STAKE_YOUR_NFT_DEALS?
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="border-2 border-[#4a8f5d] p-2 flex-shrink-0">
                      <TrendingUp
                        className="w-5 h-5 text-[#4a8f5d]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">
                        TURN_IDLE_ASSETS_INTO_INCOME
                      </h4>
                      <p className="text-sm text-gray-600">
                        Got a deal you won't use for months? Earn rewards while
                        it sits in your wallet
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="border-2 border-[#4a8f5d] p-2 flex-shrink-0">
                      <Clock
                        className="w-5 h-5 text-[#4a8f5d]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">EXPIRY_TIMER_PAUSED</h4>
                      <p className="text-sm text-gray-600">
                        Your NFT's validity period freezes while staked - no
                        rush to redeem
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="border-2 border-[#4a8f5d] p-2 flex-shrink-0">
                      <Gift
                        className="w-5 h-5 text-[#4a8f5d]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">
                        MERCHANT_FUNDED_REWARDS
                      </h4>
                      <p className="text-sm text-gray-600">
                        Merchants create reward pools to incentivize delayed
                        redemption
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="border-2 border-[#4a8f5d] p-2 flex-shrink-0">
                      <Lock
                        className="w-5 h-5 text-[#4a8f5d]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">PROTECTED_VALUE</h4>
                      <p className="text-sm text-gray-600">
                        Staked NFTs can't be accidentally sold or transferred
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#fcfbf2] border-2 border-[#4a8f5d] p-6 text-center">
                <h4 className="font-bold text-lg mb-2">[IN_DEVELOPMENT]</h4>
                <p className="text-gray-700 mb-4">
                  &gt; We're building the smart contracts and merchant
                  onboarding flow for NFT staking.
                  <br />
                  &gt; This feature will launch in Q1 2026.
                </p>
                <button className="bg-white border-2 border-[#c4c4c4] text-gray-600 font-bold py-3 px-6 cursor-not-allowed">
                  NOTIFY_ME_WHEN_LIVE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
