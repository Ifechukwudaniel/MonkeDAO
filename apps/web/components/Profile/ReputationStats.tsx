import {
  Gift,
  Heart,
  MessageCircle,
  ShoppingCart,
  Star,
  Users,
} from 'lucide-react';
import { ReputationStats as RepType } from '../../types/product';

export const ReputationStats = ({ rep }: { rep: RepType }) => {
  const stats = [
    { label: 'Reputation', value: rep.points, icon: Star },
    { label: 'Deals', value: rep.dealsPosted, icon: ShoppingCart },
    { label: 'NFT Redeemed', value: rep.nftRedeemed, icon: Gift },
    { label: 'Comments', value: rep.comments, icon: MessageCircle },
    { label: 'Likes', value: rep.likesGiven, icon: Heart },
    { label: 'Followers', value: rep.followers, icon: Users },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className="bg-background border border-border rounded-lg p-2 text-center hover:border-border/80 transition-all duration-150 flex flex-col items-center gap-1  border-[#C4C4C4]"
          >
            <Icon className="w-4 h-4 text-primary" />
            <h3 className="text-lg font-bold text-foreground">{s.value}</h3>
            <p className="text-[12px] font-medium text-muted-foreground">
              {s.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};
