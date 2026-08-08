import { useEffect, useState, useId } from "react";

interface AdSensePlaceholderProps {
  type: "top-banner" | "in-feed" | "footer-banner";
  adSlot?: string;
}

export default function AdSensePlaceholder({ type, adSlot }: AdSensePlaceholderProps) {
  const id = useId();
  const [adError, setAdError] = useState(false);
  const [isDevelopment, setIsDevelopment] = useState(true);

  useEffect(() => {
    // Detect environment
    if (window.location.hostname !== "localhost" && !window.location.hostname.includes("127.0.0.1")) {
      setIsDevelopment(false);
    }

    // Safely trigger Google AdSense rendering
    try {
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
    } catch (err) {
      console.warn("Google AdSense auto-init bypassed or blocked by extension.", err);
      setAdError(true);
    }
  }, []);

  // Strict height-locking rules representing industry-standard Google AdSense sizes.
  // These lock the layout container strictly to eliminate CLS (Cumulative Layout Shift)
  // across different viewport sizes.
  // - Top Banner: Standard 320x100 on Mobile, 728x90 on Tablet, 970x90 on Desktop.
  // - In-Feed: Fluid but locked height of 130px (Desktop/Tablet) or 140px (Mobile).
  // - Footer Banner: Standard 320x100 on Mobile, 728x90 on Tablet, 970x250 on Desktop.
  const containerClasses = {
    "top-banner": "w-[320px] sm:w-[728px] lg:w-[970px] h-[100px] sm:h-[90px] mx-auto my-6",
    "in-feed": "w-full max-w-3xl h-[140px] sm:h-[130px] mx-auto my-8",
    "footer-banner": "w-[320px] sm:w-[728px] lg:w-[970px] h-[100px] sm:h-[90px] lg:h-[250px] mx-auto mt-12 mb-6"
  };

  const adSlotMapping = {
    "top-banner": adSlot || "8472918471",
    "in-feed": adSlot || "9182740192",
    "footer-banner": adSlot || "3827104928"
  };

  return (
    <div
      id={`adsense-outer-container-${type}-${id}`}
      className={`${containerClasses[type]} relative overflow-hidden rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-950/40 p-1 flex items-center justify-center transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-800 group select-none`}
    >
      {/* Background Micro Grid Pattern to prevent an empty "dead" spot if ads are loading */}
      <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40 group-hover:opacity-50 transition-opacity pointer-events-none" />

      {/* Actual AdSense Render Target */}
      <div className="w-full h-full flex items-center justify-center relative z-10">
        {!adError && !isDevelopment ? (
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%", height: "100%" }}
            data-ad-client="ca-pub-9589614003132579"
            data-ad-slot={adSlotMapping[type]}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          /* High-fidelity elegant fallback placeholder when in local dev or if an AdBlocker is active */
          <div className="flex flex-col items-center justify-center text-center p-3 w-full h-full">
            <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm mb-1.5 animate-pulse">
              Sponsored Space
            </span>
            <p className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 max-w-md">
              {type === "top-banner" && "Premium Header Leaderboard (728x90 / 970x90)"}
              {type === "in-feed" && "Native Contextual In-Feed Recommendation Ad"}
              {type === "footer-banner" && "Footer Premium Billboard (970x250 Large Banner)"}
            </p>
            <p className="text-[9px] text-zinc-400 dark:text-zinc-600 font-semibold mt-1">
              Optimized stable container to guarantee 0.0 CLS
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
