import { X, Trash2, Copy, Check, Download, Star } from "lucide-react";
import { useState } from "react";

interface FavoritesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  onRemoveFavorite: (name: string) => void;
  onClearAll: () => void;
}

export default function FavoritesSidebar({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onClearAll
}: FavoritesSidebarProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

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

  return (
    <div id="favorites-sidebar-overlay" className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop blur overlay */}
      <div
        id="favorites-backdrop"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div
          id="favorites-drawer"
          className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800/80 flex flex-col shadow-2xl shadow-black relative"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-zinc-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <h2 className="text-lg font-bold text-white">My Favorites</h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-zinc-900 border border-zinc-800 text-zinc-400">
                {favorites.length}
              </span>
            </div>
            <button
              id="close-favorites-btn"
              onClick={onClose}
              className="p-1 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 transition-all focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Favorites Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 custom-scrollbar">
            {favorites.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                  <Star className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-zinc-300">No favorites saved yet</p>
                  <p className="text-xs text-zinc-500 max-w-[240px]">
                    Click the star icon next to any generated username to save it here for later.
                  </p>
                </div>
              </div>
            ) : (
              favorites.map((name, idx) => (
                <div
                  id={`favorite-row-${idx}`}
                  key={name}
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/40 border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/80 transition-all group"
                >
                  <span className="font-mono text-sm font-semibold text-zinc-200 select-all">
                    {name}
                  </span>
                  
                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    {/* Copy specific item */}
                    <button
                      id={`favorite-copy-btn-${idx}`}
                      onClick={() => handleCopyItem(name)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-850/80 transition-all"
                      title="Copy to Clipboard"
                    >
                      {copiedItem === name ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    
                    {/* Delete item */}
                    <button
                      id={`favorite-remove-btn-${idx}`}
                      onClick={() => onRemoveFavorite(name)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      title="Remove from Favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Action Footer */}
          {favorites.length > 0 && (
            <div className="p-6 border-t border-zinc-900 bg-zinc-950 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {/* Copy All */}
                <button
                  id="favorites-copy-all"
                  onClick={handleCopyAll}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900 hover:bg-zinc-850 text-sm font-semibold text-zinc-200 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                >
                  {copiedAll ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      Copied List!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy All
                    </>
                  )}
                </button>

                {/* Download TXT */}
                <button
                  id="favorites-download-txt"
                  onClick={handleDownloadTxt}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900 hover:bg-zinc-850 text-sm font-semibold text-zinc-200 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                >
                  <Download className="w-4 h-4 text-violet-400" />
                  Download TXT
                </button>
              </div>

              {/* Clear All */}
              <button
                id="favorites-clear-all"
                onClick={onClearAll}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-sm font-semibold text-red-400 border border-red-500/10 hover:border-red-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-red-500/50"
              >
                <Trash2 className="w-4 h-4" />
                Clear All Favorites
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
