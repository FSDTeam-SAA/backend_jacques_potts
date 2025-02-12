import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gavel, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface LawyerProfile {
  id: string;
  user_id: string;
  license_number: string;
  specialties: string[];
  years_experience: number;
  verification_status: string;
  profiles: {
    full_name: string;
    email: string;
  };
}

const LawyerIntegration = () => {
  const { data: lawyers, isLoading } = useQuery({
    queryKey: ['verified-lawyers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lawyer_profiles')
        .select(`
          *,
          profiles (
            full_name,
            email
          )
        `)
        .eq('verification_status', 'approved');
      
      if (error) throw error;
      return data as LawyerProfile[];
    }
  });

  const handleContactLawyer = async (lawyerId: string) => {
    try {
      const { error } = await supabase
        .from('lawyer_engagements')
        .insert({
          lawyer_id: lawyerId,
          client_id: (await supabase.auth.getUser()).data.user?.id,
          engagement_type: 'consultation',
          status: 'pending'
        });

      if (error) throw error;
      toast.success("Consultation request sent to lawyer");
    } catch (error) {
      toast.error("Failed to send consultation request");
    }
  };

  if (isLoading) {
    return <div>Loading lawyers...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gavel className="h-5 w-5" />
          Legal Assistance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lawyers?.map((lawyer) => (
            <div key={lawyer.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{lawyer.profiles.full_name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {lawyer.years_experience} years of experience
                  </p>
                </div>
                <Badge>Verified</Badge>
              </div>
              <div className="mt-2">
                <p className="text-sm font-medium">Specialties:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {lawyer.specialties?.map((specialty, index) => (
                    <Badge key={index} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => handleContactLawyer(lawyer.id)}
                >
                  <MessageSquare className="h-4 w-4" />
                  Request Consultation
                </Button>
              </div>
            </div>
          ))}
          {(!lawyers || lawyers.length === 0) && (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No verified lawyers available at the moment</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LawyerIntegration;