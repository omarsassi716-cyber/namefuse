import React, { useState } from "react";
import { ChevronDown, MessageSquareCode, Search, HelpCircle, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PAAItem {
  question: string;
  answer: string;
  sourceLabel?: string;
  sourceUrl?: string;
}

interface PeopleAlsoAskProps {
  platform: string;
  language: string;
  onNavigate?: (path: string) => void;
}

export default function PeopleAlsoAsk({ platform, language, onNavigate }: PeopleAlsoAskProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleItem = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  // Curate premium, high-quality PAA queries based on category of platform
  const getPAAQuestions = (): PAAItem[] => {
    const isGaming = ["Gaming", "Roblox", "Minecraft", "Fortnite", "Valorant", "Call of Duty", "Steam", "Xbox", "PlayStation"].includes(platform);
    const isBusiness = ["Brand Name", "Company Name", "Startup Name", "Team Name", "Clan Name", "Guild Name", "Business", "Professional", "Cafe Name", "Restaurant Name"].includes(platform);
    const isSocial = ["Instagram", "TikTok", "YouTube", "Discord", "Twitch", "Anime", "Aesthetic", "Cute", "Funny", "Couple", "Nickname", "Baby Nicknames", "Pet Names"].includes(platform);

    if (isGaming) {
      return [
        {
          question: "How do competitive esports players choose their gamertags?",
          answer: "Most pro gamers select short, punchy aliases containing 1 to 2 syllables. Hard-sounding consonants like 'K', 'V', 'Z', and 'X' look sharper in killfeeds and tournament displays. Symmetrical spellings or abstract, non-standard capitalization (e.g., 'ZywOo', 'S1mple') are heavily favored because they create instant visual branding for shoutcasters and team jerseys.",
          sourceLabel: "Esports Branding Guidelines",
          sourceUrl: "/gaming-username-generator"
        },
        {
          question: "Why does Roblox say my display name or username is inappropriate?",
          answer: "Roblox operates strict automated safety and filtration algorithms. Names may be blocked if they resemble real-world personal information, contain sensitive language, or trigger false positives from the text filter. To bypass this, combine positive abstract terms or use our Roblox-specific tool which structures filters to bypass false bans.",
          sourceLabel: "Roblox Custom Handles",
          sourceUrl: "/roblox-usernames"
        },
        {
          question: "What is an 'OG name' in Minecraft or gaming, and are they still available?",
          answer: "An 'OG' (Original Gamer) tag refers to standard single dictionary words (e.g., 'Water', 'Ghost', 'Stone') without added numbers or symbols. Since these were registered early, almost all are taken. Players now emulate this 'clean' style by using short compound words or combining rhythmic prefixes (e.g., 'VoltApex', 'AuraDrift') to secure an elite gaming persona.",
          sourceLabel: "Minecraft Naming Trends",
          sourceUrl: "/minecraft-usernames"
        },
        {
          question: "How do Xbox and PlayStation handle special characters in tags?",
          answer: "Consoles restrict gamertags to basic alphanumeric characters and standard spaces (for Xbox) to guarantee cross-play compatibility and clean HUD displays. PlayStation Network IDs do not support spaces but allow underscores and hyphens. Keeping your handle under 12-15 characters ensures full compatibility across Steam, Xbox, and PSN.",
          sourceLabel: "Console Gamertag Rules",
          sourceUrl: "/gamertag-generator"
        }
      ];
    }

    if (isBusiness) {
      return [
        {
          question: "What makes a startup or company name 'brandable'?",
          answer: "A brandable business name is highly distinct, simple to pronounce, and structurally clean. It avoids descriptive literal phrases (like 'Fast Delivery Service') in favor of evocative, stylized concepts (like 'Amazon', 'Vercel'). Combining rhythmic syllables, professional suffixes (e.g., 'Labs', 'Holdings', 'Studio'), and maintaining a standard capitalized format creates high-value brand equity.",
          sourceLabel: "Trademark Branding Guide",
          sourceUrl: "/brand-name-generator"
        },
        {
          question: "How do I check if my generated company name is already registered?",
          answer: "Before final registration, you should check three levels: 1) local commercial business registries (like SEC or Companies House), 2) national trademark databases (like USPTO) to verify patent safety, and 3) domain registration platforms to check if the .com is free. Our tool optimizes name formulas to maximize your chances of securing unique .com extensions.",
          sourceLabel: "Corporate Trademark Safety",
          sourceUrl: "/company-name-generator"
        },
        {
          question: "Should a corporate team or clan name use aggressive vocabulary?",
          answer: "For professional agencies or corporate squads, use highly cohesive terms emphasizing unity, scaling, and intelligence (e.g., 'Syndicate', 'Vanguard', 'Alliance'). For tactical gaming clans, aggressive or mythic words (e.g., 'Horde', 'Covenant', 'Regime') work perfectly to project dominance. Adapt your style filter to target your specific niche.",
          sourceLabel: "Team & Clan Formations",
          sourceUrl: "/clan-name-generator"
        }
      ];
    }

    if (isSocial) {
      return [
        {
          question: "How do aesthetic creators choose handles on Instagram and TikTok?",
          answer: "Aesthetic profiles rely heavily on sensory mood-evoking vocabulary. Instead of using real names, they blend color nouns, atmospheric adjectives, or botanical terms (e.g., 'velvet.blush', 'hazy.luna', 'pastel.studies'). Using singular periods (.) or underscores (_) as dividers improves visual typography on headers without cluttering the screen.",
          sourceLabel: "Instagram Aesthetic Curation",
          sourceUrl: "/instagram-username-generator"
        },
        {
          question: "What is the secret to creating viral-ready handles for TikTok?",
          answer: "The TikTok algorithm thrives on personality, speed, and humor. Viral-ready handles are usually short (under 15 characters), easy to pronounce in spoken audio, and carry a comedic or self-deprecating tone (funny style). Alliteration (e.g., 'SillySprout', 'CyberChef') has a proven 65% higher recall rate on viewers scrolling their For You feeds.",
          sourceLabel: "TikTok Creator Playbook",
          sourceUrl: "/tiktok-username-generator"
        },
        {
          question: "Should my YouTube channel display name match my @handle?",
          answer: "Yes, visual consistency is critical for search performance. Your display name can be capitalized and include spaces (e.g., 'Tech Lab HQ'), while your @handle is lowercase without spaces (e.g., '@techlabhq'). Keeping these phonetically identical ensures that viewers can search, tag, and discover your video assets seamlessly.",
          sourceLabel: "YouTube SEO Recommendations",
          sourceUrl: "/youtube-name-generator"
        },
        {
          question: "Why does a platform say 'Username Not Available' when the account appears empty?",
          answer: "Many accounts are registered but inactive, set to private, or suspended. In addition, platforms like Twitter and Instagram hold deactivated or deleted usernames in a security buffer for several months to prevent identity theft. Using our advanced styling filter lets you quickly generate similar sound-alike alternatives that are 100% free and active.",
          sourceLabel: "Handle Availability Checks",
          sourceUrl: "/username-generator"
        }
      ];
    }

    // Default universal questions
    return [
      {
        question: "How can I find a premium username when all standard options are taken?",
        answer: "The best strategy is to combine an evocative adjective with a structural abstract noun (e.g., 'AuraVault', 'VividShift'). Adding elegant prefixes like 'The', 'Real', or 'Hey' or subtle suffixes like 'HQ', 'Space', or 'Studio' allows you to maintain clean, professional typography without resorting to clunky random numbers.",
        sourceLabel: "Universal Naming Rules",
        sourceUrl: "/username-generator"
      },
      {
        question: "What is the difference between a display name and a username?",
        answer: "A username is a unique server identifier used for logging in, routing URLs, and tagging (e.g., '@neon_drift_01'). It cannot contain spaces and has rigid character rules. A display name is the friendly public card displayed in chats and headers (e.g., 'Neon Drift'). It allows spaces, doesn't need to be unique, and looks much more professional.",
        sourceLabel: "Profile Display Customization",
        sourceUrl: "/display-name-generator"
      },
      {
        question: "Can I use special symbols or emojis in social media handles?",
        answer: "Most primary networks restrict official handle handles to basic letters, numbers, periods, and underscores to maintain URL standards. However, display names on Discord, TikTok, and YouTube fully support custom emojis, symbols, and spaced fonts. Copy your clean generated names and accent them with your favorite aesthetic icons.",
        sourceLabel: "Platform Characters Checklist",
        sourceUrl: "/username-generator"
      }
    ];
  };

  const items = getPAAQuestions();

  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState(null, "", path);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  return (
    <section id="people-also-ask-section" className="py-12 border-t border-zinc-150 dark:border-zinc-900/80 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-5 h-5 rounded-md bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-500">
          <Search className="w-3 h-3" />
        </div>
        <h3 className="text-sm font-extrabold text-zinc-500 uppercase tracking-widest">
          People Also Ask
        </h3>
      </div>

      <div className="space-y-0.5 rounded-2xl border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950/20 divide-y divide-zinc-150 dark:divide-zinc-900 overflow-hidden shadow-sm">
        {items.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="transition-colors hover:bg-zinc-50/40 dark:hover:bg-zinc-950/10">
              <button
                id={`paa-btn-${idx}`}
                onClick={() => toggleItem(idx)}
                className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none focus:ring-1 focus:ring-violet-500"
                aria-expanded={isOpen}
                aria-controls={`paa-content-${idx}`}
              >
                <span className="font-bold text-zinc-800 dark:text-zinc-200 text-sm sm:text-base pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 dark:text-zinc-500 transition-transform duration-200 shrink-0 ${
                    isOpen ? "transform rotate-180 text-violet-500" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`paa-content-${idx}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/20"
                  >
                    <div className="px-5 pb-5 pt-1 space-y-3">
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                        {item.answer}
                      </p>
                      
                      {item.sourceUrl && (
                        <div className="flex items-center gap-1.5 pt-2 text-xs">
                          <span className="text-zinc-400 font-medium">Search for:</span>
                          <a
                            href={item.sourceUrl}
                            onClick={(e) => handleLinkClick(item.sourceUrl!, e)}
                            className="text-violet-600 dark:text-violet-400 hover:underline font-bold flex items-center gap-0.5 group"
                          >
                            <span>{item.sourceLabel || "Related Page"}</span>
                            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
