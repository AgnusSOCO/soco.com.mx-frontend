import { useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { analyticsEnhanced } from "@/lib/analyticsEnhanced";
import { useLocation } from "wouter";

export function useAnalytics() {
  const utils = trpc.useUtils();
  const [location] = useLocation();

  useEffect(() => {
    // Initialize enhanced analytics on mount
    analyticsEnhanced.init(utils);

    return () => {
      analyticsEnhanced.cleanup();
    };
  }, [utils]);

  // Track pageviews on route change
  useEffect(() => {
    analyticsEnhanced.trackPageview();
  }, [location]);
}

