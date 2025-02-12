import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export const useConnectionStatus = () => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsConnected(true);
    const handleOffline = () => {
      setIsConnected(false);
      toast({
        title: "Connection Lost",
        description: "Please check your internet connection and try again.",
        variant: "destructive",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  return {
    isConnected,
  };
};