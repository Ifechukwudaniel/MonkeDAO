import { Crosshair, MapPin, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import type { Location } from 'store';

// 🎨 Interface / Props Definition
// =====================================
interface LocationPickerProps {
  onSelect: (location: Location) => void;
  defaultLocations?: Location[];
}

interface DialogProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface LocationSearchSelectProps {
  onLocationSelect: (location: Location) => void;
}

/* ╔════════════════════════════════════════════╗
   ║ ⬢ Custom Dialogue Component
   ╚════════════════════════════════════════════╝ */
const Dialog: React.FC<DialogProps> = ({ children, open, onOpenChange }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 border border-border-default bg-secondary  rounded-sm  max-w-lg h-100 w-full mx-0">
        {children}
      </div>
    </div>
  );
};

/* ╔════════════════════════════════════════════╗
   ║ ⬢ LocatioN Picker Component
   ╚════════════════════════════════════════════╝ */
const LocationPicker: React.FC<LocationPickerProps> = ({
  onSelect,
  defaultLocations = [],
}) => {
  const [search, setSearch] = useState<string>('');
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const geocoder = useRef<google.maps.Geocoder | null>(null);

  // 🔁 Effects / Subscriptions
  useEffect(() => {
    // 💭 Initialize Google services when available
    if (window.google && window.google.maps) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
      geocoder.current = new window.google.maps.Geocoder();
    }
  }, []);

  // 🔁 Effects / Subscriptions
  useEffect(() => {
    const timeout = setTimeout(() => fetchSuggestions(search), 300);
    return () => clearTimeout(timeout);
  }, [search]);

  // ⬢ Fetch Suggestions
  // =====================================
  const fetchSuggestions = async (query: string): Promise<void> => {
    if (!query || !autocompleteService.current) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    autocompleteService.current.getPlacePredictions(
      {
        input: query,
        types: ['(cities)'], // 💭 filter to city only
      },
      (
        predictions: google.maps.places.AutocompletePrediction[] | null,
        status: google.maps.places.PlacesServiceStatus,
      ) => {
        setLoading(false);
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          setSuggestions(predictions);
        } else {
          setSuggestions([]);
        }
      },
    );
  };

  // ⬢ Handle Select Place
  // =====================================
  const handleSelectPlace = async (
    prediction: google.maps.places.AutocompletePrediction,
  ): Promise<void> => {
    if (!geocoder.current) return;

    geocoder.current.geocode(
      { placeId: prediction.place_id },
      (
        results: google.maps.GeocoderResult[] | null,
        status: google.maps.GeocoderStatus,
      ) => {
        if (status === 'OK' && results && results[0]) {
          const location = results[0].geometry.location;
          onSelect({
            name: prediction.description,
            lat: location.lat(),
            lng: location.lng(),
          });
          setSearch('');
          setSuggestions([]);
        }
      },
    );
  };

  // ⬢ handle current location
  // =====================================
  const handleCurrentLocation = (): void => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;

        // 💭 Reverse geocode to get city name
        if (geocoder.current) {
          geocoder.current.geocode(
            { location: { lat: latitude, lng: longitude } },
            (
              results: google.maps.GeocoderResult[] | null,
              status: google.maps.GeocoderStatus,
            ) => {
              if (status === 'OK' && results && results[0]) {
                // 💭 Find city name from results
                const cityComponent = results.find(
                  (r: google.maps.GeocoderResult) =>
                    r.types.includes('locality') ||
                    r.types.includes('administrative_area_level_1'),
                );
                const name =
                  cityComponent?.formatted_address || 'Current Location';

                onSelect({
                  name,
                  lat: latitude,
                  lng: longitude,
                });
              }
            },
          );
        }
      },
      () => alert('Unable to get current location'),
    );
  };

  return (
    <div className="w-full bg-secondary p-4 ">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          placeholder="Search city, zip code or neighborhood"
          className="flex-1 border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
        />
        <button
          onClick={handleCurrentLocation}
          className="p-2 bg-green-100 hover:bg-green-200 transition"
          title="Use current location"
        >
          <Crosshair className="w-5 h-5 text-green-600" />
        </button>
      </div>

      {loading && <p className="text-xs text-gray-400 mb-2">Loading...</p>}

      <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
        {suggestions.map(
          (prediction: google.maps.places.AutocompletePrediction) => (
            <button
              key={prediction.place_id}
              onClick={() => handleSelectPlace(prediction)}
              className="text-left px-3 py-2 text-sm hover:bg-green-100 border border-transparent hover:border-green-500 transition"
            >
              {prediction.description}
            </button>
          ),
        )}

        {!search &&
          defaultLocations.map((loc: Location, idx: number) => (
            <button
              key={`default-${idx}`}
              onClick={() => onSelect(loc)}
              className="text-left px-3 py-2 text-sm hover:bg-green-100 border border-transparent hover:border-green-500 transition flex  items-center"
            >
              <MapPin className="w-4 h-4 text-gray-200 mr-4" />
              {loc.name}
            </button>
          ))}
      </div>
    </div>
  );
};

/* ╔════════════════════════════════════════════╗
   ║ ⬢ Location Search Select Component
   ╚════════════════════════════════════════════╝ */
export const LocationSearchSelect: React.FC<LocationSearchSelectProps> = ({
  onLocationSelect,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  // 💭 We are using mock location as placeholder
  const mockLocations: Location[] = [
    { name: 'Lagos, Nigeria', lat: 6.5244, lng: 3.3792 },
    { name: 'Chicago, USA', lat: 41.8781, lng: -87.6298 },
    { name: 'New York, USA', lat: 40.7128, lng: -74.006 },
  ];

  // ⬢ Handle Select Location
  // =====================================
  const handleSelect = (loc: Location): void => {
    setSelectedLocation(loc);
    onLocationSelect(loc);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-between border border-border-default  px-4 py-1.5 text-gray-200
        font-medium hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary text-xs transition absolute right-4 top-0 bg-white mt-1 rounded-sm"
      >
        <MapPin className="w-4 h-4 text-gray-500 mr-2" />
        <span>{selectedLocation?.name || 'Select Location'}</span>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <div className="p-4  bg-secondary flex items-center justify-between">
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded hover:bg-primary/10 transition border border-border-default "
          >
            <X className="w-4 h-4 text-gray-200" />
          </button>
        </div>

        <div className="p-4 pt-0">
          <LocationPicker
            defaultLocations={mockLocations}
            onSelect={handleSelect}
          />
        </div>
      </Dialog>
    </>
  );
};
