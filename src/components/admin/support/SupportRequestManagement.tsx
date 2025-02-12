import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const SupportRequestManagement = () => {
  const { data: requests, isLoading, refetch } = useQuery({
    queryKey: ["support-requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("support_requests")
        .select(`
          *,
          profiles:user_id (
            full_name,
            email
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const updateStatus = async (requestId: string, newStatus: string) => {
    const { error } = await supabase
      .from("support_requests")
      .update({ status: newStatus })
      .eq("id", requestId);

    if (error) {
      toast.error("Failed to update status");
      return;
    }

    toast.success("Status updated successfully");
    refetch();
  };

  if (isLoading) {
    return <div>Loading support requests...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Support Requests</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests?.map((request) => (
            <TableRow key={request.id}>
              <TableCell>
                <div>
                  <div>{request.profiles?.full_name}</div>
                  <div className="text-sm text-muted-foreground">
                    {request.profiles?.email}
                  </div>
                </div>
              </TableCell>
              <TableCell>{request.service_id}</TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell>
                {new Date(request.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {request.status === "pending" && (
                    <Button
                      size="sm"
                      onClick={() => updateStatus(request.id, "in_progress")}
                    >
                      Start
                    </Button>
                  )}
                  {request.status === "in_progress" && (
                    <Button
                      size="sm"
                      onClick={() => updateStatus(request.id, "completed")}
                    >
                      Complete
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SupportRequestManagement;