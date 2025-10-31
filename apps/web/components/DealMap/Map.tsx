import { GoogleMap, InfoWindowF, MarkerF } from '@react-google-maps/api';
import React, { useState } from 'react';
import { ProductDeal } from 'types';
import MapStyles from './MapStyles';

type Store = {
  deal: ProductDeal;
};

type MapProps = {
  stores: Store[];
  isLoaded: boolean;
};

const Map: React.FC<MapProps> = ({ stores, isLoaded }) => {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  console.log('ap', stores, isLoaded);

  if (!isLoaded)
    return (
      <div className="h-[600px] w-[100%] flex items-center justify-center rounded-2xl animate-pulse">
        <div className=" bg-slate-500 w-full h-full rounded-2xl"></div>
      </div>
    );

  const center = { lat: 40, lng: 0 };

  const mapOptions = {
    styles: MapStyles.styles,
  };

  const storesWithCoords = stores.filter(
    (s) =>
      s.deal.location?.coordinates?.lat != null &&
      s.deal.location?.coordinates?.lng != null,
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <GoogleMap
        zoom={1.7}
        center={center}
        options={mapOptions}
        mapContainerClassName="map"
        mapContainerStyle={{
          width: '100%',
          height: '600px',
          margin: 'auto',
          borderRadius: '5px',
          border: '1.5px solid #c4c4c4',
        }}
      >
        {storesWithCoords.map((store) => (
          <MarkerF
            key={store.deal.title}
            position={{
              lat: store.deal.location.coordinates!.lat,
              lng: store.deal.location.coordinates!.lng,
            }}
            onClick={() => setSelectedStore(store)}
          ></MarkerF>
        ))}

        {selectedStore && selectedStore.deal.location.coordinates && (
          <InfoWindowF
            position={{
              lat: selectedStore.deal.location.coordinates.lat,
              lng: selectedStore.deal.location.coordinates.lng,
            }}
            onCloseClick={() => setSelectedStore(null)}
          >
            <div className="pr-4">
              <h3 className="text-xl font-bold">{selectedStore.deal.title}</h3>
              <p className="text-lg text-neutral-600">
                {selectedStore.deal.shortDescription}
              </p>
              <p className="mb-4 text-lg text-neutral-600">
                {selectedStore.deal.merchant}
              </p>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
