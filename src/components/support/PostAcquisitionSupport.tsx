import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle, Clock } from "lucide-react";

interface SupportService {
  id: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  status: 'available' | 'coming_soon';
}

const PostAcquisitionSupport = () => {
  const { user } = useAuth();

  const { data: services, isLoading } = useQuery({
    queryKey: ['supportServices'],
    queryFn: async () => {
      return [
        {
          id: '1',
          title: 'Business Transition Planning',
          description: 'Comprehensive guidance on smoothly transitioning business operations',
          price: 1500,
          features: [
            'Operational handover plan',
            'Employee transition management',
            'Systems and process documentation',
            '30-day support period'
          ],
          status: 'available'
        },
        {
          id: '2',
          title: 'Financial Advisory',
          description: 'Expert financial planning and management support post-acquisition',
          price: 2000,
          features: [
            'Financial health assessment',
            'Cash flow optimization',
            'Tax planning strategies',
            'Growth opportunity analysis'
          ],
          status: 'available'
        },
        {
          id: '3',
          title: 'Integration Services',
          description: 'Technical and operational integration support',
          price: 2500,
          features: [
            'Systems integration',
            'Data migration',
            'Staff training',
            'Process optimization'
          ],
          status: 'coming_soon'
        }
      ] as SupportService[];
    }
  });

  const requestMutation = useMutation({
    mutationFn: async (serviceId: string) => {
      const { error } = await supabase
        .from('support_requests')
        .insert({
          user_id: user?.id,
          service_id: serviceId,
          status: 'pending'
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Support request submitted successfully");
    },
    onError: () => {
      toast.error("Failed to submit support request");
    }
  });

  if (isLoading) {
    return <div>Loading support services...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-2xl font-bold mb-4">Post-Acquisition Support</h2>
        <p className="text-muted-foreground">
          Expert guidance and support to ensure a smooth transition and successful operation of your newly acquired business.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services?.map((service) => (
          <Card key={service.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle>{service.title}</CardTitle>
                <Badge variant={service.status === 'available' ? 'default' : 'secondary'}>
                  {service.status === 'available' ? 
                    <CheckCircle className="h-4 w-4 mr-1" /> : 
                    <Clock className="h-4 w-4 mr-1" />
                  }
                  {service.status === 'available' ? 'Available' : 'Coming Soon'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <p className="text-sm text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, index) => (
                  <li key={index} className="text-sm flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-medium">${service.price.toLocaleString()}</span>
                <Button
                  onClick={() => requestMutation.mutate(service.id)}
                  disabled={service.status !== 'available' || requestMutation.isPending}
                >
                  {service.status === 'available' ? 
                    (requestMutation.isPending ? "Processing..." : "Request Service") : 
                    "Coming Soon"
                  }
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PostAcquisitionSupport;