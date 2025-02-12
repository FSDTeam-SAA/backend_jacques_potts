import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Clock, CreditCard } from "lucide-react";

const EscrowServices = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Escrow Services</h1>
        <p className="text-gray-600 mb-8">
          Our escrow services provide a secure way to handle business transactions, protecting both buyers and sellers throughout the process.
        </p>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Secure Transactions
              </CardTitle>
              <CardDescription>
                Your funds are held safely until all conditions are met
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our escrow service acts as a trusted third party, holding and regulating payment of funds until all terms of the agreement are met.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Verified Process
              </CardTitle>
              <CardDescription>
                Step-by-step verification ensures compliance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Each transaction follows a rigorous verification process to ensure all parties are protected and satisfied.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Milestone-Based Release
              </CardTitle>
              <CardDescription>
                Funds are released according to agreed-upon milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Payment can be structured around specific milestones, providing security and flexibility for complex transactions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Transparent Fees
              </CardTitle>
              <CardDescription>
                Clear fee structure with no hidden costs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our escrow service fees are transparent and competitive, typically ranging from 1-3% of the transaction value.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EscrowServices;