import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface IntegrationStatusBadgeProps {
  isConnected: boolean;
}

export const IntegrationStatusBadge = ({ isConnected }: IntegrationStatusBadgeProps) => {
  if (!isConnected) return null;
  
  return (
    <Badge variant="outline" className="ml-2 bg-green-50 text-green-800 border-green-200">
      <Check className="w-4 h-4 mr-1" /> Connected
    </Badge>
  );
};