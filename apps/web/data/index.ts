import type { Profile } from 'types/product';

export const mockProfile: Profile = {
  id: 'user_001',
  username: 'Total Monke',
  walletAddress: '0xBEEF123456789ABCDEF9876543210BEEF123456',
  avatarUrl:
    'https://prod-image-cdn.tensor.trade/images/90x90/freeze=false/https%3A%2F%2Fprod-tensor-creators-s3.s3.us-east-1.amazonaws.com%2Fimage%2Fadf0c9f9-8438-4ed3-862a-b82d8f380495',
  joinedDate: 'Oct 2025',
  lastActive: '2h ago',
  reputation: {
    points: 180,
    level: 'L2: Deal Hunter',
    totalDeals: 5,
    dealsPosted: 2,
    comments: 8,
    likesGiven: 40,
    followers: 12,
    following: 7,
    nftRedeemed: 4,
  },
  badges: [
    {
      id: 'badge_2',
      name: 'Early Supporter',
      description: 'Joined during beta',
      image: '/star-medal.png',
      level: 1,
    },
  ],
  bestDeal: {
    title: 'SuiCon 2025 VIP NFT Ticket – 40% Off',
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
    likes: 142,
    slug: 'suicon-vip-ticket',
  },
};

export const salesData = [
  { date: '2025-10-20', sales: 1200, redemptions: 80, avgDiscount: 15 },
  { date: '2025-10-21', sales: 1500, redemptions: 110, avgDiscount: 12 },
  { date: '2025-10-22', sales: 1800, redemptions: 130, avgDiscount: 18 },
  { date: '2025-10-23', sales: 2000, redemptions: 170, avgDiscount: 10 },
  { date: '2025-10-24', sales: 1600, redemptions: 140, avgDiscount: 14 },
];

export const nftData = [
  { date: '2025-10-20', minted: 50, transferred: 10 },
  { date: '2025-10-21', minted: 70, transferred: 15 },
  { date: '2025-10-22', minted: 90, transferred: 25 },
  { date: '2025-10-23', minted: 120, transferred: 40 },
  { date: '2025-10-24', minted: 100, transferred: 35 },
];

export const topDeals = [
  { title: '50% Off Flight to Lagos', sales: 120, redemptions: 95 },
  { title: 'Free Headphones with Laptop', sales: 80, redemptions: 60 },
  { title: '20% Off Pizza Delivery', sales: 200, redemptions: 150 },
];

export const mockNotifications = [
  {
    title: 'A deal was posted matching Lego',
    message:
      'Nintendo eShop Sale: Hot Wheels Unleashed $6; Deliver Us the Moon $6; Sonic Origins $10.49; Dave the Diver $13 & More',
    author: 'Eragorn',
    category: 'Hot Deals',
    time: '1:36 PM',
    iconType: 'deal',
  },
  {
    title: 'Exclusive NFT Reward',
    message:
      'You received a loyalty NFT from MerchantX for your recent purchase!',
    author: 'MerchantX',
    category: 'Rewards',
    time: '12:50 PM',
    iconType: 'gift',
  },
  {
    title: 'Flash Deal Alert',
    message: '50% off on Solana Essentials Kit for the next 2 hours!',
    author: 'SolanaShop',
    category: 'Hot Deals',
    time: '11:15 AM',
    iconType: 'alert',
  },
  {
    title: 'Your deal was liked',
    message: "Eragorn liked your posted deal: 'Crypto Gaming Bundle'.",
    author: 'Eragorn',
    category: 'Social',
    time: 'Yesterday 9:42 PM',
    iconType: 'deal',
  },
  {
    title: 'New NFT Coupon Available',
    message: "Claim your free NFT coupon for 'Metaverse Gym Membership'.",
    author: 'MetaFit',
    category: 'Rewards',
    time: 'Yesterday 7:08 PM',
    iconType: 'gift',
  },
];
