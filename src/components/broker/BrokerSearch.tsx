import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import BrokerSearchBar from "./search/BrokerSearchBar";
import BrokerSearchResults from "./search/BrokerSearchResults";
import type { BrokerProfile } from "./types";

const BrokerSearch = () => {
  const [searchName, setSearchName] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchState, setSearchState] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(0);

  const { data: brokers } = useQuery({
    queryKey: ["brokers", searchName, searchCity, searchState, searchTrigger],
    queryFn: async () => {
      let query = supabase
        .from("broker_profiles")
        .select(`
          *,
          profiles:user_id (
            full_name,
            email,
            city,
            state,
            avatar_url,
            ratings:transaction_ratings!rated_user_id(rating)
          )
        `)
        .eq("verification_status", "approved");

      if (searchName) {
        query = query.ilike("profiles.full_name", `%${searchName}%`);
      }
      if (searchCity) {
        query = query.ilike("profiles.city", `%${searchCity}%`);
      }
      if (searchState) {
        query = query.ilike("profiles.state", `%${searchState}%`);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching brokers:", error);
        throw error;
      }

      return data as BrokerProfile[];
    },
  });

  const handleClear = () => {
    setSearchName("");
    setSearchCity("");
    setSearchState("");
    setSearchTrigger(prev => prev + 1);
  };

  const handleSearch = () => {
    setSearchTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <BrokerSearchBar
        searchName={searchName}
        searchCity={searchCity}
        searchState={searchState}
        onNameChange={setSearchName}
        onCityChange={setSearchCity}
        onStateChange={setSearchState}
        onClear={handleClear}
        onSearch={handleSearch}
      />
      <BrokerSearchResults brokers={brokers} />
    </div>
  );
};

export default BrokerSearch;