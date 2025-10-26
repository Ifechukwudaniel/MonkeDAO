'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog';
import { MapPin, X } from 'lucide-react';
import { useState } from 'react';
import { LocationPicker } from './LocationPicker';

const mockLocations = [
  { name: 'Lagos, Nigeria', lat: 6.5244, lng: 3.3792 },
  { name: 'Chicago, USA', lat: 41.8781, lng: -87.6298 },
  { name: 'New York, USA', lat: 40.7128, lng: -74.006 },
];

export const LocationSearchSelect = ({
  onLocationSelect,
}: {
  onLocationSelect: (loc: any) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 transform ">
      <Dialog>
        <DialogTrigger asChild>
          <button className="w-full flex items-center justify-between  border border-[#C4C4C4] px-4 py-1 text-gray-700 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition text-xs">
            <MapPin className="w-4 h-4 text-gray-500 mr-2" />
            <span>{selectedLocation?.name || 'Select Location'}</span>
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-lg w-full p-0 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">
              Choose Your Location
            </DialogTitle>
            <DialogClose asChild>
              <button className="p-2 rounded hover:bg-gray-100 transition">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </DialogClose>
          </div>

          {/* Location Picker inside modal */}
          <DialogDescription>Hello</DialogDescription>
          <div className="p-4">
            <LocationPicker
              defaultLocations={mockLocations}
              onSelect={(loc) => {
                setSelectedLocation(loc);
                onLocationSelect(loc);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
