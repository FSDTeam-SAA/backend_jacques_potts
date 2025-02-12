import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ConnectionCard } from "./ConnectionCard";

export const ConnectionsList = () => {
  const { data: connections, isLoading, refetch } = useQuery({
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

  if (isLoading) return <div>Loading connections...</div>;
  if (!connections?.length) return <div>No platform connections yet</div>;

  return (
    <div className="space-y-4">
      {connections.map((connection) => (
        <ConnectionCard
          key={connection.id}
          connection={connection}
          onSyncComplete={refetch}
        />
      ))}
    </div>
  );
};