import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const LawyerVerificationPanel = () => {
  const { data: pendingLawyers, isLoading, refetch } = useQuery({
    queryKey: ['pending-lawyers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lawyer_profiles')
        .select(`
          *,
          profiles:user_id (
            full_name,
            email
          )
        `)
        .eq('verification_status', 'pending');
      
      if (error) throw error;
      return data;
    }
  });

  const verifyMutation = useMutation({
    mutationFn: async ({ lawyerId, status }: { lawyerId: string, status: 'approved' | 'rejected' }) => {
      const { error } = await supabase
        .from('lawyer_profiles')
        .update({ 
          verification_status: status,
          verified_at: new Date().toISOString(),
          verified_by: (await supabase.auth.getUser()).data.user?.id
        })
        .eq('id', lawyerId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Lawyer verification status updated");
      refetch();
    },
    onError: () => {
      toast.error("Failed to update verification status");
    }
  });

  if (isLoading) {
    return <div>Loading lawyer verification requests...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Lawyer Verification</h2>
      <div className="grid gap-4">
        {pendingLawyers?.map((lawyer) => (
          <Card key={lawyer.id}>
            <CardHeader>
              <CardTitle>{lawyer.profiles.full_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">License Number</p>
                    <p>{lawyer.license_number}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Years Experience</p>
                    <p>{lawyer.years_experience}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Specialties</p>
                  <div className="flex gap-2 mt-1">
                    {lawyer.specialties?.map((specialty, index) => (
                      <Badge key={index} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => verifyMutation.mutate({ 
                      lawyerId: lawyer.id, 
                      status: 'approved' 
                    })}
                    disabled={verifyMutation.isPending}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => verifyMutation.mutate({ 
                      lawyerId: lawyer.id, 
                      status: 'rejected' 
                    })}
                    disabled={verifyMutation.isPending}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {(!pendingLawyers || pendingLawyers.length === 0) && (
          <Card>
            <CardContent className="py-8">
              <p className="text-center text-muted-foreground">
                No pending lawyer verification requests
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LawyerVerificationPanel;