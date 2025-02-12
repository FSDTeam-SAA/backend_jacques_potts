import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import PlatformHeader from "./PlatformHeader";
import PlatformGrid from "./PlatformGrid";

const PlatformConnectors = () => {
  const { data: connections, refetch } = useQuery({
    queryKey: ["platform-connections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("external_platform_connections")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const handleSync = async (connectionId: string) => {
    try {
      const { error } = await supabase.functions.invoke("sync-platform-listings", {
        body: { connectionId }
      });

      if (error) throw error;
      toast.success("Sync started successfully");
      refetch();
    } catch (error) {
      console.error("Error syncing platform:", error);
      toast.error("Failed to sync platform");
    }
  };

  return (
    <div className="space-y-6">
      <PlatformHeader 
        title="Platform Connections"
        description="Manage your external marketplace connections"
      />
      <PlatformGrid 
        connections={connections || []}
        onSync={handleSync}
      />
    </div>
  );
};

export default PlatformConnectors;