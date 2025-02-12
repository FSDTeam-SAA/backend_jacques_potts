import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import type { Metric } from "../types";

interface MetricsCardProps {
  businessId: string;
}

const MetricsCard = ({ businessId }: MetricsCardProps) => {
  const { data: metrics = [] } = useQuery({
    queryKey: ["post-acquisition-metrics", businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("post_acquisition_metrics")
        .select("*")
        .eq("business_id", businessId)
        .order("measurement_date", { ascending: false });

      if (error) throw error;
      return data as Metric[];
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <div key={metric.id} className="space-y-1">
              <p className="text-sm text-muted-foreground">{metric.metric_name}</p>
              <p className="text-2xl font-bold">{metric.metric_value}</p>
              {metric.target_value && (
                <p className="text-xs text-muted-foreground">
                  Target: {metric.target_value}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;