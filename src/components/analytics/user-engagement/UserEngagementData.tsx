import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface EngagementData {
  date: string;
  messages: number;
}

export const useUserEngagementData = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["user-engagement", user?.id],
    queryFn: async () => {
      const { data: sentMessages, error: sentError } = await supabase
        .from("messages")
        .select("created_at")
        .eq("sender_id", user?.id)
        .order("created_at", { ascending: true });

      const { data: receivedMessages, error: receivedError } = await supabase
        .from("messages")
        .select("created_at")
        .eq("receiver_id", user?.id)
        .order("created_at", { ascending: true });

      if (sentError || receivedError) throw sentError || receivedError;

      const allMessages = [...(sentMessages || []), ...(receivedMessages || [])];

      const messagesByDate = allMessages.reduce((acc: any, message) => {
        const date = new Date(message.created_at).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(messagesByDate)
        .map(([date, count]) => ({
          date,
          messages: count as number,
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    },
    enabled: !!user,
  });
};