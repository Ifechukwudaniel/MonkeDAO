import { Crosshair, MapPin, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// Types
interface Location {
  name: string;
  lat: number;
  lng: number;
}

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

// Simple Dialog components (since we can't use Radix in artifacts)
const Dialog: React.FC<DialogProps> = ({ children, open, onOpenChange }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
        {children}
      </div>
    </div>
  );
};

// LocationPicker Component
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

  useEffect(() => {
    // Initialize Google services when available
    if (window.google && window.google.maps) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
      geocoder.current = new window.google.maps.Geocoder();
    }
  }, []);

  const fetchSuggestions = async (query: string): Promise<void> => {
    if (!query || !autocompleteService.current) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    autocompleteService.current.getPlacePredictions(
      {
        input: query,
        types: ['(cities)'], // Filter to cities only
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

  // Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => fetchSuggestions(search), 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const handleSelectPlace = async (
    prediction: google.maps.places.AutocompletePrediction,
  ): Promise<void> => {
    if (!geocoder.current) return;

    // Get coordinates from place_id
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

  const handleCurrentLocation = (): void => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;

        // Reverse geocode to get city name
        if (geocoder.current) {
          geocoder.current.geocode(
            { location: { lat: latitude, lng: longitude } },
            (
              results: google.maps.GeocoderResult[] | null,
              status: google.maps.GeocoderStatus,
            ) => {
              if (status === 'OK' && results && results[0]) {
                // Find city name from results
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
    <div className="w-full border border-gray-300 p-4 bg-amber-50">
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
              className="text-left px-3 py-2 text-sm hover:bg-green-100 border border-transparent hover:border-green-500 transition"
            >
              📍 {loc.name}
            </button>
          ))}
      </div>
    </div>
  );
};

// Main LocationSearchSelect Component
export const LocationSearchSelect: React.FC<LocationSearchSelectProps> = ({
  onLocationSelect,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  const mockLocations: Location[] = [
    { name: 'Lagos, Nigeria', lat: 6.5244, lng: 3.3792 },
    { name: 'Chicago, USA', lat: 41.8781, lng: -87.6298 },
    { name: 'New York, USA', lat: 40.7128, lng: -74.006 },
  ];

  const handleSelect = (loc: Location): void => {
    setSelectedLocation(loc);
    onLocationSelect(loc);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-between border border-gray-400 px-4 py-2 text-gray-700 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition text-sm"
      >
        <MapPin className="w-4 h-4 text-gray-500 mr-2" />
        <span>{selectedLocation?.name || 'Select Location'}</span>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Choose Your Location</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4">
          <LocationPicker
            defaultLocations={mockLocations}
            onSelect={handleSelect}
          />
        </div>
      </Dialog>
    </>
  );
};

// Demo App
export default function App() {
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    // Load Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Location Search Demo</h1>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <label className="block text-sm font-medium mb-2">
            Select Your Location:
          </label>
          <LocationSearchSelect
            onLocationSelect={(loc: Location) => {
              setLocation(loc);
              console.log('Selected:', loc);
            }}
          />
        </div>

        {location && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Selected Location:</h3>
            <p className="text-sm">
              <strong>Name:</strong> {location.name}
            </p>
            <p className="text-sm">
              <strong>Latitude:</strong> {location.lat}
            </p>
            <p className="text-sm">
              <strong>Longitude:</strong> {location.lng}
            </p>
          </div>
        )}

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⚠️ <strong>Important:</strong> Replace{' '}
            <code className="bg-yellow-100 px-1">YOUR_API_KEY</code> with your
            actual Google Maps API key. Get one at:{' '}
            <a
              href="https://console.cloud.google.com/google/maps-apis"
              className="text-blue-600 underline"
              target="_blank"
            >
              Google Cloud Console
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
