import { Building2, MessageCircle, FileText, Search, DollarSign, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    icon: <Search className="h-6 w-6" />,
    title: "Browse Businesses",
    description: "Explore our curated marketplace of verified business listings across various industries.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Due Diligence",
    description: "Access comprehensive reports, financial data, and verified documentation for informed decisions.",
  },
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: "Connect & Negotiate",
    description: "Communicate directly with sellers and negotiate terms through our secure platform.",
  },
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: "Secure Transactions",
    description: "Complete purchases safely using our escrow service and payment protection systems.",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Legal Support",
    description: "Get assistance with contracts, agreements, and legal documentation from verified professionals.",
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Post-Acquisition",
    description: "Receive ongoing support and resources for successful business transition and growth.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-12 text-primary">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow border-primary/20">
            <CardHeader>
              <div className="w-12 h-12 mx-auto mb-4 bg-primary text-white rounded-full flex items-center justify-center">
                {step.icon}
              </div>
              <CardTitle className="text-primary">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;