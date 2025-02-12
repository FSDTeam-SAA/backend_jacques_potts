import { supabase } from "@/integrations/supabase/client";

export async function checkRateLimit(userId: string, actionType: string, maxAttempts = 5) {
  const { data: rateLimit, error } = await supabase
    .from("rate_limits")
    .select("*")
    .eq("user_id", userId)
    .eq("action_type", actionType)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Rate limit check error:", error);
    return false;
  }

  const now = new Date();

  if (!rateLimit) {
    await supabase.from("rate_limits").insert({
      user_id: userId,
      action_type: actionType,
      attempt_count: 1,
      last_attempt: now.toISOString(),
      reset_at: new Date(now.getTime() + 60 * 60 * 1000).toISOString(),
    });
    return true;
  }

  if (new Date(rateLimit.reset_at) <= now) {
    await supabase
      .from("rate_limits")
      .update({
        attempt_count: 1,
        last_attempt: now.toISOString(),
        reset_at: new Date(now.getTime() + 60 * 60 * 1000).toISOString(),
      })
      .eq("id", rateLimit.id);
    return true;
  }

  if (rateLimit.attempt_count >= maxAttempts) {
    return false;
  }

  await supabase
    .from("rate_limits")
    .update({
      attempt_count: rateLimit.attempt_count + 1,
      last_attempt: now.toISOString(),
    })
    .eq("id", rateLimit.id);

  return true;
}