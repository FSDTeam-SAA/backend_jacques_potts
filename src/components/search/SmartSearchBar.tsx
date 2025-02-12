import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { industries } from "@/components/business-listing/constants";
import LocationInput from "./LocationInput";
import IndustryInput from "./IndustryInput";
import { toast } from "sonner";

const SmartSearchBar = () => {
  const navigate = useNavigate();
  const [locationInput, setLocationInput] = useState("");
  const [industryInput, setIndustryInput] = useState("");
  const [suggestions, setSuggestions] = useState<{
    locations: string[];
    industries: string[];
  }>({
    locations: [],
    industries: [],
  });

  const locations = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
    "Phoenix, AZ",
  ];

  const handleSearch = () => {
    if (!locationInput && !industryInput) {
      toast.error("Please enter a location or industry to search");
      return;
    }
    
    const searchParams = new URLSearchParams();
    if (locationInput) searchParams.set("location", locationInput);
    if (industryInput) searchParams.set("industry", industryInput);
    
    navigate(`/browse?${searchParams.toString()}`);
  };

  const handleLocationInputChange = (value: string) => {
    setLocationInput(value);
    const filteredLocations = locations.filter((loc) =>
      loc.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions((prev) => ({ ...prev, locations: filteredLocations }));
  };

  const handleIndustryInputChange = (value: string) => {
    setIndustryInput(value);
    const filteredIndustries = industries.filter((ind) =>
      ind.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions((prev) => ({ ...prev, industries: filteredIndustries }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-auto flex-1">
          <LocationInput
            value={locationInput}
            onChange={handleLocationInputChange}
            suggestions={suggestions.locations}
            onSelectSuggestion={(location) => {
              setLocationInput(location);
              setSuggestions((prev) => ({ ...prev, locations: [] }));
            }}
          />
        </div>

        <div className="w-full md:w-auto flex-1">
          <IndustryInput
            value={industryInput}
            onChange={handleIndustryInputChange}
            suggestions={suggestions.industries}
            onSelectSuggestion={(industry) => {
              setIndustryInput(industry);
              setSuggestions((prev) => ({ ...prev, industries: [] }));
            }}
          />
        </div>

        <Button
          onClick={handleSearch}
          className="w-full md:w-auto bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white"
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default SmartSearchBar;