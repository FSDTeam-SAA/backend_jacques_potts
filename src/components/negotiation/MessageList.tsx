import { Card } from "@/components/ui/card";
import NegotiationMessage from "./NegotiationMessage";
import { NegotiationMessageType } from "./types";

interface MessageListProps {
  messages: NegotiationMessageType[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="border rounded-lg p-4 max-h-[300px] overflow-y-auto">
      {messages?.map((msg) => (
        <NegotiationMessage key={msg.id} message={msg} />
      ))}
      {(!messages || messages.length === 0) && (
        <p className="text-center text-muted-foreground">
          No messages yet. Start the negotiation by sending a message.
        </p>
      )}
    </div>
  );
};

export default MessageList;