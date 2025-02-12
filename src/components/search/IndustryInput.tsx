import { Building2 } from "lucide-react";

interface IndustryInputProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  onSelectSuggestion: (industry: string) => void;
}

const IndustryInput = ({ value, onChange, suggestions, onSelectSuggestion }: IndustryInputProps) => {
  return (
    <div className="flex-1 relative">
      <div className="relative">
        <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Select industry..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent text-black bg-white"
        />
      </div>
      {value && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          {suggestions.map((industry) => (
            <div
              key={industry}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
              onClick={() => onSelectSuggestion(industry)}
            >
              {industry}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IndustryInput;