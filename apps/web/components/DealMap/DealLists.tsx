import { ProductDeal } from 'types';
import { DealCard } from './DealCard';

type DealListsProps = {
  deals: ProductDeal[];
  query: string;
  selectedOption: string;
  locationQuery: string;
};

export const DealLists: React.FC<DealListsProps> = ({
  deals,
  query,
  selectedOption,
  locationQuery,
}) => {
  console.log(deals, 'check');

  return (
    <div className="border border-border-default rounded-sm lg:py-6 py-5 px-4 lg:px-5 max-h-120 overflow-y-scroll">
      <p className="text-gray-800 text-sm uppercase">
        Deals list: {deals.length} results
      </p>

      {deals.length > 0 ? (
        <div className="grid gap-y-4 mt-6">
          {deals.map((deal) => {
            return (
              <DealCard key={deal.id} {...deal} distance={deal.distance} />
            );
          })}
        </div>
      ) : (
        <p className="text-neutral-600 mt-6">
          {selectedOption === 'store name'
            ? `There is no deals containing the name: "${query}"`
            : `There are no deals near "${locationQuery}"`}
        </p>
      )}
    </div>
  );
};
