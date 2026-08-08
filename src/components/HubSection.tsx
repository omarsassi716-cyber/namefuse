import React, { useState, useMemo } from "react";
import { 
  Gamepad2, Share2, Award, BookOpen, Shield, ArrowRight, 
  Search, Sparkles, HelpCircle, ChevronRight, LayoutGrid, 
  Layers, ExternalLink, BookmarkCheck, BookOpenCheck
} from "lucide-react";
import { blogArticles, BlogPost } from "../blogData";
import { tools, ToolConfig } from "../toolsConfig";
import { getProgrammaticExtraConfigs } from "../seoProgrammaticExtra";
import { seoPages } from "../seoData";
import AdSensePlaceholder from "./AdSensePlaceholder";

interface HubSectionProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  language: string;
}

interface HubDefinition {
  id: string;
  path: string;
  title: string;
  tagline: string;
  intent: string;
  icon: React.ComponentType<any>;
  categoryKey: string; // matches blog category
  description: string;
  quickTips: string[];
  faq: { question: string; answer: string }[];
}

const HUBS: HubDefinition[] = [
  {
    id: "gaming",
    path: "/gaming-naming-hub",
    title: "Gaming & Esports Naming Hub",
    tagline: "Claim Your Ultimate Player Identity & Faction Brands",
    intent: "Gamers seeking specialized, high-impact competitive gamertags, clan/guild tags, console handles (Xbox, PSN), and fantasy roleplay names.",
    icon: Gamepad2,
    categoryKey: "gaming",
    description: "Welcome to the central command for gaming nomenclature. Whether you are building an elite esports division, crafting a cozy cozy-farm homestead, or seeking a sweaty, competitive Battle Royale handle, our generators use professional syllable matrices to build names that demand respect in the lobby.",
    quickTips: [
      "Keep gaming handles short (8-12 characters) for quick team callouts in high-stress matches.",
      "Use phonetic syllables that combine hard consonants (K, T, V, X) for active, energetic competitive tags.",
      "Sync your gaming platform handles (Steam, Discord, Twitch, consoles) to unify your personal gaming brand."
    ],
    faq: [
      {
        question: "How do I choose a sweaty competitive gamertag?",
        answer: "Sweaty or tryhard tags benefit from brief, high-contrast wording (e.g., 'Vibe', 'Clutch', 'Aero') combined with clean formatting. Avoid excessive numbers or symbols, which clutter killfeeds."
      },
      {
        question: "Why should my guild and clan names match our esports branding?",
        answer: "Consistent branding across competitive rosters builds strong identity recall, making it easier for sponsors, tourney coordinators, and fans to track your team's achievements."
      }
    ]
  },
  {
    id: "social",
    path: "/social-media-naming-hub",
    title: "Social Media & Creator Hub",
    tagline: "Build a Cohesive, Algorithm-Friendly Creative Identity",
    intent: "Creators, vloggers, podcasters, and brands looking for aesthetic, memorable, and searchable social handles (Instagram, TikTok, YouTube).",
    icon: Share2,
    categoryKey: "social",
    description: "Our creator naming hub is engineered to help you craft consistent, high-recall handles optimized for discovery algorithms. Establish a clean, cohesive visual presence across platforms and design a name that readers love to subscribe to.",
    quickTips: [
      "Secure an exact-match handle across Instagram, TikTok, and YouTube to ensure clean brand signaling.",
      "Avoid underscores or consecutive repeating letters, which increase user typing errors and dilute verbal searches.",
      "Opt for aesthetic, minimal word pairings that convey a clear niche vibe (e.g., beauty, tech, ASMR) instantly."
    ],
    faq: [
      {
        question: "What makes a social media handle algorithm-friendly?",
        answer: "An algorithm-friendly username is highly searchable, easy to remember, and contains niche-specific seed keywords (e.g., 'Cooks', 'Design', 'Reviews') that help platforms index your content correctly."
      },
      {
        question: "How do I choose an aesthetic username if my name is taken?",
        answer: "Instead of adding random numbers, use elegant, minimal prefixes or suffixes like 'studio', 'co', 'journal', 'daily', or 'creatives' to retain premium branding."
      }
    ]
  },
  {
    id: "business",
    path: "/business-brand-naming-hub",
    title: "Brand & Business Naming Hub",
    tagline: "Secure High-Trust Commercial Domains & Startup Titles",
    intent: "Entrepreneurs, SaaS startups, digital agencies, e-commerce boutiques, and restaurants looking for commercial-grade, trademarkable brand names.",
    icon: Award,
    categoryKey: "business",
    description: "Navigate the corporate identity landscape with confidence. This hub is designed for business leaders seeking modern, evocative, and legally sound company, product, and store names that fit seamlessly with premium dot-com domains.",
    quickTips: [
      "Prioritize compound naming (e.g., NetGrid, SolasLab) to increase dot-com domain availability and secure trademarks easily.",
      "Ensure your brand name is easy to pronounce and spell in international markets to support global expansion.",
      "Cross-check your proposed business name against trademark databases before committing to marketing materials."
    ],
    faq: [
      {
        question: "Should my business name be descriptive or brandable?",
        answer: "Brandable (invented or compound) names (like Google or Shopify) are easier to trademark and scale across multiple industries, whereas descriptive names (like Fast Pizza) offer instant category understanding but limited trademark strength."
      },
      {
        question: "How does my startup name affect domain acquisition?",
        answer: "Brief, single-word names often require heavy investment to secure the matching .com. Choosing cohesive, high-concept compounds lets you launch with a premium, affordable domain instantly."
      }
    ]
  },
  {
    id: "creative",
    path: "/creative-fantasy-naming-hub",
    title: "Creative Writing & Fantasy Hub",
    tagline: "Unleash Immersive Worldbuilding & Character Nomenclature",
    intent: "Authors, fiction writers, tabletop gamers (DnD), and creative directors seeking lore-accurate characters, mythical worlds, spaceship titles, and book titles.",
    icon: BookOpen,
    categoryKey: "creative",
    description: "Step into our creative sanctuary. From high-fantasy elven dynasties and gothic, dark vampire clans to futuristic interstellar spaceships and custom book titles, this hub provides evocative naming structures that breathe life into your storytelling.",
    quickTips: [
      "Combine evocative cultural roots (e.g., Gaelic for Elven, Old Norse for Dwarven) to give your fictional characters instant historical depth.",
      "Use phonology to convey character traits—soft sibilants (S, L, M) represent graceful beings, while harsh plosives (G, K, R) suit battle-hardened warriors.",
      "Let world names reflect history—add natural geographical suffixes (e.g., -ford, -glen, -spire, -reach) that describe the map's terrain."
    ],
    faq: [
      {
        question: "How do I create lore-accurate fantasy names?",
        answer: "Establish a consistent linguistic pattern for each fictional race or faction. Pick 3-4 recurring syllables and letter combinations to make names within a community feel cohesive."
      },
      {
        question: "What is the key to naming a compelling sci-fi spaceship?",
        answer: "Fusing astronomical designations, historical reference points, or active, commanding verbs (e.g., 'Horizon Apex', 'Star Ward', 'Demeter IX') yields rich futuristic nomenclature."
      }
    ]
  },
  {
    id: "privacy",
    path: "/privacy-security-naming-hub",
    title: "Privacy & Security Naming Hub",
    tagline: "Protect Your Digital Footprint with Secure Pseudonyms",
    intent: "Privacy-conscious individuals, cybersecurity advocates, and investigators seeking anonymous burner usernames to combat online profiling and OSINT tracking.",
    icon: Shield,
    categoryKey: "security",
    description: "Take control of your online security. This specialized hub outlines strategic naming guidelines for choosing secure pseudonyms, burner identifiers, and anonymous accounts that prevent digital correlation, tracker aggregation, and open-source intelligence (OSINT) mapping.",
    quickTips: [
      "Never reuse the same username, seed keyword, or profile structure across personal accounts and anonymous burners.",
      "Avoid choosing pseudonyms based on your real-world hobbies, birth year, location, or favorite topics, as these create identifiable profiling trails.",
      "Use randomized, dual-noun procedural formulas (e.g., CobaltSentry, AmberGrid) that contain zero personal data pointers."
    ],
    faq: [
      {
        question: "Why is username reuse a critical security threat?",
        answer: "Reusing usernames across forums, platforms, and databases allows trackers and malicious actors to stitch your entire digital footprint together, mapping separate profiles to your real-identity persona."
      },
      {
        question: "How do I configure a secure burner handle?",
        answer: "Use our main procedural engine with the 'Minimal' style. Generate a completely random combination that is phonetically neutral, does not reference real keywords, and contains zero identifiers."
      }
    ]
  }
];

export default function HubSection({ currentPath, onNavigate, language }: HubSectionProps) {
  const [directorySearch, setDirectorySearch] = useState("");
  const [activeTab, setActiveTab] = useState<"generators" | "articles" | "directory">("generators");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Find active hub definition
  const hub = useMemo(() => {
    return HUBS.find((h) => h.path === currentPath) || HUBS[0];
  }, [currentPath]);

  // Core generators belonging to this hub
  const hubGenerators = useMemo(() => {
    return tools.filter((tool) => {
      if (hub.id === "gaming") {
        return ["minecraft-username", "roblox-username", "fortnite-username", "valorant-username", "steam-username", "xbox-gamertag", "psn-name", "clan-name", "guild-name", "gamertag", "team-name", "kingdom-name", "dragon-name", "weapon-name", "superhero-name", "villain-name"].includes(tool.id);
      }
      if (hub.id === "social") {
        return ["username", "display-name", "instagram-username", "tiktok-username", "discord-username", "twitch-name", "podcast-name", "blog-name", "youtube-channel", "aesthetic-username", "cool-username", "cute-username", "funny-username", "dark-username", "anime-username"].includes(tool.id);
      }
      if (hub.id === "business") {
        return ["brand-name", "business-name", "startup-name", "company-name", "app-name", "product-name", "domain-name", "store-name", "restaurant-name", "cafe-name", "boutique-name", "agency-name", "project-name"].includes(tool.id);
      }
      if (hub.id === "creative") {
        return ["fantasy-name", "character-name", "baby-name", "pet-name", "wizard-name", "elf-name", "dwarf-name", "book-title", "song-name", "city-name", "planet-name", "spaceship-name", "ship-name"].includes(tool.id);
      }
      if (hub.id === "privacy") {
        // Privacy advocates use procedural minimal/anonymous options
        return ["username", "display-name"].includes(tool.id);
      }
      return false;
    });
  }, [hub]);

  // Blog articles belonging to this cluster
  const hubArticles = useMemo(() => {
    return blogArticles.filter((article) => article.category === hub.categoryKey);
  }, [hub]);

  // All programmatic extra configurations generated for this hub to eliminate orphan pages
  const hubProgrammaticConfigs = useMemo(() => {
    const existingPaths = new Set(Object.keys(seoPages));
    const allExtras = getProgrammaticExtraConfigs(existingPaths);
    
    return allExtras.filter((config) => {
      const pathSlug = config.path;
      if (hub.id === "gaming") {
        return pathSlug.includes("-gamertags") || pathSlug.includes("-team-names") || pathSlug.includes("roblox") || pathSlug.includes("minecraft") || pathSlug.includes("fortnite") || pathSlug.includes("valorant") || pathSlug.includes("clan") || pathSlug.includes("steam") || pathSlug.includes("xbox") || pathSlug.includes("playstation");
      }
      if (hub.id === "social") {
        return pathSlug.includes("-usernames") || pathSlug.includes("-social-handles") || pathSlug.includes("-creator-names") || pathSlug.includes("instagram") || pathSlug.includes("tiktok") || pathSlug.includes("youtube") || pathSlug.includes("twitch") || pathSlug.includes("pinterest") || pathSlug.includes("discord");
      }
      if (hub.id === "business") {
        return pathSlug.includes("-brand-names") || pathSlug.includes("-startup-names") || pathSlug.includes("-ai-names") || pathSlug.includes("saas") || pathSlug.includes("tech") || pathSlug.includes("agency") || pathSlug.includes("boutique") || pathSlug.includes("luxury");
      }
      if (hub.id === "creative") {
        return pathSlug.includes("-names") && !(pathSlug.includes("minecraft") || pathSlug.includes("roblox") || pathSlug.includes("fortnite") || pathSlug.includes("valorant") || pathSlug.includes("instagram") || pathSlug.includes("tiktok") || pathSlug.includes("youtube") || pathSlug.includes("twitch") || pathSlug.includes("discord") || pathSlug.includes("steam") || pathSlug.includes("xbox") || pathSlug.includes("playstation"));
      }
      if (hub.id === "privacy") {
        return pathSlug.includes("clean") || pathSlug.includes("minimal") || pathSlug.includes("short") || pathSlug.includes("rare");
      }
      return false;
    });
  }, [hub]);

  // Filtered Programmatic Directory
  const filteredDirectory = useMemo(() => {
    const search = directorySearch.toLowerCase().trim();
    if (!search) return hubProgrammaticConfigs;
    return hubProgrammaticConfigs.filter(
      (item) => item.keyword.toLowerCase().includes(search) || item.path.toLowerCase().includes(search)
    );
  }, [hubProgrammaticConfigs, directorySearch]);

  // Paginated Directory Items
  const totalDirectoryPages = Math.max(1, Math.ceil(filteredDirectory.length / itemsPerPage));
  const paginatedDirectory = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredDirectory.slice(start, start + itemsPerPage);
  }, [filteredDirectory, currentPage]);

  const IconComponent = hub.icon;

  return (
    <div className="space-y-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300 pt-6">
      
      {/* Topical Hub Banner Header */}
      <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/40 dark:shadow-black/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="absolute top-0 right-0 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="space-y-4 max-w-3xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800/60">
            <IconComponent className="w-4 h-4 shrink-0" />
            Topical Cluster Hub
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
            {hub.title}
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-medium">
            {hub.tagline}
          </p>
          <div className="text-sm text-zinc-500 dark:text-zinc-500 leading-relaxed border-l-2 border-violet-500/40 pl-4 py-1">
            <strong>Target Search Intent:</strong> {hub.intent}
          </div>
        </div>

        {/* Big Decorative Icon Box */}
        <div className="hidden lg:flex w-24 h-24 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 items-center justify-center text-violet-500 dark:text-violet-400 shrink-0 shadow-inner">
          <IconComponent className="w-12 h-12" />
        </div>
      </div>

      {/* AdSense Top Banner */}
      <AdSensePlaceholder type="top-banner" />

      {/* Handcrafted Cluster Overview and Blueprints */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Core Description Copy */}
        <div className="lg:col-span-8 space-y-8 text-left">
          <section className="space-y-4 p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-violet-500" />
              Cluster Blueprint &amp; Authority Guide
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
              {hub.description}
            </p>
            <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
              Naming architecture is not simply about aesthetic string concatenation; it acts as a central node in digital graph schemas. Consistent semantic identifiers across platforms establish clear signals, preventing namespace confusion and reducing search query friction. Explore our curated selection of high-performance generators, professional tutorials, and alternative variants compiled below.
            </p>
          </section>

          {/* Strategic Quick Tips */}
          <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-tr from-violet-50/50 to-indigo-50/50 dark:from-violet-950/10 dark:to-indigo-950/10 border border-violet-100 dark:border-violet-900/30 space-y-4">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-2 uppercase tracking-wide text-xs">
              <BookmarkCheck className="w-4 h-4 text-violet-500" />
              Strategic Blueprint Tips
            </h3>
            <ul className="space-y-3">
              {hub.quickTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="text-violet-500 font-bold shrink-0">0{i + 1}.</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Hub Navigation Tabs */}
          <div className="border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-2 pt-4">
            <button
              onClick={() => setActiveTab("generators")}
              className={`pb-3 px-4 text-xs font-extrabold uppercase tracking-wider border-b-2 cursor-pointer transition-all ${
                activeTab === "generators"
                  ? "border-violet-600 text-violet-600 dark:text-violet-400"
                  : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-350"
              }`}
            >
              Curated Generators ({hubGenerators.length})
            </button>
            <button
              onClick={() => setActiveTab("articles")}
              className={`pb-3 px-4 text-xs font-extrabold uppercase tracking-wider border-b-2 cursor-pointer transition-all ${
                activeTab === "articles"
                  ? "border-violet-600 text-violet-600 dark:text-violet-400"
                  : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-350"
              }`}
            >
              Strategic Guides ({hubArticles.length})
            </button>
            {hubProgrammaticConfigs.length > 0 && (
              <button
                onClick={() => setActiveTab("directory")}
                className={`pb-3 px-4 text-xs font-extrabold uppercase tracking-wider border-b-2 cursor-pointer transition-all ${
                  activeTab === "directory"
                    ? "border-violet-600 text-violet-600 dark:text-violet-400"
                    : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-350"
                }`}
              >
                Platform Variants ({hubProgrammaticConfigs.length})
              </button>
            )}
          </div>

          {/* Tab 1: Curated Generators */}
          {activeTab === "generators" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-200">
              {hubGenerators.map((tool) => (
                <div 
                  key={tool.id} 
                  className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-violet-500/30 hover:shadow-lg dark:hover:shadow-black/20 transition-all text-left flex flex-col justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                      {tool.name}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-450 text-xs leading-relaxed line-clamp-2">
                      Secure a custom, high-recall name using our {tool.name.toLowerCase()} engine, pre-optimized with appropriate syllable rules.
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate(tool.path)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors w-fit cursor-pointer"
                  >
                    Open Generator
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Strategic Guides (Articles) */}
          {activeTab === "articles" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {hubArticles.length === 0 ? (
                <div className="py-12 text-center text-zinc-400 dark:text-zinc-600 text-sm">
                  No blog articles available under this cluster yet. Stay tuned for expert insights!
                </div>
              ) : (
                hubArticles.map((article) => (
                  <div 
                    key={article.slug} 
                    className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-violet-500/20 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left"
                  >
                    <div className="space-y-1">
                      <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-zinc-500 dark:text-zinc-450 text-xs line-clamp-2">
                        {article.metaDescription}
                      </p>
                    </div>
                    <button
                      onClick={() => onNavigate(`/blog/${article.slug}`)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-xs font-bold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-850 hover:bg-zinc-100 cursor-pointer transition-all whitespace-nowrap self-end sm:self-center"
                    >
                      Read Guide
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 3: Platform Variants Directory (Eliminates Orphans) */}
          {activeTab === "directory" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Directory search filter */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  value={directorySearch}
                  onChange={(e) => {
                    setDirectorySearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search variant landing pages..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all text-zinc-800 dark:text-zinc-200 font-semibold"
                />
              </div>

              {filteredDirectory.length === 0 ? (
                <div className="py-12 text-center text-zinc-400 dark:text-zinc-600 text-sm">
                  No matching variant landing pages found. Try adjusting your query.
                </div>
              ) : (
                <>
                  {/* Grid list of alternative landing pages */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                    {paginatedDirectory.map((config) => (
                      <a
                        key={config.path}
                        href={config.path}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(config.path);
                        }}
                        className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 hover:border-violet-500/25 hover:bg-violet-500/[0.01] transition-all flex items-center justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300 shadow-sm"
                      >
                        <span className="truncate pr-4">{config.keyword} Generator</span>
                        <ExternalLink className="w-3.5 h-3.5 text-zinc-400 hover:text-violet-500 transition-colors shrink-0" />
                      </a>
                    ))}
                  </div>

                  {/* Directory Paginator */}
                  {totalDirectoryPages > 1 && (
                    <div className="flex items-center justify-center gap-2 pt-4">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 disabled:opacity-40 hover:bg-zinc-50 transition-all cursor-pointer"
                      >
                        Previous
                      </button>
                      <span className="text-xs font-bold text-zinc-500 px-4">
                        Page {currentPage} of {totalDirectoryPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage((p) => Math.min(totalDirectoryPages, p + 1))}
                        disabled={currentPage === totalDirectoryPages}
                        className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 disabled:opacity-40 hover:bg-zinc-50 transition-all cursor-pointer"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Genuine Hub FAQs */}
          <section className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-850">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-violet-500" />
              Frequently Asked Questions (FAQs)
            </h3>
            <div className="space-y-4">
              {hub.faq.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-left">
                  <h4 className="text-sm font-extrabold text-zinc-800 dark:text-zinc-200 mb-2 flex items-start gap-1.5">
                    <span className="text-violet-500 font-bold shrink-0">Q:</span>
                    {item.question}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed pl-5">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar Area */}
        <div className="lg:col-span-4 space-y-6 text-left">
          
          {/* Quick Hub Navigation Cards */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
            <h4 className="text-xs font-extrabold text-zinc-400 uppercase tracking-widest pb-2 border-b border-zinc-100 dark:border-zinc-850">
              Browse Other Hubs
            </h4>
            <div className="space-y-2">
              {HUBS.filter((h) => h.path !== currentPath).map((h) => {
                const HubIcon = h.icon;
                return (
                  <button
                    key={h.id}
                    onClick={() => onNavigate(h.path)}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-900 border border-zinc-100 dark:border-zinc-850 hover:border-violet-500/20 text-xs font-bold text-zinc-700 dark:text-zinc-350 transition-all cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <HubIcon className="w-4 h-4 text-violet-500" />
                      {h.title.split(" Naming")[0].split(" Hub")[0]}
                    </span>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Action Block */}
          <div className="p-6 rounded-2xl bg-gradient-to-tr from-violet-600/15 to-indigo-600/15 border border-violet-500/20 space-y-4 text-center">
            <h4 className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-500" />
              Claim Your Profile
            </h4>
            <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
              Launch our primary generator to create fully customized names that match your seed keyword and platform requirements instantly.
            </p>
            <button
              onClick={() => onNavigate("/username-generator")}
              className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              Launch Generator
            </button>
          </div>

          {/* AdSense Sidebar Block */}
          <AdSensePlaceholder type="in-feed" />

        </div>

      </div>

    </div>
  );
}
