import { useState } from "react";
import { Star, Copy, Check, ExternalLink, RefreshCw, Sparkles } from "lucide-react";
import { motion, LazyMotion, domAnimation } from "motion/react";
import AdSensePlaceholder from "./AdSensePlaceholder";
import { calculateUsernameScore } from "../generatorEngine";

interface UsernameResultsProps {
  usernames: string[];
  platform: string;
  style: string;
  favorites: string[];
  onToggleFavorite: (name: string) => void;
  onRegenerate?: () => void;
  onLoadMore?: () => void;
  isGenerating?: boolean;
  resultLabel?: string;
}

export default function UsernameResults({
  usernames,
  platform,
  style,
  favorites,
  onToggleFavorite,
  onRegenerate,
  onLoadMore,
  isGenerating = false,
  resultLabel = "Username"
}: UsernameResultsProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(name).catch(() => {});
    setCopiedItem(name);
    setTimeout(() => setCopiedItem(null), 1500);
  };

  const getPlatformLookupUrl = (name: string) => {
    switch (platform) {
      case "Instagram":
        return `https://instagram.com/${name}`;
      case "TikTok":
        return `https://www.tiktok.com/@${name}`;
      case "YouTube":
        return `https://youtube.com/@${name}`;
      case "Twitch":
        return `https://twitch.tv/${name}`;
      case "Roblox":
        return `https://www.roblox.com/user.aspx?username=${name}`;
      default:
        return `https://google.com/search?q=${encodeURIComponent(name)}`;
    }
  };

  const getPlatformTooltip = () => {
    if (["Universal", "Discord", "Gaming"].includes(platform)) {
      return "Search on Google";
    }
    return `Verify on ${platform}`;
  };

  // Render first 24 items in the first grid, then in-feed Ad, then the rest.
  const firstHalf = usernames.slice(0, 24);
  const secondHalf = usernames.slice(24);

  const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: Math.min(i * 0.015, 0.4),
        duration: 0.25,
        ease: "easeOut"
      }
    })
  };

  const renderUsernameCard = (name: string, globalIndex: number) => {
    const isFavorited = favorites.includes(name);
    const isCopied = copiedItem === name;
    
    // Compute scores based on name, style, and platform
    const scores = calculateUsernameScore(name, style, platform);

    return (
      <motion.div
        id={`username-card-${globalIndex}`}
        key={name}
        custom={globalIndex % 24}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="group relative flex flex-col justify-between p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all shadow-md hover:shadow-lg hover:shadow-black/10"
      >
        <div className="flex items-start justify-between min-w-0">
          <div className="flex flex-col pr-4 min-w-0">
            {/* Username Text */}
            <span className="font-mono text-[15px] font-bold text-zinc-100 group-hover:text-violet-400 transition-colors truncate select-all">
              {name}
            </span>
            {/* Helper details */}
            <div className="flex items-center gap-2 mt-0.5 text-[10px] text-zinc-500 font-medium uppercase tracking-wider">
              <span>Len: {name.length}</span>
              <span>•</span>
              <span className="text-zinc-400 flex items-center gap-0.5">
                Match: <strong className="text-violet-400">{scores.overall}%</strong>
              </span>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Availability Lookup */}
            <a
              id={`lookup-link-${globalIndex}`}
              href={getPlatformLookupUrl(name)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60 transition-all"
              title={getPlatformTooltip()}
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Copy Button */}
            <button
              id={`copy-btn-${globalIndex}`}
              onClick={() => handleCopy(name)}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60 transition-all focus:outline-none"
              title={`Copy ${resultLabel}`}
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Favorite Toggle Button */}
            <button
              id={`fav-btn-${globalIndex}`}
              onClick={() => onToggleFavorite(name)}
              className={`p-1.5 rounded-lg transition-all focus:outline-none ${
                isFavorited
                  ? "text-yellow-500 hover:text-yellow-400 bg-yellow-500/10 hover:bg-yellow-500/5"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60"
              }`}
              title={isFavorited ? "Remove from Favorites" : "Save to Favorites"}
            >
              <Star className={`w-4 h-4 ${isFavorited ? "fill-yellow-500" : ""}`} />
            </button>
          </div>
        </div>

        {/* Quality Score Metrics Row */}
        <div className="flex items-center justify-between border-t border-zinc-800/60 pt-2.5 mt-3 text-[10px] text-zinc-500 font-mono">
          <div className="flex items-center gap-1">
            <span className="text-zinc-600 font-sans">Originality</span>
            <span className="text-emerald-400 font-semibold">{scores.originality}%</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-zinc-600 font-sans">Brandable</span>
            <span className="text-violet-400 font-semibold">{scores.brandability}%</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-zinc-600 font-sans">Memorable</span>
            <span className="text-amber-400 font-semibold">{scores.memorability}%</span>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="username-results-wrapper"
        className="space-y-6"
        aria-labelledby="generated-results-heading"
      >
        {/* Top section status */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
          <h2 id="generated-results-heading" className="text-sm font-bold text-zinc-400 font-mono tracking-wide uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Generated Suggestions ({usernames.length})
          </h2>
          <div className="flex items-center gap-4">
            {onRegenerate && (
              <button
                onClick={onRegenerate}
                disabled={isGenerating}
                className="text-xs text-zinc-400 hover:text-violet-400 font-medium transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50 focus:outline-none"
                title="Regenerate all names"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
                <span>Regenerate</span>
              </button>
            )}
            <span className="text-xs text-zinc-500 font-medium hidden sm:inline">
              Click to copy, star to save
            </span>
          </div>
        </div>

        {/* First Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {firstHalf.map((name, idx) => renderUsernameCard(name, idx))}
        </div>

        {/* Embedded Mid-Results AdSense Space */}
        <div id="mid-results-ad-holder" className="py-2">
          <AdSensePlaceholder type="in-feed" />
        </div>

        {/* Second Grid Section */}
        {secondHalf.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {secondHalf.map((name, idx) => renderUsernameCard(name, idx + 24))}
          </div>
        )}

        {/* Interactive Bottom Control Buttons */}
        {(onRegenerate || onLoadMore) && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 border-t border-zinc-900 mt-8">
            {onRegenerate && (
              <button
                onClick={onRegenerate}
                disabled={isGenerating}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850 text-zinc-200 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 focus:outline-none"
              >
                <RefreshCw className={`w-4 h-4 text-violet-400 ${isGenerating ? "animate-spin" : ""}`} />
                Regenerate Fresh List
              </button>
            )}
            {onLoadMore && (
              <button
                onClick={onLoadMore}
                disabled={isGenerating}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-violet-600/10 hover:shadow-violet-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 focus:outline-none"
              >
                <Sparkles className="w-4 h-4 text-violet-200" />
                Load More Suggestions
              </button>
            )}
          </div>
        )}
      </section>
    </LazyMotion>
  );
}
