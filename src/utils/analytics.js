import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirebaseApp } from "../firebase.js";

let firebaseAnalyticsInstance;

export function initFirebaseAnalytics() {
  if (firebaseAnalyticsInstance) return firebaseAnalyticsInstance;

  const app = getFirebaseApp();
  if (!app) return null;

  // Firebase analytics support can vary by platform/browser
  return isSupported().then((supported) => {
    if (!supported) {
      console.warn("Firebase Analytics is not supported in this environment.");
      return null;
    }

    firebaseAnalyticsInstance = getAnalytics(app);
    return firebaseAnalyticsInstance;
  });
}

export function initGoogleAnalytics() {
  // GA gtag snippet is expected to be in index.html.
  // This function is intentionally minimal to avoid duplicates.
  // It can be used for future enhancements (e.g., consent mode).
  if (typeof window === "undefined") return;
  if (!window.gtag) {
    console.warn("gtag is not available. Ensure GA snippet exists in index.html.");
  }
}

