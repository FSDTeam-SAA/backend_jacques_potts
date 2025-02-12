import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock } from "lucide-react";
import type { Task } from "../types";

interface TaskListProps {
  businessId: string;
}

const TaskList = ({ businessId }: TaskListProps) => {
  const { data: tasks = [] } = useQuery({
    queryKey: ["post-acquisition-tasks", businessId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("post_acquisition_tasks")
        .select("*")
        .eq("business_id", businessId)
        .order("due_date", { ascending: true });

      if (error) throw error;
      return data as Task[];
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
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
                    <Clock className="h-4 w-4" />
                    {new Date(task.due_date).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;