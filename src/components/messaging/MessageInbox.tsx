import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import type { MessageWithProfile } from "@/types/supabase";
import MessageCard from "./MessageCard";

export function MessageInbox() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<MessageWithProfile[]>([]);
  const [isConnected, setIsConnected] = useState(true);

  const handleConnectionError = useCallback(() => {
    setIsConnected(false);
    toast.error("Connection lost. Retrying...");
  }, []);

  const setupRealtimeSubscription = useCallback(() => {
    if (!user) return;

    const subscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `receiver_id=eq.${user.id}`,
        },
        (payload) => {
          const newMessage = payload.new as MessageWithProfile;
          setMessages((current) => [newMessage, ...current]);
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
        } else {
          handleConnectionError();
        }
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [user, handleConnectionError]);

  useEffect(() => {
    if (!user) return;

    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from("messages")
          .select(`
            *,
            profiles!messages_sender_id_fkey(full_name)
          `)
          .eq("receiver_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching messages:", error);
          toast.error("Failed to load messages");
          return;
        }

        setMessages(data as MessageWithProfile[]);
      } catch (error) {
        console.error("Error in fetchMessages:", error);
        toast.error("Failed to load messages");
      }
    };

    fetchMessages();
    const cleanup = setupRealtimeSubscription();

    return () => {
      cleanup();
    };
  }, [user, setupRealtimeSubscription]);

  const markAsRead = async (messageId: string) => {
    if (!isConnected) {
      toast.error("Cannot mark message as read while offline");
      return;
    }

    try {
      const { error } = await supabase
        .from("messages")
        .update({ read: true })
        .eq("id", messageId);

      if (error) {
        console.error("Error marking message as read:", error);
        toast.error("Failed to mark message as read");
        return;
      }

      setMessages((current) =>
        current.map((msg) =>
          msg.id === messageId ? { ...msg, read: true } : msg
        )
      );
    } catch (error) {
      console.error("Error in markAsRead:", error);
      toast.error("Failed to mark message as read");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            {!isConnected && (
              <div className="p-4 mb-4 text-sm text-yellow-800 bg-yellow-100 rounded-lg">
                You're currently offline. Some features may be limited.
              </div>
            )}
            {messages.map((message) => (
              <MessageCard
                key={message.id}
                message={message}
                onMarkAsRead={markAsRead}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}