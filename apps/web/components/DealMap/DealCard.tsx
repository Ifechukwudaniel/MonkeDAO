import { MapPinIcon, PhoneIcon } from 'lucide-react';
import React from 'react';
import { ProductDeal } from 'types';

interface DealCardProps extends ProductDeal {
  distance?: number;
}

export const DealCard: React.FC<DealCardProps> = ({
  title,
  location,
  distance,
}) => {
  const formatPhoneNumber = (phoneNumber?: number | string) => {
    if (!phoneNumber) return 'N/A';
    const phoneString = phoneNumber.toString();
    return phoneString.replace(/(\d{3})(?=\d)/g, '$1 ');
  };

  return (
    <div className="py-4 px-4 border border-border-default rounded-sm bg-white">
      <h3 className="uppercase font-bold text-sm mb-1">{title}</h3>

      <div className="flex items-center text-xs text-neutral-600 py-[2px]">
        <MapPinIcon className="mr-2 h-3.5 w-3.5" />
        <p>{location?.address || 'Address unavailable'}</p>
      </div>

      <div className="flex items-center text-xs text-neutral-600 py-[2px]">
        <PhoneIcon className="mr-2 h-3.5 w-3.5" />
        <p>{formatPhoneNumber(12)}</p>
      </div>

      {distance !== undefined && (
        <div className="text-sm text-neutral-600 py-[2px]">
          <p>{distance.toFixed(2)} km away</p>
        </div>
      )}
    </div>
  );
};
