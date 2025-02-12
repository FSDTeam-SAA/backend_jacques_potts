import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SyncStatusBadge } from "./SyncStatusBadge";
import { SyncButton } from "./SyncButton";

interface ConnectionCardProps {
  connection: {
    id: string;
    platform_name: string;
    status: string;
    sync_status: string;
    last_sync_at: string | null;
  };
  onSyncComplete: () => void;
}

export const ConnectionCard = ({ connection, onSyncComplete }: ConnectionCardProps) => {
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {connection.platform_name}
        </CardTitle>
        <SyncStatusBadge status={connection.sync_status || 'pending'} />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="text-sm text-muted-foreground">
            Last synced: {connection.last_sync_at 
              ? new Date(connection.last_sync_at).toLocaleDateString()
              : 'Never'}
          </div>
          <SyncButton 
            connectionId={connection.id}
            onSyncComplete={onSyncComplete}
          />
        </div>
      </CardContent>
    </Card>
  );
};