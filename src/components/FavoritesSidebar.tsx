import { X, Trash2, Copy, Check, Download, Star, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { uiTranslations } from "../translations";
import { calculateUsernameScore } from "../generatorEngine";

interface FavoritesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  onRemoveFavorite: (name: string) => void;
  onClearAll: () => void;
  language: string;
}

export default function FavoritesSidebar({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onClearAll,
  language
}: FavoritesSidebarProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const t = uiTranslations[language] || uiTranslations.en;

  // Listen for Escape key press to close drawer for accessibility
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyItem = (name: string) => {
    navigator.clipboard.writeText(name).catch(() => {});
    setCopiedItem(name);
    setTimeout(() => setCopiedItem(null), 1500);
  };

  const handleCopyAll = () => {
    if (favorites.length === 0) return;
    navigator.clipboard.writeText(favorites.join("\n")).catch(() => {});
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (favorites.length === 0) return;
    const element = document.createElement("a");
    const file = new Blob([favorites.join("\n")], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "namefuse-favorite-usernames.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const filteredFavorites = favorites.filter(name => 
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isRtl = language === "ar";

  return (
    <div id="favorites-sidebar-overlay" className="fixed inset-0 z-50 overflow-hidden" dir={isRtl ? "rtl" : "ltr"}>
      {/* Backdrop blur overlay */}
      <div
        id="favorites-backdrop"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 dark:bg-black/75 backdrop-blur-sm transition-opacity"
      ></div>

      <div className={`absolute inset-y-0 ${isRtl ? "left-0" : "right-0"} max-w-full flex ${isRtl ? "pr-10" : "pl-10"}`}>
        <div
          id="favorites-drawer"
          className="w-screen max-w-md bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 border-l border-r flex flex-col shadow-2xl shadow-black/10 dark:shadow-black relative"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <h2 className="text-lg font-bold text-zinc-950 dark:text-white">{t.favoritesTitle}</h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
                {favorites.length}
              </span>
            </div>
            <button
              id="close-favorites-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500"
              aria-label="Close favorites"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Box */}
          {favorites.length > 0 && (
            <div className="px-6 py-3.5 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/40 dark:bg-zinc-950/20 relative flex items-center">
              <Search className="w-4 h-4 absolute left-9 text-zinc-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search saved handles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs font-bold rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          )}

          {/* Favorites Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 custom-scrollbar">
            {favorites.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500/20" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-zinc-800 dark:text-zinc-300">{t.noFavorites}</p>
                  <p className="text-[11px] text-zinc-400 dark:text-zinc-500 max-w-[200px] mx-auto leading-relaxed">
                    Click the star icon next to any generated username to save it on this device.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    const el = document.getElementById("results-anchor");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  Browse Generators
                </button>
              </div>
            ) : filteredFavorites.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400 dark:text-zinc-500">
                <p className="text-xs font-semibold">No matches found for "{searchTerm}"</p>
              </div>
            ) : (
              filteredFavorites.map((name, idx) => {
                const s = calculateUsernameScore(name, "Cool", "Universal");
                return (
                  <div
                    id={`favorite-row-${idx}`}
                    key={name}
                    className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-900 hover:border-zinc-350 dark:hover:border-zinc-850 hover:bg-zinc-100/30 dark:hover:bg-zinc-900/80 transition-all group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate select-all">
                        {name}
                      </span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 shrink-0">
                        {s.overall}%
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      {/* Copy specific item */}
                      <button
                        id={`favorite-copy-btn-${idx}`}
                        onClick={() => handleCopyItem(name)}
                        className="p-1.5 rounded-lg text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-850/80 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500"
                        title="Copy to Clipboard"
                      >
                        {copiedItem === name ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                      
                      {/* Delete item */}
                      <button
                        id={`favorite-remove-btn-${idx}`}
                        onClick={() => onRemoveFavorite(name)}
                        className="p-1.5 rounded-lg text-zinc-400 dark:text-zinc-500 hover:text-red-500 hover:bg-red-500/10 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
                        title="Remove from Favorites"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Action Footer */}
          {favorites.length > 0 && (
            <div className="p-6 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {/* Copy All */}
                <button
                  id="favorites-copy-all"
                  onClick={handleCopyAll}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-850 text-sm font-semibold text-zinc-800 dark:text-zinc-200 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
                >
                  {copiedAll ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      {t.copied}
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      {t.copyAll}
                    </>
                  )}
                </button>

                {/* Download TXT */}
                <button
                  id="favorites-download-txt"
                  onClick={handleDownloadTxt}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-850 text-sm font-semibold text-zinc-800 dark:text-zinc-200 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  <span>Download</span>
                </button>
              </div>

              {/* Clear All */}
              <button
                id="favorites-clear-all"
                onClick={onClearAll}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-sm font-semibold text-red-500 border border-red-500/10 hover:border-red-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                {t.clearAll}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
