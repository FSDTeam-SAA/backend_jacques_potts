import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useBehavior } from "@/contexts/BehaviorContext";

export interface AISuggestion {
  id: string;
  content: string;
  suggestion_type: string;
  context: any;
}

export function useAISuggestions() {
  const { user } = useAuth();
  const { currentSegment } = useBehavior();
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);

  useEffect(() => {
    if (user) {
      fetchSuggestions();
    }
  }, [user, currentSegment]);

  const fetchSuggestions = async () => {
    try {
      const { data, error } = await supabase
        .from("ai_suggestions")
        .select("*")
        .eq("user_id", user?.id)
        .eq("is_displayed", false)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      setSuggestions(data || []);
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
    }
  };

  const markSuggestionDisplayed = async (suggestionId: string) => {
    try {
      await supabase
        .from("ai_suggestions")
        .update({ is_displayed: true })
        .eq("id", suggestionId);
    } catch (error) {
      console.error("Error updating suggestion:", error);
    }
  };

  const markSuggestionClicked = async (suggestionId: string) => {
    try {
      await supabase
        .from("ai_suggestions")
        .update({ is_clicked: true })
        .eq("id", suggestionId);
    } catch (error) {
      console.error("Error updating suggestion click:", error);
    }
  };

  return {
    suggestions,
    markSuggestionDisplayed,
    markSuggestionClicked,
  };
}