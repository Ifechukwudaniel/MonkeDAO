import { LocationEditIcon, PhoneIcon } from 'lucide-react';
import React from 'react';
import { ProductDeal } from 'types';

export const DealCard: React.FC<ProductDeal & { distance?: number }> = ({
  title,
  location,
  distance,
}) => {
  const formatPhoneNumber = (phoneNumber: number) => {
    const phoneString = phoneNumber.toString();
    return phoneString.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  return (
    <div className="py-4 px-4 border-neutral border-[3px] rounded-2xl bg-white active">
      <h3 className="uppercase font-semibold text-2xl mb-1">{title}</h3>
      <div className="py-[2px] text-neutral-600 text-xl flex items-center">
        <span className="mr-2">
          <LocationEditIcon />
        </span>
        <p>{location.address} </p>
      </div>
      <div className="py-[2px] text-neutral-600 text-xl flex items-center">
        <span className="mr-2">
          <PhoneIcon />
        </span>
        <p>{formatPhoneNumber(903)}</p>
      </div>
      {distance !== undefined && (
        <div className="py-[2px] text-neutral-600 text-xl">
          <p>{distance.toFixed(2)} km away</p>
        </div>
      )}
    </div>
  );
};
