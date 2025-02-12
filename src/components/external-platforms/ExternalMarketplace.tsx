import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PlatformConnectionCard } from "./platform-connections/PlatformConnectionCard";
import { PlatformConnectionDialog } from "./platform-connections/PlatformConnectionDialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const ExternalMarketplace = () => {
  const { data: connections, isLoading, error, refetch } = useQuery({
    queryKey: ["platform-connections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("external_platform_connections")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load platform connections</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">External Platforms</h2>
          <p className="text-muted-foreground">
            Connect and manage your external marketplace listings
          </p>
        </div>
        <PlatformConnectionDialog onSuccess={refetch} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <p>Loading connections...</p>
        ) : connections?.length === 0 ? (
          <p>No platform connections yet. Add one to get started!</p>
        ) : (
          connections?.map((connection) => (
            <PlatformConnectionCard 
              key={connection.id} 
              connection={connection}
              onUpdate={refetch}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ExternalMarketplace;