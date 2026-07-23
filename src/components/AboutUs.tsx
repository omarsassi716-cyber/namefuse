import React from "react";
import { Sparkles, Target, Cpu, ShieldCheck, Heart } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      <div className="space-y-12 animate-in fade-in duration-300">
        
        {/* Header */}
        <div className="border-b border-zinc-800 pb-8 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-widest mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            Our Mission
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-100">
            About NameFuse
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            NameFuse is a premier procedural generator engine built to synthesize original, brandable, and memorable usernames for digital creators, businesses, and gamers.
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-12 text-zinc-350 leading-relaxed text-sm sm:text-base">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 flex items-center gap-2">
                <Target className="w-5 h-5 text-violet-500" />
                Who We Are
              </h2>
              <p>
                Launched in 2026, NameFuse was born out of a very common digital frustration: spending hours trying to register a handle, only to discover it was already taken. Standard online generators often output random letters and meaningless numbers that make profiles look untrustworthy or outdated.
              </p>
              <p>
                We believed there was a better way. By building structured presets and linguistic formulas tailored to different visual platforms (like Instagram, TikTok, Discord, and Roblox) and commercial niches, we built an engine that outputs names with rhythmic resonance and high memory retention.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-violet-500" />
                How It Works
              </h2>
              <p>
                NameFuse does not rely on simple random-string libraries. Instead, our <strong>Procedural Syllable Engine</strong> evaluates:
              </p>
              <ul className="list-disc list-inside space-y-2 text-zinc-400 pl-2">
                <li><strong>Alliteration Rhythms:</strong> Combining matching vowel/consonant paths for punchy pronunciation.</li>
                <li><strong>Platform Restrictions:</strong> Strict sanitization according to maximum length and permitted characters (such as underscores and periods).</li>
                <li><strong>Stylistic Moods:</strong> Curating specific prefixes and suffixes for Aesthetic, Gaming, Creative, Professional, or Funny vibes.</li>
              </ul>
            </div>
          </div>

          {/* Three Key Values cards */}
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 text-center">
              Our Core Principles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              
              <div className="p-5 rounded-2xl border border-zinc-850 bg-zinc-900/20 text-center space-y-3">
                <div className="w-10 h-10 rounded-xl bg-violet-600/10 text-violet-400 flex items-center justify-center mx-auto border border-violet-500/10">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-zinc-200 text-sm sm:text-base">No AI Slop</h3>
                <p className="text-zinc-500 text-xs sm:text-sm">
                  We don&apos;t output chaotic combinations or generic formulas. Every name generated has a deliberate rhythmic pattern.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-zinc-850 bg-zinc-900/20 text-center space-y-3">
                <div className="w-10 h-10 rounded-xl bg-violet-600/10 text-violet-400 flex items-center justify-center mx-auto border border-violet-500/10">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-zinc-200 text-sm sm:text-base">Data Privacy</h3>
                <p className="text-zinc-500 text-xs sm:text-sm">
                  We never ask for your passwords, email subscriptions, or social profiles. Your inputs are kept fully transient.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-zinc-850 bg-zinc-900/20 text-center space-y-3">
                <div className="w-10 h-10 rounded-xl bg-violet-600/10 text-violet-400 flex items-center justify-center mx-auto border border-violet-500/10">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-zinc-200 text-sm sm:text-base">100% Free</h3>
                <p className="text-zinc-500 text-xs sm:text-sm">
                  No hidden microtransactions, limits, or registration walls. Generate unlimited usernames whenever inspiration strikes.
                </p>
              </div>

            </div>
          </div>

          {/* Contact callout */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 text-center space-y-4">
            <h3 className="text-lg font-bold text-zinc-100">Have Feedback or Ideas?</h3>
            <p className="text-zinc-400 max-w-xl mx-auto text-xs sm:text-sm">
              We are constantly refining our generation engine, adding support for new platforms, and tweaking syllable presets. If you have an idea or encountered an issue, we would love to hear from you.
            </p>
            <div className="pt-2">
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  // Trigger navigate parent function
                  const popstateEvent = new PopStateEvent("popstate");
                  window.history.pushState(null, "", "/contact");
                  window.dispatchEvent(popstateEvent);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-violet-600/10 hover:scale-[1.02] transition-all cursor-pointer"
              >
                Contact Our Team
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
