import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AssetGrid from "@/components/assets/AssetGrid";
import AssetFilters from "@/components/assets/AssetFilters";
import { useState } from "react";

const AssetMarketplace = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "all",
    minPrice: "",
    maxPrice: "",
    condition: "all",
  });

  const { data: assets, isLoading } = useQuery({
    queryKey: ["assets", filters],
    queryFn: async () => {
      let query = supabase
        .from("asset_listings")
        .select(`
          *,
          profiles (
            full_name,
            avatar_url
          )
        `)
        .eq("status", "published");

      if (filters.category && filters.category !== "all") {
        query = query.eq("category", filters.category);
      }
      if (filters.condition && filters.condition !== "all") {
        query = query.eq("condition", filters.condition);
      }
      if (filters.minPrice) {
        query = query.gte("price", parseFloat(filters.minPrice));
      }
      if (filters.maxPrice) {
        query = query.lte("price", parseFloat(filters.maxPrice));
      }

      const { data, error } = await query.order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Asset Marketplace</h1>
          <p className="text-muted-foreground mt-2">
            Browse and purchase business assets, equipment, and inventory
          </p>
        </div>
        <Button onClick={() => navigate("/assets/create")}>
          <Plus className="mr-2 h-4 w-4" /> List Asset
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <AssetFilters filters={filters} setFilters={setFilters} />
        </aside>
        <main className="lg:col-span-3">
          <AssetGrid assets={assets} isLoading={isLoading} />
        </main>
      </div>
    </div>
  );
};

export default AssetMarketplace;