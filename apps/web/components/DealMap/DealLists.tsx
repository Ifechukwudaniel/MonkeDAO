import React from 'react';
import { ProductDeal } from 'types';
import { DealCard } from './DealCard';

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
    <div className="border border-border-default rounded-sm lg:py-6 py-5 px-4 lg:px-5 max-h-120 overflow-y-scroll ">
      <p className="text-gray-800 text-sm uppercase">
        Store list: {stores.length} results
      </p>
      {stores.length > 0 ? (
        <div className="grid gap-y-4 mt-6">
          {stores.map((store: ProductDeal) => (
            <DealCard
              key={store.id}
              {...store}
              distance={(store as any).distance}
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
