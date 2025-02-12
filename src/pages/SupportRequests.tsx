import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SupportRequests = () => {
  const { data: requests, isLoading } = useQuery({
    queryKey: ["user-support-requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("support_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading your support requests...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Support Requests</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {requests?.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <CardTitle>Support Request</CardTitle>
              <CardDescription>
                {new Date(request.created_at).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Service:</span>
                  <span>{request.service_id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge
                    variant={
                      request.status === "completed"
                        ? "default"
                        : request.status === "in_progress"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {request.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {requests?.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground">
            You haven't made any support requests yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportRequests;