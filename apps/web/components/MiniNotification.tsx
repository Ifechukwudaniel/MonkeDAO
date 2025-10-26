import { Bell } from 'lucide-react';
import NotificationCard from './NotificationCard';
import { PopoverBox } from './PopOver';

interface Notification {
  title: string;
  message: string;
  author: string;
  category: string;
  time: string;
  iconType: string;
}

const mockNotifications: Notification[] = [
  {
    title: 'New Deal Posted',
    message: 'A new deal has been posted in your favorite category!',
    author: 'Admin',
    category: 'Deals',
    time: '2h ago',
    iconType: 'deal',
  },
  {
    title: 'Coupon Redeemed',
    message: 'Your coupon for 20% off has been redeemed.',
    author: 'System',
    category: 'Coupon',
    time: '4h ago',
    iconType: 'coupon',
  },
  {
    title: 'Someone liked your deal',
    message: 'Your deal got a new like!',
    author: 'User123',
    category: 'Social',
    time: '6h ago',
    iconType: 'like',
  },
];

export const MiniNotificationIcon = () => (
  <PopoverBox
    trigger={
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:bg-green-100/10 transition-colors">
        <Bell size={20} />
        {mockNotifications.length > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[#184623] px-1 text-[10px] font-bold text-white">
            {mockNotifications.length > 9 ? '9+' : mockNotifications.length}
          </span>
        )}
      </div>
    }
  >
    <div className="flex flex-col gap-2 max-h-60 overflow-y-auto ">
      {mockNotifications.slice(0, 5).map((notif, index) => (
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
      {mockNotifications.length === 0 && (
        <p className="text-xs text-gray-400 text-center">
          No new notifications
        </p>
      )}
    </div>
  </PopoverBox>
);
