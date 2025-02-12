import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SyncButtonProps {
  connectionId: string;
  onSyncComplete: () => void;
}

export const SyncButton = ({ connectionId, onSyncComplete }: SyncButtonProps) => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    try {
      setIsSyncing(true);
      const { error } = await supabase.functions.invoke('sync-platform-listings', {
        body: { connectionId }
      });

      if (error) throw error;
      
      toast.success('Sync started successfully');
      onSyncComplete();
    } catch (error) {
      console.error('Error syncing platform:', error);
      toast.error('Failed to sync platform');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSync}
      disabled={isSyncing}
    >
      <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
      {isSyncing ? 'Syncing...' : 'Sync'}
    </Button>
  );
};