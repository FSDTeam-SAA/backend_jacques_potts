import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Percent, Building, FileText } from "lucide-react";

const FinancingOptions = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Financing Options</h1>
        <p className="text-gray-600 mb-8">
          Explore various financing solutions available for business acquisitions and real estate investments.
        </p>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Traditional Business Loans
              </CardTitle>
              <CardDescription>
                Conventional financing through banks and credit unions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Traditional business loans offer competitive rates and terms for qualified buyers, typically requiring good credit and collateral.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="h-5 w-5" />
                SBA Loans
              </CardTitle>
              <CardDescription>
                Government-backed financing options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                SBA loans provide favorable terms and lower down payments, making business acquisition more accessible for qualified buyers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Commercial Real Estate Financing
              </CardTitle>
              <CardDescription>
                Specialized loans for property acquisition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Commercial real estate loans offer specific terms and conditions tailored to property investments and business locations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Alternative Financing
              </CardTitle>
              <CardDescription>
                Creative financing solutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Explore seller financing, equipment financing, and other alternative funding options for your business acquisition.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FinancingOptions;