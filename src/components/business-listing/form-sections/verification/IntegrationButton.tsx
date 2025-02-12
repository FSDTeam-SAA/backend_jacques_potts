import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface IntegrationButtonProps {
  label: string;
  integrationKey: string;
  onClick: (key: string) => void;
  disabled?: boolean;
  loading?: boolean;
}

export const IntegrationButton = ({ 
  label, 
  integrationKey, 
  onClick, 
  disabled = false,
  loading = false
}: IntegrationButtonProps) => (
  <Button 
    variant="outline" 
    className="w-full" 
    onClick={() => onClick(integrationKey)}
    disabled={disabled || loading}
  >
    {loading ? (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Connecting...
      </>
    ) : (
      label
    )}
  </Button>
);