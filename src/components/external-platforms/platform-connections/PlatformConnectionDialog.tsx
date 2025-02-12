import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PlatformSelect } from "./dialog/PlatformSelect";
import { ConnectButton } from "./dialog/ConnectButton";

interface PlatformConnectionDialogProps {
  onSuccess: () => void;
}

export const PlatformConnectionDialog = ({ onSuccess }: PlatformConnectionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (!selectedPlatform) {
      toast.error("Please select a platform");
      return;
    }

    setIsConnecting(true);
    try {
      const { error } = await supabase.functions.invoke('connect-platform', {
        body: { platformName: selectedPlatform }
      });

      if (error) throw error;

      toast.success('Platform connected successfully');
      onSuccess();
      setOpen(false);
    } catch (error) {
      console.error('Error connecting platform:', error);
      toast.error('Failed to connect platform');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Connect Platform
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect External Platform</DialogTitle>
          <DialogDescription>
            Choose a platform to connect and import your listings
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <PlatformSelect
            value={selectedPlatform}
            onValueChange={setSelectedPlatform}
          />
          <ConnectButton
            isConnecting={isConnecting}
            disabled={!selectedPlatform}
            onClick={handleConnect}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};