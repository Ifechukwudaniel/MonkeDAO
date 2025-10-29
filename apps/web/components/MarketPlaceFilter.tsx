import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export interface FilterState {
  distance: number | null;
  location: string;
  categories: string[];
  isGift: boolean | null;
  priceRange: [number, number];
  dealScore: number | null;
  verifiedMerchant: boolean;
  nftMintable: boolean;
  trending: boolean;
  transferable: boolean;
  tradeable: boolean;
  giftable: boolean;
}

interface FilterSection {
  id: keyof typeof defaultExpanded;
  title: string;
  component: React.ReactNode;
}

const defaultExpanded = {
  distance: true,
  location: true,
  category: true,
  pricing: true,
  features: true,
  nftFeatures: true,
  quality: false,
};

const DISTANCE_OPTIONS = [5, 10, 25, 50, 100];
const CATEGORIES = [
  'travel',
  'food',
  'gifts',
  'experiences',
  'luxury',
  'collectibles',
];
const DEAL_SCORE_OPTIONS = [7, 8, 9];
const PRICE_MIN = 0;
const PRICE_MAX = 10000;

const defaultFilters: FilterState = {
  distance: null,
  location: '',
  categories: [],
  isGift: null,
  priceRange: [PRICE_MIN, PRICE_MAX],
  dealScore: null,
  verifiedMerchant: false,
  nftMintable: false,
  trending: false,
  transferable: false,
  tradeable: false,
  giftable: false,
};

interface MarketplaceFilterProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export default function MarketplaceFilter({
  filters,
  onFiltersChange,
}: MarketplaceFilterProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const toggleSection = (section: keyof typeof expanded) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: 'categories', value: string) => {
    const newArray = filters[key].includes(value)
      ? filters[key].filter((item) => item !== value)
      : [...filters[key], value];
    onFiltersChange({ ...filters, [key]: newArray });
  };

  const toggleSingleValueFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => {
    const newValue =
      filters[key] === value
        ? typeof value === 'number'
          ? null
          : typeof value === 'boolean'
            ? false
            : null
        : value;
    onFiltersChange({ ...filters, [key]: newValue });
  };

  const clearFilters = () => {
    onFiltersChange(defaultFilters);
  };

  const countActiveFilters = () => {
    let count = 0;
    if (filters.distance) count++;
    if (filters.location) count++;
    count += filters.categories.length;
    if (filters.isGift !== null) count++;
    if (filters.priceRange[0] > PRICE_MIN || filters.priceRange[1] < PRICE_MAX)
      count++;
    if (filters.dealScore) count++;
    if (filters.verifiedMerchant) count++;
    if (filters.nftMintable) count++;
    if (filters.trending) count++;
    if (filters.transferable) count++;
    if (filters.tradeable) count++;
    if (filters.giftable) count++;
    return count;
  };

  const handlePriceChange = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...filters.priceRange];
    newRange[index] = value;
    if (index === 0 && value > newRange[1]) {
      newRange[1] = value;
    }
    if (index === 1 && value < newRange[0]) {
      newRange[0] = value;
    }
    updateFilter('priceRange', newRange);
  };

  const sections: FilterSection[] = [
    {
      id: 'distance',
      title: 'Distance',
      component: (
        <div className="space-y-2">
          {DISTANCE_OPTIONS.map((distance) => (
            <Checkbox
              key={distance}
              checked={filters.distance === distance}
              onChange={() => toggleSingleValueFilter('distance', distance)}
              label={`Within ${distance} miles`}
            />
          ))}
        </div>
      ),
    },
    {
      id: 'location',
      title: 'Location',
      component: (
        <input
          type="text"
          placeholder="Enter city or zip code"
          value={filters.location}
          onChange={(e) => updateFilter('location', e.target.value)}
          className="w-full px-3 py-2 border border-border-default rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      ),
    },
    {
      id: 'category',
      title: 'Category',
      component: (
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <Checkbox
              key={category}
              checked={filters.categories.includes(category)}
              onChange={() => toggleArrayFilter('categories', category)}
              label={category}
              capitalize
            />
          ))}
        </div>
      ),
    },
    {
      id: 'pricing',
      title: 'Price Range',
      component: (
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
          <div className="space-y-3">
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={50}
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceChange(0, Number(e.target.value))}
              className="w-full h-2  rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={50}
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(1, Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'features',
      title: 'Features',
      component: (
        <div className="space-y-2">
          <Checkbox
            checked={filters.verifiedMerchant}
            onChange={(checked) => updateFilter('verifiedMerchant', checked)}
            label="Verified Merchant"
          />
          <Checkbox
            checked={filters.nftMintable}
            onChange={(checked) => updateFilter('nftMintable', checked)}
            label="NFT Mintable"
          />
          <Checkbox
            checked={filters.trending}
            onChange={(checked) => updateFilter('trending', checked)}
            label="Trending"
          />
          <Checkbox
            checked={filters.isGift === true}
            onChange={() => toggleSingleValueFilter('isGift', true)}
            label="Gift-able Deals"
          />
        </div>
      ),
    },
    {
      id: 'nftFeatures',
      title: 'NFT Properties',
      component: (
        <div className="space-y-2">
          <Checkbox
            checked={filters.transferable}
            onChange={(checked) => updateFilter('transferable', checked)}
            label="Transferable"
          />
          <Checkbox
            checked={filters.tradeable}
            onChange={(checked) => updateFilter('tradeable', checked)}
            label="Tradeable"
          />
          <Checkbox
            checked={filters.giftable}
            onChange={(checked) => updateFilter('giftable', checked)}
            label="Giftable"
          />
        </div>
      ),
    },
    {
      id: 'quality',
      title: 'Deal Score',
      component: (
        <div className="space-y-2">
          {DEAL_SCORE_OPTIONS.map((score) => (
            <Checkbox
              key={score}
              checked={filters.dealScore === score}
              onChange={() => toggleSingleValueFilter('dealScore', score)}
              label={`${score}/10+`}
            />
          ))}
        </div>
      ),
    },
  ];

  return (
    <aside className="w-90  border rounded-sm border-border-default h-screen overflow-y-auto flex-shrink-0">
      <div className="sticky top-0 bg-secondary border-b border-border-default p-4 z-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          {countActiveFilters() > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary hover:text-primary flex items-center gap-1"
            >
              Clear all ({countActiveFilters()})
            </button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {sections.map((section, index) => (
          <FilterSection
            key={section.id}
            title={section.title}
            isExpanded={expanded[section.id]}
            onToggle={() => toggleSection(section.id)}
            showBorder={index < sections.length - 1}
          >
            {section.component}
          </FilterSection>
        ))}
      </div>
    </aside>
  );
}

function FilterSection({
  title,
  isExpanded,
  onToggle,
  showBorder,
  children,
}: {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  showBorder: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={showBorder ? 'border-b border-border-default pb-4' : 'pb-4'}
    >
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full mb-3"
      >
        <h3 className="font-medium text-gray-900">{title}</h3>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {isExpanded && children}
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
  capitalize = false,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  capitalize?: boolean;
}) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
      />
      <span
        className={`text-sm text-gray-700 ${capitalize ? 'capitalize' : ''}`}
      >
        {label}
      </span>
    </label>
  );
}
