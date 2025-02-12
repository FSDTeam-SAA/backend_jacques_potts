import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import UserEngagementChart from "./UserEngagementChart";
import { useUserEngagementData } from "./UserEngagementData";

const UserEngagementCard = () => {
  const { data: engagement, isLoading } = useUserEngagementData();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>User Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <UserEngagementChart data={engagement || []} />
      </CardContent>
    </Card>
  );
};

export default UserEngagementCard;