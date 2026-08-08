import React from "react";
import { CheckCircle, ArrowRight, Compass, Users, Sparkles, Gamepad2, Briefcase } from "lucide-react";
import { uiTranslations } from "../translations";
import { seoPages } from "../seoData";

interface TextSection {
  title: string;
  paragraphs: string[];
}

interface TextContentProps {
  currentPath?: string;
  introduction: string;
  features: string[];
  sections: TextSection[];
  platformName: string;
  onNavigate?: (path: string) => void;
  language: string;
}

const relatedCategories = [
  {
    titleKey: "socialMediaGenerators",
    titleDefault: "Social Media Generators",
    description: "Launch your personal brand, design aesthetic grids, or find viral, catchy handles.",
    icon: Users,
    colorClass: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/5 dark:bg-indigo-500/10 border-indigo-100 dark:border-indigo-900/40",
    links: [
      { name: "Instagram Handles", path: "/instagram-username-generator" },
      { name: "Instagram (Girls)", path: "/instagram-usernames-for-girls" },
      { name: "Instagram (Boys)", path: "/instagram-usernames-for-boys" },
      { name: "TikTok Handles", path: "/tiktok-username-generator" },
      { name: "TikTok Usernames", path: "/tiktok-usernames" },
      { name: "YouTube Channel Names", path: "/youtube-channel-names" },
      { name: "Discord Usernames", path: "/discord-usernames" }
    ]
  },
  {
    titleKey: "stylesAesthetics",
    titleDefault: "Styles & Aesthetics",
    description: "Match your mood with dreamlike, dark, retro, or luxury tailored handle presets.",
    icon: Sparkles,
    colorClass: "text-pink-600 dark:text-pink-400 bg-pink-500/5 dark:bg-pink-500/10 border-pink-100 dark:border-pink-900/40",
    links: [
      { name: "Aesthetic Handles", path: "/aesthetic-usernames" },
      { name: "Cool Usernames", path: "/cool-usernames" },
      { name: "Cute Usernames", path: "/cute-usernames" },
      { name: "Dark Usernames", path: "/dark-usernames" },
      { name: "Anime Usernames", path: "/anime-usernames" },
      { name: "Minimalist Handles", path: "/minimal-usernames" },
      { name: "Luxury Usernames", path: "/luxury-usernames" }
    ]
  },
  {
    titleKey: "gamingEsports",
    titleDefault: "Gaming & Esports",
    description: "Unleash competitive, legendary, and tryhard gamertags to top multiplayer lobbies.",
    icon: Gamepad2,
    colorClass: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-900/40",
    links: [
      { name: "Gaming Gamertags", path: "/gaming-username-generator" },
      { name: "Esports Usernames", path: "/gaming-usernames" },
      { name: "Roblox Usernames", path: "/roblox-usernames" },
      { name: "Minecraft Usernames", path: "/minecraft-usernames" },
      { name: "Fortnite Usernames", path: "/fortnite-usernames" },
      { name: "Gamertag Generator", path: "/gamertag-generator" }
    ]
  },
  {
    titleKey: "businessStartup",
    titleDefault: "Business & Startup",
    description: "Formulate premium, high-growth, corporate startup names and executive display names.",
    icon: Briefcase,
    colorClass: "text-violet-600 dark:text-violet-400 bg-violet-500/5 dark:bg-violet-500/10 border-violet-100 dark:border-violet-900/40",
    links: [
      { name: "Brand Name Generator", path: "/brand-name-generator" },
      { name: "Company Name Generator", path: "/company-name-generator" },
      { name: "Startup Name Generator", path: "/startup-name-generator" },
      { name: "Professional Handles", path: "/professional-usernames" },
      { name: "Business Usernames", path: "/business-usernames" },
      { name: "Creator Usernames", path: "/creator-usernames" },
      { name: "Display Names", path: "/display-name-generator" }
    ]
  }
];

function getRelatedPages(currentPath: string, platformName: string, count = 9) {
  const allPages = Object.keys(seoPages).map(path => seoPages[path]);
  
  // Filter out the current path
  const candidates = allPages.filter(p => p.path !== currentPath);
  
  // Calculate a relevance score for each candidate
  const scored = candidates.map(p => {
    let score = 0;
    
    // Platform match
    if (p.platform === platformName) {
      score += 15;
    }
    
    // Check if the platform names have a substring match
    if (platformName && p.platform && (p.platform.includes(platformName) || platformName.includes(p.platform))) {
      score += 5;
    }
    
    // Match segment words between the path we are on and the target path
    const currentWords = currentPath.toLowerCase().split(/[-/]/).filter(Boolean);
    const targetWords = p.path.toLowerCase().split(/[-/]/).filter(Boolean);
    
    let segmentMatches = 0;
    for (const w of targetWords) {
      if (currentWords.includes(w)) {
        segmentMatches++;
      }
    }
    score += segmentMatches * 3;
    
    // Check if there is a keyword match in h1
    const currentH1Words = seoPages[currentPath]?.h1?.toLowerCase().split(/\s+/) || [];
    const targetH1Words = p.h1?.toLowerCase().split(/\s+/) || [];
    let h1Matches = 0;
    for (const w of targetH1Words) {
      if (w.length > 3 && currentH1Words.includes(w)) {
        h1Matches++;
      }
    }
    score += h1Matches * 2;
    
    return { page: p, score };
  });
  
  // Sort by score descending, then by path name (for deterministic ordering)
  scored.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.page.path.localeCompare(b.page.path);
  });
  
  return scored.slice(0, count).map(x => x.page);
}

export default function TextContent({
  currentPath,
  introduction,
  features,
  sections,
  platformName,
  onNavigate,
  language
}: TextContentProps) {
  const t = uiTranslations[language] || uiTranslations.en;
  const isRtl = language === "ar";

  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    const targetPath = language === "en" ? path : `/${language}${path}`;
    if (onNavigate) {
      onNavigate(targetPath);
    } else {
      window.history.pushState(null, "", targetPath);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  return (
    <section id="guides-section" className={`py-16 px-4 max-w-4xl mx-auto space-y-16 ${isRtl ? "text-right" : "text-left"}`}>
      {/* Introduction */}
      <div className="max-w-none">
        <p className="text-zinc-600 dark:text-zinc-350 text-base sm:text-lg leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:text-violet-600 dark:first-letter:text-violet-500 first-letter:mr-3 first-letter:float-left first-letter:lh-1">
          {introduction}
        </p>
      </div>

      {/* Grid: Features Checklist */}
      <div className="p-6 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-900 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/5 rounded-full blur-3xl pointer-events-none"></div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 rounded-full bg-violet-500"></span>
          {t.keyFeatures || "Key Features of our"} {platformName} {t.generatorWord || "Generator"}
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Structured Copy Sections for Featured Snippets */}
      <div className="space-y-12">
        {sections.map((section, idx) => (
          <article key={idx} className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-xs text-violet-600 dark:text-violet-500 bg-violet-500/10 px-2.5 py-1 rounded-lg border border-violet-500/20">
                {idx + 1}
              </span>
              {section.title}
            </h2>
            <div className="space-y-4 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* High-Fidelity Related Generators Section */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-2.5">
          <Compass className="w-5 h-5 text-violet-500" />
          <h3 className="text-lg font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {t.exploreRelated || "Related Name Generators"}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedCategories.map((category, catIdx) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={catIdx} 
                className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-zinc-200/40 dark:hover:shadow-black/10 hover:border-violet-500/20 bg-zinc-50/50 dark:bg-zinc-950/20 ${category.colorClass.split(" ")[2]}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border ${category.colorClass}`}>
                      <IconComponent className="w-5 h-5 shrink-0" />
                    </div>
                    <h4 className="text-sm font-extrabold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                      {t[category.titleKey] || category.titleDefault}
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-5 border-t border-zinc-200/50 dark:border-zinc-900/60 pt-4">
                  <ul className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-semibold">
                    {category.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <a
                          href={link.path}
                          onClick={(e) => handleLinkClick(link.path, e)}
                          className="text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors flex items-center gap-1.5 group/link py-1"
                        >
                          <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover/link:bg-violet-500 transition-colors"></span>
                          <span className="truncate">{link.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Highly Relevant Resources & Internal Linking Hub */}
      {currentPath && (
        <div className="space-y-6 pt-8 border-t border-zinc-200/50 dark:border-zinc-900/60">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-violet-500" />
            <h3 className="text-lg font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Highly Relevant Naming Guides &amp; Resources
            </h3>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
            Explore these closely related professional naming resources, generators, and guidelines. Each resource has been hand-selected to optimize your digital identity and secure premium, available handles across various networks.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {getRelatedPages(currentPath, platformName, 9).map((page) => (
              <a
                key={page.path}
                href={page.path}
                onClick={(e) => handleLinkClick(page.path, e)}
                className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 hover:bg-zinc-100/85 dark:bg-zinc-950/20 dark:hover:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-850/50 hover:border-violet-500/20 transition-all text-xs font-bold text-zinc-700 dark:text-zinc-350 hover:text-violet-600 dark:hover:text-violet-400 group cursor-pointer"
              >
                <span className="truncate pr-2">{page.h1 || page.metaTitle.split(" | ")[0]}</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 text-zinc-400 group-hover:text-violet-500 group-hover:translate-x-0.5 transition-all" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTA Block */}
      <div className="p-8 rounded-2xl bg-gradient-to-tr from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -left-12 -top-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="space-y-2 text-center md:text-left relative z-10">
          <h4 className="text-lg font-bold text-zinc-900 dark:text-white">{t.foundSignature || "Found your signature handle?"}</h4>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{t.beSureRegister || "Be sure to register it on all platforms before someone else does!"}</p>
        </div>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            const input = document.getElementById("keyword-input");
            if (input) input.focus();
          }}
          className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-violet-600/20 flex items-center gap-2 group shrink-0 relative z-10 cursor-pointer"
        >
          {t.generateMore || "Generate More Names"}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </section>
  );
}
