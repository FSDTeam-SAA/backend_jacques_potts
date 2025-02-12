import { Separator } from "@/components/ui/separator";
import { ReactNode } from "react";
import { IntegrationStatusBadge } from "./IntegrationStatusBadge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check } from "lucide-react";

interface IntegrationSectionProps {
  children: ReactNode;
  connectedTypes: string[];
  types: string[];
  isLast?: boolean;
}

export const IntegrationSection = ({ 
  children, 
  connectedTypes,
  types,
  isLast = false 
}: IntegrationSectionProps) => {
  const allConnected = types.every(type => connectedTypes.includes(type));

  return (
    <>
      <div className="space-y-2">
        {allConnected && (
          <Alert className="bg-green-50 border-green-200 mb-4">
            <Check className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 ml-2">
              All integrations in this section are connected
            </AlertDescription>
          </Alert>
        )}
        {children}
        <div className="flex flex-wrap gap-2 mt-2">
          {types.map(type => (
            <IntegrationStatusBadge 
              key={type}
              isConnected={connectedTypes.includes(type)} 
            />
          ))}
        </div>
      </div>
      {!isLast && <Separator className="my-4" />}
    </>
  );
};