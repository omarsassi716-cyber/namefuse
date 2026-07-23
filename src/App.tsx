import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { LazyMotion, domAnimation, motion } from "motion/react";
import { seoPages, SEOPageData } from "./seoData";
import { generateUsernames, generateDisplayNames } from "./generatorEngine";
import { tools, getToolForPath } from "./toolsConfig";

const Header = lazy(() => import("./components/Header"));
const Hero = lazy(() => import("./components/Hero"));
const UsernameResults = lazy(() => import("./components/UsernameResults"));
const FavoritesSidebar = lazy(() => import("./components/FavoritesSidebar"));
const TextContent = lazy(() => import("./components/TextContent"));
const FAQSection = lazy(() => import("./components/FAQSection"));
const AdSensePlaceholder = lazy(() => import("./components/AdSensePlaceholder"));

// Utility Pages
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./components/TermsOfService"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const Contact = lazy(() => import("./components/Contact"));

import { Sparkles, Gamepad2, Heart, HelpCircle, ArrowRight, ClipboardCopy, Star, Compass, RefreshCw } from "lucide-react";

export default function App() {
  const [currentPath, setCurrentPath] = useState("/username-generator");
  const [keyword, setKeyword] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("Universal");
  const [selectedStyle, setSelectedStyle] = useState("Cool");
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const activeTool = useMemo(() => {
    return getToolForPath(currentPath);
  }, [currentPath]);

  const isUtilityPage = useMemo(() => {
    return ["/privacy-policy", "/terms-of-service", "/contact", "/about-us"].includes(currentPath);
  }, [currentPath]);

  const generateNames = (kw: string, plat: string, sty: string, count: number = 50) => {
    if (activeTool.id === "display-name") {
      return generateDisplayNames(kw, plat, sty, count);
    }
    return generateUsernames(kw, plat, sty, count);
  };

  const handleLocationChange = React.useCallback(() => {
    let path = window.location.pathname;
    // Handle base path or trailing slashes
    if (path === "/" || path === "") {
      path = "/username-generator";
    }
    
    const isUtility = ["/privacy-policy", "/terms-of-service", "/contact", "/about-us"].includes(path);
    if (isUtility) {
      setCurrentPath(path);
      return;
    }

    // If path is valid in our SEO pages
    if (seoPages[path]) {
      setCurrentPath(path);
      const tool = getToolForPath(path);
      const platform = seoPages[path].platform;
      const style = seoPages[path].defaultStyle;
      
      // Ensure the platform and style exist in the active tool config, otherwise use defaults
      setSelectedPlatform(tool.platforms.includes(platform) ? platform : tool.defaultPlatform);
      setSelectedStyle(tool.styles.includes(style) ? style : tool.defaultStyle);
    } else {
      // Fallback to Universal generator if page is custom or invalid
      setCurrentPath("/username-generator");
      setSelectedPlatform("Universal");
      setSelectedStyle("Cool");
    }
  }, []);

  // Sync routing from URL
  useEffect(() => {
    // Listen to popstate (back/forward browser buttons)
    window.addEventListener("popstate", handleLocationChange);
    // Initial check
    handleLocationChange();

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, [handleLocationChange]);

  // Sync Favorites from LocalStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("namefuse_favorites");
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  // Generate initial usernames once platform & style defaults are resolved
  useEffect(() => {
    const names = generateNames("", selectedPlatform, selectedStyle, 50);
    setGeneratedNames(names);
  }, [selectedPlatform, selectedStyle, currentPath]);

  // Navigate helper
  const navigateTo = (path: string) => {
    window.history.pushState(null, "", path);
    setCurrentPath(path);
    
    const isUtility = ["/privacy-policy", "/terms-of-service", "/contact", "/about-us"].includes(path);
    if (!isUtility) {
      // Update platform & style configuration matching the target route
      const pageData = seoPages[path];
      const tool = getToolForPath(path);
      if (pageData) {
        const platform = tool.platforms.includes(pageData.platform) ? pageData.platform : tool.defaultPlatform;
        const style = tool.styles.includes(pageData.defaultStyle) ? pageData.defaultStyle : tool.defaultStyle;
        
        setSelectedPlatform(platform);
        setSelectedStyle(style);
        
        // Auto-trigger generation with the new settings & current keyword
        const names = tool.id === "display-name"
          ? generateDisplayNames(keyword, platform, style, 50)
          : generateUsernames(keyword, platform, style, 50);
        setGeneratedNames(names);
      }
    }
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsGenerating(true);
    
    // Simulate slight organic lag for a premium feel
    setTimeout(() => {
      const names = generateNames(keyword, selectedPlatform, selectedStyle, 50);
      setGeneratedNames(names);
      setIsGenerating(false);
      
      // Scroll to results section
      const resultsSection = document.getElementById("results-anchor");
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 400);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const names = generateNames(keyword, selectedPlatform, selectedStyle, 50);
      setGeneratedNames(names);
      setIsGenerating(false);
    }, 400);
  };

  const handleLoadMore = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const additionalNames = generateNames(keyword, selectedPlatform, selectedStyle, 50);
      // Filter out duplicates
      const uniqueAdditional = additionalNames.filter(name => !generatedNames.includes(name));
      setGeneratedNames((prev) => [...prev, ...uniqueAdditional]);
      setIsGenerating(false);
    }, 400);
  };

  const handleToggleFavorite = (name: string) => {
    let updated: string[];
    if (favorites.includes(name)) {
      updated = favorites.filter((fav) => fav !== name);
    } else {
      updated = [...favorites, name];
    }
    setFavorites(updated);
    localStorage.setItem("namefuse_favorites", JSON.stringify(updated));
  };

  const handleClearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("namefuse_favorites");
  };

  const handleRemoveFavorite = (name: string) => {
    const updated = favorites.filter((fav) => fav !== name);
    setFavorites(updated);
    localStorage.setItem("namefuse_favorites", JSON.stringify(updated));
  };

  // Get active Tool and SEO Page Data
  const pageData = useMemo<SEOPageData>(() => {
    return seoPages[currentPath] || seoPages["/username-generator"];
  }, [currentPath]);

  // Update document title, meta description, canonical link, and JSON-LD structured data on route change
  useEffect(() => {
    const isUtility = ["/privacy-policy", "/terms-of-service", "/contact", "/about-us"].includes(currentPath);
    
    let title = "";
    let desc = "";
    let h1 = "";
    
    if (isUtility) {
      if (currentPath === "/privacy-policy") {
        title = "Privacy Policy | NameFuse - Unique Username Generator";
        desc = "Read our comprehensive Privacy Policy. Learn how we handle your data, our cookie usage, and our AdSense ad serving policies.";
        h1 = "Privacy Policy";
      } else if (currentPath === "/terms-of-service") {
        title = "Terms of Service | NameFuse - Unique Username Generator";
        desc = "Read our Terms of Service. Understand the rules, disclaimer guidelines, and legal terms for using our free username generator.";
        h1 = "Terms of Service";
      } else if (currentPath === "/contact") {
        title = "Contact Us | NameFuse - Unique Username Generator";
        desc = "Get in touch with the NameFuse support team. Send your feedback, technical bug reports, or feature requests.";
        h1 = "Contact Us";
      } else if (currentPath === "/about-us") {
        title = "About Us | NameFuse - Unique Username Generator";
        desc = "Learn more about the mission, values, and procedural engine design behind NameFuse's unique username generators.";
        h1 = "About Us";
      }
    } else {
      const page = seoPages[currentPath] || seoPages["/username-generator"];
      title = page.metaTitle;
      desc = page.metaDescription;
      h1 = page.h1;
    }

    document.title = title;

    const metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    if (metaDescription) {
      metaDescription.setAttribute("content", desc);
    }

    // Canonical URL
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href =
      "https://namefuse.com" + currentPath;

    // JSON-LD Structured Data
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: h1,
      description: desc,
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      url: "https://namefuse.com" + currentPath,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD"
      }
    };

    let script = document.getElementById(
      "jsonld-schema"
    ) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "jsonld-schema";
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(schema);
  }, [currentPath]);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-violet-500/30 selection:text-violet-200">
      
      {/* Premium Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      <main className="flex-grow">
        {/* Top AdSense Banner */}
        <div className="container mx-auto px-4 pt-4">
          <AdSensePlaceholder type="top-banner" />
        </div>

        {isUtilityPage ? (
          <div className="pt-20 md:pt-28 pb-10">
            {currentPath === "/privacy-policy" && <PrivacyPolicy />}
            {currentPath === "/terms-of-service" && <TermsOfService />}
            {currentPath === "/about-us" && <AboutUs />}
            {currentPath === "/contact" && <Contact />}
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <Hero
              h1={pageData.h1}
              subtitle={pageData.subtitle}
              platform={pageData.platform}
            />

            {/* Core Generator Module */}
            <section id="generator-interface" className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm p-6 sm:p-8 shadow-2xl shadow-black relative overflow-hidden">
                {/* Visual background gradient glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/5 rounded-full blur-[80px] pointer-events-none"></div>
                
                <form onSubmit={handleGenerate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Keyword Input */}
                    <div className="md:col-span-1 space-y-2">
                      <label htmlFor="keyword-input" className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                        {["brand-name", "business-name", "startup-name", "company-name"].includes(activeTool.id) ? "Enter Concept" : "Enter Keyword"} <span className="text-zinc-600 font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <input
                          id="keyword-input"
                          type="text"
                          maxLength={20}
                          value={keyword}
                          onChange={(e) => setKeyword(e.target.value)}
                          placeholder={activeTool.placeholder}
                          className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 text-zinc-100 placeholder-zinc-600 text-sm font-medium transition-all focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Platform/Category Selector */}
                    <div className="space-y-2">
                      <label htmlFor="platform-select" className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                        {["brand-name", "business-name", "startup-name", "company-name", "team-name"].includes(activeTool.id) ? "Target Category" : "Target Platform"}
                      </label>
                      <select
                        id="platform-select"
                        value={selectedPlatform}
                        onChange={(e) => setSelectedPlatform(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 text-zinc-200 text-sm font-semibold transition-all focus:outline-none cursor-pointer"
                      >
                        {activeTool.platforms.map((plat) => (
                          <option key={plat} value={plat}>
                            {plat} {["brand-name", "business-name", "startup-name", "company-name"].includes(activeTool.id) ? (plat === "Universal" ? "" : "Category") : (plat !== "Universal" && plat !== "Gaming" ? "Handles" : "")}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Style Selector */}
                    <div className="space-y-2">
                      <label htmlFor="style-select" className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                        Vibe &amp; Style
                      </label>
                      <select
                        id="style-select"
                        value={selectedStyle}
                        onChange={(e) => setSelectedStyle(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 text-zinc-200 text-sm font-semibold transition-all focus:outline-none cursor-pointer"
                      >
                        {activeTool.styles.map((sty) => (
                          <option key={sty} value={sty}>
                            {sty} Preset
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-zinc-500 text-center sm:text-left max-w-sm">
                      Names are formatted automatically according to chosen platform length limits and valid symbols.
                    </p>
                    <button
                      id="generate-names-btn"
                      type="submit"
                      disabled={isGenerating}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Weaving formulas...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-violet-200" />
                          {activeTool.generateButtonText}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </section>

            {/* Results Section anchor */}
            <div id="results-anchor" className="scroll-mt-24"></div>

            {/* Results Render */}
            {generatedNames.length > 0 && (
              <section id="results-section" className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
                <UsernameResults
                  usernames={generatedNames}
                  platform={selectedPlatform}
                  style={selectedStyle}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  onRegenerate={handleRegenerate}
                  onLoadMore={handleLoadMore}
                  isGenerating={isGenerating}
                  resultLabel={activeTool.resultLabel}
                />
              </section>
            )}

            {/* SEO Text Content Section */}
            <TextContent
              introduction={pageData.introduction}
              features={pageData.features}
              sections={pageData.sections}
              platformName={pageData.platform}
              onNavigate={navigateTo}
            />

            {/* FAQ Accordion Section */}
            <FAQSection faqs={pageData.faqs} />
          </>
        )}

        {/* Footer AdSpace */}
        <div className="container mx-auto px-4 py-6">
          <AdSensePlaceholder type="footer-banner" />
        </div>
      </main>

      {/* Slide-out Favorites Drawer Sidebar */}
      <FavoritesSidebar
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorite}
        onClearAll={handleClearFavorites}
      />

      {/* Beautiful Footer */}
      <footer id="app-footer" className="border-t border-zinc-900 bg-zinc-950/60 pt-16 pb-8 text-zinc-500 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Brand column */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-base font-bold text-zinc-200 tracking-tight">
                  NameFuse
                </span>
              </div>
              <p className="text-zinc-400 leading-relaxed max-w-sm text-xs sm:text-sm">
                NameFuse is a free, pro-grade online username generator designed for creators, gamers, and brands.
                Generate memorable, brandable handles that reflect your unique digital presence instantly.
              </p>
            </div>

            {/* Column 1: Social & Gaming Generators */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest">
                Profiles &amp; Gaming
              </h4>
              <ul className="space-y-2">
                {tools
                  .filter((t) => ["username", "display-name", "nickname", "gamertag", "clan", "guild"].includes(t.id))
                  .map((t) => (
                    <li key={t.id}>
                      <a
                        href={t.path}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo(t.path);
                        }}
                        className="hover:text-violet-400 transition-colors text-xs sm:text-sm"
                      >
                        {t.name}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Column 2: Branding & Corporate Generators */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest">
                Business &amp; Brands
              </h4>
              <ul className="space-y-2">
                {tools
                  .filter((t) => ["brand-name", "business-name", "startup-name", "company-name", "team-name"].includes(t.id))
                  .map((t) => (
                    <li key={t.id}>
                      <a
                        href={t.path}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo(t.path);
                        }}
                        className="hover:text-violet-400 transition-colors text-xs sm:text-sm"
                      >
                        {t.name}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
            
          </div>

          <div className="border-t border-zinc-900/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600 text-xs">
            <p>© 2026 NameFuse Username Generator. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a
                href="/about-us"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/about-us");
                }}
                className="hover:text-zinc-400 transition-colors"
              >
                About Us
              </a>
              <span>•</span>
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/contact");
                }}
                className="hover:text-zinc-400 transition-colors"
              >
                Contact Us
              </a>
              <span>•</span>
              <a
                href="/privacy-policy"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/privacy-policy");
                }}
                className="hover:text-zinc-400 transition-colors"
              >
                Privacy Policy
              </a>
              <span>•</span>
              <a
                href="/terms-of-service"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/terms-of-service");
                }}
                className="hover:text-zinc-400 transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </Suspense>
  );
}
