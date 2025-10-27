'use client';

import { Bell, Gift, Tag } from 'lucide-react';
import React from 'react';

interface NotificationCardProps {
  title: string;
  message: string;
  author: string;
  category: string;
  time: string;
  iconType?: 'deal' | 'gift' | 'alert';
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  message,
  author,
  category,
  time,
  iconType = 'deal',
}) => {
  const renderIcon = () => {
    switch (iconType) {
      case 'gift':
        return <Gift className="w-6 h-6 text-green-500" />;
      case 'alert':
        return <Bell className="w-6 h-6 text-red-500" />;
      default:
        return <Tag className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <div className="flex gap-3 p-4  border  border-[#C4C4C4]   hover:border-[#4A8F5D] hover:bg-[#86C99440] transition-all cursor-pointer">
      <div className="flex-shrink-0">{renderIcon()}</div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-800">{title}</p>
        <p className="text-sm text-black">{message}</p>
        <div className="flex items-center justify-between mt-2 text-xs text-[#808080]">
          <span>
            by {author} in {category}
          </span>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
