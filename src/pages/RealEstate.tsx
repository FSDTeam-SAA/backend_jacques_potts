import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RealEstateListingForm from "@/components/real-estate/RealEstateListingForm";
import RealEstateListingsGrid from "@/components/real-estate/RealEstateListingsGrid";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, DollarSign, Handshake } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MortgageCalculator from "@/components/browse/MortgageCalculator";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const RealEstate = () => {
  const navigate = useNavigate();

  const { data: legalTemplates } = useQuery({
    queryKey: ["legal-templates", "real-estate"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("legal_templates")
        .select("*")
        .eq("category", "real-estate")
        .eq("is_active", true);

      if (error) throw error;
      return data;
    },
  });

  const { data: financingProviders } = useQuery({
    queryKey: ["financing-providers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("financing_providers")
        .select("*")
        .eq("status", "active");

      if (error) throw error;
      return data;
    },
  });

  const handleTemplateAccess = async (templateId: string) => {
    try {
      const { error } = await supabase
        .from("template_purchases")
        .insert({
          template_id: templateId,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          payment_amount: 29.99,
        });

      if (error) throw error;
      toast.success("Template access granted!");
    } catch (error) {
      toast.error("Failed to access template");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="browse" className="space-y-6">
        <TabsList>
          <TabsTrigger value="browse">Browse Properties</TabsTrigger>
          <TabsTrigger value="list">List Property</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="browse">
          <RealEstateListingsGrid />
        </TabsContent>

        <TabsContent value="list">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">List Your Property</h2>
            <RealEstateListingForm />
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Legal Templates Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Legal Templates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {legalTemplates?.map((template) => (
                  <div key={template.id} className="flex justify-between items-center">
                    <span>{template.title}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTemplateAccess(template.id)}
                    >
                      Access
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Financing Options Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financing Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {financingProviders?.map((provider) => (
                  <div key={provider.id} className="space-y-2">
                    <h4 className="font-medium">{provider.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Interest rates from {provider.interest_rate_range?.lower}% to{" "}
                      {provider.interest_rate_range?.upper}%
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Escrow Services Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Handshake className="h-5 w-5" />
                  Escrow Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Secure your real estate transactions with our trusted escrow services.
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/escrow-services")}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Mortgage Calculator Section */}
          <div className="max-w-md mx-auto">
            <MortgageCalculator listingId="" propertyPrice={0} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RealEstate;