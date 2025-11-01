import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useRef, useState } from 'react';
import { ProductDeal } from 'types';

type Store = {
  deal: ProductDeal;
};

type MapProps = {
  stores: { deal: ProductDeal }[];
  isLoaded: boolean;
  accessToken: string;
};

const Map: React.FC<MapProps> = ({ stores, isLoaded, accessToken }) => {
  console.log(stores, 'map');
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapContainerRef.current || mapRef.current) return;

    mapboxgl.accessToken = accessToken;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12', // or 'mapbox://styles/mapbox/dark-v11'
      center: [0, 40], // [lng, lat]
      zoom: 6.7,
    });

    return () => {
      mapRef.current?.remove();
    };
  }, [isLoaded, accessToken]);

  // Update markers when stores change
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const storesWithCoords = stores.filter(
      (s) =>
        s.deal.location?.coordinates?.lat != null &&
        s.deal.location?.coordinates?.lng != null,
    );

    // Add new markers
    storesWithCoords.forEach((store) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([
          store.deal.location.coordinates!.lng,
          store.deal.location.coordinates!.lat,
        ])
        .addTo(mapRef.current!);

      marker.getElement().addEventListener('click', () => {
        setSelectedStore(store);
      });

      markersRef.current.push(marker);
    });
  }, [stores]);

  // Handle popup for selected store
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove existing popup
    if (popupRef.current) {
      popupRef.current.remove();
    }

    if (selectedStore && selectedStore.deal.location.coordinates) {
      const popupContent = `
        <div style="padding-right: 16px;">
          <h3 style="font-size: 1.25rem; font-weight: bold;">${selectedStore.deal.title}</h3>
          <p style="font-size: 1.125rem; color: #525252;">${selectedStore.deal.shortDescription}</p>
          <p style="margin-bottom: 16px; font-size: 1.125rem; color: #525252;">${selectedStore.deal.merchant}</p>
        </div>
      `;

      popupRef.current = new mapboxgl.Popup({ offset: 25 })
        .setLngLat([
          selectedStore.deal.location.coordinates.lng,
          selectedStore.deal.location.coordinates.lat,
        ])
        .setHTML(popupContent)
        .addTo(mapRef.current);

      popupRef.current.on('close', () => {
        setSelectedStore(null);
      });
    }
  }, [selectedStore]);

  if (!isLoaded) {
    return (
      <div className="h-[600px] w-[100%] flex items-center justify-center rounded-2xl animate-pulse">
        <div className="bg-slate-500 w-full h-full rounded-2xl"></div>
      </div>
    );
  }

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
      <div
        ref={mapContainerRef}
        className="map"
        style={{
          width: '100%',
          height: '600px',
          margin: 'auto',
          borderRadius: '5px',
          border: '1.5px solid #c4c4c4',
        }}
      />
    </div>
  );
};

export default Map;
