import { SEOPageConfig } from "./seoData";

interface CategoryDefinition {
  id: string;
  suffix: string;
  subKeywords: string[];
  platforms: string[];
  defaultStyle: string;
}

const categories: CategoryDefinition[] = [
  {
    id: "usernames",
    suffix: "usernames",
    subKeywords: ["cool", "aesthetic", "cute", "funny", "dark", "matching", "minimal", "luxury", "professional", "creative"],
    platforms: ["Instagram", "TikTok", "YouTube", "Discord", "Anime", "Cute", "Dark", "Minimal", "Aesthetic", "Funny"],
    defaultStyle: "Cool"
  },
  {
    id: "names",
    suffix: "names",
    subKeywords: ["fantasy", "anime", "vintage", "gothic", "cute", "mystical", "warrior", "royal", "modern", "epic"],
    platforms: ["Fantasy", "Anime", "Cute", "Dark", "Luxury", "Minimal", "Aesthetic", "Funny", "Baby Nicknames", "Pet Names"],
    defaultStyle: "Aesthetic"
  },
  {
    id: "brands",
    suffix: "brand-names",
    subKeywords: ["clothing", "skincare", "jewelry", "streetwear", "luxury", "fitness", "organic", "tech", "digital", "lifestyle"],
    platforms: ["Professional", "Business", "Luxury", "Minimal", "Aesthetic", "Brand Name", "Company Name", "Startup Name", "Cafe Name", "Restaurant Name"],
    defaultStyle: "Luxury"
  },
  {
    id: "gamertags",
    suffix: "gamertags",
    subKeywords: ["sweaty", "competitive", "esports", "og", "badass", "pvp", "tryhard", "tactical", "elite", "pro"],
    platforms: ["Gaming", "Roblox", "Minecraft", "Fortnite", "Valorant", "Call of Duty", "Steam", "Xbox", "PlayStation", "Clan Name"],
    defaultStyle: "Gaming"
  },
  {
    id: "nicknames",
    suffix: "nicknames",
    subKeywords: ["cute", "funny", "best-friend", "couple", "boyfriend", "girlfriend", "gaming", "playful", "charming", "sweet"],
    platforms: ["Cute", "Dark", "Funny", "Couple", "Nickname", "Display Name", "Baby Nicknames", "Pet Names", "Discord", "Gaming"],
    defaultStyle: "Nickname"
  },
  {
    id: "teams",
    suffix: "team-names",
    subKeywords: ["esports", "gaming", "competitive", "squad", "alliance", "vanguard", "apex", "collective", "syndicate", "legion"],
    platforms: ["Team Name", "Clan Name", "Guild Name", "Gaming", "Valorant", "Call of Duty", "Fortnite", "Xbox", "PlayStation", "Discord"],
    defaultStyle: "Team Name"
  },
  {
    id: "creators",
    suffix: "creator-names",
    subKeywords: ["streamer", "vlogger", "podcaster", "influencer", "youtube", "tiktok", "twitch", "instagram", "creative", "gaming"],
    platforms: ["YouTube", "TikTok", "Twitch", "Instagram", "Podcast Name", "Professional", "Aesthetic", "Minimal", "Business", "Gaming"],
    defaultStyle: "Display Name"
  },
  {
    id: "startups",
    suffix: "startup-names",
    subKeywords: ["saas", "tech", "fintech", "ai", "agency", "studio", "labs", "hub", "solutions", "ventures"],
    platforms: ["Startup Name", "Company Name", "Brand Name", "Business", "Professional", "Minimal", "Luxury", "Cafe Name", "Restaurant Name", "Display Name"],
    defaultStyle: "Business"
  },
  {
    id: "ai_naming",
    suffix: "ai-names",
    subKeywords: ["assistant", "bot", "companion", "model", "neural", "agent", "intelligence", "automation", "smart", "virtual"],
    platforms: ["Business", "Professional", "Minimal", "Startup Name", "Company Name", "Brand Name", "Gaming", "Discord", "Aesthetic", "YouTube"],
    defaultStyle: "Minimal"
  },
  {
    id: "social_handles",
    suffix: "social-handles",
    subKeywords: ["aesthetic", "clean", "rare", "short", "instagram", "tiktok", "twitter", "pinterest", "discord", "creative"],
    platforms: ["Instagram", "TikTok", "YouTube", "Discord", "Twitch", "Steam", "Professional", "Aesthetic", "Minimal", "Display Name"],
    defaultStyle: "Aesthetic"
  }
];

function generateCTROptimizedMetadata(
  subKey: string,
  plat: string,
  suffix: string,
  categoryId: string
) {
  const capitalizedSubKey = subKey.charAt(0).toUpperCase() + subKey.slice(1).replace("-", " ");
  const capitalizedPlat = plat;
  const capitalizedSuffix = suffix.replace("-", " ").charAt(0).toUpperCase() + suffix.replace("-", " ").slice(1);

  let title = "";
  let description = "";
  let h1 = "";
  let subtitle = "";

  const keyPhrase = `${capitalizedSubKey} ${capitalizedPlat} ${capitalizedSuffix}`;

  switch (categoryId) {
    case "usernames":
      title = `${keyPhrase} Generator | Find Available Handles`;
      description = `Need a ${subKey} handle? Generate 50+ unique ${capitalizedSubKey.toLowerCase()} ${capitalizedPlat} usernames instantly. Copy with one click & check availability. No login required!`;
      h1 = `${capitalizedSubKey} ${capitalizedPlat} Username Generator`;
      subtitle = `Instantly generate 50+ ${subKey} usernames for ${plat}. Perfectly formatted with availability checks.`;
      break;

    case "gamertags":
      title = `${keyPhrase} Generator | Catchy Esports & Gaming Tags`;
      description = `Level up your gaming identity. Generate elite ${subKey.toLowerCase()} ${capitalizedPlat} gamertags and clan names. 100% compliant with console & platform limits.`;
      h1 = `${capitalizedSubKey} ${capitalizedPlat} Gamertag Generator`;
      subtitle = `Forge a legendary ${subKey} player identity for ${plat} with custom procedural synergies.`;
      break;

    case "brands":
      title = `${keyPhrase} Generator | Secure High-Trust Domains & Ideas`;
      description = `Launch your brand with authority. Generate available ${subKey.toLowerCase()} ${capitalizedPlat} brand names. Find premium dot-com compatible business titles.`;
      h1 = `${capitalizedSubKey} ${capitalizedPlat} Brand Name Generator`;
      subtitle = `Secure commercial-grade, available brand name concepts for your ${subKey} business or project.`;
      break;

    case "nicknames":
      title = `${keyPhrase} Generator | Cute, Funny & Unique Ideas`;
      description = `Find the perfect nickname. Create charming ${subKey.toLowerCase()} ${capitalizedPlat.toLowerCase()} nicknames for profiles, friends, or gaming handles. Quick & free.`;
      h1 = `${capitalizedSubKey} ${capitalizedPlat} Nickname Generator`;
      subtitle = `Discover adorable, funny, and custom nicknames for ${plat} in seconds.`;
      break;

    case "teams":
      title = `${keyPhrase} Generator | Cool Squad & Clan Names`;
      description = `Build your legion's legacy. Generate professional ${subKey.toLowerCase()} team names for ${capitalizedPlat} and esports tournaments. Stand out on the leaderboard!`;
      h1 = `${capitalizedSubKey} ${capitalizedPlat} Team Name Generator`;
      subtitle = `Assemble your competitive roster under a powerful, high-impact ${subKey} squad name.`;
      break;

    case "creators":
      title = `${keyPhrase} Generator | Aesthetic Streamer & Channel Names`;
      description = `Unlock your creator brand. Generate unique ${subKey.toLowerCase()} creator names for ${capitalizedPlat}. Stand out on feeds and attract targeted subscribers.`;
      h1 = `${capitalizedSubKey} ${capitalizedPlat} Creator Name Generator`;
      subtitle = `Boost your reach on ${plat} with a memorable and searchable creative handle.`;
      break;

    case "startups":
      title = `${keyPhrase} Generator | Modern Startup & Tech Brand Ideas`;
      description = `Find available tech-focused startup names. Generate 50+ ${subKey.toLowerCase()} brand names for ${capitalizedPlat}. Built for modern domains & SaaS.`;
      h1 = `${capitalizedSubKey} ${capitalizedPlat} Startup Name Generator`;
      subtitle = `Forge high-concept, trademarkable startup titles and available domain ideas.`;
      break;

    case "ai_naming":
      title = `${keyPhrase} Generator | Smart Bot & Agent Names`;
      description = `Name your virtual assistant or bot. Generate advanced ${subKey.toLowerCase()} AI agent names for ${capitalizedPlat}. Seamlessly matches modern tech branding.`;
      h1 = `${capitalizedSubKey} ${capitalizedPlat} AI Name Generator`;
      subtitle = `Create futuristic, high-recall naming schemas for artificial intelligence agents.`;
      break;

    case "social_handles":
      title = `${keyPhrase} Generator | Memorable Social Media Profiles`;
      description = `Stand out across every channel. Generate available ${subKey.toLowerCase()} social handles for ${capitalizedPlat}. Secure a unified, professional handle.`;
      h1 = `${capitalizedSubKey} ${capitalizedPlat} Social Handle Generator`;
      subtitle = `Establish algorithm-friendly, clean social presence on ${plat} with ease.`;
      break;

    case "names":
    default:
      title = `${keyPhrase} Generator | Immersive & Unique Faction Ideas`;
      description = `Step into worldbuilding. Generate authentic ${subKey.toLowerCase()} ${capitalizedPlat.toLowerCase()} names for characters, stories, and roleplay projects.`;
      h1 = `${capitalizedSubKey} ${capitalizedPlat} Name Generator`;
      subtitle = `Breathe life into your narratives with lore-accurate, evocative names for ${plat}.`;
      break;
  }

  return { title, description, h1, subtitle };
}

export function getProgrammaticExtraConfigs(existingPaths: Set<string>): SEOPageConfig[] {
  const configs: SEOPageConfig[] = [];

  for (const cat of categories) {
    for (const subKey of cat.subKeywords) {
      for (const plat of cat.platforms) {
        const platSlug = plat.toLowerCase().replace(/\s+/g, "-");
        const path = `/${subKey}-${platSlug}-${cat.suffix}`;

        // Prevent tautological/redundant pages (e.g. aesthetic-aesthetic-usernames or minimal-minimal-usernames)
        if (
          subKey.toLowerCase() === platSlug.toLowerCase() ||
          subKey.toLowerCase().includes(platSlug.toLowerCase()) ||
          platSlug.toLowerCase().includes(subKey.toLowerCase())
        ) {
          continue;
        }

        // Prevent duplicate paths with existing static configurations
        if (existingPaths.has(path)) {
          continue;
        }

        // Beautiful, localized keyword representation
        const capitalizedSubKey = subKey.charAt(0).toUpperCase() + subKey.slice(1).replace("-", " ");
        const capitalizedPlat = plat;
        const keyword = `${capitalizedSubKey} ${capitalizedPlat} ${cat.suffix.replace("-", " ")}`;

        // Determine appropriate styling
        let style = cat.defaultStyle;
        if (subKey === "aesthetic" || subKey === "creative") style = "Aesthetic";
        if (subKey === "cool" || subKey === "rare" || subKey === "short") style = "Cool";
        if (subKey === "cute" || subKey === "sweet" || subKey === "playful") style = "Cute";
        if (subKey === "funny") style = "Funny";
        if (subKey === "dark" || subKey === "gothic") style = "Dark";
        if (subKey === "luxury") style = "Luxury";
        if (subKey === "professional" || subKey === "minimal" || subKey === "clean") style = "Minimal";
        if (subKey === "sweaty" || subKey === "competitive" || subKey === "esports" || subKey === "pvp" || subKey === "tryhard") style = "Gaming";

        // Generate tailored CTR optimized Title, Description, H1 and Subtitle
        const meta = generateCTROptimizedMetadata(subKey, plat, cat.suffix, cat.id);

        configs.push({
          path,
          keyword,
          platform: plat,
          style,
          title: `${meta.title} | NameFuse`,
          description: meta.description,
          h1: meta.h1,
          subtitle: meta.subtitle
        });
      }
    }
  }

  return configs;
}
