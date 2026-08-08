import React, { useState, useMemo, useEffect } from "react";
import { 
  Search, Calendar, Clock, ArrowLeft, BookOpen, Tag, User, 
  ChevronLeft, ChevronRight, Share2, Twitter, ExternalLink, Sparkles, 
  HelpCircle, ChevronDown, List, Hash, BookOpenCheck
} from "lucide-react";
import { 
  blogArticles, getArticleBySlug, searchArticles, 
  getAllTagsWithCount, BLOG_CATEGORIES, BLOG_AUTHORS, BlogPost, BlogAuthor 
} from "../blogData";
import { trackRelatedGeneratorClicked, trackRelatedArticleClicked } from "../lib/analytics";

interface BlogSectionProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function BlogSection({ currentPath, onNavigate }: BlogSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [shareFeedback, setShareFeedback] = useState(false);
  const postsPerPage = 6;

  // Extract route params
  // Examples: /blog, /blog/category/gaming, /blog/tag/instagram, /blog/author/alex-rivers, /blog/ultimate-guide-to-twitch-usernames
  const routeInfo = useMemo(() => {
    const parts = currentPath.split("/").filter(Boolean); // e.g. ["blog", "category", "gaming"] or ["blog", "ultimate-guide..."]
    const isBlogRoot = parts.length === 1 && parts[0] === "blog";
    
    let subView: "root" | "category" | "tag" | "author" | "post" = "root";
    let param = "";

    if (parts.length > 1) {
      if (parts[1] === "category") {
        subView = "category";
        param = parts[2] || "";
      } else if (parts[1] === "tag") {
        subView = "tag";
        param = parts[2] || "";
      } else if (parts[1] === "author") {
        subView = "author";
        param = parts[2] || "";
      } else {
        subView = "post";
        param = parts[1] || "";
      }
    }

    return { subView, param, isBlogRoot };
  }, [currentPath]);

  // Handle page resets when filters or searches change
  useEffect(() => {
    setCurrentPage(1);
  }, [currentPath, searchQuery]);

  // Fetch or filter articles based on current view
  const { filteredArticles, title, subtitle, authorMeta, categoryMeta, tagMeta } = useMemo(() => {
    let list: BlogPost[] = [];
    let t = "NameFuse Strategy Blog";
    let sub = "Masterclass tutorials, branding secrets, and naming frameworks written by industry specialists.";
    let authObj: BlogAuthor | null = null;
    let catObj: typeof BLOG_CATEGORIES[0] | null = null;
    let tagStr = "";

    if (routeInfo.subView === "root") {
      list = searchArticles(searchQuery);
    } else if (routeInfo.subView === "category") {
      list = searchArticles(searchQuery, routeInfo.param);
      catObj = BLOG_CATEGORIES.find(c => c.id === routeInfo.param) || null;
      t = catObj ? `${catObj.name} Guides` : "Category Articles";
      sub = catObj ? catObj.desc : `Explore our collection of articles.`;
    } else if (routeInfo.subView === "tag") {
      list = searchArticles(searchQuery, undefined, routeInfo.param);
      tagStr = routeInfo.param;
      t = `#${tagStr} Insights`;
      sub = `Handpicked masterclasses focusing specifically on the ${tagStr} ecosystem.`;
    } else if (routeInfo.subView === "author") {
      list = searchArticles(searchQuery, undefined, undefined, routeInfo.param);
      authObj = BLOG_AUTHORS[routeInfo.param] || null;
      t = authObj ? `${authObj.name}` : "Author Profile";
      sub = authObj ? authObj.role : `Browse insights from our editorial team.`;
    }

    return { 
      filteredArticles: list, 
      title: t, 
      subtitle: sub, 
      authorMeta: authObj, 
      categoryMeta: catObj, 
      tagMeta: tagStr 
    };
  }, [routeInfo, searchQuery]);

  // Single post details if we are viewing a post
  const activePost = useMemo(() => {
    if (routeInfo.subView === "post") {
      return getArticleBySlug(routeInfo.param);
    }
    return null;
  }, [routeInfo]);

  // Pagination bounds
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / postsPerPage));
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return filteredArticles.slice(start, start + postsPerPage);
  }, [filteredArticles, currentPage]);

  const allTags = useMemo(() => {
    return getAllTagsWithCount().slice(0, 15);
  }, []);

  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.metaDescription,
        url: window.location.href
      }).catch(err => console.log("Failed sharing", err));
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2500);
    }
  };

  // Scroll to section handler for the Table of Contents
  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (activePost) {
    return (
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 animate-in fade-in duration-300">
        
        {/* Breadcrumbs and Back */}
        <div className="flex items-center justify-between py-4 border-b border-zinc-900 mb-8">
          <button 
            onClick={() => onNavigate("/blog")}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </button>
          <div className="flex gap-2 items-center text-xs text-zinc-500">
            <span className="hover:text-zinc-300 cursor-pointer" onClick={() => onNavigate("/blog")}>Blog</span>
            <span>/</span>
            <span className="hover:text-zinc-300 cursor-pointer" onClick={() => onNavigate(`/blog/category/${activePost.category}`)}>
              {activePost.category.charAt(0).toUpperCase() + activePost.category.slice(1)}
            </span>
            <span>/</span>
            <span className="text-zinc-400 font-medium truncate max-w-[120px] sm:max-w-xs">{activePost.title}</span>
          </div>
        </div>

        {/* Featured Header Card (Google Discover Optimized) */}
        <div className="space-y-6 text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-600/10 text-violet-400 border border-violet-500/20">
              {activePost.category.replace("-", " ")}
            </span>
            <span className="text-zinc-500 text-xs">•</span>
            <span className="flex items-center gap-1 text-zinc-500 text-xs">
              <Clock className="w-3.5 h-3.5" />
              {activePost.readTime}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-100 tracking-tight leading-tight">
            {activePost.title}
          </h1>
          
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
            {activePost.subtitle}
          </p>

          {/* Author Line */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <img 
              src={activePost.author.avatar} 
              alt={activePost.author.name}
              className="w-10 h-10 rounded-full border border-zinc-800 object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
              width={40}
              height={40}
            />
            <div className="text-left">
              <button 
                onClick={() => onNavigate(`/blog/author/${activePost.author.id}`)}
                className="text-sm font-bold text-zinc-200 hover:text-violet-400 transition-colors block leading-tight cursor-pointer"
              >
                {activePost.author.name}
              </button>
              <span className="text-zinc-500 text-xs flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Published on {new Date(activePost.publishDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
            </div>
          </div>
        </div>

        {/* Big High-Res Header Image (Discover Meta Required) */}
        <div className="rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950 mb-12 shadow-2xl shadow-black relative group max-h-[480px]">
          <img 
            src={activePost.imageUrl} 
            alt={activePost.title}
            className="w-full h-full object-cover aspect-video hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent"></div>
        </div>

        {/* Grid Layout for Content & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Article Body */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Outline / Table of Contents (Required) */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-sm shadow-inner">
              <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-widest flex items-center gap-2 mb-4">
                <List className="w-4 h-4 text-violet-400" />
                Table of Contents
              </h3>
              <ul className="space-y-2 text-sm">
                {activePost.outline.map((heading, idx) => {
                  const sectionId = `section-heading-${idx}`;
                  return (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-violet-500 font-bold">0{idx + 1}.</span>
                      <button 
                        onClick={() => handleScrollToSection(sectionId)}
                        className="text-zinc-400 hover:text-violet-400 transition-colors font-medium text-left cursor-pointer"
                      >
                        {heading.replace(/^\d+\.\s*/, "")}
                      </button>
                    </li>
                  );
                })}
                <li className="flex items-start gap-2">
                  <span className="text-violet-500 font-bold">0{activePost.outline.length + 1}.</span>
                  <button 
                    onClick={() => handleScrollToSection("frequently-asked-questions")}
                    className="text-zinc-400 hover:text-violet-400 transition-colors font-medium text-left cursor-pointer"
                  >
                    Frequently Asked Questions
                  </button>
                </li>
              </ul>
            </div>

            {/* Introduction paragraphs */}
            <div className="space-y-6 text-zinc-300 text-base sm:text-lg leading-relaxed font-normal border-l-2 border-violet-500/40 pl-6">
              {activePost.introduction.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Rich Content Sections */}
            <div className="space-y-12 pt-6">
              {activePost.sections.map((sec, idx) => {
                const sectionId = `section-heading-${idx}`;
                return (
                  <section id={sectionId} key={idx} className="space-y-6 scroll-mt-24 border-t border-zinc-900 pt-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight flex items-center gap-2">
                      <span className="text-violet-500 text-sm font-mono border border-violet-500/20 px-2 py-0.5 rounded">
                        Section 0{idx + 1}
                      </span>
                      {sec.title.replace(/^\d+\.\s*/, "")}
                    </h2>
                    
                    <div className="space-y-6 text-zinc-400 text-sm sm:text-base leading-relaxed">
                      {sec.content.map((para, pIdx) => (
                        <p key={pIdx}>{para}</p>
                      ))}
                    </div>

                    {/* Pro Tip/Callout block for rich engagement */}
                    {idx === 1 && (
                      <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-950/20 to-indigo-950/20 border border-violet-800/30">
                        <h4 className="text-xs font-bold text-violet-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                          <Sparkles className="w-3.5 h-3.5" />
                          Industry Best Practice
                        </h4>
                        <p className="text-zinc-350 text-xs sm:text-sm leading-relaxed">
                          Always secure your core matching username on major portals (Twitch, Instagram, Twitter) simultaneously even if you do not plan to write content there immediately. Consistent naming guarantees clean Google SEO canonical index signals for your future operations.
                        </p>
                      </div>
                    )}
                  </section>
                );
              })}
            </div>

            {/* FAQs Accordion */}
            <section id="frequently-asked-questions" className="scroll-mt-24 border-t border-zinc-900 pt-12 space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-5 h-5 text-violet-400" />
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-4">
                {activePost.faqs.map((faq, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/60">
                    <h4 className="text-sm font-bold text-zinc-200 mb-2 flex items-start gap-2">
                      <span className="text-violet-500 font-mono">Q:</span>
                      {faq.question}
                    </h4>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed pl-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Tags footer */}
            <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-zinc-900">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1 mr-2">
                <Tag className="w-3.5 h-3.5" />
                Tags:
              </span>
              {activePost.tags.map((t) => (
                <button
                  key={t}
                  onClick={() => onNavigate(`/blog/tag/${t}`)}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
                >
                  #{t}
                </button>
              ))}
            </div>

            {/* Author Profile Block */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800 shadow-xl backdrop-blur-sm flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-8">
              <img 
                src={activePost.author.avatar} 
                alt={activePost.author.name}
                className="w-16 h-16 rounded-full border border-zinc-800 object-cover shrink-0"
                referrerPolicy="no-referrer"
                loading="lazy"
                width={64}
                height={64}
              />
              <div className="space-y-3 text-center sm:text-left min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-extrabold text-zinc-200 leading-none mb-1">
                      {activePost.author.name}
                    </h3>
                    <span className="text-[11px] font-bold text-violet-400 uppercase tracking-widest block sm:inline">
                      {activePost.author.role}
                    </span>
                  </div>
                  <a 
                    href={activePost.author.twitter} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-zinc-950 hover:bg-zinc-900 text-[11px] font-semibold text-zinc-400 hover:text-white border border-zinc-800/80 transition-colors self-center sm:self-start"
                  >
                    <Twitter className="w-3 h-3 text-sky-400" />
                    Follow
                  </a>
                </div>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {activePost.author.bio}
                </p>
                <button
                  onClick={() => onNavigate(`/blog/author/${activePost.author.id}`)}
                  className="text-xs font-bold text-violet-400 hover:text-violet-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  View more articles by {activePost.author.name}
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Topic Hub Connection Widget */}
            {(() => {
              const getHubForCategory = (category: string) => {
                switch (category) {
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
              };
              const hubInfo = getHubForCategory(activePost.category);
              if (!hubInfo) return null;
              return (
                <div className="p-6 rounded-2xl bg-zinc-900/30 border border-violet-500/10 space-y-3 text-left">
                  <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest block">
                    Topical Hub Series
                  </span>
                  <h4 className="text-sm font-bold text-zinc-100">
                    {hubInfo.name}
                  </h4>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    This guide is a curated part of our master topical cluster. Browse related tools, strategies, and industry blueprints.
                  </p>
                  <button
                    onClick={() => onNavigate(hubInfo.path)}
                    className="w-full py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-300 hover:text-white border border-zinc-850 hover:border-zinc-800 transition-colors text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Explore {hubInfo.name}
                  </button>
                </div>
              );
            })()}

            {/* Quick Action Button */}
            <div className="p-6 rounded-2xl bg-gradient-to-tr from-violet-600/10 to-indigo-600/10 border border-violet-500/20 text-center shadow-lg relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-violet-600/20 rounded-full blur-2xl pointer-events-none"></div>
              <h4 className="text-sm font-bold text-zinc-100 mb-2 flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-violet-400" />
                Need Username Ideas?
              </h4>
              <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                Run our customized generator with your seed keyword to get 100+ creative suggestions instantly.
              </p>
              <button
                onClick={() => onNavigate("/username-generator")}
                className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Launch Username Generator
              </button>
            </div>

            {/* Related Name Generators (Internal Link Requirement) */}
            <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-800/60 space-y-4">
              <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-zinc-900">
                <BookOpenCheck className="w-4 h-4 text-violet-400" />
                Related Generators
              </h3>
              <div className="space-y-2">
                {activePost.relatedGenerators.map((gen) => (
                  <button
                    key={gen.path}
                    onClick={() => {
                      trackRelatedGeneratorClicked({
                        current_path: currentPath,
                        target_path: gen.path,
                        generator_name: gen.name,
                      });
                      onNavigate(gen.path);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-850/80 text-zinc-300 hover:text-violet-400 border border-zinc-800/60 hover:border-violet-500/20 transition-all text-xs font-semibold text-left cursor-pointer"
                  >
                    <span>{gen.name}</span>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Article Share Widget */}
            <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-800/60 text-center space-y-3">
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Enjoyed this guide?
              </h4>
              <p className="text-zinc-500 text-xs">
                Share this wisdom with your clan, startup team, or followers.
              </p>
              <button
                onClick={() => handleShare(activePost)}
                className={`w-full py-2 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  shareFeedback 
                    ? "bg-emerald-950/40 text-emerald-400 border-emerald-500/30" 
                    : "bg-zinc-900 hover:bg-zinc-850 text-zinc-300 hover:text-white border-zinc-800"
                }`}
              >
                <Share2 className="w-3.5 h-3.5" />
                {shareFeedback ? "Link Copied!" : "Share Article Link"}
              </button>
            </div>

            {/* Other Popular Guides */}
            <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-800/60 space-y-4">
              <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-widest pb-2 border-b border-zinc-900">
                Popular Guides
              </h3>
              <div className="space-y-4">
                {blogArticles
                  .filter((a) => a.id !== activePost.id && a.category === activePost.category)
                  .slice(0, 3)
                  .map((pop) => (
                    <div 
                      key={pop.slug}
                      onClick={() => {
                        trackRelatedArticleClicked({
                          current_path: currentPath,
                          article_id: pop.id,
                          article_title: pop.title,
                        });
                        onNavigate(`/blog/${pop.slug}`);
                      }}
                      className="group flex gap-3 cursor-pointer"
                    >
                      <img 
                        src={pop.imageUrl} 
                        alt={pop.title}
                        className="w-12 h-12 rounded-lg object-cover border border-zinc-800 shrink-0"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        width={48}
                        height={48}
                      />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-zinc-350 group-hover:text-violet-400 transition-colors line-clamp-2 leading-snug">
                          {pop.title}
                        </span>
                        <span className="text-[10px] text-zinc-500 block mt-0.5">{pop.readTime}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

          </div>

        </div>
      </article>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 animate-in fade-in duration-300">
      
      {/* Blog header section */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-100 tracking-tight leading-none">
          {title}
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          {subtitle}
        </p>

        {/* Categories navigation tags bar */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-4">
          <button
            onClick={() => onNavigate("/blog")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              routeInfo.subView === "root"
                ? "bg-violet-600 text-white border-violet-500 shadow-md shadow-violet-600/10"
                : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
            }`}
          >
            All Categories
          </button>
          {BLOG_CATEGORIES.map((cat) => {
            const isActive = routeInfo.subView === "category" && routeInfo.param === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onNavigate(`/blog/category/${cat.id}`)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isActive
                    ? "bg-violet-600 text-white border-violet-500 shadow-md shadow-violet-600/10"
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid containing Search bar + Feed and side columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Main Feed Column */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Real-time search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 100+ strategic articles..."
              className="w-full pl-12 pr-4 py-3 bg-zinc-900/40 border border-zinc-800 rounded-2xl text-sm font-medium text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300 font-semibold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Active search parameters callouts */}
          {searchQuery && (
            <p className="text-xs text-zinc-500">
              Showing search matches for "<span className="text-zinc-300 font-semibold">{searchQuery}</span>" (Found {filteredArticles.length} matching articles)
            </p>
          )}

          {/* Articles grid (Responsive bento-style design) */}
          {paginatedArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedArticles.map((post) => (
                <div 
                  key={post.slug}
                  className="rounded-3xl border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/40 transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-xl overflow-hidden flex flex-col group cursor-pointer"
                  onClick={() => {
                    trackRelatedArticleClicked({
                      current_path: currentPath,
                      article_id: post.id,
                      article_title: post.title,
                    });
                    onNavigate(`/blog/${post.slug}`);
                  }}
                >
                  {/* Banner Image */}
                  <div className="aspect-video relative overflow-hidden bg-zinc-950 border-b border-zinc-900 shrink-0">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-zinc-950/90 text-violet-400 border border-zinc-800">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author.name}
                        </span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-zinc-200 group-hover:text-violet-400 transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                        {post.metaDescription}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-[11px]">
                      <span className="text-zinc-500">
                        {new Date(post.publishDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      <span className="text-violet-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                        Read Guide
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-zinc-800 rounded-3xl space-y-4 bg-zinc-900/10 backdrop-blur-sm">
              <BookOpen className="w-8 h-8 text-zinc-600 mx-auto animate-bounce" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-zinc-300">No articles matched your filter</h3>
                <p className="text-zinc-500 text-xs max-w-xs mx-auto leading-relaxed">
                  Try widening your keyword search, removing letters, or selecting a different brand category button.
                </p>
              </div>

              {/* Popular quick-filters */}
              <div className="pt-2 max-w-sm mx-auto space-y-2">
                <span className="block text-[10px] font-bold text-zinc-600 uppercase tracking-wider">Try these popular topics:</span>
                <div className="flex flex-wrap justify-center gap-2">
                  {["branding", "esports", "tiktok", "trademark", "privacy"].map((topic) => (
                    <button
                      key={topic}
                      onClick={() => setSearchQuery(topic)}
                      className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all cursor-pointer"
                    >
                      #{topic}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setSearchQuery("");
                    onNavigate("/blog");
                  }}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-semibold cursor-pointer"
                >
                  Reset Feed
                </button>
              </div>
            </div>
          )}

          {/* Pagination bar controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-zinc-900">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 disabled:opacity-40 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </button>
              
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pNum = idx + 1;
                  return (
                    <button
                      key={pNum}
                      onClick={() => setCurrentPage(pNum)}
                      className={`w-8 h-8 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        currentPage === pNum
                          ? "bg-violet-600 text-white border-violet-500"
                          : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 disabled:opacity-40 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

        {/* Sidebar Widgets Column */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Author info spotlight if viewing filtered author */}
          {routeInfo.subView === "author" && authorMeta && (
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 text-center space-y-4">
              <img 
                src={authorMeta.avatar} 
                alt={authorMeta.name}
                className="w-16 h-16 rounded-full border border-zinc-800 object-cover mx-auto"
                referrerPolicy="no-referrer"
                loading="lazy"
                width={64}
                height={64}
              />
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-zinc-200">{authorMeta.name}</h3>
                <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest block">
                  {authorMeta.role}
                </span>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed">
                {authorMeta.bio}
              </p>
              <a 
                href={authorMeta.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors text-xs font-bold flex items-center justify-center gap-2"
              >
                <Twitter className="w-3.5 h-3.5 text-sky-400" />
                Follow on X
              </a>
            </div>
          )}

          {/* Dynamic tag cloud widget (Tag Pages Entry Requirement) */}
          <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-800/60 space-y-4">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-widest pb-2 border-b border-zinc-900 flex items-center gap-1.5">
              <Hash className="w-4 h-4 text-violet-400" />
              Trending Tags
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {allTags.map(({ tag, count }) => {
                const isActive = routeInfo.subView === "tag" && routeInfo.param === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => onNavigate(`/blog/tag/${tag}`)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      isActive
                        ? "bg-violet-600 text-white border-violet-500 shadow-sm"
                        : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
                    }`}
                  >
                    #{tag} <span className={`text-[10px] font-bold ml-0.5 ${isActive ? "text-violet-200" : "text-zinc-600"}`}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RSS feed promotion widget */}
          <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-800/60 space-y-3">
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest pb-1 border-b border-zinc-900">
              RSS Feed available
            </h4>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Prefer keeping up with naming insights via your favorite reader? Access our fully integrated XML feed.
            </p>
            <a
              href="/feed.xml"
              target="_blank"
              className="w-full py-2 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-300 hover:text-white border border-zinc-800 flex items-center justify-center gap-2 text-xs font-bold transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
              Open RSS Feed
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
