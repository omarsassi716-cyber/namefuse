import React from "react";
import { ArrowRight, BookOpen, Layers } from "lucide-react";
import { blogArticles } from "../blogData";
import { tools } from "../toolsConfig";
import { trackRelatedGeneratorClicked, trackRelatedArticleClicked } from "../lib/analytics";

interface RelatedDashboardProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  language: string;
}

export default function RelatedDashboard({
  currentPath,
  onNavigate,
  language
}: RelatedDashboardProps) {
  // 1. Find current tool
  const currentTool = tools.find((t) => t.path === currentPath) || tools[0];

  // 2. Map current tool to blog category
  let matchedCategory = "social";
  const toolId = currentTool.id;
  if (["gamertag", "clan", "guild", "gaming", "fortnite", "roblox", "minecraft"].some(s => toolId.includes(s))) {
    matchedCategory = "gaming";
  } else if (["brand", "business", "startup", "company", "corporate", "team"].some(s => toolId.includes(s))) {
    matchedCategory = "business";
  } else if (["privacy", "security", "burner", "anonymous"].some(s => toolId.includes(s))) {
    matchedCategory = "security";
  } else if (["creative", "fantasy", "book", "character", "anime"].some(s => toolId.includes(s))) {
    matchedCategory = "creative";
  }

  // 3. Find 3 related blog articles
  const relatedArticles = blogArticles
    .filter((a) => a.category === matchedCategory)
    .slice(0, 3);

  // 4. Find 4 related generators (excluding current, prioritizing same categories if any)
  const relatedTools = tools
    .filter((t) => t.path !== currentPath)
    .slice(0, 4);

  const handleToolClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    // Find clicked tool name
    const clickedTool = tools.find((t) => t.path === path);
    if (clickedTool) {
      trackRelatedGeneratorClicked({
        current_path: currentPath,
        target_path: path,
        generator_name: clickedTool.name,
      });
    }

    onNavigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleArticleClick = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();

    // Find clicked article details
    const clickedArticle = blogArticles.find((a) => a.slug === slug);
    if (clickedArticle) {
      trackRelatedArticleClicked({
        current_path: currentPath,
        article_id: clickedArticle.id,
        article_title: clickedArticle.title,
      });
    }

    onNavigate(`/blog/${slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hubInfo = (() => {
    switch (matchedCategory) {
      case "gaming":
        return { name: "Gaming & Esports Naming Hub", path: "/gaming-naming-hub" };
      case "social":
        return { name: "Social Media & Creator Hub", path: "/social-media-naming-hub" };
      case "business":
        return { name: "Brand & Business Naming Hub", path: "/business-brand-naming-hub" };
      case "security":
        return { name: "Privacy & Security Naming Hub", path: "/privacy-security-naming-hub" };
      case "creative":
        return { name: "Creative Writing & Fantasy Hub", path: "/creative-fantasy-naming-hub" };
      default:
        return null;
    }
  })();

  return (
    <section id="related-dashboard-section" className="py-16 border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Hub Banner Callout */}
        {hubInfo && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-violet-600/[0.03] to-indigo-600/[0.03] dark:from-violet-950/10 dark:to-indigo-950/10 border border-violet-500/10 dark:border-violet-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-left">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest block">
                Topical Authority Hub
              </span>
              <p className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100">
                This tool is part of our comprehensive, strategic <span className="text-violet-600 dark:text-violet-400">{hubInfo.name}</span>.
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Discover masterclass branding blueprints, platform algorithms, specialized sub-generators, and privacy strategies.
              </p>
            </div>
            <button
              onClick={() => {
                onNavigate(hubInfo.path);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-md transition-all whitespace-nowrap cursor-pointer shrink-0"
            >
              Explore Hub Series
            </button>
          </div>
        )}

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Column 1: Related Generators (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 uppercase tracking-wider mb-3">
                <Layers className="w-3 h-3" />
                <span>Explore More</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
                Related Generators
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1.5 leading-relaxed font-medium">
                Need handles for other profiles? Try these specialized naming engines designed for alternate platforms and aesthetics.
              </p>
            </div>

            <div className="space-y-3">
              {relatedTools.map((t) => {
                const Icon = t.icon;
                return (
                  <a
                    id={`related-tool-card-${t.id}`}
                    key={t.id}
                    href={t.path}
                    onClick={(e) => handleToolClick(t.path, e)}
                    className="flex items-center justify-between p-4 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="p-2 rounded-lg bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-150 dark:border-zinc-800 shrink-0">
                        <Icon className="w-4 h-4 group-hover:text-violet-500 transition-colors" />
                      </div>
                      <div className="text-left min-w-0">
                        <span className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-0.5">{t.name}</span>
                        <span className="block text-[10px] text-zinc-400 dark:text-zinc-500 truncate">{t.description}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-300 group-hover:text-violet-500 group-hover:translate-x-1 transition-all shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Related Articles (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 uppercase tracking-wider mb-3">
                <BookOpen className="w-3 h-3" />
                <span>Expert Insights</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
                Strategic Naming Guides
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1.5 leading-relaxed font-medium">
                Deep dive into the psychology of modern digital naming, algorithm trends, trademark issues, and brand safety.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedArticles.map((art) => (
                <a
                  id={`related-article-card-${art.id}`}
                  key={art.id}
                  href={`/blog/${art.slug}`}
                  onClick={(e) => handleArticleClick(art.slug, e)}
                  className="flex flex-col p-4 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all group cursor-pointer"
                >
                  <span className="text-[9px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider mb-2 block">{art.category}</span>
                  <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-snug group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors mb-2 line-clamp-3">
                    {art.title}
                  </h4>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 line-clamp-4 leading-relaxed mb-4 mt-auto">
                    {art.metaDescription}
                  </p>
                  <div className="flex items-center justify-between text-[9px] font-semibold text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-900 pt-3 mt-auto">
                    <span>{art.readTime} read</span>
                    <span className="flex items-center gap-0.5 group-hover:text-violet-500 transition-colors font-bold">
                      Read Guide <ArrowRight className="w-2.5 h-2.5 animate-pulse" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
