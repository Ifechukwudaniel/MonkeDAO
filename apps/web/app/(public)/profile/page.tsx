/* ╔════════════════════════════════════════════╗
   ║ FILE: Profile Page
   ║ DESC: Profile Info + Deatils
   ║ CONTRIBUTOR: Open Source
   ╚════════════════════════════════════════════╝ */

import { BestDealPosted } from 'components/Profile/BestDealsPosted';
import { ProfileTabs } from 'components/Profile/ProfileTabs';
import { ReputationStats } from 'components/Profile/ReputationStats';
import { UserHeader } from 'components/Profile/UserHeader';
import { mockProfile } from 'data';

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
