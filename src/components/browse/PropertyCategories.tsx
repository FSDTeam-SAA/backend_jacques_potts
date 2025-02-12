import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PropertyCategoriesProps {
  listingId: string;
}

const PropertyCategories = ({ listingId }: PropertyCategoriesProps) => {
  const { data: categories } = useQuery({
    queryKey: ["property-categories", listingId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("property_classifications")
        .select(`
          *,
          property_categories (
            name,
            description
          )
        `)
        .eq("listing_id", listingId);
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-5 w-5" />
          Property Categories
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {categories?.map((classification) => (
            <Badge key={classification.id} variant="secondary">
              {classification.property_categories.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCategories;