import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, RefreshCw } from "lucide-react";

interface PlatformConnection {
  id: string;
  platform_name: string;
  status: string;
  last_sync_at: string | null;
}

interface PlatformCardProps {
  connection: PlatformConnection;
  onSync: (connectionId: string) => Promise<void>;
}

const PlatformCard = ({ connection, onSync }: PlatformCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            {connection.platform_name}
          </CardTitle>
          <Badge>{connection.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Last synced: {connection.last_sync_at 
              ? new Date(connection.last_sync_at).toLocaleDateString()
              : "Never"}
          </p>
          <Button
            onClick={() => onSync(connection.id)}
            variant="outline"
            className="w-full"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformCard;