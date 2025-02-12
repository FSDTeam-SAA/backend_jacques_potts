import { MapPin } from "lucide-react";

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  onSelectSuggestion: (location: string) => void;
}

const LocationInput = ({ value, onChange, suggestions, onSelectSuggestion }: LocationInputProps) => {
  return (
    <div className="flex-1 relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Enter location..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent text-black bg-white"
        />
      </div>
      {value && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          {suggestions.map((location) => (
            <div
              key={location}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
              onClick={() => onSelectSuggestion(location)}
            >
              {location}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationInput;