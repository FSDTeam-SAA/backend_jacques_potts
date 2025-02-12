import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface MessageInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

const MessageInput = ({ onSend, isLoading }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="flex gap-2">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        className="flex-1"
      />
      <Button
        onClick={handleSend}
        disabled={!message.trim() || isLoading}
        className="flex items-center gap-2"
      >
        <Send className="h-4 w-4" />
        Send
      </Button>
    </div>
  );
};

export default MessageInput;