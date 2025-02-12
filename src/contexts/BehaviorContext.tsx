import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

interface BehaviorContextType {
  trackEvent: (eventType: string, details?: any) => Promise<void>;
  currentSegment: string | null;
}

const BehaviorContext = createContext<BehaviorContextType | undefined>(undefined);

export function BehaviorProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();
  const [currentSegment, setCurrentSegment] = useState<string | null>(null);
  const [pageStartTime, setPageStartTime] = useState<number>(Date.now());

  useEffect(() => {
    // Track page view on route change
    trackEvent("page_view").catch(console.error);
    setPageStartTime(Date.now());

    // Fetch user segment if user is logged in
    if (user) {
      fetchUserSegment();
    }

    return () => {
      // Track page exit
      const duration = Date.now() - pageStartTime;
      trackEvent("page_exit", { duration }).catch(console.error);
    };
  }, [location.pathname, user]);

  const trackEvent = async (eventType: string, details: any = {}) => {
    try {
      // Only track events for authenticated users
      if (!user) {
        console.log("Skipping event tracking for unauthenticated user");
        return;
      }

      const eventData = {
        user_id: user.id,
        event_type: eventType,
        page_path: location.pathname,
        interaction_details: details,
        duration: details.duration || null,
      };

      const { error } = await supabase
        .from("user_behavior_logs")
        .insert([eventData]);

      if (error) {
        console.error("Error tracking event:", error);
        // Don't show error toast to users as this is background functionality
      }
    } catch (error) {
      console.error("Error tracking event:", error);
      // Silent fail for background tracking
    }
  };

  const fetchUserSegment = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("user_segments")
        .select("segment_type")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching user segment:", error);
        return;
      }
      
      setCurrentSegment(data?.segment_type || null);
    } catch (error) {
      console.error("Error fetching user segment:", error);
    }
  };

  return (
    <BehaviorContext.Provider value={{ trackEvent, currentSegment }}>
      {children}
    </BehaviorContext.Provider>
  );
};

export const useBehavior = () => {
  const context = useContext(BehaviorContext);
  if (context === undefined) {
    throw new Error("useBehavior must be used within a BehaviorProvider");
  }
  return context;
};