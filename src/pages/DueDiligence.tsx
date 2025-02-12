import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DueDiligencePackages from "@/components/due-diligence/DueDiligencePackages";
import DueDiligencePurchases from "@/components/due-diligence/DueDiligencePurchases";

const DueDiligence = () => {
  const [selectedTab, setSelectedTab] = useState("business");

  return (
    <div className="container mx-auto p-6">
      <Card className="p-6">
        <h1 className="text-3xl font-bold mb-6">Due Diligence Services</h1>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="business">Business Due Diligence</TabsTrigger>
            <TabsTrigger value="real_estate">Real Estate Due Diligence</TabsTrigger>
          </TabsList>

          <TabsContent value="business" className="space-y-6">
            <DueDiligencePackages packageType="business" />
            <DueDiligencePurchases />
          </TabsContent>

          <TabsContent value="real_estate" className="space-y-6">
            <DueDiligencePackages packageType="real_estate" />
            <DueDiligencePurchases />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default DueDiligence;