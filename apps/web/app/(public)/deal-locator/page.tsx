'use client';

import { DealLocator } from 'components/DealMap';
import 'react-dropdown/style.css';
import { productDeals } from 'types';

type Store = {
  siteInfo: {
    address: string;
    email: string | null;
    name: string;
    phoneNumber: number;
    website: string;
    distance: number | null;
  };
  coordinates: { latitude: number; longitude: number };
};

type StoreProps = {
  stores: any;
};

export default function Store({ stores }: StoreProps) {
  return (
    <>
      <DealLocator stores={productDeals} />
    </>
  );
}
