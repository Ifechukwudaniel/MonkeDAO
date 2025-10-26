import { BestDealPosted } from '../../../components/Profile/BestDealsPosted';
import { ProfileTabs } from '../../../components/Profile/ProfileTabs';
import { ReputationStats } from '../../../components/Profile/ReputationStats';
import { UserHeader } from '../../../components/Profile/UserHeader';
import type { Profile } from '../../../types/product';

const mockProfile: Profile = {
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

export default function ProfilePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <UserHeader user={mockProfile} />
      <ReputationStats rep={mockProfile.reputation} />
      <BestDealPosted deal={mockProfile.bestDeal} />
      <ProfileTabs />
    </main>
  );
}
