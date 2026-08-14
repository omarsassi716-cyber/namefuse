import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from "react";
import { LazyMotion, domAnimation, motion, AnimatePresence } from "motion/react";
import { seoPages } from "./seoData";
import { generateUsernames, generateDisplayNames } from "./generatorEngine";
import { tools, getToolForPath } from "./toolsConfig";
import { getLocalizedSEOContent, uiTranslations } from "./translations";
import { getArticleBySlug, BLOG_CATEGORIES, BLOG_AUTHORS } from "./blogData";

import Header from "./components/Header";
import Hero from "./components/Hero";
import UsernameResults from "./components/UsernameResults";
const FavoritesSidebar = lazy(() => import("./components/FavoritesSidebar"));
const TextContent = lazy(() => import("./components/TextContent"));
const PeopleAlsoAsk = lazy(() => import("./components/PeopleAlsoAsk"));
const FAQSection = lazy(() => import("./components/FAQSection"));
const RelatedDashboard = lazy(() => import("./components/RelatedDashboard"));
const AdSensePlaceholder = lazy(() => import("./components/AdSensePlaceholder"));
const ConsentBanner = lazy(() => import("./components/ConsentBanner"));

import { 
  trackGeneratorStarted, 
  trackNameGenerated, 
  trackResultFavorited, 
  trackRegenerateClicked,
  trackRelatedGeneratorClicked,
  trackRelatedArticleClicked
} from "./lib/analytics";

// Utility Pages
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./components/TermsOfService"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const Contact = lazy(() => import("./components/Contact"));
const BlogSection = lazy(() => import("./components/BlogSection"));
const HubSection = lazy(() => import("./components/HubSection"));

import { Sparkles, Gamepad2, Heart, HelpCircle, ArrowRight, Star, RefreshCw, SlidersHorizontal } from "lucide-react";

const getTrendingSeeds = (platform: string): string[] => {
  switch (platform) {
    case "Instagram":
      return ["Aesthetic", "Travel", "Vibe", "Daily", "Style"];
    case "TikTok":
      return ["Glow", "Dance", "Vibe", "Tech", "Viral"];
    case "YouTube":
      return ["TV", "Studio", "Vlog", "Hub", "Gaming"];
    case "Gaming":
      return ["Slayer", "Sniper", "Phantom", "Vortex", "Apex"];
    case "Roblox":
      return ["Blox", "Shadow", "Galaxy", "Ninja", "Flame"];
    case "Minecraft":
      return ["Block", "Mine", "Craft", "Steve", "Void"];
    case "Fortnite":
      return ["Sniper", "Rage", "Clutch", "Storm", "Build"];
    case "Discord":
      return ["Chill", "Zone", "Nexus", "Aesthetic", "Wumpus"];
    default:
      return ["Creative", "Modern", "Aesthetic", "Tech", "Global"];
  }
};

export default function App() {
  const [currentPath, setCurrentPath] = useState("/username-generator");
  const [keyword, setKeyword] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("Universal");
  const [selectedStyle, setSelectedStyle] = useState("Cool");
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAiMode, setIsAiMode] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Advanced Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [minLength, setMinLength] = useState<number>(() => {
    return Number(localStorage.getItem("namefuse_filter_minLength") || "3");
  });
  const [maxLength, setMaxLength] = useState<number>(() => {
    return Number(localStorage.getItem("namefuse_filter_maxLength") || "18");
  });
  const [startsWith, setStartsWith] = useState<string>(() => {
    return localStorage.getItem("namefuse_filter_startsWith") || "";
  });
  const [endsWith, setEndsWith] = useState<string>(() => {
    return localStorage.getItem("namefuse_filter_endsWith") || "";
  });
  const [allowNumbers, setAllowNumbers] = useState<boolean>(() => {
    const saved = localStorage.getItem("namefuse_filter_allowNumbers");
    return saved === null ? true : saved === "true";
  });
  const [allowSymbols, setAllowSymbols] = useState<boolean>(() => {
    const saved = localStorage.getItem("namefuse_filter_allowSymbols");
    return saved === null ? true : saved === "true";
  });
  const [filterLanguage, setFilterLanguage] = useState<string>(() => {
    return localStorage.getItem("namefuse_filter_language") || "English";
  });

  // Persist advanced filter preferences in localStorage
  useEffect(() => {
    localStorage.setItem("namefuse_filter_minLength", String(minLength));
    localStorage.setItem("namefuse_filter_maxLength", String(maxLength));
    localStorage.setItem("namefuse_filter_startsWith", startsWith);
    localStorage.setItem("namefuse_filter_endsWith", endsWith);
    localStorage.setItem("namefuse_filter_allowNumbers", String(allowNumbers));
    localStorage.setItem("namefuse_filter_allowSymbols", String(allowSymbols));
    localStorage.setItem("namefuse_filter_language", filterLanguage);
  }, [minLength, maxLength, startsWith, endsWith, allowNumbers, allowSymbols, filterLanguage]);

  const getFiltersObject = () => {
    return {
      minLength,
      maxLength,
      startsWith: startsWith.trim(),
      endsWith: endsWith.trim(),
      allowNumbers,
      allowSymbols,
      language: filterLanguage
    };
  };

  const generateNames = (kw: string, plat: string, sty: string, count: number = 50) => {
    const filters = getFiltersObject();
    if (activeTool.id === "display-name") {
      return generateDisplayNames(kw, plat, sty, count, filters);
    }
    return generateUsernames(kw, plat, sty, count, filters);
  };

  // Initialize Language from URL prefix or local storage or default "en"
  const [language, setLanguage] = useState(() => {
    const path = window.location.pathname;
    const parts = path.split("/").filter(Boolean);
    if (parts.length > 0 && ["es", "fr", "de", "ar"].includes(parts[0])) {
      return parts[0];
    }
    const saved = localStorage.getItem("namefuse_language");
    return saved || "en";
  });

  // Initialize Theme (default "dark" to preserve original aesthetic, or "light" if preferred)
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("namefuse_theme");
    return (saved as "light" | "dark") || "dark";
  });

  // Persist language setting
  useEffect(() => {
    localStorage.setItem("namefuse_language", language);
  }, [language]);

  // Persist theme setting and set document class
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("namefuse_theme", theme);
  }, [theme]);

  // Manage RTL layouts and document language
  useEffect(() => {
    const isRtl = language === "ar";
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const t = uiTranslations[language] || uiTranslations.en;

  const activeTool = useMemo(() => {
    return getToolForPath(currentPath);
  }, [currentPath]);

  const isUtilityPage = useMemo(() => {
    return ["/privacy-policy", "/terms-of-service", "/contact", "/about-us"].includes(currentPath);
  }, [currentPath]);

  const isBlogPage = useMemo(() => {
    return currentPath === "/blog" || currentPath.startsWith("/blog/");
  }, [currentPath]);

  const isHubPage = useMemo(() => {
    return [
      "/gaming-naming-hub",
      "/social-media-naming-hub",
      "/business-brand-naming-hub",
      "/creative-fantasy-naming-hub",
      "/privacy-security-naming-hub"
    ].includes(currentPath);
  }, [currentPath]);

  const parsePath = (path: string) => {
    let cleanPath = path;
    if (cleanPath.endsWith("/") && cleanPath.length > 1) {
      cleanPath = cleanPath.slice(0, -1);
    }
    const parts = cleanPath.split("/").filter(Boolean);
    let lang = "en";
    if (parts.length > 0 && ["es", "fr", "de", "ar"].includes(parts[0])) {
      lang = parts[0];
      cleanPath = "/" + parts.slice(1).join("/");
    }
    if (cleanPath === "/" || cleanPath === "") {
      cleanPath = "/username-generator";
    }
    return { lang, cleanPath };
  };

  const handleLocationChange = React.useCallback(() => {
    const { lang, cleanPath } = parsePath(window.location.pathname);
    setLanguage(lang);
    
    const isUtility = ["/privacy-policy", "/terms-of-service", "/contact", "/about-us"].includes(cleanPath);
    const isBlog = cleanPath === "/blog" || cleanPath.startsWith("/blog/");
    const isHub = [
      "/gaming-naming-hub",
      "/social-media-naming-hub",
      "/business-brand-naming-hub",
      "/creative-fantasy-naming-hub",
      "/privacy-security-naming-hub"
    ].includes(cleanPath);
    if (isUtility || isBlog || isHub) {
      setCurrentPath(cleanPath);
      return;
    }

    if (seoPages[cleanPath]) {
      setCurrentPath(cleanPath);
      const tool = getToolForPath(cleanPath);
      const pageData = seoPages[cleanPath];
      const platform = pageData.platform;
      const style = pageData.defaultStyle;
      
      setSelectedPlatform(tool.platforms.includes(platform) ? platform : tool.defaultPlatform);
      setSelectedStyle(tool.styles.includes(style) ? style : tool.defaultStyle);
    } else {
      setCurrentPath("/username-generator");
      setSelectedPlatform("Universal");
      setSelectedStyle("Cool");
    }
  }, []);

  // Sync routing from URL
  useEffect(() => {
    window.addEventListener("popstate", handleLocationChange);
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
    if (!isUtilityPage && !isBlogPage && !isHubPage) {
      const names = generateNames("", selectedPlatform, selectedStyle, 50);
      setGeneratedNames(names);
    }
  }, [selectedPlatform, selectedStyle, currentPath]);

  // Navigate helper
  const navigateTo = useCallback((path: string) => {
    const { lang, cleanPath } = parsePath(path);
    setLanguage(lang);
    
    const targetPath = lang === "en" ? cleanPath : `/${lang}${cleanPath}`;
    window.history.pushState(null, "", targetPath);
    setCurrentPath(cleanPath);
    
    const isUtility = ["/privacy-policy", "/terms-of-service", "/contact", "/about-us"].includes(cleanPath);
    const isBlog = cleanPath === "/blog" || cleanPath.startsWith("/blog/");
    const isHub = [
      "/gaming-naming-hub",
      "/social-media-naming-hub",
      "/business-brand-naming-hub",
      "/creative-fantasy-naming-hub",
      "/privacy-security-naming-hub"
    ].includes(cleanPath);
    if (!isUtility && !isBlog && !isHub) {
      const pageData = seoPages[cleanPath];
      const tool = getToolForPath(cleanPath);
      if (pageData) {
        const platform = tool.platforms.includes(pageData.platform) ? pageData.platform : tool.defaultPlatform;
        const style = tool.styles.includes(pageData.defaultStyle) ? pageData.defaultStyle : tool.defaultStyle;
        
        setSelectedPlatform(platform);
        setSelectedStyle(style);
        
        const names = tool.id === "display-name"
          ? generateDisplayNames(keyword, platform, style, 50)
          : generateUsernames(keyword, platform, style, 50);
        setGeneratedNames(names);
      }
    }
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [keyword]);

  const fetchAiNames = async (kw: string, plat: string, sty: string, count: number = 50) => {
    const response = await fetch("/api/ai-generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        keyword: kw,
        platform: plat,
        style: sty,
        count,
        generatorType: activeTool.id,
        filters: getFiltersObject()
      })
    });
    
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || "Failed to generate names from Gemini AI.");
    }
    
    const data = await response.json();
    if (data.names && Array.isArray(data.names) && data.names.length > 0) {
      return data.names;
    }
    throw new Error("No names returned from Gemini AI.");
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsGenerating(true);
    setAiError(null);

    // Track analytics event: generator started
    trackGeneratorStarted({
      generator_type: activeTool.id,
      platform: selectedPlatform,
      style: selectedStyle,
      keyword_present: !!keyword.trim(),
    });
    
    if (isAiMode) {
      try {
        const names = await fetchAiNames(keyword, selectedPlatform, selectedStyle, 50);
        setGeneratedNames(names);
        setIsGenerating(false);

        // Track analytics event: name generated
        trackNameGenerated({
          generator_type: activeTool.id,
          platform: selectedPlatform,
          style: selectedStyle,
          count: names.length,
        });

        const resultsSection = document.getElementById("results-anchor");
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        return;
      } catch (err: any) {
        console.error("AI Generation failed, falling back to local:", err);
        setAiError(err.message || "Gemini AI currently offline. Used smart procedural engine instead!");
        setTimeout(() => setAiError(null), 7000);
      }
    }

    setTimeout(() => {
      const names = generateNames(keyword, selectedPlatform, selectedStyle, 50);
      setGeneratedNames(names);
      setIsGenerating(false);

      // Track analytics event: name generated (fallback / local)
      trackNameGenerated({
        generator_type: activeTool.id,
        platform: selectedPlatform,
        style: selectedStyle,
        count: names.length,
      });
      
      const resultsSection = document.getElementById("results-anchor");
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 400);
  };

  const handleRegenerate = async () => {
    setIsGenerating(true);
    setAiError(null);

    // Track analytics event: regenerate clicked
    trackRegenerateClicked({
      generator_type: activeTool.id,
      platform: selectedPlatform,
    });
    
    if (isAiMode) {
      try {
        const names = await fetchAiNames(keyword, selectedPlatform, selectedStyle, 50);
        setGeneratedNames(names);
        setIsGenerating(false);

        // Track analytics event: name generated
        trackNameGenerated({
          generator_type: activeTool.id,
          platform: selectedPlatform,
          style: selectedStyle,
          count: names.length,
        });

        return;
      } catch (err: any) {
        console.error("AI Regeneration failed, falling back to local:", err);
        setAiError(err.message || "Gemini AI currently offline. Used smart procedural engine instead!");
        setTimeout(() => setAiError(null), 7000);
      }
    }

    setTimeout(() => {
      const names = generateNames(keyword, selectedPlatform, selectedStyle, 50);
      setGeneratedNames(names);
      setIsGenerating(false);

      // Track analytics event: name generated (fallback / local)
      trackNameGenerated({
        generator_type: activeTool.id,
        platform: selectedPlatform,
        style: selectedStyle,
        count: names.length,
      });
    }, 400);
  };

  const handleLoadMore = async () => {
    setIsGenerating(true);
    setAiError(null);
    
    if (isAiMode) {
      try {
        const additionalNames = await fetchAiNames(keyword, selectedPlatform, selectedStyle, 50);
        const uniqueAdditional = additionalNames.filter(name => !generatedNames.includes(name));
        setGeneratedNames((prev) => [...prev, ...uniqueAdditional]);
        setIsGenerating(false);

        // Track analytics event: name generated
        trackNameGenerated({
          generator_type: activeTool.id,
          platform: selectedPlatform,
          style: selectedStyle,
          count: additionalNames.length,
        });

        return;
      } catch (err: any) {
        console.error("AI Load More failed, falling back to local:", err);
        setAiError(err.message || "Gemini AI currently offline. Used smart procedural engine instead!");
        setTimeout(() => setAiError(null), 7000);
      }
    }

    setTimeout(() => {
      const additionalNames = generateNames(keyword, selectedPlatform, selectedStyle, 50);
      const uniqueAdditional = additionalNames.filter(name => !generatedNames.includes(name));
      setGeneratedNames((prev) => [...prev, ...uniqueAdditional]);
      setIsGenerating(false);

      // Track analytics event: name generated (fallback / local)
      trackNameGenerated({
        generator_type: activeTool.id,
        platform: selectedPlatform,
        style: selectedStyle,
        count: additionalNames.length,
      });
    }, 400);
  };

  const handleToggleFavorite = useCallback((name: string) => {
    setFavorites((prev) => {
      let updated: string[];
      if (prev.includes(name)) {
        updated = prev.filter((fav) => fav !== name);
      } else {
        updated = [...prev, name];
        // Track result favorited
        trackResultFavorited({
          generator_type: activeTool.id,
          platform: selectedPlatform,
          name_length: name.length,
        });
      }
      localStorage.setItem("namefuse_favorites", JSON.stringify(updated));
      return updated;
    });
  }, [activeTool.id, selectedPlatform]);

  const handleClearFavorites = useCallback(() => {
    setFavorites([]);
    localStorage.removeItem("namefuse_favorites");
  }, []);

  // Client-side hreflang and dynamic SEO tags injection
  useEffect(() => {
    const oldTags = document.querySelectorAll("link[rel='alternate'][hreflang]");
    oldTags.forEach(t => t.remove());

    const getLocalizedHref = (langCode: string) => {
      const DOMAIN = "https://namefuse.vercel.app";
      if (langCode === "en") return `${DOMAIN}${currentPath}`;
      return `${DOMAIN}/${langCode}${currentPath}`;
    };

    const langs = ["en", "es", "fr", "de", "ar"];
    langs.forEach((langCode) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = langCode;
      link.href = getLocalizedHref(langCode);
      document.head.appendChild(link);
    });

    const xDefault = document.createElement("link");
    xDefault.rel = "alternate";
    xDefault.hreflang = "x-default";
    xDefault.href = getLocalizedHref("en");
    document.head.appendChild(xDefault);
  }, [currentPath]);

  // Compute page config and fallback details
  const pageData = useMemo(() => {
    if (isUtilityPage || isHubPage) return null;
    const basePage = seoPages[currentPath] || seoPages["/username-generator"];
    
    // Retrieve translated configurations
    const localized = getLocalizedSEOContent(basePage.platform, basePage.platform, basePage.defaultStyle, language);
    if (localized) {
      return {
        ...basePage,
        metaTitle: localized.metaTitle,
        metaDescription: localized.metaDescription,
        h1: localized.h1,
        subtitle: localized.subtitle,
        introduction: localized.introduction,
        features: localized.features
      };
    }
    return basePage;
  }, [currentPath, language, isUtilityPage]);

  // Update dynamic meta tags (title, description, canonical, structure tags)
  useEffect(() => {
    let title = "";
    let desc = "";
    let h1Text = "";
    let activePost: any = null;

    const parts = currentPath.split("/").filter(Boolean);

    if (isUtilityPage) {
      if (currentPath === "/privacy-policy") {
        title = t.privacyPolicy + " | NameFuse";
        desc = "Read the Privacy Policy of NameFuse. Learn how we handle your personal data and protect your transient generated username ideas.";
        h1Text = t.privacyPolicy;
      } else if (currentPath === "/terms-of-service") {
        title = t.termsOfService + " | NameFuse";
        desc = "Review the Terms of Service for using the NameFuse username generation engine and services.";
        h1Text = t.termsOfService;
      } else if (currentPath === "/about-us") {
        title = (t.aboutUs || "About Us") + " | NameFuse";
        desc = "Learn about NameFuse, our mission, our unique Procedural Syllables Engine, and our focus on generating readable and brandable usernames for creators and gamers.";
        h1Text = t.aboutUs || "About Us";
      } else if (currentPath === "/contact") {
        title = (t.contactUs || "Contact Us") + " | NameFuse";
        desc = "Get in touch with the NameFuse team. Submit feature suggestions, bug reports, partnerships, or ask questions about our username generator.";
        h1Text = t.contactUs || "Contact Us";
      }
    } else if (isHubPage) {
      if (currentPath === "/gaming-naming-hub") {
        title = "Gaming & Esports Naming Hub | Game Names & Clan Tags | NameFuse";
        desc = "Discover our comprehensive topical cluster for gamers, esports clans, and guild alliances. Get expert guides, tactical tags, and specialized naming engines.";
        h1Text = "Gaming & Esports Naming Hub";
      } else if (currentPath === "/social-media-naming-hub") {
        title = "Social Media & Creator Naming Hub | Custom Handles | NameFuse";
        desc = "Your primary center for modern digital branding. Learn algorithm strategies, cohesive profile name rules, and build viral handles.";
        h1Text = "Social Media & Creator Naming Hub";
      } else if (currentPath === "/business-brand-naming-hub") {
        title = "Business & Brand Naming Hub | Commercial Domain & Startup Names | NameFuse";
        desc = "Secure elite brandable business names, SaaS domains, trademark strategies, and creative boutique titles inside our strategic hub.";
        h1Text = "Business & Brand Naming Hub";
      } else if (currentPath === "/creative-fantasy-naming-hub") {
        title = "Creative Writing & Fantasy Roleplay Hub | Story & Character Names | NameFuse";
        desc = "Unleash immersive lore-friendly character names, mythical worldbuilding nomenclature, book titles, and medieval faction names.";
        h1Text = "Creative Writing & Fantasy Roleplay Hub";
      } else if (currentPath === "/privacy-security-naming-hub") {
        title = "Privacy & Security Naming Hub | Anonymous Burners & OSINT Defense | NameFuse";
        desc = "Learn crucial pseudonymity tricks, OSINT countermeasures, and choose secure anonymous burner aliases to protect your digital footprint.";
        h1Text = "Privacy & Security Naming Hub";
      }
    } else if (isBlogPage) {
      if (parts.length === 1 && parts[0] === "blog") {
        title = "NameFuse Strategy Blog | Mastering Digital Identity & Naming";
        desc = "Explore masterclass tutorials, branding secrets, and naming frameworks written by industry specialists to claim your perfect digital handles.";
        h1Text = "NameFuse Strategy Blog";
      } else if (parts.length > 1) {
        if (parts[1] === "category" && parts[2]) {
          const catId = parts[2];
          const catObj = BLOG_CATEGORIES.find(c => c.id === catId);
          const catName = catObj ? catObj.name : catId;
          title = `${catName} Guides & Insights | NameFuse Blog`;
          desc = catObj ? catObj.desc : `Explore expert tips and naming strategies about ${catName.toLowerCase()} on the NameFuse Strategy Blog.`;
          h1Text = `${catName} Guides`;
        } else if (parts[1] === "tag" && parts[2]) {
          const tagStr = parts[2];
          title = `Insights & Articles on #${tagStr} | NameFuse Blog`;
          desc = `Explore expert tips, guides, and naming tutorials focusing on #${tagStr} on the NameFuse Strategy Blog.`;
          h1Text = `#${tagStr} Insights`;
        } else if (parts[1] === "author" && parts[2]) {
          const authId = parts[2];
          const authObj = BLOG_AUTHORS[authId];
          const authName = authObj ? authObj.name : authId;
          title = `${authName} - Author Profile & Insights | NameFuse`;
          desc = authObj ? authObj.bio : `Read professional guides, branding strategies, and naming articles authored by ${authName} on NameFuse.`;
          h1Text = authName;
        } else {
          activePost = getArticleBySlug(parts[1]);
          if (activePost) {
            title = activePost.metaTitle;
            desc = activePost.metaDescription;
            h1Text = activePost.h1 || activePost.title;
          } else {
            title = "NameFuse Strategy Blog | Mastering Digital Identity";
            desc = "Explore masterclass tutorials, branding secrets, and naming frameworks written by industry specialists.";
            h1Text = "NameFuse Strategy Blog";
          }
        }
      }
    } else if (pageData) {
      title = pageData.metaTitle;
      desc = pageData.metaDescription;
      h1Text = pageData.h1;
    }

    document.title = title || "NameFuse | Free Username Generator";

    // Update Meta Description
    let metaDescTag = document.querySelector("meta[name='description']");
    if (!metaDescTag) {
      metaDescTag = document.createElement("meta");
      metaDescTag.setAttribute("name", "description");
      document.head.appendChild(metaDescTag);
    }
    metaDescTag.setAttribute("content", desc);

    // Update Canonical Tag
    let canonicalTag = document.querySelector("link[rel='canonical']");
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    const currentLangPrefix = language === "en" ? "" : `/${language}`;
    const pageUrl = `https://namefuse.vercel.app${currentLangPrefix}${currentPath}`;
    canonicalTag.setAttribute("href", pageUrl);

    // Update Open Graph (OG) & Twitter Card Tags
    const updateMetaProperty = (selector: string, attr: string, value: string, defaultAttrType: "property" | "name") => {
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(defaultAttrType, attr);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", value);
    };

    updateMetaProperty("meta[property='og:type']", "og:type", activePost ? "article" : "website", "property");
    updateMetaProperty("meta[property='og:url']", "og:url", pageUrl, "property");
    updateMetaProperty("meta[property='og:title']", "og:title", title, "property");
    updateMetaProperty("meta[property='og:description']", "og:description", desc, "property");
    updateMetaProperty("meta[property='og:image']", "og:image", activePost?.imageUrl || "https://namefuse.vercel.app/og-image.png", "property");

    updateMetaProperty("meta[name='twitter:card']", "twitter:card", "summary_large_image", "name");
    updateMetaProperty("meta[name='twitter:title']", "twitter:title", title, "name");
    updateMetaProperty("meta[name='twitter:description']", "twitter:description", desc, "name");
    updateMetaProperty("meta[name='twitter:image']", "twitter:image", activePost?.imageUrl || "https://namefuse.vercel.app/og-image.png", "name");

    // Update JSON-LD using exactly ONE unified block containing a linked @graph to avoid duplicates
    let scriptTag = document.querySelector("script[type='application/ld+json']");
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptTag);
    }

    // 1. Organization
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://namefuse.vercel.app/#organization",
      "name": "NameFuse",
      "url": "https://namefuse.vercel.app",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://namefuse.vercel.app/#logo",
        "url": "https://namefuse.vercel.app/apple-touch-icon.png",
        "caption": "NameFuse"
      },
      "image": {
        "@id": "https://namefuse.vercel.app/#logo"
      },
      "sameAs": [
        "https://x.com/namefuse",
        "https://www.linkedin.com/company/namefuse",
        "https://github.com/omarsassi716-cyber/namefuse"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Support",
        "email": "support@namefuse.vercel.app",
        "url": "https://namefuse.vercel.app/contact"
      }
    };

    // 2. WebSite & SearchAction
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://namefuse.vercel.app/#website",
      "url": "https://namefuse.vercel.app",
      "name": "NameFuse",
      "description": "Procedural and AI-powered username and brand name generators",
      "publisher": { "@id": "https://namefuse.vercel.app/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://namefuse.vercel.app/username-generator?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "inLanguage": language
    };

    // 3. WebPage (or CollectionPage if appropriate)
    const webpageSchema: any = {
      "@context": "https://schema.org",
      "@type": (isBlogPage && !activePost) ? "CollectionPage" : "WebPage",
      "@id": `${pageUrl}#webpage`,
      "url": pageUrl,
      "name": title,
      "description": desc,
      "isPartOf": { "@id": "https://namefuse.vercel.app/#website" },
      "breadcrumb": { "@id": `${pageUrl}#breadcrumb` },
      "inLanguage": language,
      "about": { "@id": "https://namefuse.vercel.app/#organization" }
    };

    // 4. BreadcrumbList
    const breadcrumbItems = [];
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 1,
      "name": language === "ar" ? "الرئيسية" : "Home",
      "item": "https://namefuse.vercel.app/username-generator"
    });

    if (parts.length > 0) {
      if (parts[0] === "blog") {
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://namefuse.vercel.app/blog"
        });
        if (parts.length > 1) {
          if (parts[1] === "category" && parts[2]) {
            const catId = parts[2];
            const catName = BLOG_CATEGORIES.find(c => c.id === catId)?.name || catId;
            breadcrumbItems.push({
              "@type": "ListItem",
              "position": 3,
              "name": catName,
              "item": `https://namefuse.vercel.app/blog/category/${catId}`
            });
          } else if (parts[1] === "tag" && parts[2]) {
            const tagStr = parts[2];
            breadcrumbItems.push({
              "@type": "ListItem",
              "position": 3,
              "name": `#${tagStr}`,
              "item": `https://namefuse.vercel.app/blog/tag/${tagStr}`
            });
          } else if (parts[1] === "author" && parts[2]) {
            const authId = parts[2];
            const authName = BLOG_AUTHORS[authId]?.name || authId;
            breadcrumbItems.push({
              "@type": "ListItem",
              "position": 3,
              "name": authName,
              "item": `https://namefuse.vercel.app/blog/author/${authId}`
            });
          } else {
            breadcrumbItems.push({
              "@type": "ListItem",
              "position": 3,
              "name": activePost ? activePost.title : parts[1],
              "item": `https://namefuse.vercel.app/blog/${parts[1]}`
            });
          }
        }
      } else {
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": 2,
          "name": h1Text || parts[0],
          "item": pageUrl
        });
      }
    }

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      "itemListElement": breadcrumbItems
    };

    // Construct the complete @graph array for the page
    const graph: any[] = [
      orgSchema,
      websiteSchema,
      webpageSchema,
      breadcrumbSchema
    ];

    // 5. FAQPage (if there are FAQs)
    const faqs = activePost?.faqs || pageData?.faqs;
    if (faqs && faqs.length > 0) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        "isPartOf": { "@id": `${pageUrl}#webpage` },
        "mainEntity": faqs.map((faq: any) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      };
      graph.push(faqSchema);
    }

    // 6. Article / BlogPosting (if on a blog post)
    if (activePost) {
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${pageUrl}#article`,
        "isPartOf": { "@id": `${pageUrl}#webpage` },
        "headline": activePost.title,
        "description": activePost.metaDescription,
        "image": [activePost.imageUrl || "https://namefuse.vercel.app/og-image.png"],
        "datePublished": `${activePost.publishDate}T09:00:00Z`,
        "dateModified": `${activePost.publishDate}T10:00:00Z`,
        "author": {
          "@type": "Person",
          "name": activePost.author.name,
          "jobTitle": activePost.author.role,
          "url": `https://namefuse.vercel.app/blog/author/${activePost.author.id}`
        },
        "publisher": { "@id": "https://namefuse.vercel.app/#organization" },
        "mainEntityOfPage": `${pageUrl}#webpage`
      };
      graph.push(articleSchema);
    }

    // Embed the single unified JSON-LD script containing the entire @graph
    scriptTag.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": graph
    });

  }, [currentPath, language, pageData, isUtilityPage, isBlogPage, isHubPage]);

  const isRtl = language === "ar";

  return (
    <Suspense fallback={
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
        <RefreshCw className="w-8 h-8 text-violet-500 animate-spin mb-4" />
        <span className="text-sm font-semibold tracking-wider uppercase">Loading NameFuse...</span>
      </div>
    }>
    <div className={`min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 ${isRtl ? "rtl" : "ltr"}`}>
      
      {/* Header component */}
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onThemeToggle={() => setTheme(theme === "light" ? "dark" : "light")}
      />

      <main id="main-content" className="relative pb-24">
        
        {/* Top Ad banner placeholder */}
        <div className="container mx-auto px-4 pt-20 pb-4">
          <AdSensePlaceholder type="top-banner" />
        </div>

        {isUtilityPage ? (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">
            {currentPath === "/privacy-policy" && <PrivacyPolicy />}
            {currentPath === "/terms-of-service" && <TermsOfService />}
            {currentPath === "/about-us" && <AboutUs />}
            {currentPath === "/contact" && <Contact />}
          </div>
        ) : isBlogPage ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <Suspense fallback={<div className="text-center py-24 text-zinc-500">Loading Strategy Blog...</div>}>
              <BlogSection currentPath={currentPath} onNavigate={navigateTo} />
            </Suspense>
          </div>
        ) : isHubPage ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <Suspense fallback={<div className="text-center py-24 text-zinc-500">Loading Topical Hub...</div>}>
              <HubSection currentPath={currentPath} onNavigate={navigateTo} language={language} />
            </Suspense>
          </div>
        ) : (
          pageData && (
            <>
              {/* Hero Section */}
              <Hero
                h1={pageData.h1}
                subtitle={pageData.subtitle}
                platform={pageData.platform}
                language={language}
                onNavigate={navigateTo}
              />

              {/* Generator Configuration Container Section */}
              <section id="generator-interface" className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 relative z-10">
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-black/5 dark:shadow-black/20 backdrop-blur-md">
                  <form onSubmit={handleGenerate} className="space-y-6">
                    
                    {/* Step Row 1: Configurations Grid */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-600 text-[10px] font-bold text-white">1</span>
                        <h2 className="text-xs font-extrabold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">
                          Choose Platform &amp; Style
                        </h2>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Configuration Platform select */}
                        <div className="space-y-2 text-left">
                          <label id="platform-select-label" htmlFor="platform-select" className="block text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                            {t.platformLabel || "Platform"}
                          </label>
                          <select
                            id="platform-select"
                            value={selectedPlatform}
                            onChange={(e) => setSelectedPlatform(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 text-zinc-800 dark:text-zinc-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer transition-all"
                          >
                            {activeTool.platforms.map((p) => (
                              <option key={p} value={p}>{p}</option>
                            ))}
                          </select>
                        </div>

                        {/* Configuration Style select */}
                        <div className="space-y-2 text-left">
                          <label id="style-select-label" htmlFor="style-select" className="block text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                            {t.styleLabel || "Style"}
                          </label>
                          <select
                            id="style-select"
                            value={selectedStyle}
                            onChange={(e) => setSelectedStyle(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 text-zinc-800 dark:text-zinc-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer transition-all"
                          >
                            {activeTool.styles.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Step Row 2: Keyword Input Field */}
                    <div className="space-y-3 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-600 text-[10px] font-bold text-white">2</span>
                        <h2 className="text-xs font-extrabold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">
                          Enter Seed Keywords &amp; Launch
                        </h2>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                          <input
                            id="keyword-input"
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder={t.placeholder || "Enter names, vibes, hobbies..."}
                            className="w-full px-4 py-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all shadow-inner"
                          />
                        </div>
                        <button
                          id="generate-names-btn"
                          type="submit"
                          disabled={isGenerating}
                          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 shrink-0 cursor-pointer min-h-[48px]"
                        >
                          {isGenerating ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              {t.weavingFormulas || "Generating..."}
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4 text-violet-200 animate-pulse" />
                              {activeTool.id === "display-name" ? (t.generateDisplayNameButton || activeTool.generateButtonText) : (t.generateButtonText || activeTool.generateButtonText)}
                            </>
                          )}
                        </button>
                      </div>

                      {/* Trending Quick Seeds row */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1.5 text-xs select-none">
                        <span className="text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider text-[9px]">Popular Seeds:</span>
                        {getTrendingSeeds(selectedPlatform).map((seed) => (
                          <button
                            key={seed}
                            type="button"
                            onClick={() => {
                              setKeyword(seed);
                            }}
                            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                              keyword === seed
                                ? "bg-violet-100 dark:bg-violet-950/60 border-violet-500 text-violet-700 dark:text-violet-300 shadow-sm"
                                : "bg-zinc-100/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-850 dark:hover:text-zinc-200"
                            }`}
                          >
                            #{seed}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step Row 3: Advanced Filters Toggle Button & AI Mode Toggle */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-zinc-150 dark:border-zinc-800/80 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowFilters(!showFilters)}
                        className="text-xs font-extrabold text-violet-600 dark:text-violet-400 hover:text-violet-500 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-violet-500 px-3 py-2 rounded-xl bg-violet-500/5 hover:bg-violet-500/10 transition-all cursor-pointer"
                        aria-expanded={showFilters}
                        aria-controls="advanced-filters-panel"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        <span>{showFilters ? "Hide Advanced Filters" : "Show Advanced Filters"}</span>
                      </button>

                      {/* Gemini AI Powered Generation Toggle */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 px-3 py-1.5 rounded-xl bg-violet-500/5 dark:bg-violet-500/10 border border-violet-500/20">
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-violet-500 animate-pulse" />
                          <span className="text-xs font-bold text-violet-700 dark:text-violet-300">
                            AI-Powered (Gemini 3.6)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsAiMode(!isAiMode)}
                          className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isAiMode ? "bg-violet-600" : "bg-zinc-300 dark:bg-zinc-800"}`}
                        >
                          <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isAiMode ? "translate-x-5" : "translate-x-0"}`}></span>
                        </button>
                      </div>
                    </div>

                    {aiError && (
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/35 text-amber-700 dark:text-amber-300 text-xs font-semibold text-center leading-relaxed">
                        {aiError}
                      </div>
                    )}

                    {/* Advanced Filters Panel */}
                    <AnimatePresence>
                      {showFilters && (
                        <motion.div
                          id="advanced-filters-panel"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden border-t border-zinc-150 dark:border-zinc-800/80 pt-4 space-y-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                            
                            {/* Length constraints slider */}
                            <div className="space-y-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-zinc-850/50">
                              <span className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">
                                Length Range ({minLength} - {maxLength})
                              </span>
                              <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                  <span className="text-[10px] text-zinc-400 font-bold font-mono">MIN:</span>
                                  <input
                                    type="range"
                                    min="3"
                                    max="12"
                                    value={minLength}
                                    onChange={(e) => setMinLength(Number(e.target.value))}
                                    className="flex-1 accent-violet-600 h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
                                  />
                                  <span className="text-xs font-mono font-bold text-zinc-600 dark:text-zinc-400 min-w-[16px] text-right">{minLength}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-[10px] text-zinc-400 font-bold font-mono">MAX:</span>
                                  <input
                                    type="range"
                                    min="13"
                                    max="24"
                                    value={maxLength}
                                    onChange={(e) => setMaxLength(Number(e.target.value))}
                                    className="flex-1 accent-violet-600 h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
                                  />
                                  <span className="text-xs font-mono font-bold text-zinc-600 dark:text-zinc-400 min-w-[16px] text-right">{maxLength}</span>
                                </div>
                              </div>
                            </div>

                            {/* Prefix/Suffix custom options */}
                            <div className="space-y-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-zinc-850/50">
                              <span className="block text-xs font-bold text-zinc-500 uppercase tracking-widest">
                                Letter Constraints
                              </span>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label htmlFor="starts-with-input" className="text-[10px] text-zinc-400 font-extrabold uppercase">Starts With</label>
                                  <input
                                    id="starts-with-input"
                                    type="text"
                                    maxLength={4}
                                    value={startsWith}
                                    onChange={(e) => setStartsWith(e.target.value.toLowerCase().replace(/[^a-z]/g, ""))}
                                    placeholder="e.g. v"
                                    className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-violet-500"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label htmlFor="ends-with-input" className="text-[10px] text-zinc-400 font-extrabold uppercase">Ends With</label>
                                  <input
                                    id="ends-with-input"
                                    type="text"
                                    maxLength={4}
                                    value={endsWith}
                                    onChange={(e) => setEndsWith(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))}
                                    placeholder="e.g. 9"
                                    className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-violet-500"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Character and style options */}
                            <div className="space-y-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-zinc-850/50 flex flex-col justify-between">
                              <span className="block text-xs font-bold text-zinc-500 uppercase tracking-widest">
                                Advanced Styles & Rules
                              </span>
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400">Include Numbers</span>
                                  <button
                                    type="button"
                                    onClick={() => setAllowNumbers(!allowNumbers)}
                                    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${allowNumbers ? "bg-violet-600" : "bg-zinc-300 dark:bg-zinc-800"}`}
                                  >
                                    <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${allowNumbers ? "translate-x-5" : "translate-x-0"}`}></span>
                                  </button>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400">Include Separators</span>
                                  <button
                                    type="button"
                                    onClick={() => setAllowSymbols(!allowSymbols)}
                                    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${allowSymbols ? "bg-violet-600" : "bg-zinc-300 dark:bg-zinc-800"}`}
                                  >
                                    <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${allowSymbols ? "translate-x-5" : "translate-x-0"}`}></span>
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Language selection filter */}
                            <div className="md:col-span-2 lg:col-span-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-zinc-850/50 text-left flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                              <div>
                                <span className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">Brand Phonetics (Language Mode)</span>
                                <p className="text-[11px] text-zinc-400 mt-0.5">Adapt the syllables, phonetic vibe, and roots used by NameFuse to target unique linguistic roots.</p>
                              </div>
                              <div className="flex flex-wrap gap-2 shrink-0">
                                {["English", "Spanish", "French", "German", "Latin"].map((lang) => (
                                  <button
                                    key={lang}
                                    type="button"
                                    onClick={() => setFilterLanguage(lang)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                                      filterLanguage === lang
                                        ? "bg-violet-100 dark:bg-violet-950/60 border-violet-500 text-violet-700 dark:text-violet-300 shadow-sm"
                                        : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50"
                                    }`}
                                  >
                                    {lang}
                                  </button>
                                ))}
                              </div>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </form>
                  
                  {/* Trust Disclaimer Notice */}
                  <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/60 text-center">
                    <p className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-relaxed max-w-2xl mx-auto">
                      <strong>Legal Disclaimer:</strong> NameFuse provides randomized procedural username suggestions. We are not affiliated with any third-party social media or gaming platforms. Checking real-time namespace availability and ensuring compliance with local trademark guidelines is the sole responsibility of the user.
                    </p>
                  </div>
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
                    language={language}
                    generatorType={activeTool.id}
                  />
                </section>
              )}

              {/* SEO Text Content Section */}
              <Suspense fallback={<div className="h-48 flex items-center justify-center text-zinc-400 dark:text-zinc-600">Loading Section Content...</div>}>
                <TextContent
                  currentPath={currentPath}
                  introduction={pageData.introduction}
                  features={pageData.features}
                  sections={pageData.sections}
                  platformName={pageData.platform}
                  onNavigate={navigateTo}
                  language={language}
                />
              </Suspense>

              {/* Google Search Style "People Also Ask" Section */}
              <Suspense fallback={<div className="h-24 flex items-center justify-center text-zinc-400 dark:text-zinc-600">Loading Related Questions...</div>}>
                <PeopleAlsoAsk 
                  platform={pageData.platform} 
                  language={language} 
                  onNavigate={navigateTo} 
                />
              </Suspense>

              {/* FAQ Accordion Section */}
              <Suspense fallback={<div className="h-32 flex items-center justify-center text-zinc-400 dark:text-zinc-600">Loading FAQs...</div>}>
                <FAQSection faqs={pageData.faqs} language={language} />
              </Suspense>

              {/* Contextual Related Generators & Strategic Guides Dashboard */}
              <Suspense fallback={<div className="h-40 flex items-center justify-center text-zinc-400 dark:text-zinc-600">Loading Dashboard...</div>}>
                <RelatedDashboard currentPath={currentPath} onNavigate={navigateTo} language={language} />
              </Suspense>
            </>
          )
        )}

        {/* Footer AdSpace */}
        <div className="container mx-auto px-4 py-6">
          <AdSensePlaceholder type="footer-banner" />
        </div>
      </main>

      {/* Slide-out Favorites Drawer Sidebar */}
      <Suspense fallback={null}>
        <FavoritesSidebar
          isOpen={isFavoritesOpen}
          onClose={() => setIsFavoritesOpen(false)}
          favorites={favorites}
          onRemoveFavorite={handleToggleFavorite}
          onClearAll={handleClearFavorites}
          language={language}
        />
      </Suspense>

      {/* Google-certified interactive consent/CMP banner */}
      <Suspense fallback={null}>
        <ConsentBanner language={language} />
      </Suspense>

      {/* Beautiful Footer */}
      <footer id="app-footer" className="border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950/60 pt-16 pb-8 text-zinc-500 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
            
            {/* Brand column */}
            <div className="space-y-4 text-left sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-base font-bold text-zinc-900 dark:text-zinc-200 tracking-tight">
                  NameFuse
                </span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm text-xs">
                NameFuse is a free, pro-grade online username generator designed for creators, gamers, and brands.
                Generate memorable, brandable handles that reflect your unique digital presence instantly.
              </p>
            </div>

            {/* Column 1: Social & Gaming Generators */}
            <div className="space-y-3 text-left">
              <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-300 uppercase tracking-widest text-[10px]">
                Profiles &amp; Gaming
              </h4>
              <ul className="space-y-2">
                {tools
                  .filter((t) => ["username", "display-name", "nickname", "gamertag", "clan", "guild"].includes(t.id))
                  .slice(0, 5)
                  .map((t) => (
                    <li key={t.id}>
                      <a
                        href={t.path}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo(t.path);
                        }}
                        className="text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-xs font-semibold"
                      >
                        {t.name}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Column 2: Branding & Corporate Generators */}
            <div className="space-y-3 text-left">
              <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-300 uppercase tracking-widest text-[10px]">
                Business &amp; Brands
              </h4>
              <ul className="space-y-2">
                {tools
                  .filter((t) => ["brand-name", "business-name", "startup-name", "company-name", "team-name"].includes(t.id))
                  .slice(0, 5)
                  .map((t) => (
                    <li key={t.id}>
                      <a
                        href={t.path}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo(t.path);
                        }}
                        className="text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-xs font-semibold"
                      >
                        {t.name}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Column 3: Hot Platforms */}
            <div className="space-y-3 text-left">
              <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-300 uppercase tracking-widest text-[10px]">
                Hot Platforms
              </h4>
              <ul className="space-y-2">
                {[
                  { name: "Instagram Handles", path: "/instagram-username-generator" },
                  { name: "TikTok Usernames", path: "/tiktok-username-generator" },
                  { name: "YouTube Channel Names", path: "/youtube-channel-names" },
                  { name: "Roblox Usernames", path: "/roblox-usernames" },
                  { name: "Minecraft Naming", path: "/minecraft-usernames" }
                ].map((p) => (
                  <li key={p.path}>
                    <a
                      href={p.path}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(p.path);
                      }}
                      className="text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-xs font-semibold"
                    >
                      {p.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Strategic Resources */}
            <div className="space-y-3 text-left">
              <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-300 uppercase tracking-widest text-[10px]">
                Resources &amp; Hubs
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/blog"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo("/blog");
                    }}
                    className="text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-xs font-semibold"
                  >
                    Strategy Blog
                  </a>
                </li>
                {[
                  { name: "Gaming & Clans Hub", path: "/gaming-naming-hub" },
                  { name: "Creators & Social Hub", path: "/social-media-naming-hub" },
                  { name: "Business & Brand Hub", path: "/business-brand-naming-hub" },
                  { name: "Creative & Fantasy Hub", path: "/creative-fantasy-naming-hub" },
                  { name: "Privacy & Anonymous Hub", path: "/privacy-security-naming-hub" }
                ].map((hub) => (
                  <li key={hub.path}>
                    <a
                      href={hub.path}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(hub.path);
                      }}
                      className="text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-xs font-semibold"
                    >
                      {hub.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="/about-us"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo("/about-us");
                    }}
                    className="text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-xs font-semibold"
                  >
                    About NameFuse
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo("/contact");
                    }}
                    className="text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-xs font-semibold"
                  >
                    Contact Support
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy-policy"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo("/privacy-policy");
                    }}
                    className="text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-xs font-semibold"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-900/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 dark:text-zinc-600 text-xs">
            <p>© 2026 NameFuse Username Generator. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a
                href="/about-us"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/about-us");
                }}
                className="hover:text-zinc-700 dark:hover:text-zinc-400 transition-colors font-bold"
              >
                {t.aboutUs || "About Us"}
              </a>
              <span>•</span>
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/contact");
                }}
                className="hover:text-zinc-700 dark:hover:text-zinc-400 transition-colors font-bold"
              >
                {t.contactUs || "Contact Us"}
              </a>
              <span>•</span>
              <a
                href="/privacy-policy"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/privacy-policy");
                }}
                className="hover:text-zinc-700 dark:hover:text-zinc-400 transition-colors font-bold"
              >
                {t.privacyPolicy}
              </a>
              <span>•</span>
              <a
                href="/terms-of-service"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/terms-of-service");
                }}
                className="hover:text-zinc-700 dark:hover:text-zinc-400 transition-colors font-bold"
              >
                {t.termsOfService}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </Suspense>
  );
}
