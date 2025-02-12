import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BrokerProfile {
  id: string;
  user_id: string;
  license_number: string;
  years_experience: number;
  specialties: string[];
  verification_status: string;
  created_at: string;
  profiles: {
    full_name: string;
    email: string;
    city: string;
    state: string;
  };
}

const BrokerVerificationPanel = () => {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: pendingBrokers, refetch } = useQuery({
    queryKey: ["pendingBrokers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("broker_profiles")
        .select(`
          *,
          profiles:user_id (
            full_name,
            email,
            city,
            state
          )
        `)
        .eq("verification_status", "pending")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as BrokerProfile[];
    },
  });

  const updateBrokerStatus = async (brokerId: string, status: "approved" | "rejected") => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from("broker_profiles")
        .update({ 
          verification_status: status,
          verified_at: new Date().toISOString(),
          verified_by: (await supabase.auth.getUser()).data.user?.id
        })
        .eq("id", brokerId);

      if (error) throw error;

      toast({
        title: `Broker ${status}`,
        description: `The broker has been ${status} successfully.`,
      });
      refetch();
    } catch (error) {
      console.error("Error updating broker status:", error);
      toast({
        title: "Error",
        description: "Failed to update broker status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Broker Verification</h2>
        <Badge variant="secondary">
          {pendingBrokers?.length || 0} Pending Applications
        </Badge>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>License Number</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Specialties</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingBrokers?.map((broker) => (
            <TableRow key={broker.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{broker.profiles.full_name}</p>
                  <p className="text-sm text-muted-foreground">{broker.profiles.email}</p>
                </div>
              </TableCell>
              <TableCell>
                {broker.profiles.city}, {broker.profiles.state}
              </TableCell>
              <TableCell>{broker.license_number}</TableCell>
              <TableCell>{broker.years_experience} years</TableCell>
              <TableCell>
                <div className="flex gap-1 flex-wrap">
                  {broker.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateBrokerStatus(broker.id, "approved")}
                  disabled={isUpdating}
                >
                  Approve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateBrokerStatus(broker.id, "rejected")}
                  disabled={isUpdating}
                  className="text-red-500 hover:text-red-600"
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BrokerVerificationPanel;