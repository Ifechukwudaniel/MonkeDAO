// 💭 this component is for if we decide to change the search
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useEffect, useRef } from 'react';

type MapboxAutocompleteProps = {
  onPlaceChanged: (result: any) => void;
  placeholder?: string;
  accessToken: string;
};

const MapboxAutocomplete: React.FC<MapboxAutocompleteProps> = ({
  onPlaceChanged,
  placeholder = 'Search by Location',
  accessToken,
}) => {
  const geocoderContainerRef = useRef<HTMLDivElement>(null);
  const geocoderRef = useRef<MapboxGeocoder | null>(null);

  useEffect(() => {
    if (!geocoderContainerRef.current) return;

    geocoderRef.current = new MapboxGeocoder({
      accessToken: accessToken,
      placeholder: placeholder,
      mapboxgl: undefined, // We're not binding it to a map
    });

    geocoderRef.current.addTo(geocoderContainerRef.current);

    geocoderRef.current.on('result', (e) => {
      onPlaceChanged(e.result);
    });

    return () => {
      geocoderRef.current?.clear();
    };
  }, [accessToken, placeholder, onPlaceChanged]);

  return (
    <div ref={geocoderContainerRef} className="mapbox-geocoder-container" />
  );
};

export default MapboxAutocomplete;
