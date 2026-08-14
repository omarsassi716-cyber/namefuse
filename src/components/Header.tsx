import React, { useState, useEffect } from "react";
import { Sparkles, Star, Menu, X, Layers, ChevronDown, Sun, Moon, Globe, BookOpen } from "lucide-react";
import { tools } from "../toolsConfig";
import { LANGUAGES, uiTranslations } from "../translations";
import { trackLanguageChanged, trackGeneratorCategorySelected } from "../lib/analytics";

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  language: string;
  onLanguageChange: (lang: string) => void;
  theme: "light" | "dark";
  onThemeToggle: () => void;
}

export default function Header({
  currentPath,
  onNavigate,
  favoritesCount,
  onOpenFavorites,
  language,
  onLanguageChange,
  theme,
  onThemeToggle
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [dropdownSearch, setDropdownSearch] = useState("");
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = uiTranslations[language] || uiTranslations.en;

  useEffect(() => {
    if (!isToolsDropdownOpen) {
      setDropdownSearch("");
    }
  }, [isToolsDropdownOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    const targetPath = language === "en" ? path : `/${language}${path}`;
    
    // Track category selection if user selected a generator tool
    const matchedTool = tools.find((t) => t.path === path);
    if (matchedTool) {
      trackGeneratorCategorySelected({
        category_id: matchedTool.id,
        category_name: matchedTool.name,
      });
    }

    onNavigate(targetPath);
    setIsMobileMenuOpen(false);
    setIsToolsDropdownOpen(false);
    setIsLangDropdownOpen(false);
  };

  const handleLangSelect = (langCode: string) => {
    // Track language change event
    trackLanguageChanged({
      from_lang: language,
      to_lang: langCode,
    });

    onLanguageChange(langCode);
    setIsLangDropdownOpen(false);
    
    // Convert current path to use the new language prefix
    // Strip existing language prefix if any
    let cleanPath = currentPath;
    const parts = currentPath.split("/").filter(Boolean);
    if (parts.length > 0 && ["es", "fr", "de", "ar"].includes(parts[0])) {
      cleanPath = "/" + parts.slice(1).join("/");
    }
    if (cleanPath === "/" || cleanPath === "") {
      cleanPath = "/username-generator";
    }

    const targetPath = langCode === "en" ? cleanPath : `/${langCode}${cleanPath}`;
    onNavigate(targetPath);
  };

  const activeLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <header
      id="app-header"
      className={`fixed top-0 left-0 right-0 z-45 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-lg shadow-black/5 dark:shadow-black/20"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            id="header-logo-link"
            href="/username-generator"
            onClick={(e) => handleLinkClick("/username-generator", e)}
            className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-xl"
            aria-label={`${t.title} Home`}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 bg-clip-text">
              {t.title}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-1">
            <a
              id="nav-link-username-generator"
              href="/username-generator"
              onClick={(e) => handleLinkClick("/username-generator", e)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                currentPath.includes("/username-generator")
                  ? "bg-zinc-100 dark:bg-zinc-900 text-violet-600 dark:text-violet-400 border border-zinc-200 dark:border-zinc-800"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/50"
              }`}
            >
              <Sparkles className="w-4 h-4 text-violet-500 dark:text-violet-400" />
              {t.usernameGenerator}
            </a>

            <a
              id="nav-link-blog"
              href="/blog"
              onClick={(e) => handleLinkClick("/blog", e)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                currentPath.startsWith("/blog")
                  ? "bg-zinc-100 dark:bg-zinc-900 text-violet-600 dark:text-violet-400 border border-zinc-200 dark:border-zinc-800"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/50"
              }`}
            >
              <BookOpen className="w-4 h-4 text-violet-500 dark:text-violet-400" />
              <span>{language === "ar" ? "المدونة" : language === "es" ? "Blog" : language === "fr" ? "Blog" : language === "de" ? "Blog" : "Blog"}</span>
            </a>

            {/* Tools Dropdown Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setIsToolsDropdownOpen(true)}
              onMouseLeave={() => setIsToolsDropdownOpen(false)}
            >
              <button
                id="nav-dropdown-trigger"
                onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer ${
                  isToolsDropdownOpen || !currentPath.includes("/username-generator")
                    ? "bg-zinc-100 dark:bg-zinc-900 text-violet-600 dark:text-violet-400 border border-zinc-200 dark:border-zinc-800"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/50"
                }`}
                aria-haspopup="true"
                aria-expanded={isToolsDropdownOpen}
              >
                <Layers className="w-4 h-4" />
                <span>{t.allGenerators}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isToolsDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Mega Dropdown Grid */}
              {isToolsDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-[460px] max-h-[420px] overflow-y-auto bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-3 flex flex-col gap-1.5 backdrop-blur-xl animate-in fade-in-50 slide-in-from-top-2 duration-150 z-50 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                  <div className="sticky top-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md pb-2 border-b border-zinc-150 dark:border-zinc-900 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-2 z-10 flex items-center justify-between gap-4">
                    <span>{t.availableGenerators}</span>
                    <input
                      type="text"
                      placeholder="Search generators..."
                      value={dropdownSearch}
                      onChange={(e) => setDropdownSearch(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => e.stopPropagation()}
                      className="px-2.5 py-1 text-[11px] rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-violet-500 w-44"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 pt-1.5">
                    {tools
                      .filter((item) => {
                        const searchLower = dropdownSearch.toLowerCase();
                        return (
                          item.name.toLowerCase().includes(searchLower) ||
                          item.description.toLowerCase().includes(searchLower)
                        );
                      })
                      .map((item) => {
                        const Icon = item.icon;
                        // strip prefix for matching
                        const cleanItemPath = item.path;
                        const isActive = currentPath.endsWith(cleanItemPath);
                        return (
                          <a
                            id={`dropdown-nav-link-${item.id}`}
                            key={item.path}
                            href={item.path}
                            onClick={(e) => handleLinkClick(item.path, e)}
                            className={`flex items-start gap-2.5 p-2 rounded-xl text-left transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                              isActive
                                ? "bg-zinc-100 dark:bg-zinc-900/80 text-violet-600 dark:text-violet-400 border border-zinc-200 dark:border-zinc-800/80"
                                : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/50 dark:hover:bg-zinc-900/40 border border-transparent"
                            }`}
                          >
                            <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? "bg-violet-500/10 text-violet-500 dark:text-violet-400" : "bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400"}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-bold leading-none mb-1">{item.name}</span>
                              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate">{item.description}</span>
                            </div>
                          </a>
                        );
                      })}
                    {tools.filter((item) => {
                      const searchLower = dropdownSearch.toLowerCase();
                      return (
                        item.name.toLowerCase().includes(searchLower) ||
                        item.description.toLowerCase().includes(searchLower)
                      );
                    }).length === 0 && (
                      <div className="col-span-2 text-center py-6 text-xs text-zinc-400 dark:text-zinc-500">
                        No generators matched "{dropdownSearch}"
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-button"
              onClick={onThemeToggle}
              className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
              aria-label="Toggle dark/light mode"
              title="Toggle dark/light mode"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                id="language-switcher-button"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer text-xs font-bold"
                aria-haspopup="true"
                aria-expanded={isLangDropdownOpen}
                aria-label="Select language"
              >
                <Globe className="w-4 h-4 text-violet-500" />
                <span className="hidden sm:inline">{activeLang.name}</span>
                <span>{activeLang.flag}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-40 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl p-1 backdrop-blur-xl animate-in fade-in-50 slide-in-from-top-1 duration-150 z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      id={`lang-select-${lang.code}`}
                      key={lang.code}
                      onClick={() => handleLangSelect(lang.code)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-left cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                        language === lang.code
                          ? "bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Favorites Star */}
            <button
              id="favorites-button"
              onClick={onOpenFavorites}
              className="relative p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
              title="View Favorited Usernames"
              aria-label="View Favorited Usernames"
            >
              <Star className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-violet-600 text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/50 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-white dark:bg-zinc-950 border-b border-zinc-200/80 dark:border-zinc-800/80 px-4 py-4 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="flex flex-col gap-1">
            <a
              id="mobile-nav-link-blog"
              href="/blog"
              onClick={(e) => handleLinkClick("/blog", e)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                currentPath.startsWith("/blog")
                  ? "bg-zinc-100 dark:bg-zinc-900 text-violet-600 dark:text-violet-400 border border-zinc-200 dark:border-zinc-850"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50"
              }`}
            >
              <BookOpen className="w-5 h-5 text-violet-500 shrink-0" />
              <div className="flex flex-col min-w-0">
                <span>{language === "ar" ? "المدونة الاستراتيجية" : language === "es" ? "Blog de Estrategia" : language === "fr" ? "Blog Stratégie" : language === "de" ? "Strategie-Blog" : "Strategy Blog"}</span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-normal truncate">Learn brand secrets, naming frameworks and tips.</span>
              </div>
            </a>

            <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-3 py-1 border-b border-zinc-100 dark:border-zinc-900 mb-1">
              {t.availableGenerators}
            </div>
            {tools.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath.endsWith(item.path);
              return (
                <a
                  id={`mobile-nav-link-${item.id}`}
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLinkClick(item.path, e)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                    isActive
                      ? "bg-zinc-100 dark:bg-zinc-900 text-violet-600 dark:text-violet-400 border border-zinc-200 dark:border-zinc-850"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50"
                  }`}
                >
                  <Icon className="w-5 h-5 text-violet-500 shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span>{item.name}</span>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-normal truncate">{item.description}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
