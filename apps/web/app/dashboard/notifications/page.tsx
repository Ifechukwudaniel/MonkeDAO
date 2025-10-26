'use client';

import NotificationCard from 'components/NotificationCard';

const mockNotifications = [
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

const NotificationsPage = () => {
  return (
    <div className=" mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {mockNotifications.map((notif, index) => (
        <NotificationCard
          key={index}
          title={notif.title}
          message={notif.message}
          author={notif.author}
          category={notif.category}
          time={notif.time}
          iconType={notif.iconType as any}
        />
      ))}
    </div>
  );
};

export default NotificationsPage;
