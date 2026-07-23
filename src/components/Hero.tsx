import { Sparkles, ArrowRight, Zap, RefreshCw, CheckCircle2 } from "lucide-react";

interface HeroProps {
  h1: string;
  subtitle: string;
  platform: string;
}

export default function Hero({ h1, subtitle, platform }: HeroProps) {
  // Theme styling colors based on platform
  const getGlowStyles = () => {
    switch (platform) {
      case "Instagram":
        return "from-pink-500/10 via-purple-600/10 to-orange-500/10";
      case "TikTok":
        return "from-cyan-500/10 via-zinc-800/10 to-pink-500/10";
      case "YouTube":
        return "from-red-600/15 via-zinc-950 to-red-900/5";
      case "Gaming":
      case "Roblox":
        return "from-emerald-500/10 via-zinc-950 to-cyan-500/10";
      case "Discord":
        return "from-indigo-600/15 via-zinc-950 to-indigo-900/5";
      default:
        return "from-violet-600/10 via-zinc-950 to-indigo-600/10";
    }
  };

  const getBadgeColors = () => {
    switch (platform) {
      case "Instagram":
        return "text-pink-400 border-pink-500/20 bg-pink-500/5";
      case "TikTok":
        return "text-cyan-400 border-cyan-500/20 bg-cyan-500/5";
      case "YouTube":
        return "text-red-400 border-red-500/20 bg-red-500/5";
      case "Gaming":
        return "text-emerald-400 border-emerald-500/20 bg-emerald-500/5";
      default:
        return "text-violet-400 border-violet-500/20 bg-violet-500/5";
    }
  };

  return (
    <div
      id="hero-section"
      className="relative pt-32 pb-16 overflow-hidden flex flex-col items-center justify-center text-center"
    >
      {/* Dynamic Glowing Ambient Halo */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b ${getGlowStyles()} rounded-full blur-[140px] pointer-events-none -z-10`}
      ></div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 -z-20"></div>

      {/* Badge Indicator */}
      <div className="mb-4">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase border ${getBadgeColors()}`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          100% Free AI & Procedural Tool
        </span>
      </div>

      {/* Main Heading with Elegant Typography */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white max-w-4xl px-4 leading-[1.1] mb-6">
        {h1}
      </h1>

      {/* Subtitle */}
      <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-2xl px-6 font-normal leading-relaxed mb-8">
        {subtitle}
      </p>

      {/* Visual stats bar */}
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 text-xs text-zinc-500 font-mono tracking-wide uppercase">
        <div className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-violet-500" />
          <span>Procedural Speed: ~5ms</span>
        </div>
        <span className="hidden sm:inline text-zinc-800">•</span>
        <div className="flex items-center gap-1.5">
          <RefreshCw className="w-4 h-4 text-emerald-500" />
          <span>Combinations: 1.2M+</span>
        </div>
        <span className="hidden sm:inline text-zinc-800">•</span>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-sky-500" />
          <span>Zero Duplicates Guaranteed</span>
        </div>
      </div>
    </div>
  );
}
