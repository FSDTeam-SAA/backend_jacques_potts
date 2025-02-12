import { Badge } from "@/components/ui/badge";
import { NegotiationMessageType } from "./types";

interface NegotiationMessageProps {
  message: NegotiationMessageType;
}

const NegotiationMessage = ({ message }: NegotiationMessageProps) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-medium">{message.profiles.full_name}</span>
        <Badge variant="secondary" className="text-xs">
          {new Date(message.created_at).toLocaleDateString()}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground">{message.content}</p>
    </div>
  );
};

export default NegotiationMessage;