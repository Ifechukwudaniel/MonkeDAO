'use client';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@monkedeals/ui/components/tabs';

export const ProfileTabs = () => (
  <div className="mt-8">
    <h3 className="font-bold text-2xl mb-5">Activities</h3>
    <Tabs defaultValue="deals">
      <TabsList className="grid grid-cols-4 w-full border-b border-[#C4C4C4] pb-2 rounded-none">
        <TabsTrigger value="deals">Deals</TabsTrigger>
        <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
        <TabsTrigger value="badges">NFT Badges</TabsTrigger>
        <TabsTrigger value="reputation">Reputation</TabsTrigger>
      </TabsList>

      <TabsContent value="deals" className="pt-4 text-sm text-neutral-400">
        User’s posted deals go here.
      </TabsContent>
      <TabsContent value="wishlist" className="pt-4 text-sm text-neutral-400">
        Wishlist items go here.
      </TabsContent>
      <TabsContent value="badges" className="pt-4 text-sm text-neutral-400">
        Show earned NFT badges.
      </TabsContent>
      <TabsContent value="reputation" className="pt-4 text-sm text-neutral-400">
        On-chain rep history.
      </TabsContent>
    </Tabs>
  </div>
);
