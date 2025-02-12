import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LegalTemplatesSection = () => {
  const navigate = useNavigate();
  
  const { data: templates } = useQuery({
    queryKey: ["legal-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("legal_templates")
        .select("*")
        .eq("is_active", true)
        .limit(3);
      
      if (error) throw error;
      return data;
    },
  });

  const handleTemplateClick = (templateId: string) => {
    navigate(`/templates/${templateId}`);
    toast.info("Please login or sign up to access this template");
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Legal Document Templates</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access professionally crafted legal templates for your business transactions.
            From letters of intent to purchase agreements, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {templates?.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  {template.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {template.description}
                </p>
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => handleTemplateClick(template.id)}
                >
                  View Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="default"
            onClick={() => navigate("/templates")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            View All Templates
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LegalTemplatesSection;