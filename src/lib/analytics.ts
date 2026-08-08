/**
 * NameFuse Pro-Grade Google Analytics 4 & Consent Mode v2 Integration Utility
 * Designed for optimized UX, compliance, and zero impact on Core Web Vitals.
 */

// Global Type declarations for Window
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

const MEASUREMENT_ID = (import.meta as any).env.VITE_GA_MEASUREMENT_ID;

/**
 * Safe, synchronous initialization of the Google Analytics queue (window.gtag).
 * This ensures Consent Banner updates are queued correctly even before the main GA script loads.
 */
export function initAnalyticsQueue() {
  if (typeof window === "undefined") return;

  // Initialize dataLayer and gtag if not already done
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }

  // Read existing consent choice or default to 'denied' for privacy compliance
  let initialAdStorage = "denied";
  let initialAdUserData = "denied";
  let initialAdPersonalization = "denied";
  let initialAnalyticsStorage = "denied";

  const consentChoice = localStorage.getItem("namefuse_consent_choice");
  if (consentChoice) {
    try {
      const parsed = JSON.parse(consentChoice);
      initialAdStorage = parsed.adStorage ? "granted" : "denied";
      initialAdUserData = parsed.adUserData ? "granted" : "denied";
      initialAdPersonalization = parsed.adPersonalization ? "granted" : "denied";
      initialAnalyticsStorage = parsed.analyticsStorage ? "granted" : "denied";
    } catch (e) {
      console.error("Failed to parse consent choice for initial settings", e);
    }
  }

  // Set default Consent Mode v2 state to respect privacy by default
  window.gtag("consent", "default", {
    ad_storage: initialAdStorage,
    ad_user_data: initialAdUserData,
    ad_personalization: initialAdPersonalization,
    analytics_storage: initialAnalyticsStorage,
    wait_for_update: 500,
  });

  // Load GA4 Script asynchronously if Measurement ID is present
  if (MEASUREMENT_ID) {
    // Check if script is already injected
    const scriptId = "google-analytics-gtag-js";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
      
      // Load event listener to verify success and configure
      script.onload = () => {
        if (window.gtag) {
          window.gtag("js", new Date());
          window.gtag("config", MEASUREMENT_ID, {
            send_page_view: true,
            cookie_flags: "SameSite=None;Secure",
          });
          console.log(`[NameFuse Analytics] GA4 initialized successfully with ID: ${MEASUREMENT_ID}`);
        }
      };

      document.head.appendChild(script);
    }
  } else {
    console.log("[NameFuse Analytics] GA4 ID not configured. Tracking events queued locally in dataLayer.");
  }
}

/**
 * Helper to dispatch standard/custom GA4 events safely
 */
function safeTrack(eventName: string, params: Record<string, any> = {}) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, {
      ...params,
      timestamp: new Date().toISOString(),
      app_version: "1.0.1",
    });
  }
}

// ==========================================
// Custom Analytics Trackers (Safe & PII-free)
// ==========================================

/**
 * 1. Generator Started
 */
export function trackGeneratorStarted(params: {
  generator_type: string;
  platform: string;
  style: string;
  keyword_present: boolean;
}) {
  safeTrack("namefuse_generator_started", params);
}

/**
 * 2. Name Generated (success)
 */
export function trackNameGenerated(params: {
  generator_type: string;
  platform: string;
  style: string;
  count: number;
}) {
  safeTrack("namefuse_name_generated", params);
}

/**
 * 3. Result Copied
 */
export function trackResultCopied(params: {
  generator_type: string;
  platform: string;
  name_length: number;
  format: "text" | "csv" | "json";
}) {
  safeTrack("namefuse_result_copied", params);
}

/**
 * 4. Result Favorited / Saved
 */
export function trackResultFavorited(params: {
  generator_type: string;
  platform: string;
  name_length: number;
}) {
  safeTrack("namefuse_result_favorited", params);
}

/**
 * 5. Regenerate Clicked
 */
export function trackRegenerateClicked(params: {
  generator_type: string;
  platform: string;
}) {
  safeTrack("namefuse_regenerate_clicked", params);
}

/**
 * 6. Language Changed
 */
export function trackLanguageChanged(params: {
  from_lang: string;
  to_lang: string;
}) {
  safeTrack("namefuse_language_changed", params);
}

/**
 * 7. Generator Category Selected
 */
export function trackGeneratorCategorySelected(params: {
  category_id: string | number;
  category_name: string;
}) {
  safeTrack("namefuse_category_selected", params);
}

/**
 * 8. Related Generator Clicked
 */
export function trackRelatedGeneratorClicked(params: {
  current_path: string;
  target_path: string;
  generator_name: string;
}) {
  safeTrack("namefuse_related_generator_clicked", params);
}

/**
 * 9. Related Article Clicked
 */
export function trackRelatedArticleClicked(params: {
  current_path: string;
  article_id: string | number;
  article_title: string;
}) {
  safeTrack("namefuse_related_article_clicked", params);
}
