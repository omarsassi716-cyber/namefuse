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

function getLongTailMetadata(sty: string, plat: string, mod: string) {
  let titleSuffix = "";
  let description = "";
  let h1 = `${sty} ${plat} Usernames ${mod}`;
  let subtitle = `Find the ultimate list of ${sty.toLowerCase()} ${plat.toLowerCase()} usernames ${mod.toLowerCase()} tailored to stand out.`;

  switch (mod) {
    case "for Girls":
      titleSuffix = "Cute & Aesthetic Handles";
      description = `Looking for cute, sweet, or aesthetic ${plat.toLowerCase()} usernames for girls? Generate 50+ unique, available options to elevate your profile instantly.`;
      break;
    case "for Boys":
      titleSuffix = "Cool & Badass Ideas";
      description = `Discover the best ${sty.toLowerCase()} ${plat.toLowerCase()} usernames for boys. Generate 50+ elite, competitive, and gaming-ready handles instantly.`;
      break;
    case "Not Taken":
      titleSuffix = "Check Availability Instantly";
      description = `Tired of the 'username taken' error? Generate 50+ unique ${sty.toLowerCase()} ${plat.toLowerCase()} handles that are ready to claim today. 100% Free.`;
      break;
    case "with Symbols":
      titleSuffix = "Stylish Underscores & Dots";
      description = `Generate stylish ${sty.toLowerCase()} ${plat.toLowerCase()} usernames with clean symbols, underscores, and periods. Stand out in scoreboards and list directories.`;
      break;
    case "for Sweats":
      titleSuffix = "Tryhard & Aggressive Tags";
      description = `Get the most competitive, sweaty ${plat.toLowerCase()} gamertags and usernames. Built for esports athletes and tryhard players looking to dominate.`;
      break;
    case "for Couples":
      titleSuffix = "Matching Duo Handle Ideas";
      description = `Find adorable, matching ${sty.toLowerCase()} ${plat.toLowerCase()} usernames for couples and duos. Perfect for gaming partners and best friends.`;
      break;
    case "for Creators":
      titleSuffix = "Build Your Brand Reach";
      description = `Launch your channel or page with authority. Generate professional ${sty.toLowerCase()} ${plat.toLowerCase()} usernames for creators and influencers. No signup needed.`;
      break;
    case "for Influencers":
      titleSuffix = "Viral Creator Handles";
      description = `Get viral-ready, high-retention ${sty.toLowerCase()} usernames for ${plat}. Designed to lock in follower trust and organic search visibility.`;
      break;
    case "for Streamers":
      titleSuffix = "Live-Ready Twitch & YT Tags";
      description = `Command your chat. Generate cool, memorable, and available ${sty.toLowerCase()} ${plat.toLowerCase()} handles tailored for streamers.`;
      break;
    case "for Gamers":
      titleSuffix = "Epic Esports Gamertags";
      description = `Level up your lobby presence. Generate elite ${sty.toLowerCase()} gamertags and usernames for ${plat}. Perfectly formatted to console character limits.`;
      break;
    case "for Startups":
      titleSuffix = "Professional Brand Names";
      description = `Secure high-trust, brandable business handles. Generate 50+ available ${sty.toLowerCase()} ${plat.toLowerCase()} names for startups and SaaS ventures.`;
      break;
    case "Ideas":
      titleSuffix = "50+ Catchy Available Handles";
      description = `Stuck on naming? Explore our list of 50+ creative ${sty.toLowerCase()} username ideas for ${plat}. Instant availability checks and copy to clipboard.`;
      break;
    case "List":
      titleSuffix = "Curated & Ready to Claim";
      description = `Explore our ultimate curated list of available ${sty.toLowerCase()} usernames for ${plat}. Easily search, copy, and save your favorites today.`;
      break;
    case "Nicknames":
      titleSuffix = "Charming & Funny Profile Ideas";
      description = `Find the perfect nickname. Create charming, sweet, or witty ${sty.toLowerCase()} nicknames for ${plat} profiles and chat groups instantly.`;
      break;
    case "Aesthetic Ideas":
      titleSuffix = "Dreamy, Soft & Cute Options";
      description = `Curate a stunning profile. Generate dreamy, minimalist, and aesthetic ${sty.toLowerCase()} usernames for ${plat}. Format-compliant and 100% free.`;
      break;
    case "Cool Ideas":
      titleSuffix = "Sleek & High-Recall Ideas";
      description = `Discover sleek, high-recall, and cool username ideas for ${plat}. Blend modern prefixes and suffixes procedurally. No login needed.`;
      break;
    case "Elite List":
      titleSuffix = "Premium Available Profiles";
      description = `Claim an exclusive profile handle. Access our elite list of premium, available ${sty.toLowerCase()} usernames for ${plat} and consoles.`;
      break;
    case "PG Rated":
      titleSuffix = "Safe, Family-Friendly Names";
      description = `Safe, clean, and family-friendly ${sty.toLowerCase()} username generator for ${plat}. Perfect for school servers, kids, and Roblox profiles.`;
      break;
    default:
      titleSuffix = "Unique Generator & Ideas";
      description = `Looking for ${sty.toLowerCase()} ${plat.toLowerCase()} usernames ${mod.toLowerCase()}? Get 50+ completely unique, available, and creative names instantly. Free & fast.`;
      break;
  }

  const title = `${sty} ${plat} Usernames ${mod} | ${titleSuffix}`;
  return { title, description, h1, subtitle };
}

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

  const meta = getLongTailMetadata(sty, plat, mod);

  seoLongTailConfigs.push({
    path,
    keyword,
    platform: plat,
    style: sty,
    title: meta.title,
    description: meta.description,
    h1: meta.h1,
    subtitle: meta.subtitle
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
