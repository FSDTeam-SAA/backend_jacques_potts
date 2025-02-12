import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link2, RefreshCw, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PlatformConnectionCardProps {
  connection: {
    id: string;
    platform_name: string;
    status: string;
    last_sync_at: string | null;
  };
  onUpdate: () => void;
}

export const PlatformConnectionCard = ({ 
  connection,
  onUpdate 
}: PlatformConnectionCardProps) => {
  const handleSync = async () => {
    try {
      const { error } = await supabase.functions.invoke('sync-platform-listings', {
        body: { connectionId: connection.id }
      });

      if (error) throw error;
      toast.success('Sync started successfully');
      onUpdate();
    } catch (error) {
      console.error('Error syncing platform:', error);
      toast.error('Failed to sync platform');
    }
  };

  const handleDisconnect = async () => {
    try {
      const { error } = await supabase
        .from('external_platform_connections')
        .delete()
        .eq('id', connection.id);

      if (error) throw error;
      toast.success('Platform disconnected successfully');
      onUpdate();
    } catch (error) {
      console.error('Error disconnecting platform:', error);
      toast.error('Failed to disconnect platform');
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {connection.platform_name}
        </CardTitle>
        <Badge 
          variant={connection.status === 'connected' ? "default" : "secondary"}
        >
          {connection.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link2 className="mr-2 h-4 w-4" />
            Last synced: {connection.last_sync_at 
              ? new Date(connection.last_sync_at).toLocaleDateString()
              : 'Never'}
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSync}
              className="flex-1"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleDisconnect}
              className="flex-1"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Disconnect
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};