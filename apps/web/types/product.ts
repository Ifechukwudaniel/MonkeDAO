export interface NFTBadge {
  id: string;
  name: string;
  description: string;
  image: string;
  level: number;
}

export interface ReputationStats {
  points: number;
  level: string;
  totalDeals: number;
  dealsPosted: number;
  comments: number;
  likesGiven: number;
  followers: number;
  following: number;
  nftRedeemed: number;
}

export interface Profile {
  id: string;
  username: string;
  walletAddress: string;
  avatarUrl: string;
  joinedDate: string;
  lastActive: string;
  reputation: ReputationStats;
  badges: NFTBadge[];
  bestDeal?: {
    title: string;
    image: string;
    likes: number;
    slug: string;
  };
}
