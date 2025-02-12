import { TrendingUp, MessageCircle, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const premiumFeatures = [
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Dynamic Filters",
    description: "Refine your search like never before with advanced filters.",
    price: "$1 for 1-hour access",
    buttonText: "Try Dynamic Filters",
  },
  {
    icon: <MessageCircle className="h-5 w-5" />,
    title: "Priority Messaging",
    description: "Get noticed faster by sellers with priority messages.",
    price: "$2 per message",
    buttonText: "Send Priority Message",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "LOI Submissions",
    description: "Streamline offers and secure deals directly through our platform.",
    price: "$20 per LOI",
    buttonText: "Submit an LOI",
  },
];

const PremiumFeaturesSection = () => {
  return (
    <section className="bg-primary/5 -mx-8 px-8 py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">Premium Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {premiumFeatures.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  {feature.icon}
                  {feature.title}
                </CardTitle>
                <CardDescription>{feature.price}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600">{feature.description}</p>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  {feature.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumFeaturesSection;