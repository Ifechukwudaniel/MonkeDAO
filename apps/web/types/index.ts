export type DealCategory =
  | 'travel'
  | 'food'
  | 'gifts'
  | 'experiences'
  | 'luxury'
  | 'collectibles';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  address: string;
  city: string;
  state?: string;
  country: string;
  coordinates?: Coordinates;
  distanceFromCenter?: number;
}

export interface Merchant {
  id: string;
  name: string;
  walletAddress?: string;
  verifiedMerchant: boolean;
  dateJoined: string;
  totalDeals: number;
  merchantRating: number;
  totalReviews: number;
  responseRate?: number;
  responseTime?: string;
  logoUrl?: string;
}

export interface Pricing {
  originalPrice: number;
  discountedPrice: number;
  currency: string;
  priceUnit?: string;
  discountPercentage: number;
  savings: number;
  includesFees?: boolean;
  taxesIncluded?: boolean;
}

export interface RatingBreakdown {
  '5star': number;
  '4star': number;
  '3star': number;
  '2star': number;
  '1star': number;
}

export interface Rating {
  average: number;
  totalReviews: number;
  breakdown: RatingBreakdown;
}

export interface DealOption {
  id: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  available: boolean;
  maxGuests?: number;
  refundable?: boolean;
}

export interface Availability {
  startDate: string;
  endDate: string;
  bookingDeadline?: string;
  blackoutDates?: string[];
}

export interface NFTDetails {
  mintable: boolean;
  tokenStandard: 'ERC-721' | 'ERC-1155';
  royaltyPercentage?: number;
  transferable: boolean;
  maxSupply?: number;
  currentMinted?: number;
}

export interface ReviewerReputation {
  level: string;
  totalReviews: number;
  badges: string[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  walletAddress?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpful: number;
  reputation: ReviewerReputation;
  images?: string[];
}

export interface PurchaseStats {
  totalPurchased: number;
  purchasedLast24h: number;
  viewsLast24h: number;
  trending: boolean;
}

export interface BlockchainMetadata {
  contractAddress: string;
  tokenId?: string;
  chainId: number;
}

export interface ProductDeal {
  id: string;
  slug: string;
  category: DealCategory;
  subCategory: string;
  title: string;
  shortDescription: string;
  bannerImage: string;
  images: string[];
  merchant: Merchant;
  pricing: Pricing;
  dealScore: number;
  rating: Rating;
  tags: string[];
  location: Location;
  description: string;
  amenities?: string[];
  options: DealOption[];
  availability: Availability;
  nftDetails: NFTDetails;
  reviews: Review[];
  purchaseStats: PurchaseStats;
  blockchain: BlockchainMetadata;
}

export const productDeals: ProductDeal[] = [
  {
    id: 'deal_001',
    slug: 'radisson-blu-aqua-chicago-millennium-park',
    category: 'travel',
    subCategory: 'hotels',
    title:
      'Radisson Blu Aqua Hotel Chicago - Luxury Stay Near Millennium Park with Breakfast & Valet',
    shortDescription:
      'Member-exclusive luxury hotel experience in downtown Chicago',
    bannerImage:
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    images: [
      'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      'https://images.pexels.com/photos/21014/pexels-photo.jpg',
      'https://images.pexels.com/photos/327482/pexels-photo-327482.jpeg',
    ],
    merchant: {
      id: 'merchant_rad_001',
      name: 'Radisson Hotels',
      walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      verifiedMerchant: true,
      dateJoined: '2024-03-15T00:00:00Z',
      totalDeals: 47,
      merchantRating: 4.7,
      totalReviews: 1243,
      responseRate: 98,
      responseTime: 'within 2 hours',
      logoUrl:
        'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    },
    pricing: {
      originalPrice: 170.44,
      discountedPrice: 153.7,
      currency: 'USD',
      priceUnit: 'per night',
      discountPercentage: 10,
      savings: 16.74,
      includesFees: true,
      taxesIncluded: true,
    },
    dealScore: 92,
    rating: {
      average: 4.5,
      totalReviews: 46,
      breakdown: {
        '5star': 28,
        '4star': 12,
        '3star': 4,
        '2star': 1,
        '1star': 1,
      },
    },
    tags: [
      'Member Exclusive',
      'Best Rated',
      'Downtown',
      'Breakfast Included',
      'Parking Included',
      'Pet Friendly',
    ],
    location: {
      address: '221 N Columbus Dr, Chicago, IL 60601',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      coordinates: { lat: 41.8868, lng: -87.6217 },
      distanceFromCenter: 0.5,
    },
    description:
      'Experience luxury in the heart of downtown Chicago at the stunning Radisson Blu Aqua Hotel. Featuring breathtaking views, plush amenities, and direct access to Millennium Park. Enjoy free breakfast, valet parking, rooftop bar, and indoor pool. Perfect for leisure and business travelers.',
    amenities: [
      'Free WiFi',
      'Breakfast Included',
      'Valet Parking',
      'Rooftop Bar',
      'Indoor Pool',
      'Fitness Center',
      '24/7 Front Desk',
      'Concierge Service',
      'Room Service',
      'Business Center',
    ],
    options: [
      {
        id: 'opt_001_1',
        name: 'Standard Queen Room',
        originalPrice: 170.44,
        discountedPrice: 153.7,
        available: true,
        maxGuests: 2,
      },
      {
        id: 'opt_001_2',
        name: 'Deluxe King with Lake View',
        originalPrice: 220.5,
        discountedPrice: 198.45,
        available: true,
        maxGuests: 2,
      },
      {
        id: 'opt_001_3',
        name: 'Executive Suite',
        originalPrice: 310.0,
        discountedPrice: 279.0,
        available: true,
        maxGuests: 4,
      },
    ],
    availability: {
      startDate: '2025-10-25',
      endDate: '2026-03-31',
      bookingDeadline: '2026-03-28',
      blackoutDates: ['2025-12-24', '2025-12-25', '2025-12-31', '2026-01-01'],
    },
    nftDetails: {
      mintable: true,
      tokenStandard: 'ERC-1155',
      royaltyPercentage: 2.5,
      transferable: true,
      maxSupply: 1000,
      currentMinted: 342,
    },
    reviews: [
      {
        id: 'rev_001_1',
        userId: 'user_0x7a3c',
        userName: 'Sarah Mitchell',
        walletAddress: '0x7a3c8F9d2E1b4A5c6D8e9F0a1B2c3D4e5F6a7B8c',
        rating: 5,
        date: '2025-10-15T14:30:00Z',
        title: 'Absolutely Stunning Hotel!',
        comment:
          'The Radisson Blu Aqua exceeded all expectations. Amazing staff, excellent breakfast, and unreal rooftop views. Definitely returning!',
        verifiedPurchase: true,
        helpful: 24,
        reputation: {
          level: 'Gold Reviewer',
          totalReviews: 87,
          badges: ['Verified Traveler', 'Top Contributor'],
        },
        images: [
          'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
          'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
        ],
      },
    ],
    purchaseStats: {
      totalPurchased: 2847,
      purchasedLast24h: 23,
      viewsLast24h: 456,
      trending: true,
    },
    blockchain: {
      contractAddress: '0x1234567890123456789012345678901234567890',
      tokenId: 'deal_001_nft',
      chainId: 1,
    },
  },
  {
    id: 'deal_digital_001',
    slug: 'adobe-creative-suite-nft-license',
    category: 'collectibles',
    subCategory: 'digital-goods',
    title:
      'Adobe Creative Suite NFT License – Lifetime Access to Photoshop, Illustrator & Premiere Pro',
    shortDescription:
      'Own a transferable NFT license for Adobe Creative Suite with lifetime updates and verified ownership.',
    bannerImage:
      'https://images.pexels.com/photos/8720270/pexels-photo-8720270.jpeg',
    images: [
      'https://images.pexels.com/photos/8720271/pexels-photo-8720271.jpeg',
      'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg',
      'https://images.pexels.com/photos/34411122/pexels-photo-34411122.jpeg',
    ],
    merchant: {
      id: 'merchant_softvault_001',
      name: 'SoftVault',
      walletAddress: '0x3D8e2A1bB7F4A9C5dF347fB2A5eF9E7bEe42D1C9',
      verifiedMerchant: true,
      dateJoined: '2024-04-22T00:00:00Z',
      totalDeals: 58,
      merchantRating: 4.9,
      totalReviews: 842,
      responseRate: 97,
      responseTime: 'within 3 hours',
      logoUrl:
        'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    },
    pricing: {
      originalPrice: 899,
      discountedPrice: 499,
      currency: 'USD',
      priceUnit: 'one-time',
      discountPercentage: 44,
      savings: 400,
      includesFees: true,
      taxesIncluded: true,
    },
    dealScore: 96,
    rating: {
      average: 4.8,
      totalReviews: 126,
      breakdown: {
        '5star': 98,
        '4star': 22,
        '3star': 4,
        '2star': 1,
        '1star': 1,
      },
    },
    tags: ['Lifetime Access', 'NFT License', 'Top Rated', 'Transferable'],
    location: {
      address: 'Digital Product – No Physical Location',
      city: 'Remote',
      country: 'Global',
    },
    description:
      'SoftVault brings Web3 utility to software licensing. Own your Adobe Creative Suite license as an NFT that’s verifiable, transferable, and tradable. You can even stake your license NFT to earn upgrade credits. Perfect for creators who value permanence and flexibility.',
    options: [
      {
        id: 'opt_digital_001_1',
        name: 'Single User License',
        originalPrice: 899,
        discountedPrice: 499,
        available: true,
        refundable: true,
      },
      {
        id: 'opt_digital_001_2',
        name: 'Team License (5 Seats)',
        originalPrice: 2999,
        discountedPrice: 1999,
        available: true,
        refundable: true,
      },
    ],
    availability: {
      startDate: '2025-10-20',
      endDate: '2026-12-31',
    },
    nftDetails: {
      mintable: true,
      tokenStandard: 'ERC-721',
      transferable: true,
      royaltyPercentage: 2,
      maxSupply: 1000,
      currentMinted: 347,
    },
    reviews: [
      {
        id: 'rev_digital_001_1',
        userId: 'user_0xA1b2',
        userName: 'Liam Chen',
        walletAddress: '0xA1b2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0',
        rating: 5,
        date: '2025-09-10T12:15:00Z',
        title: 'Finally, real ownership of my software!',
        comment:
          'This is genius. I actually *own* my license now. I can sell it, transfer it, or stake it for perks. Smooth checkout and instant NFT mint.',
        verifiedPurchase: true,
        helpful: 33,
        reputation: {
          level: 'Gold Reviewer',
          totalReviews: 102,
          badges: ['Verified Buyer', 'Tech Enthusiast'],
        },
      },
    ],
    purchaseStats: {
      totalPurchased: 642,
      purchasedLast24h: 18,
      viewsLast24h: 489,
      trending: true,
    },
    blockchain: {
      contractAddress: '0x7f8aE1234567890bBcCdDeEfF9876543210AbCDe',
      tokenId: 'adobe_suite_nft',
      chainId: 1,
    },
  },

  {
    id: 'deal_rewards_001',
    slug: 'merchant-reward-nft-tier1',
    category: 'collectibles',
    subCategory: 'rewards',
    title: 'Tier 1 Merchant Reward NFT – Cashback + Loyalty Boost',
    shortDescription:
      'Claim a Tier 1 NFT Reward to unlock cashback perks, merchant-specific token drops, and access to private deals.',
    bannerImage:
      'https://images.pexels.com/photos/128867/coins-currency-investment-insurance-128867.jpeg',
    images: [
      'https://images.web3deals.io/merchant-reward-1.jpg',
      'https://images.web3deals.io/merchant-reward-2.jpg',
      'https://images.web3deals.io/merchant-reward-3.jpg',
    ],
    merchant: {
      id: 'merchant_cashloop_001',
      name: 'CashLoop Protocol',
      verifiedMerchant: true,
      dateJoined: '2024-11-10T00:00:00Z',
      totalDeals: 73,
      merchantRating: 4.8,
      totalReviews: 652,
      responseRate: 99,
      responseTime: 'within 1 hour',
      logoUrl: 'https://cdn.web3deals.io/logos/cashloop.png',
    },
    pricing: {
      originalPrice: 50,
      discountedPrice: 25,
      currency: 'USDC',
      discountPercentage: 50,
      savings: 25,
    },
    dealScore: 89,
    rating: {
      average: 4.6,
      totalReviews: 73,
      breakdown: {
        '5star': 48,
        '4star': 18,
        '3star': 6,
        '2star': 1,
        '1star': 0,
      },
    },
    tags: ['Cashback', 'Reward NFT', 'Merchant Perk', 'Limited Edition'],
    location: {
      address: 'On-chain',
      city: 'Decentralized',
      country: 'Global',
    },
    description:
      'The CashLoop Tier 1 NFT unlocks lifetime cashback rewards and special access to merchant airdrops. Redeem on partner stores, or stake the NFT to earn governance tokens. Holders receive bonus multipliers during campaigns.',
    options: [
      {
        id: 'opt_rewards_001_1',
        name: 'Tier 1 NFT – Early Access',
        originalPrice: 50,
        discountedPrice: 25,
        available: true,
        refundable: false,
      },
      {
        id: 'opt_rewards_001_2',
        name: 'Tier 2 NFT – Enhanced Cashback',
        originalPrice: 100,
        discountedPrice: 65,
        available: true,
        refundable: false,
      },
    ],
    availability: {
      startDate: '2025-10-22',
      endDate: '2026-02-01',
    },
    nftDetails: {
      mintable: true,
      tokenStandard: 'ERC-1155',
      transferable: true,
      royaltyPercentage: 3,
      maxSupply: 5000,
      currentMinted: 2100,
    },
    reviews: [
      {
        id: 'rev_rewards_001_1',
        userId: 'user_0x5b7a',
        userName: 'Amaka Ogunleye',
        rating: 5,
        date: '2025-10-05T17:10:00Z',
        title: 'Loyalty that actually pays!',
        comment:
          'This NFT made my regular shopping so much more fun. I literally get cashback on-chain every week. Plus, I sold my old Tier 1 for profit lol.',
        verifiedPurchase: true,
        helpful: 42,
        reputation: {
          level: 'Platinum Reviewer',
          totalReviews: 210,
          badges: ['NFT Collector', 'Cashback Queen'],
        },
      },
    ],
    purchaseStats: {
      totalPurchased: 3450,
      purchasedLast24h: 53,
      viewsLast24h: 812,
      trending: true,
    },
    blockchain: {
      contractAddress: '0x1234abcd5678Ef9A00112233445566778899aaBb',
      tokenId: 'reward_tier1_nft',
      chainId: 1,
    },
  },
];
