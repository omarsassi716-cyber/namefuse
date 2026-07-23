import React, { useState, useEffect } from "react";
import { Sparkles, Star, Menu, X, Layers, ChevronDown } from "lucide-react";
import { tools } from "../toolsConfig";

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
}

export default function Header({ currentPath, onNavigate, favoritesCount, onOpenFavorites }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(path);
    setIsMobileMenuOpen(false);
    setIsToolsDropdownOpen(false);
  };

  return (
    <header
      id="app-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 shadow-lg shadow-black/20"
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
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              NameFuse
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-1">
            <a
              id="nav-link-username-generator"
              href="/username-generator"
              onClick={(e) => handleLinkClick("/username-generator", e)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPath === "/username-generator"
                  ? "bg-zinc-900 text-violet-400 border border-zinc-800"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
              }`}
            >
              <Sparkles className="w-4 h-4 text-violet-400" />
              Username Generator
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
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isToolsDropdownOpen || currentPath !== "/username-generator"
                    ? "bg-zinc-900 text-violet-400 border border-zinc-800"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>All Generators</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isToolsDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Mega Dropdown Grid */}
              {isToolsDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-[460px] bg-zinc-950/95 border border-zinc-800 rounded-2xl shadow-2xl p-3 grid grid-cols-2 gap-1.5 backdrop-blur-xl animate-in fade-in-50 slide-in-from-top-2 duration-150 z-50">
                  <div className="col-span-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2 pb-1.5 border-b border-zinc-900">
                    Available Name Generators
                  </div>
                  {tools.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPath === item.path;
                    return (
                      <a
                        id={`dropdown-nav-link-${item.id}`}
                        key={item.path}
                        href={item.path}
                        onClick={(e) => handleLinkClick(item.path, e)}
                        className={`flex items-start gap-2.5 p-2 rounded-xl text-left transition-colors ${
                          isActive
                            ? "bg-zinc-900/80 text-violet-400 border border-zinc-800/80"
                            : "text-zinc-350 hover:text-white hover:bg-zinc-900/40 border border-transparent"
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? "bg-violet-500/10 text-violet-400" : "bg-zinc-900 text-zinc-400"}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-bold leading-none mb-1">{item.name}</span>
                          <span className="text-[10px] text-zinc-500 truncate">{item.description}</span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            <button
              id="favorites-button"
              onClick={onOpenFavorites}
              className="relative p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/50 cursor-pointer"
              title="View Favorited Usernames"
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
              className="md:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/50 cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-zinc-950 border-b border-zinc-800/80 px-4 py-4 space-y-2 max-h-[75vh] overflow-y-auto">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-3 py-1">
            All Name Generators
          </div>
          {tools.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <a
                id={`mobile-nav-link-${item.id}`}
                key={item.path}
                href={item.path}
                onClick={(e) => handleLinkClick(item.path, e)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-zinc-900 text-violet-400 border border-zinc-850"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
                }`}
              >
                <Icon className="w-5 h-5 text-violet-500 shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span>{item.name}</span>
                  <span className="text-[10px] text-zinc-500 font-normal truncate">{item.description}</span>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
