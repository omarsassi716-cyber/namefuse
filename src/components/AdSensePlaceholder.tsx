import { useId } from "react";

interface AdSensePlaceholderProps {
  type: "top-banner" | "in-feed" | "footer-banner";
}

export default function AdSensePlaceholder({ type }: AdSensePlaceholderProps) {
  const id = useId();

  const containerStyles = {
    "top-banner": "w-full max-w-4xl mx-auto h-[90px] md:h-[100px] my-6",
    "in-feed": "w-full max-w-2xl mx-auto h-[120px] my-8",
    "footer-banner": "w-full max-w-4xl mx-auto h-[150px] md:h-[200px] mt-12 mb-6"
  };

  const labels = {
    "top-banner": "Google AdSense - Leaderboard Ad Space (728x90 / 970x90)",
    "in-feed": "Google AdSense - In-Article Native Ad Space",
    "footer-banner": "Google AdSense - Large Rectangular / Banner Ad Space (970x250)"
  };

  return (
    <div
      id={`adsense-wrapper-${id}`}
      className={`${containerStyles[type]} relative overflow-hidden rounded-xl border border-dashed border-zinc-800 bg-zinc-950/40 p-4 flex flex-col items-center justify-center transition-all hover:border-zinc-700/80 group`}
    >
      {/* Visual background grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-30 group-hover:opacity-40 transition-opacity"></div>
      
      {/* Badge */}
      <span className="relative z-10 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase text-zinc-500 bg-zinc-900 border border-zinc-800/80 mb-1">
        Sponsor Space
      </span>
      
      <p className="relative z-10 text-xs text-zinc-400 font-medium text-center px-4 max-w-md">
        {labels[type]}
      </p>
      
      <p className="relative z-10 text-[10px] text-zinc-600 mt-1">
        Auto-optimized responsive layout
      </p>
    </div>
  );
}
