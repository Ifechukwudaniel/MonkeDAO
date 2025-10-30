import DealCard from 'components/DealCard';
import React from 'react';
import { ProductDeal } from 'types';

/* type Store = {
  id: number;

  name: string;
  location: string;
  phonenumber: number;
  distance?: number;
}; */

type DealListsProps = {
  stores: ProductDeal[];
  query: string;
  selectedOption: string;
  locationQuery: string;
};

export const DealLists: React.FC<DealListsProps> = ({
  stores,
  query,
  selectedOption,
  locationQuery,
}) => {
  return (
    <div className="border-[1.5px] border-neutral rounded-3xl lg:py-6 py-5 px-4 lg:px-5 max-h-[35rem] overflow-y-scroll storelist">
      <p className="text-neutral-600 text-xl">
        Store list: {stores.length} results
      </p>
      {stores.length > 0 ? (
        <div className="grid gap-y-4 mt-6">
          {stores.map((store: ProductDeal, index: any) => (
            <DealCard
              key={store.id}
              id={store.id}
              lat={store.location.coordinates?.lat}
              lng={store.location.coordinates?.lng}
              name={store.title}
              location={store.location.address}
              phonenumber={124}
              distance={200}
            />
          ))}
        </div>
      ) : (
        <p className="text-neutral-600 mt-6">
          {selectedOption === 'store name'
            ? `There is no store containing the store name: "${query}"`
            : `There are no stores near "${locationQuery}"`}
        </p>
      )}
    </div>
  );
};
