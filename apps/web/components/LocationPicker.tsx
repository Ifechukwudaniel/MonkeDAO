'use client';

import { Crosshair, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Location {
  name: string;
  lat: number;
  lng: number;
}

interface LocationPickerProps {
  onSelect: (location: Location) => void;
  defaultLocations?: Location[];
}

export const LocationPicker = ({
  onSelect,
  defaultLocations = [],
}: LocationPickerProps) => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch suggestions from Google Places API
  const fetchSuggestions = async (query: string) => {
    if (!query) return setSuggestions([]);
    setLoading(true);

    const res = await fetch(`/api/places?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    setSuggestions(data.predictions || []);
    setLoading(false);
  };

  // Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => fetchSuggestions(search), 300);
    return () => clearTimeout(timeout);
  }, [search]);

  // Handle "use current location"
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Optionally reverse geocode to get city/neighborhood name
        const res = await fetch(
          `/api/reverse-geocode?lat=${latitude}&lng=${longitude}`,
        );
        const data = await res.json();
        onSelect({
          name: data.name || 'Current Location',
          lat: latitude,
          lng: longitude,
        });
      },
      () => alert('Unable to get current location'),
    );
  };

  return (
    <div className="w-full  border border-[#C4C4C4] p-4 shadow-md bg-[#FCFBF2]">
      {/* Search */}
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search city, zip code or neighborhood"
          className="flex-1 border  rounded-none px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
        />
        <button
          onClick={handleCurrentLocation}
          className="p-2 rounded-lg bg-green-100 hover:bg-green-200 transition"
          title="Use current location"
        >
          <Crosshair className="w-5 h-5 text-green-600" />
        </button>
      </div>

      {/* Suggestions */}
      {loading && <p className="text-xs text-gray-400 mb-2">Loading...</p>}
      <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
        {suggestions.map((loc, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(loc)}
            className="text-left px-3 py-2 transition text-sm hover:border-[#4A8F5D] hover:bg-[#86C99440] cursor-pointer"
          >
            {loc.name}
          </button>
        ))}

        {/* Default / recent locations */}
        {defaultLocations.map((loc, idx) => (
          <button
            key={`default-${idx}`}
            onClick={() => onSelect(loc)}
            className="text-left px-3 py-2 rounded-none hover:border-[#4A8F5D] hover:bg-[#86C99440] text-sm"
          >
            {loc.name}
          </button>
        ))}
      </div>
    </div>
  );
};
