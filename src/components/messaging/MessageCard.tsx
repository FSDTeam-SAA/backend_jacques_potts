import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { MessageWithProfile } from "@/types/supabase";

interface MessageCardProps {
  message: MessageWithProfile;
  onMarkAsRead: (messageId: string) => void;
}

const MessageCard = ({ message, onMarkAsRead }: MessageCardProps) => {
  return (
    <Card
      key={message.id}
      className={`relative ${!message.read ? "bg-primary/5" : ""}`}
      onClick={() => !message.read && onMarkAsRead(message.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">
                {message.profiles?.full_name || "Unknown User"}
              </span>
              {message.is_priority && (
                <Badge variant="default">Priority</Badge>
              )}
              {!message.read && (
                <Badge variant="secondary">New</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {message.content}
            </p>
          </div>
          <span className="text-xs text-muted-foreground">
            {new Date(message.created_at).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageCard;