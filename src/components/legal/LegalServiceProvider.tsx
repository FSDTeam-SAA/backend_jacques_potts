import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface LegalTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  price: number;
}

const LegalServiceProvider = () => {
  const { user } = useAuth();

  const { data: templates, isLoading } = useQuery({
    queryKey: ['legalTemplates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('legal_templates')
        .select('*')
        .eq('is_active', true);
      
      if (error) throw error;
      return data as LegalTemplate[];
    }
  });

  const purchaseMutation = useMutation({
    mutationFn: async (templateId: string) => {
      const { error } = await supabase
        .from('template_purchases')
        .insert({
          template_id: templateId,
          user_id: user?.id,
          payment_status: 'pending',
          payment_amount: templates?.find(t => t.id === templateId)?.price || 0
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Template purchase initiated");
    },
    onError: () => {
      toast.error("Failed to purchase template");
    }
  });

  if (isLoading) {
    return <div>Loading legal templates...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Legal Services</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates?.map((template) => (
          <Card key={template.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{template.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <p className="text-sm text-gray-600 mb-4 flex-1">{template.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-medium">${template.price}</span>
                <Button onClick={() => purchaseMutation.mutate(template.id)}>
                  {purchaseMutation.isPending ? "Processing..." : "Purchase Template"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LegalServiceProvider;