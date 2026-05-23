import { useEffect } from "react";
import { initFirebaseAnalytics, initGoogleAnalytics } from "./utils/analytics";

export default function AnalyticsTracker() {
  useEffect(() => {
    initGoogleAnalytics();
    initFirebaseAnalytics();
  }, []);

  return null;
}

