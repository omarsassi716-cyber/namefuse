import { SEOPageConfig } from "./seoData";

// List of major target platforms
const platforms = [
  "Instagram", "TikTok", "YouTube", "Discord", "Twitch", "Roblox", "Minecraft", 
  "Fortnite", "Valorant", "Call of Duty", "Steam", "Xbox", "PlayStation", "Gaming"
];

// List of curated vibes & styles
const styles = [
  "Aesthetic", "Cool", "Cute", "Dark", "Funny", "Professional", "Minimal", "Luxury"
];

// Target demographic & intent modifiers for long-tail coverage
const modifiers = [
  "for Girls", "for Boys", "Not Taken", "with Symbols", "for Sweats", "for Couples",
  "for Creators", "for Influencers", "for Streamers", "for Gamers", "for Startups",
  "Ideas", "List", "Nicknames", "Aesthetic Ideas", "Cool Ideas", "Elite List", "PG Rated"
];

export const seoLongTailConfigs: SEOPageConfig[] = [];

// Systematic deterministic generator to produce exactly 200 pristine configs
let platformIndex = 0;
let styleIndex = 0;
let modifierIndex = 0;

for (let i = 0; i < 200; i++) {
  const plat = platforms[platformIndex];
  const sty = styles[styleIndex];
  const mod = modifiers[modifierIndex];

  const keyword = `${sty} ${plat} Usernames ${mod}`;
  const slug = `${sty.toLowerCase()}-${plat.toLowerCase().replace(/\s+/g, "-")}-usernames-${mod.toLowerCase().replace(/\s+/g, "-")}`;
  const path = `/${slug}`;

  seoLongTailConfigs.push({
    path,
    keyword,
    platform: plat,
    style: sty,
    title: `${sty} ${plat} Usernames ${mod} | Unique Generator`,
    description: `Looking for ${sty.toLowerCase()} ${plat.toLowerCase()} usernames ${mod.toLowerCase()}? Get 50+ completely unique, available, and creative names instantly. Free & fast.`,
    h1: `${sty} ${plat} Usernames ${mod}`,
    subtitle: `Find the ultimate list of ${sty.toLowerCase()} ${plat.toLowerCase()} usernames ${mod.toLowerCase()} tailored to stand out.`
  });

  // Advance indices to cycle combinations cleanly
  modifierIndex++;
  if (modifierIndex >= modifiers.length) {
    modifierIndex = 0;
    styleIndex++;
    if (styleIndex >= styles.length) {
      styleIndex = 0;
      platformIndex++;
      if (platformIndex >= platforms.length) {
        platformIndex = 0;
      }
    }
  }
}
