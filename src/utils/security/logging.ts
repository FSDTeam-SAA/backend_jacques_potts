import { supabase } from "@/integrations/supabase/client";

export async function logSecurityEvent(
  userId: string | undefined,
  eventType: string,
  details?: any
) {
  try {
    const userAgent = navigator.userAgent;
    await supabase.from("security_logs").insert({
      user_id: userId,
      event_type: eventType,
      user_agent: userAgent,
      details,
    });
  } catch (error) {
    console.error("Error logging security event:", error);
  }
}