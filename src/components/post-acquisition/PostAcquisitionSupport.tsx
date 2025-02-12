import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import TaskList from "./components/TaskList";
import MetricsCard from "./components/MetricsCard";

interface PostAcquisitionSupportProps {
  businessId: string;
}

const PostAcquisitionSupport = ({ businessId }: PostAcquisitionSupportProps) => {
  const { data: business } = useQuery({
    queryKey: ["business", businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_listings")
        .select("*")
        .eq("id", businessId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (!business) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Post-Acquisition Support</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskList businessId={businessId} />
        <MetricsCard businessId={businessId} />
      </div>
    </div>
  );
};

export default PostAcquisitionSupport;