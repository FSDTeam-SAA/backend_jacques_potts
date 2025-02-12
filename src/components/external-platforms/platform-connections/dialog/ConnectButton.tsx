import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ConnectButtonProps {
  isConnecting: boolean;
  disabled: boolean;
  onClick: () => void;
}

export const ConnectButton = ({ 
  isConnecting, 
  disabled, 
  onClick 
}: ConnectButtonProps) => {
  return (
    <Button 
      onClick={onClick} 
      className="w-full"
      disabled={disabled || isConnecting}
    >
      {isConnecting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        "Connect Platform"
      )}
    </Button>
  );
};