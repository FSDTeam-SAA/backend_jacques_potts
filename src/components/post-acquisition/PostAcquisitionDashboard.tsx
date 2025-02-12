import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Target, 
  TrendingUp,
  Calendar,
  AlertCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Task, Metric } from "./types";

const PostAcquisitionDashboard = ({ businessId }: { businessId: string }) => {
  const { data: tasks } = useQuery({
    queryKey: ["post-acquisition-tasks", businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("post_acquisition_tasks")
        .select("*")
        .eq("business_id", businessId)
        .order("due_date", { ascending: true });

      if (error) throw error;
      return data as Task[];
    }
  });

  const { data: metrics } = useQuery({
    queryKey: ["post-acquisition-metrics", businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("post_acquisition_metrics")
        .select("*")
        .eq("business_id", businessId)
        .order("measurement_date", { ascending: false });

      if (error) throw error;
      return data as Metric[];
    }
  });

  const handleCompleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from("post_acquisition_tasks")
        .update({ status: "completed" })
        .eq("id", taskId);

      if (error) throw error;
      toast.success("Task marked as completed");
    } catch (error) {
      console.error("Error completing task:", error);
      toast.error("Failed to complete task");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Post-Acquisition Management</h2>
        <Button variant="outline">
          <Target className="mr-2 h-4 w-4" />
          Set New Goals
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Tasks Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks?.map((task) => (
                <div key={task.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={task.status === "completed" ? "default" : "secondary"}>
                      {task.status}
                    </Badge>
                    {task.due_date && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(task.due_date).toLocaleDateString()}
                      </div>
                    )}
                    {task.status !== "completed" && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCompleteTask(task.id)}
                      >
                        Complete
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Metrics Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {metrics?.map((metric) => (
                <div key={metric.id} className="space-y-1">
                  <p className="text-sm text-muted-foreground">{metric.metric_name}</p>
                  <p className="text-2xl font-bold">{metric.metric_value}</p>
                  {metric.target_value && (
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      <p className="text-sm text-muted-foreground">
                        Target: {metric.target_value}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {(!tasks?.length || !metrics?.length) && (
        <Card className="bg-muted">
          <CardContent className="flex items-center gap-2 p-4">
            <AlertCircle className="h-5 w-5" />
            <p>No data available yet. Start by setting up tasks and metrics for this business.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PostAcquisitionDashboard;