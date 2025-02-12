import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, Users, FileCheck, Shield } from "lucide-react";

const LegalAdvice = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Legal Advice</h1>
        <p className="text-gray-600 mb-8">
          Access professional legal guidance for business transactions and real estate deals.
        </p>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Business Transaction Support
              </CardTitle>
              <CardDescription>
                Expert guidance for business deals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our network of legal professionals can help you navigate complex business transactions, ensuring your interests are protected.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Contract Review
              </CardTitle>
              <CardDescription>
                Professional contract analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Get expert review of purchase agreements, contracts, and other legal documents to ensure your rights are protected.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                Due Diligence Support
              </CardTitle>
              <CardDescription>
                Thorough legal review process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our legal experts can help you conduct thorough due diligence, identifying potential risks and legal issues.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Compliance Guidance
              </CardTitle>
              <CardDescription>
                Stay compliant with regulations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Get guidance on regulatory compliance and legal requirements for your business transaction.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LegalAdvice;