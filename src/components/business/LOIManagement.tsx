import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useLOIData } from "./loi/hooks/useLOIData";
import LOITable from "./loi/LOITable";

const LOIManagement = () => {
  const [activeTab, setActiveTab] = useState("received");
  const { receivedLOIs, sentLOIs, loadingReceived, loadingSent } = useLOIData(activeTab);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Letters of Intent Management</CardTitle>
        <CardDescription>
          Manage your sent and received Letters of Intent
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="received" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="received">Received LOIs</TabsTrigger>
            <TabsTrigger value="sent">Sent LOIs</TabsTrigger>
          </TabsList>
          <TabsContent value="received">
            <LOITable
              lois={receivedLOIs || []}
              type="received"
              isLoading={loadingReceived}
            />
          </TabsContent>
          <TabsContent value="sent">
            <LOITable
              lois={sentLOIs || []}
              type="sent"
              isLoading={loadingSent}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LOIManagement;