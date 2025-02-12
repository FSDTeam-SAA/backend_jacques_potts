import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LOIList from "./LOIList";

interface LOITabsProps {
  sentLOIs: any[] | null;
  receivedLOIs: any[] | null;
  loadingSent: boolean;
  loadingReceived: boolean;
}

const LOITabs = ({ sentLOIs, receivedLOIs, loadingSent, loadingReceived }: LOITabsProps) => {
  return (
    <Tabs defaultValue="received" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="received">Received LOIs</TabsTrigger>
        <TabsTrigger value="sent">Sent LOIs</TabsTrigger>
      </TabsList>
      
      <TabsContent value="received" className="mt-6">
        <LOIList lois={receivedLOIs} loading={loadingReceived} />
      </TabsContent>
      
      <TabsContent value="sent" className="mt-6">
        <LOIList lois={sentLOIs} loading={loadingSent} />
      </TabsContent>
    </Tabs>
  );
};

export default LOITabs;