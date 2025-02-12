import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface BrokerSearchBarProps {
  searchName: string;
  searchCity: string;
  searchState: string;
  onNameChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onStateChange: (value: string) => void;
  onClear: () => void;
  onSearch: () => void;
}

const BrokerSearchBar = ({
  searchName,
  searchCity,
  searchState,
  onNameChange,
  onCityChange,
  onStateChange,
  onClear,
  onSearch,
}: BrokerSearchBarProps) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by broker name..."
            value={searchName}
            onChange={(e) => onNameChange(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by city..."
            value={searchCity}
            onChange={(e) => onCityChange(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <Input
            placeholder="Search by state..."
            value={searchState}
            onChange={(e) => onStateChange(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={onClear}>
          Clear
        </Button>
        <Button onClick={onSearch}>
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default BrokerSearchBar;