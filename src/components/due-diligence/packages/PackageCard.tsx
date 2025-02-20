import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface PackageCardProps {
  pkg: {
    id: string;
    name: string;
    description: string;
    price: number;
    features: string[];
  };
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePurchase = async () => {

    console.log("User", user, "Package", pkg,"Working");
    if (!user) {
      toast.error("Please log in to purchase a due diligence package");
      navigate("/login");
      return;
    }

    try {
      const { data: { url }, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          featureType: 'due_diligence',
          packageId: pkg.id,
          amount: pkg.price
        }
      });

      if (error) throw error;
      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Failed to process payment');
    }
  };

  return (
    <Card className="flex flex-col">
      {/* <p>asdlfhsadlkfasdlklsdkljasdfkljsadkjl; ;kasdflsad</p> */}
      <CardHeader>
        <CardTitle>{pkg.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-2xl font-bold mb-4">${pkg.price}</div>
        <p className="text-muted-foreground mb-4">{pkg.description}</p>
        <ul className="space-y-2">
          {pkg.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Badge variant="outline" className="h-6">✓</Badge>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handlePurchase}>
          Purchase Package
        </Button>
      </CardFooter>
    </Card>
  );
}