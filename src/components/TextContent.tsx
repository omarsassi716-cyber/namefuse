import { CheckCircle, ArrowRight, Compass } from "lucide-react";

interface TextSection {
  title: string;
  paragraphs: string[];
}

interface TextContentProps {
  introduction: string;
  features: string[];
  sections: TextSection[];
  platformName: string;
  onNavigate?: (path: string) => void;
}

const relatedCategories = [
  {
    title: "Social Media Generators",
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
    title: "Styles & Aesthetics",
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
    title: "Gaming & Esports",
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
    title: "Business & Startup",
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

export default function TextContent({ introduction, features, sections, platformName, onNavigate }: TextContentProps) {
  return (
    <section id="guides-section" className="py-16 px-4 max-w-4xl mx-auto space-y-16">
      {/* Introduction */}
      <div className="prose prose-invert max-w-none">
        <p className="text-zinc-300 text-base sm:text-lg leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:text-violet-500 first-letter:mr-3 first-letter:float-left">
          {introduction}
        </p>
      </div>

      {/* Grid: Features Checklist */}
      <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80 shadow-inner relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/5 rounded-full blur-3xl pointer-events-none"></div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 rounded-full bg-violet-500"></span>
          Key Features of our {platformName} Generator
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-zinc-400">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Structured Copy Sections */}
      <div className="space-y-12">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-xs text-violet-500 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">
                0{idx + 1}
              </span>
              {section.title}
            </h2>
            <div className="space-y-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Internal Related Links Directory */}
      <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-900 space-y-6">
        <h3 className="text-base font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
          <Compass className="w-4 h-4 text-violet-500" />
          Explore Related Generators &amp; Resource Guides
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {relatedCategories.map((category, catIdx) => (
            <div key={catIdx} className="space-y-3">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-2">
                {category.title}
              </h4>
              <ul className="grid grid-cols-1 gap-2 text-sm">
                {category.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.path}
                      onClick={(e) => {
                        e.preventDefault();
                        if (onNavigate) {
                          onNavigate(link.path);
                        } else {
                          window.history.pushState(null, "", link.path);
                          window.dispatchEvent(new PopStateEvent("popstate"));
                        }
                      }}
                      className="text-zinc-500 hover:text-violet-400 transition-colors flex items-center gap-1.5 group/link"
                    >
                      <span className="w-1 h-1 rounded-full bg-zinc-700 group-hover/link:bg-violet-500 transition-colors"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Block */}
      <div className="p-8 rounded-2xl bg-gradient-to-tr from-zinc-900 to-zinc-950 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -left-12 -top-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="space-y-2 text-center md:text-left relative z-10">
          <h4 className="text-lg font-bold text-white">Found your signature handle?</h4>
          <p className="text-sm text-zinc-400">Be sure to register it on all platforms before someone else does!</p>
        </div>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            const input = document.getElementById("keyword-input");
            if (input) input.focus();
          }}
          className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-violet-600/20 flex items-center gap-2 group shrink-0 relative z-10"
        >
          Generate More Names
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </section>
  );
}
