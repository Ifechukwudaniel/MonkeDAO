import { GpsFixed } from '@mui/icons-material';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import { getDistance } from 'geolib';
import React, { useEffect, useRef, useState } from 'react';
import Dropdown from 'react-dropdown';
import { DealLists } from './DealLists';
import Map from './Map';

const options = ['location', 'store name'];
const defaultOption = options[0];

import { SearchIcon } from 'lucide-react';
import { InputHTMLAttributes } from 'react';
import { ProductDeal } from 'types';

type SearchProps = InputHTMLAttributes<HTMLInputElement> & {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
};

type Deal = { deal: ProductDeal };

export const SearchBar: React.FC<SearchProps> = ({
  onChange,
  placeholder,
  ...rest
}) => {
  return (
    <div className="flex border py-1.5 px-3 rounded-sm border-border-default w-full items-center">
      <div className="mr-3">
        <SearchIcon />
      </div>
      <input
        type="text"
        onChange={onChange}
        {...rest}
        placeholder={placeholder ? placeholder : 'search'}
        className="min-w-[16rem] focus:border-none focus:outline-none placeholder:text-gray-200  bg-transparent  text-sm"
      />
    </div>
  );
};

type StoreLocatorProps = {
  deals: ProductDeal[];
};

export function DealLocator({ deals }: StoreLocatorProps) {
  const [selectedOption, setSelectedOption] = useState<string>(defaultOption);
  const [storeNameQuery, setStoreNameQuery] = useState<string>('');
  const [locationQuery, setLocationQuery] = useState<string>('');
  const [radius, setRadius] = useState<number>(1000);
  const [filteredStores, setFilteredStores] = useState<ProductDeal[]>(deals);
  const { isLoaded, loadError } = useLoadScript({
    id: 'google-maps-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_APIKEY as string,
    libraries: ['places', 'geometry'],
    version: 'weekly',
  });
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY;
  const [selectedCoords, setSelectedCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  console.log('fil', filteredStores);

  const handleSelect = (option: { value: string; label: string }) => {
    setSelectedOption(option.value);
    setFilteredStores(deals);

    setLocationQuery('');
    setStoreNameQuery('');
  };

  const handleStoreNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStoreNameQuery(event.target.value);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationQuery(event.target.value);
  };

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    const lat = place?.geometry?.location?.lat();
    const lng = place?.geometry?.location?.lng();
    if (typeof lat === 'number' && typeof lng === 'number') {
      setSelectedCoords({ lat, lng });
    }
    if (place) {
      setLocationQuery(place.formatted_address || place.name || '');
    }
  };

  const handleSearch = () => {
    if (selectedOption === 'store name') {
      const filtered = deals.filter((deal) =>
        deal.title.toLowerCase().includes(storeNameQuery.toLowerCase()),
      );
      setFilteredStores(filtered);
    } else if (selectedOption === 'location' && selectedCoords) {
      const filtered = deals
        .map((deal) => {
          const storeLat = deal.location.coordinates?.lat;
          const storeLng = deal.location.coordinates?.lng;
          if (storeLat == null || storeLng == null) {
            return { ...deal, distance: Infinity };
          }
          const distance =
            getDistance(
              {
                latitude: selectedCoords.lat,
                longitude: selectedCoords.lng,
              },
              {
                latitude: storeLat,
                longitude: storeLng,
              },
            ) / 1000;
          return { ...deal, distance };
        })
        .filter((store) => store.distance! <= radius); // Filter stores within the selected radius
      setFilteredStores(filtered);
    } else {
      setFilteredStores(deals);
    }
  };

  const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(parseInt(event.target.value));
  };

  useEffect(() => {
    // Debug logs to investigate Maps script loading
    // eslint-disable-next-line no-console
    console.log('[DealLocator] isLoaded:', isLoaded);
    // eslint-disable-next-line no-console
    console.log('[DealLocator] loadError:', loadError);
    // eslint-disable-next-line no-console
    console.log(
      '[DealLocator] window.google available:',
      typeof window !== 'undefined' ? !!(window as any).google : 'no-window',
    );
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-console
      console.log(
        '[DealLocator] script present:',
        !!document.querySelector(
          'script[src*="maps.googleapis.com/maps/api/js"]',
        ),
      );
      // eslint-disable-next-line no-console
      console.log(
        '[DealLocator] API key present:',
        !!process.env.NEXT_PUBLIC_GOOGLE_MAP_APIKEY,
      );
    }
  }, [isLoaded, loadError]);

  if (loadError) {
    // eslint-disable-next-line no-console
    console.error('[DealLocator] Google Maps load error:', loadError);
    console.log('blac');
  }

  /*   if (!isLoaded) {
    return (
      <div className="min-h-[60vh] bg-accent-1300  border-t-2 border-neutral store lg:pb-24 py-16">
        <div className="container mx-auto">
          <div className="bg-gray-400 animate-pulse w-full  h-16 my-3 mb-10 rounded-lg" />
        </div>
        <div className="container lg:grid gap-10 h-full  mx-auto lg:grid-cols-[40%,57%]  min-h-[20rem]">
          <div className="bg-gray-400 animate-pulse  h-full mb-4 rounded-lg" />
          <div className="bg-gray-400 animate-pulse  h-full mb-1  rounded-lg" />
        </div>
      </div>
    );
  } */

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const geocoder = new window.google.maps.Geocoder();
          const latlng = { lat: latitude, lng: longitude };

          geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
              const place = results[0];
              setSelectedCoords({ lat: latitude, lng: longitude });
              setLocationQuery(place.formatted_address || '');
            }
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser');
    }
  };

  return (
    <section className="bg-secondary border-t border-border-default lg:pb-24">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="flex flex-col md:flex-row gap-x-3 mt-10 items-center lg:gap-y-3 gap-y-6">
          <Dropdown
            options={options}
            onChange={handleSelect}
            value={selectedOption}
            placeholder="Select an option"
            className="mt-1 w-full lg:w-[19rem]"
            controlClassName=" select-input border-2 border-border-default"
            menuClassName="select-menu buddy-champion border-2 border-border-default"
          />
          <div className="lg:w-[50%] w-full">
            {selectedOption === 'location' ? (
              isLoaded ? (
                <Autocomplete
                  options={{
                    fields: ['geometry', 'formatted_address', 'name'],
                  }}
                  onLoad={(autocomplete) => {
                    autocompleteRef.current = autocomplete;
                  }}
                  onPlaceChanged={handlePlaceChanged}
                >
                  <SearchBar
                    type="text"
                    placeholder="Search by Location"
                    value={locationQuery}
                    onChange={handleLocationChange}
                    className="search-bar"
                  />
                </Autocomplete>
              ) : (
                <SearchBar
                  type="text"
                  placeholder="Loading location search..."
                  value={locationQuery}
                  onChange={handleLocationChange}
                  className="search-bar"
                  disabled
                />
              )
            ) : (
              <SearchBar
                placeholder="Search by Name"
                value={storeNameQuery}
                onChange={handleStoreNameChange}
              />
            )}
          </div>

          <div
            className={`flex flex-col lg:min-w-[30%] lg:w-auto w-full  ${
              selectedOption !== 'location' ? 'invisible' : ''
            }`}
          >
            <p className=" mb-1 text-sm">
              <span className="text-gray-800 font-bold">Radius:</span>{' '}
              <span className="font-bold">{radius} Kilometers</span>
            </p>

            <div className="range__slider">
              <input
                type="range"
                min={0}
                max={1000}
                value={radius}
                onChange={handleRadiusChange}
                className="custom-range"
              />
            </div>
          </div>

          <button
            className="bg-primary text-white px-6 lg:py-1.5 font-bold cursor-pointer  inline-block mt-1 border-2 border-primary w-full lg:w-auto text-sm uppercase py-[4px] ml-3 transition-all hover:border-primary"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="mt-2 text-sm font-semibold">
          <button
            className="flex items-center gap-x-1 cursor-pointer font-medium mr-2 "
            onClick={handleUseMyLocation}
          >
            <GpsFixed /> Use my location
          </button>
        </div>

        <div className="grid grid-cols-2 my-14 gap-10">
          <DealLists
            deals={filteredStores}
            query={storeNameQuery}
            locationQuery={locationQuery}
            selectedOption={selectedOption}
          />
          <Map
            stores={filteredStores.map((deal) => ({ deal }))}
            isLoaded={isLoaded}
            accessToken={accessToken}
          />
        </div>
      </div>
    </section>
  );
}
