import { useState, useMemo } from "react";
import { 
  Star, 
  Copy, 
  Check, 
  ExternalLink, 
  RefreshCw, 
  Sparkles, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  SlidersHorizontal,
  Share2,
  FileText,
  FileJson,
  TableProperties,
  ArrowUpDown
} from "lucide-react";
import { motion, LazyMotion, domAnimation, AnimatePresence } from "motion/react";
import AdSensePlaceholder from "./AdSensePlaceholder";
import { calculateUsernameScore } from "../generatorEngine";
import { uiTranslations } from "../translations";
import { trackResultCopied } from "../lib/analytics";

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
  language: string;
  generatorType: string;
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
  resultLabel = "Username",
  language,
  generatorType
}: UsernameResultsProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [copiedAllState, setCopiedAllState] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [localSortBy, setLocalSortBy] = useState<string>("Best Match");
  const [copyFormat, setCopyFormat] = useState<"text" | "csv" | "json">("text");

  const t = uiTranslations[language] || uiTranslations.en;
  const isRtl = language === "ar";

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(name).catch(() => {});
    setCopiedItem(name);
    setTimeout(() => setCopiedItem(null), 1500);

    // Track analytics event for copying
    trackResultCopied({
      generator_type: generatorType,
      platform,
      name_length: name.length,
      format: "text",
    });
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
      return t.searchGoogle || "Search on Google";
    }
    return `${t.verifyOn || "Verify on"} ${platform}`;
  };

  // Pre-calculate and sort usernames reactively based on localSortBy
  const processedUsernames = useMemo(() => {
    const list = [...usernames];
    const scoreCache = new Map<string, any>();
    
    // Cache scores to prevent repetitive mathematical evaluation
    list.forEach(name => {
      scoreCache.set(name, calculateUsernameScore(name, style, platform));
    });

    switch (localSortBy) {
      case "Most Unique":
        return list.sort((a, b) => (scoreCache.get(b)?.uniqueness || 0) - (scoreCache.get(a)?.uniqueness || 0));
      case "Shortest":
        return list.sort((a, b) => a.length - b.length);
      case "Longest":
        return list.sort((a, b) => b.length - a.length);
      case "Alphabetical":
        return list.sort((a, b) => a.localeCompare(b));
      case "Best Match":
      default:
        return list.sort((a, b) => (scoreCache.get(b)?.overall || 0) - (scoreCache.get(a)?.overall || 0));
    }
  }, [usernames, localSortBy, style, platform]);

  const handleCopyAll = () => {
    if (processedUsernames.length === 0) return;
    
    let copyText = "";
    if (copyFormat === "json") {
      const formatted = processedUsernames.map(name => {
        const s = calculateUsernameScore(name, style, platform);
        return { name, overallScore: s.overall };
      });
      copyText = JSON.stringify(formatted, null, 2);
    } else if (copyFormat === "csv") {
      copyText = processedUsernames.join(", ");
    } else {
      copyText = processedUsernames.join("\n");
    }

    navigator.clipboard.writeText(copyText).catch(() => {});
    setCopiedAllState(true);
    setTimeout(() => setCopiedAllState(false), 2000);

    // Track analytics event for copy-all
    trackResultCopied({
      generator_type: generatorType,
      platform,
      name_length: processedUsernames.length, // representing count or total characters
      format: copyFormat,
    });
  };

  const downloadFile = (content: string, filename: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportTXT = () => {
    const content = processedUsernames.join("\n");
    downloadFile(content, `namefuse-suggestions-${platform.toLowerCase()}.txt`, "text/plain");
  };

  const handleExportCSV = () => {
    const headers = ["Name", "Overall Score", "Brandability", "Memorability", "Pronunciation", "Uniqueness", "Social Friendliness", "Domain Friendliness"];
    const rows = processedUsernames.map(name => {
      const s = calculateUsernameScore(name, style, platform);
      return [
        name,
        `${s.overall}%`,
        `${s.brandability}%`,
        `${s.memorability}%`,
        `${s.pronunciation}%`,
        `${s.uniqueness}%`,
        `${s.socialFriendliness}%`,
        `${s.domainFriendliness}%`
      ].map(val => `"${val}"`).join(",");
    });
    const csvContent = [headers.join(","), ...rows].join("\n");
    downloadFile(csvContent, `namefuse-suggestions-${platform.toLowerCase()}.csv`, "text/csv");
  };

  const handleExportJSON = () => {
    const data = processedUsernames.map(name => {
      const s = calculateUsernameScore(name, style, platform);
      return {
        name,
        scores: {
          overall: s.overall,
          brandability: s.brandability,
          memorability: s.memorability,
          pronunciation: s.pronunciation,
          uniqueness: s.uniqueness,
          socialFriendliness: s.socialFriendliness,
          domainFriendliness: s.domainFriendliness
        }
      };
    });
    const jsonContent = JSON.stringify(data, null, 2);
    downloadFile(jsonContent, `namefuse-suggestions-${platform.toLowerCase()}.json`, "application/json");
  };

  // Render first 24 items in the first grid, then in-feed Ad, then the rest.
  const firstHalf = processedUsernames.slice(0, 24);
  const secondHalf = processedUsernames.slice(24);

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

  const getScoreColorClass = (score: number) => {
    if (score >= 90) return "text-emerald-500 dark:text-emerald-400";
    if (score >= 80) return "text-violet-500 dark:text-violet-400";
    return "text-amber-500 dark:text-amber-400";
  };

  const getScoreBgClass = (score: number) => {
    if (score >= 90) return "bg-emerald-500";
    if (score >= 80) return "bg-violet-500";
    return "bg-amber-500";
  };

  const renderUsernameCard = (name: string, globalIndex: number) => {
    const isFavorited = favorites.includes(name);
    const isCopied = copiedItem === name;
    const isExpanded = expandedCard === name;
    
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
        className="group relative flex flex-col justify-between p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 hover:border-violet-300 dark:hover:border-violet-800 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/80 transition-all shadow-sm hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/10"
      >
        <div className="flex items-start justify-between min-w-0">
          <div className={`flex flex-col min-w-0 ${isRtl ? "pl-4 text-right" : "pr-4 text-left"}`}>
            {/* Username Text with Quick Click-to-Copy */}
            <button
              onClick={() => handleCopy(name)}
              className={`font-mono text-[15px] font-bold text-zinc-900 dark:text-zinc-100 hover:text-violet-600 dark:hover:text-violet-400 transition-colors truncate ${isRtl ? "text-right" : "text-left"} flex items-center gap-1.5 focus:outline-none select-all cursor-pointer w-full`}
              title="Click to copy instantly"
              aria-label={`Copy ${name}`}
            >
              <span className="truncate">{name}</span>
              {isCopied ? (
                <span className="px-1.5 py-0.5 rounded text-[8px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 shrink-0 animate-bounce">
                  Copied!
                </span>
              ) : (
                <Copy className="w-3 h-3 text-zinc-400 dark:text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              )}
            </button>
            {/* Helper details */}
            <div className="flex items-center gap-2 mt-0.5 text-[10px] text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-wider">
              <span>{t.len || "Len"}: {name.length}</span>
              <span>•</span>
              <button 
                onClick={() => setExpandedCard(isExpanded ? null : name)}
                className="text-zinc-500 dark:text-zinc-400 flex items-center gap-1 hover:text-violet-500 dark:hover:text-violet-400 transition-colors focus:outline-none"
                title="View advanced AI name scoring breakdown"
              >
                {t.matchScore || "Match"}: <strong className="text-violet-600 dark:text-violet-400 underline decoration-dotted decoration-violet-500/40">{scores.overall}%</strong>
                <Sparkles className="w-3 h-3 text-violet-500 animate-pulse shrink-0" />
              </button>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Expand scoring breakdown */}
            <button
              onClick={() => setExpandedCard(isExpanded ? null : name)}
              className={`p-1.5 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                isExpanded 
                  ? "bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400" 
                  : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
              }`}
              title="Toggle AI Score Analysis"
              aria-label="Toggle AI score details"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {/* Availability Lookup */}
            <a
              id={`lookup-link-${globalIndex}`}
              href={getPlatformLookupUrl(name)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all"
              title={getPlatformTooltip()}
              aria-label={`${getPlatformTooltip()} for username ${name}`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Copy Button */}
            <button
              id={`copy-btn-${globalIndex}`}
              onClick={() => handleCopy(name)}
              className="p-1.5 rounded-lg text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500"
              title={`${t.copyAll || "Copy"} ${resultLabel}`}
              aria-label={isCopied ? `${name} copied` : `Copy ${name} to clipboard`}
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Favorite Toggle Button */}
            <button
              id={`fav-btn-${globalIndex}`}
              onClick={() => onToggleFavorite(name)}
              className={`p-1.5 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                isFavorited
                  ? "text-yellow-500 hover:text-yellow-400 bg-yellow-500/10 hover:bg-yellow-500/5"
                  : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
              }`}
              title={isFavorited ? "Remove from Favorites" : "Save to Favorites"}
              aria-label={isFavorited ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
            >
              <Star className={`w-4 h-4 ${isFavorited ? "fill-yellow-500 text-yellow-500" : ""}`} />
            </button>
          </div>
        </div>

        {/* Scoring metrics summary footer row (static when collapsed) */}
        {!isExpanded && (
          <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/60 pt-2.5 mt-3 text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
            <div className="flex items-center gap-1">
              <span className="text-zinc-500 dark:text-zinc-600 font-sans">{t.brandable || "Brandable"}</span>
              <span className="text-violet-500 font-semibold">{scores.brandability}%</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-zinc-500 dark:text-zinc-600 font-sans">{t.memorable || "Memorable"}</span>
              <span className="text-amber-500 font-semibold">{scores.memorability}%</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-zinc-500 dark:text-zinc-600 font-sans">{t.uniqueness || "Unique"}</span>
              <span className="text-emerald-500 font-semibold">{scores.uniqueness}%</span>
            </div>
          </div>
        )}

        {/* Collapsible Advanced AI score analysis panel */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-t border-zinc-100 dark:border-zinc-800/80 mt-3 pt-3.5 space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                <span className="flex items-center gap-1 text-violet-600 dark:text-violet-400 uppercase tracking-wider text-[10px]">
                  <Sparkles className="w-3.5 h-3.5" /> AI Quality Scoring
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300">
                  {scores.overall}% Score
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                
                {/* Brandability */}
                <div className={`space-y-1 ${isRtl ? "text-right" : "text-left"}`}>
                  <div className="flex justify-between">
                    <span>Brandability</span>
                    <span className={`font-mono ${getScoreColorClass(scores.brandability)}`}>{scores.brandability}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className={`h-full ${getScoreBgClass(scores.brandability)} rounded-full`} style={{ width: `${scores.brandability}%` }}></div>
                  </div>
                </div>

                {/* Memorability */}
                <div className={`space-y-1 ${isRtl ? "text-right" : "text-left"}`}>
                  <div className="flex justify-between">
                    <span>Memorability</span>
                    <span className={`font-mono ${getScoreColorClass(scores.memorability)}`}>{scores.memorability}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className={`h-full ${getScoreBgClass(scores.memorability)} rounded-full`} style={{ width: `${scores.memorability}%` }}></div>
                  </div>
                </div>

                {/* Pronunciation */}
                <div className={`space-y-1 ${isRtl ? "text-right" : "text-left"}`}>
                  <div className="flex justify-between">
                    <span>Pronunciation</span>
                    <span className={`font-mono ${getScoreColorClass(scores.pronunciation)}`}>{scores.pronunciation}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className={`h-full ${getScoreBgClass(scores.pronunciation)} rounded-full`} style={{ width: `${scores.pronunciation}%` }}></div>
                  </div>
                </div>

                {/* Uniqueness */}
                <div className={`space-y-1 ${isRtl ? "text-right" : "text-left"}`}>
                  <div className="flex justify-between">
                    <span>Uniqueness</span>
                    <span className={`font-mono ${getScoreColorClass(scores.uniqueness)}`}>{scores.uniqueness}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className={`h-full ${getScoreBgClass(scores.uniqueness)} rounded-full`} style={{ width: `${scores.uniqueness}%` }}></div>
                  </div>
                </div>

                {/* Social media friendliness */}
                <div className={`space-y-1 ${isRtl ? "text-right" : "text-left"}`}>
                  <div className="flex justify-between">
                    <span>Social Friendly</span>
                    <span className={`font-mono ${getScoreColorClass(scores.socialFriendliness)}`}>{scores.socialFriendliness}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className={`h-full ${getScoreBgClass(scores.socialFriendliness)} rounded-full`} style={{ width: `${scores.socialFriendliness}%` }}></div>
                  </div>
                </div>

                {/* Domain friendliness */}
                <div className={`space-y-1 ${isRtl ? "text-right" : "text-left"}`}>
                  <div className="flex justify-between">
                    <span>Domain Friendly</span>
                    <span className={`font-mono ${getScoreColorClass(scores.domainFriendliness)}`}>{scores.domainFriendliness}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className={`h-full ${getScoreBgClass(scores.domainFriendliness)} rounded-full`} style={{ width: `${scores.domainFriendliness}%` }}></div>
                  </div>
                </div>

              </div>

              {/* Dynamic expert advice text block based on overall score */}
              <p className={`text-[10px] text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950/60 p-2 rounded-lg border border-zinc-100 dark:border-zinc-800/80 italic ${isRtl ? "text-right" : "text-left"}`}>
                {scores.overall >= 90 
                  ? "Elite naming precision. Highly speakable, premium structure, optimized for viral retention and clean domain registry."
                  : scores.overall >= 80 
                  ? "Excellent, clean composition. High verbal retention and perfect styling layout for mainstream audience traction."
                  : "Good generic identifier. Fits standard criteria perfectly, though special symbols or length could limit elite brandability."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
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
        {/* Advanced Toolbar: Export, Copy formats and Sorting Controls */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-md">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5">
            
            {/* Sorting Selection control */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <label id="sorting-label" htmlFor="sorting-select" className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5 shrink-0 text-left">
                <ArrowUpDown className="w-3.5 h-3.5 text-violet-500" />
                Sort By
              </label>
              <select
                id="sorting-select"
                value={localSortBy}
                onChange={(e) => setLocalSortBy(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 text-zinc-800 dark:text-zinc-200 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
              >
                <option value="Best Match">Best Match</option>
                <option value="Most Unique">Most Unique</option>
                <option value="Shortest">Shortest</option>
                <option value="Longest">Longest</option>
                <option value="Alphabetical">Alphabetical</option>
              </select>
            </div>

            {/* Quick Export Tools Block */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mr-1 hidden sm:inline">Export Ideas:</span>
              
              <button
                onClick={handleExportTXT}
                className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-500/30 transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                title="Export as plain text (.txt)"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>TXT</span>
              </button>

              <button
                onClick={handleExportCSV}
                className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-500/30 transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                title="Export complete details as CSV table (.csv)"
              >
                <TableProperties className="w-3.5 h-3.5" />
                <span>CSV</span>
              </button>

              <button
                onClick={handleExportJSON}
                className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-500/30 transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                title="Export details as rich JSON file (.json)"
              >
                <FileJson className="w-3.5 h-3.5" />
                <span>JSON</span>
              </button>
            </div>

            {/* Advanced Copy Formats Selector */}
            <div className="flex items-center gap-2 border-t lg:border-t-0 border-zinc-150 pt-3 lg:pt-0">
              <div className="flex bg-zinc-100 dark:bg-zinc-950 p-1 rounded-xl border border-zinc-200 dark:border-zinc-850">
                <button
                  onClick={() => setCopyFormat("text")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${copyFormat === "text" ? "bg-white dark:bg-zinc-900 shadow-sm text-violet-600 dark:text-violet-400" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700"}`}
                >
                  Plain List
                </button>
                <button
                  onClick={() => setCopyFormat("csv")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${copyFormat === "csv" ? "bg-white dark:bg-zinc-900 shadow-sm text-violet-600 dark:text-violet-400" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700"}`}
                >
                  CSV Row
                </button>
                <button
                  onClick={() => setCopyFormat("json")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${copyFormat === "json" ? "bg-white dark:bg-zinc-900 shadow-sm text-violet-600 dark:text-violet-400" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700"}`}
                >
                  JSON List
                </button>
              </div>

              <button
                onClick={handleCopyAll}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
                title="Copy all suggestions to clipboard in selected format"
              >
                {copiedAllState ? <Check className="w-3.5 h-3.5 text-violet-200" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAllState ? t.copied : "Copy All"}</span>
              </button>
            </div>

          </div>
        </div>

        {/* Top section status heading */}
        <div className={`flex items-center justify-between border-b border-zinc-200 dark:border-zinc-900 pb-4 ${isRtl ? "flex-row-reverse" : ""}`}>
          <h2 id="generated-results-heading" className="text-xs font-extrabold text-zinc-500 font-mono tracking-wider uppercase flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            {t.generatedSuggestions} ({usernames.length})
          </h2>
          <div className="flex items-center gap-4">
            {onRegenerate && (
              <button
                onClick={onRegenerate}
                disabled={isGenerating}
                className="text-xs text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 font-bold transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-violet-500"
                title="Regenerate all names"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
                <span>{t.regenerate}</span>
              </button>
            )}
            <span className="text-xs text-zinc-400 dark:text-zinc-500 font-semibold hidden sm:inline">
              {t.clickToCopy}
            </span>
          </div>
        </div>

        {/* Loading Skeleton States & Main Results Render Grid */}
        {isGenerating && usernames.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/20 h-24 flex flex-col justify-between animate-pulse">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3"></div>
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3"></div>
                <div className="h-2 bg-zinc-150 dark:bg-zinc-850 rounded w-full mt-2"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
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

            {/* Contextual Actionable Next Steps Advice Panel */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/5 to-indigo-500/5 border border-violet-500/10 dark:border-violet-400/10 mt-8 text-left space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                  Actionable Next Steps &amp; Pro Naming Tips
                </h3>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                Got your eyes on a few potential candidates? Here is your strategic checklists for securing and establishing your handle on <span className="font-bold text-violet-600 dark:text-violet-400">{platform}</span>:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                {platform === "Instagram" && (
                  <>
                    <li className="p-3 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-850/50 rounded-xl space-y-1">
                      <span className="font-bold text-violet-600 dark:text-violet-400">1. Domain Registry</span>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">Secure the corresponding domain name (.com) immediately to protect your digital brand identity.</p>
                    </li>
                    <li className="p-3 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-850/50 rounded-xl space-y-1">
                      <span className="font-bold text-violet-600 dark:text-violet-400">2. Keep it Short</span>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">Keep your handle short (ideally under 15 characters) so it is clean, highly readable, and mobile-friendly.</p>
                    </li>
                    <li className="p-3 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-850/50 rounded-xl space-y-1">
                      <span className="font-bold text-violet-600 dark:text-violet-400">3. Cross-Secure</span>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">Cross-secure handles: grab the matching handle on TikTok and YouTube to block copycats early on.</p>
                    </li>
                  </>
                )}
                {platform === "TikTok" && (
                  <>
                    <li className="p-3 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-850/50 rounded-xl space-y-1">
                      <span className="font-bold text-violet-600 dark:text-violet-400">1. Search Optimization</span>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">Shorter, highly vocalized handles perform best on TikTok's internal search ranking algorithm.</p>
                    </li>
                    <li className="p-3 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-850/50 rounded-xl space-y-1">
                      <span className="font-bold text-violet-600 dark:text-violet-400">2. Avoid Symbol Stack</span>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">Avoid stacked special characters like underscores or multiple dots which confuse voice searches.</p>
                    </li>
                    <li className="p-3 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-850/50 rounded-xl space-y-1">
                      <span className="font-bold text-violet-600 dark:text-violet-400">3. Bio Synergy</span>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">Link your verified Instagram or YouTube in your profile dashboard to siphon traffic effectively.</p>
                    </li>
                  </>
                )}
                {platform === "YouTube" && (
                  <>
                    <li className="p-3 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-850/50 rounded-xl space-y-1">
                      <span className="font-bold text-violet-600 dark:text-violet-400">1. Handle Claim</span>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">Set up custom YouTube handles matching this exact name so sharing external channel links is effortless.</p>
                    </li>
                    <li className="p-3 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-850/50 rounded-xl space-y-1">
                      <span className="font-bold text-violet-600 dark:text-violet-400">2. Visual CamelCase</span>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">Make display titles visually distinct using camel-case styling (e.g. CreatorVibe instead of creatorvibe).</p>
                    </li>
                    <li className="p-3 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-850/50 rounded-xl space-y-1">
                      <span className="font-bold text-violet-600 dark:text-violet-400">3. Niche Alignment</span>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">Ensure your channel title clearly suggests your target content focus to maximize clicks.</p>
                    </li>
                  </>
                )}
                {!["Instagram", "TikTok", "YouTube"].includes(platform) && (
                  <>
                    <li className="p-3 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-850/50 rounded-xl space-y-1">
                      <span className="font-bold text-violet-600 dark:text-violet-400">1. Availability Verification</span>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">Verify handle namespaces thoroughly across all major profiles to secure complete brand ownership.</p>
                    </li>
                    <li className="p-3 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-850/50 rounded-xl space-y-1">
                      <span className="font-bold text-violet-600 dark:text-violet-400">2. Phonetic Clarity</span>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">Avoid complex double-consonants so people can write your handle correctly after hearing it verbally.</p>
                    </li>
                    <li className="p-3 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-850/50 rounded-xl space-y-1">
                      <span className="font-bold text-violet-600 dark:text-violet-400">3. Trademark Clearance</span>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">Do a quick trademark search to ensure no active business registry conflicts with your brand name.</p>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </>
        )}

        {/* Interactive Bottom Control Buttons */}
        {(onRegenerate || onLoadMore) && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 border-t border-zinc-200 dark:border-zinc-900 mt-8">
            {onRegenerate && (
              <button
                onClick={onRegenerate}
                disabled={isGenerating}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-850 text-zinc-800 dark:text-zinc-200 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <RefreshCw className={`w-4 h-4 text-violet-600 dark:text-violet-400 ${isGenerating ? "animate-spin" : ""}`} />
                {t.regenerateFresh || "Regenerate Fresh Suggestions"}
              </button>
            )}
            {onLoadMore && (
              <button
                onClick={onLoadMore}
                disabled={isGenerating}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-violet-600/10 hover:shadow-violet-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <Sparkles className="w-4 h-4 text-violet-200" />
                {t.loadMore}
              </button>
            )}
          </div>
        )}
      </section>
    </LazyMotion>
  );
}
