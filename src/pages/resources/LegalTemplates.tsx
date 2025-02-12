import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckSquare, Shield, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const LegalTemplates = () => {
  const { data: templates } = useQuery({
    queryKey: ["legal-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("legal_templates")
        .select("*")
        .eq("is_active", true);
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Legal Templates</h1>
        <p className="text-gray-600 mb-8">
          Access professionally crafted legal templates for business transactions and agreements.
        </p>

        <div className="grid gap-6">
          {templates?.map((template) => (
            <Card key={template.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {template.title}
                </CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div className="text-gray-600">
                  Category: {template.category}
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Template
                </Button>
              </CardContent>
            </Card>
          ))}

          {!templates?.length && (
            <Card>
              <CardContent className="py-8 text-center text-gray-600">
                No templates available at the moment.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default LegalTemplates;