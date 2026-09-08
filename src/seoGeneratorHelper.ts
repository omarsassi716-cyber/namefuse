import { SEOPageData, SEOPageConfig } from "./seoData";

// Seeded random number generator for 100% deterministic, unique content per path
function createSeededRandom(seedStr: string) {
  let h = 0;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(31, h) + seedStr.charCodeAt(i) | 0;
  }
  let state = h;
  return function() {
    state = Math.imul(1664525, state) + 1013904223 | 0;
    return (state >>> 0) / 4294967296;
  };
}

// Fisher-Yates shuffle using seeded random
function shuffle<T>(array: T[], random: () => number): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const vocabularies: Record<string, {
  adjectives: string[];
  nouns: string[];
  verbs: string[];
  audience: string[];
  contexts: string[];
}> = {
  Instagram: {
    adjectives: ["aesthetic", "dreamy", "minimalist", "clean", "vibrant", "moody", "editorial", "elegant", "bold", "chic"],
    nouns: ["grid", "feed", "aesthetic", "presence", "visuals", "curation", "lens", "canvas", "journal", "portfolio"],
    verbs: ["elevate", "curate", "showcase", "transform", "inspire", "design", "express", "anchor", "polish", "craft"],
    audience: ["influencers", "photographers", "creators", "fashion bloggers", "lifestyle curators", "visual artists", "brand builders"],
    contexts: ["aesthetic Instagram feeds", "modern brand grids", "high-end personal pages", "story curation", "visual storytelling"]
  },
  TikTok: {
    adjectives: ["viral", "catchy", "energetic", "upbeat", "funny", "memorable", "trendy", "high-tempo", "dynamic", "punchy"],
    nouns: ["feed", "FYP", "short-form", "video brand", "creator tag", "vibe", "clout", "rhythm", "attention", "hook"],
    verbs: ["capture", "dominate", "virally grow", "engage", "spark", "entertain", "hook", "amplify", "boost", "loop"],
    audience: ["creators", "short-form video stars", "dancers", "trendsetters", "vloggers", "digital storytellers", "social media icons"],
    contexts: ["the For You Page", "short-form video feeds", "high-impact content loops", "viral marketing campaigns", "creator hubs"]
  },
  YouTube: {
    adjectives: ["high-retention", "professional", "broadcast", "influential", "educational", "engaging", "polished", "authoritative", "creative", "commercial"],
    nouns: ["channel", "subscriber base", "broadcast", "portfolio", "media", "niche", "authority", "content library", "viewer trust", "hub"],
    verbs: ["build", "establish", "broadcast", "rank", "grow", "secure", "validate", "optimize", "stream", "monetize"],
    audience: ["streamers", "educators", "vloggers", "reviewers", "business leaders", "tutorial creators", "filmmakers"],
    contexts: ["the world's largest video search platform", "subscriber feeds", "search recommendation algorithms", "high-production libraries", "video channels"]
  },
  Gaming: {
    adjectives: ["competitive", "aggressive", "legendary", "badass", "sweaty", "futuristic", "sci-fi", "heroic", "tactical", "esports-ready"],
    nouns: ["lobby", "leaderboard", "killfeed", "gamertag", "alias", "squad", "arena", "esports league", "profile", "reputation"],
    verbs: ["command", "dominate", "conquer", "strike", "defeat", "lead", "clutch", "outplay", "anchor", "intimidate"],
    audience: ["pro gamers", "esports competitors", "multiplayer squads", "casual players", "streamers", "guild leaders", "arena champions"],
    contexts: ["multiplayer lobbies", "esports tournaments", "competitive ranks", "live streaming channels", "cooperative squads"]
  },
  Discord: {
    adjectives: ["community-friendly", "cool", "approachable", "chill", "funny", "matching", "aesthetic", "relaxed", "stylish", "engaging"],
    nouns: ["server", "community", "profile", "chat", "guild", "lounge", "presence", "identity", "avatar", "handle"],
    verbs: ["connect", "gather", "hang out", "personalize", "moderate", "express", "host", "engage", "unify", "stylize"],
    audience: ["community managers", "friend groups", "gamers", "server builders", "anime fans", "creators", "collaborators"],
    contexts: ["Discord servers", "community voice channels", "interactive chat lounges", "gaming lobbies", "private servers"]
  },
  Twitch: {
    adjectives: ["interactive", "live-ready", "entertaining", "charismatic", "high-energy", "broadcast-friendly", "authentic", "engaging", "cool", "creative"],
    nouns: ["stream", "live broadcast", "overlay", "channel", "community", "chat", "schedule", "subscribers", "alerts", "brand"],
    verbs: ["broadcast", "stream", "monetize", "entertain", "captivate", "grow", "build", "connect", "engage", "host"],
    audience: ["variety streamers", "esports shoutcasters", "just chatting hosts", "creative artists", "speedrunners", "gaming live-streamers"],
    contexts: ["Twitch live feeds", "interactive stream overlays", "chat engagement spaces", "broadcast communities", "live channels"]
  },
  Roblox: {
    adjectives: ["creative", "playful", "aesthetic", "cute", "rich", "unique", "friendly", "iconic", "blocky", "stylish"],
    nouns: ["avatar", "experience", "game world", "dev profile", "matching set", "tag", "universe", "badge", "group", "persona"],
    verbs: ["build", "explore", "design", "customize", "trade", "match", "socialize", "create", "roleplay", "stylize"],
    audience: ["Roblox builders", "roleplayers", "mini-game creators", "trade enthusiasts", "developers", "community groups", "gamers"],
    contexts: ["Roblox game lobbies", "avatar customization menus", "developer portfolios", "community roles", "gaming universes"]
  },
  Minecraft: {
    adjectives: ["og", "sweaty", "classic", "cute", "pvp-ready", "creative", "rare", "clean", "vintage", "iconic"],
    nouns: ["skin", "server", "gamertag", "build", "factions", "survival", "pvp arena", "world", "realm", "block"],
    verbs: ["craft", "mine", "build", "survive", "conquer", "design", "pvp fight", "explore", "reclaim", "stylize"],
    audience: ["survival enthusiasts", "pvp champions", "hardcore builders", "factions leaders", "OG players", "server administrators"],
    contexts: ["Minecraft multiplayer realms", "PvP battlegrounds", "creative survival worlds", "factions bases", "vanilla servers"]
  },
  Fortnite: {
    adjectives: ["sweaty", "tryhard", "competitive", "cool", "og", "funny", "aggressive", "slick", "precise", "elite"],
    nouns: ["killfeed", "victory royale", "clan tag", "build battle", "arena", "profile", "squad", "dropzone", "locker", "handle"],
    verbs: ["clutch", "edit", "build", "eliminate", "drop", "dominate", "survive", "outplay", "win", "stream"],
    audience: ["sweaty players", "competitive soloists", "esports trio members", "casual gamers", "clan leaders", "trickshot creators"],
    contexts: ["Fortnite Battle Royale lobbies", "competitive arena ranks", "creative edit courses", "championship matches", "victory displays"]
  },
  Valorant: {
    adjectives: ["tactical", "sweaty", "precise", "agent-specific", "cool", "competitive", "tryhard", "matching", "high-tier", "clean"],
    nouns: ["agent", "clutch round", "leaderboard", "crosshair", "lineup", "tactical strategy", "rank", "squad", "handle", "title"],
    verbs: ["clutch", "headshot", "coordinate", "defuse", "execute", "rank up", "dominate", "lead", "aim", "outsmart"],
    audience: ["tactical FPS players", "competitive agents", "esports hopefuls", "ranked grinders", "matching duos", "streamers"],
    contexts: ["Valorant competitive servers", "clutch gameplay moments", "tactical shooter lobbies", "agent selection screens", "esports leagues"]
  },
  "Call of Duty": {
    adjectives: ["military", "tactical", "aggressive", "veteran", "sweaty", "heavy", "cool", "ruthless", "lethal", "ops-ready"],
    nouns: ["ops", "clan", "loadout", "prestige", "killstreak", "warzone", "tactical gear", "battalion", "squad", "callsign"],
    verbs: ["deploy", "dominate", "engage", "conquer", "survive", "eliminate", "level up", "lead", "strike", "win"],
    audience: ["Warzone drop squads", "prestige grinders", "clan members", "tactical operators", "competitive shooters", "military history fans"],
    contexts: ["Warzone battlegrounds", "multiplayer matches", "clan leaderboards", "prestige lobbies", "tactical deployment zones"]
  },
  Steam: {
    adjectives: ["aesthetic", "rare", "collectible", "retro", "completionist", "custom", "underground", "cool", "clean", "iconic"],
    nouns: ["profile", "library", "achievement card", "badge", "community", "gaming library", "inventory", "alias", "handle", "showcase"],
    verbs: ["collect", "showcase", "customize", "unlock", "play", "trade", "display", "curate", "connect", "personalize"],
    audience: ["PC gamers", "game collectors", "badge collectors", "indie devs", "community reviewers", "completionists", "modders"],
    contexts: ["Steam community hubs", "profile showcases", "review sections", "PC gaming libraries", "multiplayer lobbies"]
  },
  Xbox: {
    adjectives: ["classic", "competitive", "console-ready", "cool", "funny", "original", "clean", "durable", "high-achieving", "og"],
    nouns: ["gamertag", "achievement", "dashboard", "live party", "profile", "console", "controller", "elite squad", "feed", "network"],
    verbs: ["achieve", "unlock", "party up", "play", "compete", "connect", "invite", "share", "game", "rank"],
    audience: ["Xbox console gamers", "achievement hunters", "co-op party members", "hardcore players", "family gamers", "retro fans"],
    contexts: ["Xbox Live network", "achievement leaderboards", "party chat channels", "game pass libraries", "couch co-op sessions"]
  },
  PlayStation: {
    adjectives: ["cinematic", "immersive", "exclusive", "cool", "clean", "professional", "trophy-hunting", "iconic", "high-fidelity", "sleek"],
    nouns: ["PSN ID", "trophy", "dashboard", "exclusive world", "avatar", "console", "party", "network", "ecosystem", "handle"],
    verbs: ["conquer", "unlock", "explore", "experience", "play", "connect", "share", "immerse", "compete", "platinum"],
    audience: ["PS5 gamers", "trophy hunters", "single-player enthusiasts", "online squads", "RPG explorers", "pro controllers"],
    contexts: ["PlayStation Network", "trophy cabinet showcases", "next-gen immersive games", "multiplayer arenas", "exclusive titles"]
  },
  Anime: {
    adjectives: ["otaku", "aesthetic", "gothic", "kawaii", "shonen", "cyberpunk", "mythical", "poetic", "vintage", "epic"],
    nouns: ["clover", "aura", "scroll", "spirit", "shinobi", "guild", "manga", "academy", "dimension", "titan"],
    verbs: ["summon", "awaken", "transcend", "channel", "protect", "explore", "manifest", "master", "ascend", "vibe"],
    audience: ["anime fans", "manga collectors", "cosplayers", "roleplayers", "vtubers", "creative writers", "gaming enthusiasts"],
    contexts: ["anime community forums", "vtuber profile setups", "cosplay portfolio cards", "roleplaying discord servers", "art networks"]
  },
  Fantasy: {
    adjectives: ["mythic", "ancient", "arcane", "gilded", "legendary", "ethereal", "heroic", "mystical", "noble", "shadowy"],
    nouns: ["chronicle", "realm", "spellbook", "dynasty", "relic", "prophecy", "odyssey", "sanctum", "citadel", "haven"],
    verbs: ["summon", "forge", "unearth", "chronicle", "rule", "defend", "journey", "command", "conjure", "ascend"],
    audience: ["tabletop RPG players", "fantasy writers", "MMORPG guilds", "worldbuilders", "mythology buffs", "creative designers"],
    contexts: ["fantasy literature boards", "MMO guild banners", "D&D character sheets", "RPG tabletop campaigns", "lore libraries"]
  },
  Cute: {
    adjectives: ["sweet", "adorable", "soft", "pastel", "tiny", "fluffy", "dreamy", "playful", "warm", "cozy"],
    nouns: ["cloud", "honey", "blossom", "bunny", "bubble", "peach", "cookie", "sparkle", "berry", "button"],
    verbs: ["glow", "cuddle", "bloom", "sparkle", "smile", "float", "warm", "breeze", "soften", "cherish"],
    audience: ["cozy gamers", "lifestyle bloggers", "kawaii art creators", "plushie collectors", "Pinterest curators", "sweet friends"],
    contexts: ["cozy lifestyle blogs", "aesthetic community channels", "kawaii stream layouts", "sweet social grids", "friendly communities"]
  },
  Dark: {
    adjectives: ["shadowy", "gothic", "mysterious", "noir", "cryptic", "eclipse", "dark", "obsidian", "abyssal", "grim"],
    nouns: ["vault", "spectre", "phantom", "echo", "midnight", "void", "monolith", "gothic lore", "covenant", "abyss"],
    verbs: ["shroud", "fade", "haunt", "linger", "conceal", "whisper", "echo", "reign", "shadow", "observe"],
    audience: ["gothic curators", "dark theme lovers", "underground musicians", "alternative fashion bloggers", "cyberpunk designers"],
    contexts: ["dark-themed profiles", "minimalist gothic galleries", "mysterious alternative hubs", "cyberpunk undergrounds", "noir portfolio boards"]
  },
  Professional: {
    adjectives: ["credible", "authoritative", "executive", "corporate", "distinguished", "strategic", "expert", "focused", "elite", "competent"],
    nouns: ["consultancy", "portfolio", "resume", "network", "leadership", "expert profile", "industry", "career", "enterprise", "guild"],
    verbs: ["advise", "optimize", "lead", "consult", "execute", "develop", "manage", "deliver", "anchor", "elevate"],
    audience: ["executors", "consultants", "freelancers", "corporate leaders", "industry experts", "career professionals", "agencies"],
    contexts: ["LinkedIn profile cards", "expert business networks", "executive resumes", "corporate contact sheets", "agency websites"]
  },
  Business: {
    adjectives: ["commercial", "innovative", "corporate", "scalable", "enterprise-grade", "reliable", "market-ready", "strategic", "premium", "modern"],
    nouns: ["solutions", "ventures", "partners", "digital agency", "capital", "holdings", "marketing", "e-commerce", "hq", "enterprise"],
    verbs: ["launch", "monetize", "scale", "trade", "innovate", "manage", "partner", "acquire", "market", "expand"],
    audience: ["founders", "e-commerce merchants", "marketing directors", "agency owners", "retail operators", "corporate developers"],
    contexts: ["commercial storefronts", "b2b business platforms", "corporate agency brands", "e-commerce market profiles", "venture decks"]
  },
  Luxury: {
    adjectives: ["prestigious", "luxurious", "gilded", "exclusive", "sophisticated", "high-end", "royal", "opulent", "refined", "curated"],
    nouns: ["maison", "atelier", "estate", "residence", "heritage", "couture", "gourmet", "villa", "gallery", "luxe"],
    verbs: ["indulge", "curate", "elevate", "bequeath", "craft", "experience", "define", "master", "commission", "adorn"],
    audience: ["couture collectors", "fine jewelry designers", "luxury travel writers", "real estate brokers", "gourmet chefs", "elite brand builders"],
    contexts: ["exclusive lifestyle grids", "heritage brand portfolios", "high-end real estate listings", "gourmet culinary profiles", "elite travel diaries"]
  },
  Minimal: {
    adjectives: ["clean", "stark", "understated", "sleek", "one-word", "essential", "quiet", "precise", "modern", "pure"],
    nouns: ["canvas", "monolith", "aspect", "form", "core", "concept", "studio", "void", "space", "element"],
    verbs: ["simplify", "streamline", "define", "reduce", "balance", "focus", "ground", "align", "anchor", "craft"],
    audience: ["minimalist designers", "architects", "clean developers", "abstract photographers", "modern writers", "concept artists"],
    contexts: ["modern design studios", "minimalist typography cards", "sleek personal portfolios", "clean brand interfaces", "understated galleries"]
  },
  Aesthetic: {
    adjectives: ["curated", "vaporwave", "vintage", "indie", "grunge", "cozy", "ethereal", "poetic", "atmospheric", "dreamy"],
    nouns: ["vibe", "moodboard", "nostalgia", "gallery", "sunset", "velvet", "flora", "analog", "haze", "echo"],
    verbs: ["express", "curate", "evoke", "capture", "vintage craft", "soothe", "vibe", "paint", "dream", "reflect"],
    audience: ["Pinterest curators", "moodboard artists", "lo-fi musicians", "indie filmmakers", "digital creators", "retro fans"],
    contexts: ["aesthetic moodboards", "indie portfolio galleries", "vaporwave digital screens", "cozy community spaces", "retro analog feeds"]
  },
  Funny: {
    adjectives: ["sarcastic", "hilarious", "meme-worthy", "punny", "witty", "absurd", "playful", "bizarre", "entertaining", "cheeky"],
    nouns: ["meme", "gag", "pun", "clown", "irony", "jester", "parody", "satire", "shenanigan", "escapade"],
    verbs: ["entertain", "mock", "joke", "prank", "amuse", "chuckle", "giggle", "baffle", "disrupt", "play"],
    audience: ["meme creators", "comedy writers", "casual gamers", "funny video channels", "satirical bloggers", "social jokesters"],
    contexts: ["viral meme grids", "comedy profile banners", "satirical forums", "casual gaming chats", "funny commentary feeds"]
  },
  Couple: {
    adjectives: ["matching", "romantic", "harmonious", "twin", "complementary", "sweet", "inseparable", "cozy", "artistic", "cute"],
    nouns: ["duo", "pair", "synergy", "harmony", "destiny", "bond", "canvas", "couple", "soulmate", "anchor"],
    verbs: ["connect", "match", "harmonize", "unify", "complement", "pair up", "share", "co-create", "journey", "love"],
    audience: ["romantic duos", "gaming couples", "matching profile users", "lifestyle creators", "best friends", "creative partners"],
    contexts: ["matching social profiles", "co-op gaming channels", "shared travel blogs", "couple photo diaries", "joint creative accounts"]
  },
  Nickname: {
    adjectives: ["cozy", "short", "casual", "playful", "endearing", "witty", "friendly", "cool", "unique", "charming"],
    nouns: ["moniker", "alias", "pet name", "handle", "signature", "label", "tag", "sobriquet", "epithet", "nickname"],
    verbs: ["shorten", "simplify", "endear", "identify", "charm", "adopt", "call", "personalize", "soften", "crown"],
    audience: ["friends", "casual chat users", "guildmates", "family members", "mobile app gamers", "approachable creators"],
    contexts: ["casual profile cards", "contact labels", "private chat groups", "cozy community server lists", "personal diaries"]
  },
  "Display Name": {
    adjectives: ["creative", "bold", "aesthetic", "flexible", "customized", "highly-readable", "decorative", "expressive", "distinctive", "gorgeous"],
    nouns: ["headline", "profile card", "banner title", "nickname", "alias", "display", "identity card", "header", "signature", "badge"],
    verbs: ["customize", "decorate", "express", "display", "frame", "highlight", "brand", "announce", "personalize", "adorn"],
    audience: ["profile customizers", "creators", "designers", "social influencers", "streamers", "interactive chatters"],
    contexts: ["TikTok profile banners", "Discord nickname lists", "Roblox display settings", "Twitter profile cards", "interactive leaderboard lists"]
  },
  "Brand Name": {
    adjectives: ["memorable", "brandable", "commercial", "modern", "market-leading", "trusted", "creative", "original", "visionary", "sleek"],
    nouns: ["concept", "venture", "startup", "trademark", "label", "identity", "brand", "studio", "labs", "core"],
    verbs: ["launch", "brand", "patent", "market", "scale", "register", "conceptualize", "position", "define", "lead"],
    audience: ["founders", "creative directors", "product developers", "marketers", "online retailers", "startup visionaries"],
    contexts: ["e-commerce storefronts", "product line packaging", "trademark registration portals", "startup launch decks", "brand identity styleguides"]
  },
  "Company Name": {
    adjectives: ["executive", "corporate", "distinguished", "enterprise-ready", "credible", "global", "trusted", "strategic", "architectural", "elite"],
    nouns: ["group", "partners", "solutions", "holdings", "associates", "enterprise", "global corp", "capital", "systems", "consortium"],
    verbs: ["incorporate", "manage", "consult", "advise", "scale", "capitalize", "unify", "invest", "restructure", "audit"],
    audience: ["enterprise founders", "corporate lawyers", "managing directors", "agency builders", "investment partners", "logistics operators"],
    contexts: ["corporate registry sheets", "consultancy prospectus docs", "enterprise scale portfolios", "holding company assets", "financial venture reports"]
  },
  "Startup Name": {
    adjectives: ["trendy", "modern", "disruptive", "tech-focused", "scalable", "investable", "catchy", "high-growth", "agile", "revolutionary"],
    nouns: ["labs", "hub", "flow", "mesh", "nest", "stack", "vault", "space", "grid", "io"],
    verbs: ["disrupt", "incubate", "venture", "accelerate", "pivot", "scale", "fundraise", "deploy", "optimize", "growth-hack"],
    audience: ["SaaS builders", "venture capitalists", "tech innovators", "app developers", "fintech creators", "accelerator graduates"],
    contexts: ["pitch deck slides", "TechCrunch headlines", "app store product sheets", "developer forums", "venture demo days"]
  },
  "Team Name": {
    adjectives: ["united", "dynamic", "powerful", "competitive", "unstoppable", "tactical", "elite", "spirited", "cohesive", "legendary"],
    nouns: ["alliance", "squad", "brigade", "force", "collective", "syndicate", "legion", "patrol", "vanguard", "apex"],
    verbs: ["unify", "compete", "dominate", "collaborate", "triumph", "coordinate", "rally", "conquer", "support", "represent"],
    audience: ["sports leagues", "corporate team builders", "esports captains", "trivia contestants", "fitness group leaders", "project teams"],
    contexts: ["tournament bracket charts", "corporate team building events", "recreational sports leagues", "competitive arenas", "trivia leaderboards"]
  },
  "Clan Name": {
    adjectives: ["ruthless", "dark", "tactical", "ancient", "shadowy", "competitive", "feared", "epic", "combat-ready", "legendary"],
    nouns: ["syndicate", "dynasty", "vanguard", "covenant", "dominion", "regime", "shogunate", "brotherhood", "cartel", "horde"],
    verbs: ["command", "conquer", "conspire", "raid", "annihilate", "pillage", "expand", "dominate", "reign", "secure"],
    audience: ["FPS squads", "RPG raiders", "clan leaders", "MMO tacticians", "competitive combatants", "esports organizations"],
    contexts: ["clan wars leaderboards", "tactical shooter drop lobbies", "MMO raid coordination servers", "competive squad displays", "clan banners"]
  },
  "Guild Name": {
    adjectives: ["mythic", "medieval", "cozy", "prestigious", "brotherly", "arcane", "ancient", "loyal", "renowned", "rpg-styled"],
    nouns: ["fellowship", "sanctum", "sanctuary", "citadel", "tavern", "order", "conclave", "assembly", "chronicle", "crest"],
    verbs: ["assemble", "raid", "charter", "chronicle", "foster", "protect", "pioneer", "bequeath", "reunite", "consecrate"],
    audience: ["RPG players", "MMO raiders", "fantasy writers", "cooperative groups", "medieval roleplayers", "guild officers"],
    contexts: ["MMO guild directories", "roleplay taverns", "fantasy world chronicles", "cooperative guild achievements", "charter documents"]
  },
  "Podcast Name": {
    adjectives: ["insightful", "comedic", "conversational", "vibrant", "compelling", "opinionated", "engaging", "creative", "trendy", "thought-provoking"],
    nouns: ["frequency", "transmission", "diaries", "chronicles", "unfiltered", "session", "exchange", "unplugged", "lounge", "dialogue"],
    verbs: ["broadcast", "record", "converse", "unveil", "discuss", "interview", "expose", "share", "amplify", "tune in"],
    audience: ["independent creators", "talk show hosts", "comedy duos", "business consultants", "true crime storytellers", "lifestyle educators"],
    contexts: ["Spotify podcast listings", "Apple Podcasts directories", "creator RSS feeds", "live recorded segments", "listener audio grids"]
  },
  "Cafe Name": {
    adjectives: ["cozy", "aesthetic", "french-styled", "vintage", "minimalist", "modern", "warm", "aromatic", "artisan", "rustic"],
    nouns: ["roastery", "bistro", "parour", "nook", "hearth", "brew", "grind", "mill", "botanical", "haven"],
    verbs: ["roast", "brew", "steep", "infuse", "gather", "relax", "savor", "concoct", "warm", "welcome"],
    audience: ["artisan baristas", "cozy cafe owners", "pastry chefs", "minimalist designers", "community hosts", "coffee lovers"],
    contexts: ["neighborhood cafe fronts", "cozy local directories", "Instagrammable menus", "artisan coffee bar setups", "rustic bakeries"]
  },
  "Restaurant Name": {
    adjectives: ["gourmet", "artisanal", "culinary", "prestigious", "modernist", "authentic", "rustic", "coastal", "exquisite", "epicurean"],
    nouns: ["bistro", "kitchen", "atelier", "brasserie", "tavern", "estate", "coast", "table", "garden", "cellar"],
    verbs: ["dine", "savor", "sear", "harvest", "plate", "taste", "host", "celebrate", "gather", "curate"],
    audience: ["Michelin chefs", "bistro operators", "fine dining designers", "restaurateurs", "food critics", "culinary visionaries"],
    contexts: ["fine dining facades", "Michelin-starred menus", "modern epicurean tables", "coastal seafood bistros", "rustic family cellars"]
  },
  "Baby Nicknames": {
    adjectives: ["cute", "sweet", "precious", "tiny", "funny", "unique", "cheerful", "soft", "angelic", "gentle"],
    nouns: ["peach", "bean", "button", "sprout", "pumpkin", "bug", "peanut", "bear", "sunshine", "cookie"],
    verbs: ["giggle", "cuddle", "bloom", "gaze", "smile", "sleep", "grow", "coo", "waddle", "bless"],
    audience: ["expectant parents", "proud mothers", "doting families", "creative babysitters", "lifestyle writers", "baby bloggers"],
    contexts: ["nursery room cards", "family contact books", "personalized baby blankets", "baby shower party invitations", "cozy parent diaries"]
  },
  "Pet Names": {
    adjectives: ["cute", "funny", "unique", "cool", "playful", "spirited", "noble", "loyal", "charming", "quirky"],
    nouns: ["buddy", "scout", "ranger", "blossom", "shadow", "duke", "belle", "bandit", "biscuit", "gizmo"],
    verbs: ["wag", "fetch", "purr", "pounce", "run", "cuddle", "explore", "guard", "charm", "nap"],
    audience: ["dog parents", "cat owners", "veterinarians", "pet boutique builders", "animal shelter advocates", "exotic pet lovers"],
    contexts: ["pet collar tags", "veterinary patient files", "pet pedigree registries", "dog park circles", "cat adoption papers"]
  }
};

// Procedurally build full unique SEO data based on path and category criteria
export function generateSEOPage(config: SEOPageConfig): SEOPageData {
  const {
    path,
    platform,
    style,
    keyword,
    title,
    description,
    h1: customH1,
    subtitle: customSubtitle,
    features: customFeatures,
    introduction: customIntroduction,
    sections: customSections,
    faqs: customFaqs
  } = config;

  const rand = createSeededRandom(path);
  const vocab = vocabularies[platform] || vocabularies["Gaming"] || vocabularies["Universal"];

  // Shuffle vocabulary to ensure unique ordering and picks
  const adjs = shuffle(vocab.adjectives, rand);
  const nouns = shuffle(vocab.nouns, rand);
  const verbs = shuffle(vocab.verbs, rand);
  const aud = shuffle(vocab.audience, rand);
  const ctx = shuffle(vocab.contexts, rand);

  const capitalizedPlatform = platform.charAt(0).toUpperCase() + platform.slice(1);
  const capitalizedKeyword = keyword.charAt(0).toUpperCase() + keyword.slice(1);

  // 1. Generate pristine titles, descriptions, and H1s
  const metaTitle = title || `${capitalizedKeyword} Generator | Get Available Handles`;
  
  let metaDescription = description;
  if (!metaDescription) {
    const descTemplates = [
      `Need a ${keyword.toLowerCase()}? Generate 50+ completely unique, ${adjs[0]} and ${adjs[1]} handles for ${aud[0]} instantly. Copy with one click. 100% Free!`,
      `Create stunning ${keyword.toLowerCase()} ideas today. Find available, ${adjs[0]} handles tailored for ${aud[0]} instantly with NameFuse. No registration required.`,
      `The ultimate ${keyword.toLowerCase()} tool. Instantly generate 50+ unique, ${adjs[0]} options formatted for ${capitalizedPlatform}. Start building your audience today!`
    ];
    const templateIdx = Math.floor(rand() * descTemplates.length);
    metaDescription = descTemplates[templateIdx];
  }

  const h1 = customH1 || `${capitalizedKeyword} Generator`;
  
  const subtitleTemplates = [
    `Unleash your digital presence with a completely custom, ${adjs[0]} and ${adjs[1]} handle engineered for ${aud[0]}.`,
    `The ultimate naming tool to ${verbs[0]} your brand. Get 50+ ${adjs[0]} name ideas perfectly suited for ${ctx[0]}.`,
    `Stand out from the crowd. Discover ${adjs[0]}, memorable, and high-impact naming formulas to ${verbs[0]} your profile.`
  ];
  const subtitle = customSubtitle || subtitleTemplates[Math.floor(rand() * subtitleTemplates.length)];

  // Extract category based on the path
  let category = "usernames";
  if (path.includes("instagram") || path.includes("social")) {
    category = "instagram";
  } else if (path.includes("tiktok")) {
    category = "tiktok";
  } else if (path.includes("discord")) {
    category = "discord";
  } else if (path.includes("couple")) {
    category = "couples";
  } else if (path.includes("brand") || path.includes("company")) {
    category = "brands";
  } else if (path.includes("startup")) {
    category = "startups";
  } else if (path.includes("gaming") || path.includes("gamertag") || path.includes("fortnite") || path.includes("minecraft") || path.includes("valorant") || path.includes("roblox") || path.includes("cod") || path.includes("steam") || path.includes("xbox") || path.includes("playstation")) {
    category = "gamertags";
  } else if (path.includes("creator") || path.includes("youtube") || path.includes("twitch") || path.includes("podcast")) {
    category = "creators";
  } else if (path.includes("professional") || path.includes("business")) {
    category = "professional";
  } else if (path.includes("nickname") || path.includes("baby") || path.includes("pet")) {
    category = "nicknames";
  } else if (path.includes("team") || path.includes("clan") || path.includes("guild")) {
    category = "teams";
  } else if (path.includes("ai")) {
    category = "ai_naming";
  } else {
    if (path.endsWith("usernames")) category = "usernames";
    else if (path.endsWith("names")) category = "names";
    else category = "usernames";
  }

  // 2. Generate Introduction based on category
  let introduction = customIntroduction;
  if (!introduction) {
    if (category === "instagram") {
      introduction = `Crafting a distinctive Instagram handle is essential for curating an aesthetic grid and building organic follower engagement. Your username acts as your primary visual headline, determining whether casual scrollers tap through to explore your profile. Our specialized ${h1} combines minimalist vocabulary, editorial styling, and balanced separators to help you secure clean, memorable handles that elevate your personal or creator presence.`;
    } else if (category === "tiktok") {
      introduction = `On TikTok's fast-paced For You Page, your handle must capture attention in milliseconds. Short, rhythmic, and punchy usernames increase memorability and make word-of-mouth growth effortless. Our specialized ${h1} generates viral-ready, high-tempo handle concepts designed specifically for short-form video creators, dancers, and trendsetters looking to stand out.`;
    } else if (category === "discord") {
      introduction = `A stellar Discord handle or server identity fosters instant community trust and makes voice-chat interactions smooth. Whether you are moderating a gaming community or hanging out in private channels, your display name should be easy to pronounce and visually clean. Our specialized ${h1} delivers approachable, community-friendly naming formulas optimized for modern chat platforms.`;
    } else if (category === "couples") {
      introduction = `Matching couple handles and joint profiles celebrate shared journeys across social media and gaming worlds. Crafting balanced complementary names requires a delicate touch to maintain individual identity while establishing a cohesive aesthetic. Our specialized ${h1} curates romantic, harmonious, and stylish dual naming concepts tailored for duos and best friends.`;
    } else if (category === "brands" || category === "startups") {
      introduction = `Launching a successful business or startup begins with securing a highly brandable, memorable, and trustworthy name. In today's digital economy, your brand name is your first customer touchpoint, directly influencing customer retention, market authority, and organic search positioning. Our specialized ${h1} combines premium, industry-aligned vocabulary with clean phonetic structures to help you discover elite, trademark-ready brand names with a single click.`;
    } else if (category === "gamertags") {
      introduction = `In multiplayer gaming lobbies, your gamertag is your digital shield and competitive signature. A great alias commands respect, looks pristine in killfeeds, and sounds formidable on voice comms. Our specialized ${h1} produces competitive, esports-ready aliases tailored for modern console and PC networks, eliminating messy number strings.`;
    } else if (category === "creators") {
      introduction = `For streamers, vloggers, and independent creators, a memorable channel title is the foundation of long-term brand equity. Your display name directly influences search indexation and viewer trust across YouTube, Twitch, and podcast directories. Our specialized ${h1} generates clean, high-retention creator names designed to capture attention instantly.`;
    } else if (category === "professional") {
      introduction = `Establishing professional credibility requires an executive digital identity that communicates authority and precision. Whether optimizing your LinkedIn profile or launching a consulting practice, a clean handle builds instant trust with clients and peers. Our specialized ${h1} delivers distinguished corporate naming concepts.`;
    } else if (category === "ai_naming") {
      introduction = `Naming artificial intelligence models, bots, and automation tools requires forward-thinking vocabulary that communicates intelligence and efficiency. Our specialized ${h1} produces sleek, cybernetic, and high-tech naming concepts tailored for modern agents and SaaS apps.`;
    } else {
      introduction = `Establishing a polished digital identity is the ultimate competitive advantage. Our specialized ${h1} utilizes advanced linguistic flow matrices to elevate your brand, combining premium styles to output unique, highly brandable naming concepts.`;
    }
  }

  // 3. Generate Features
  const features = customFeatures || [
    `Advanced procedural combination of ${adjs[0]} adjectives and ${nouns[0]} roots`,
    `Tailored specifically for ${aud[0]} seeking to ${verbs[1]} their authority`,
    `Strict compliance with ${platform} character formats and platform safety guidelines`,
    `100% free to use with instant clipboard copying and custom offline Favorites saving`
  ];

  // Helper to generate 10 unique, relevant examples based on category
  const getCuratedExamples = (cat: string): string[] => {
    const examples: string[] = [];
    const subRand = createSeededRandom(path + "_examples");

    const brandPrefixes = ["Aura", "Veloce", "Apex", "Onyx", "Nova", "Helix", "Aero", "Volt", "Core", "Intel", "Vivid", "Prism", "Sola", "Lume", "Zenith", "Zeta", "Flux", "Echo", "Pinnacle", "Axis"];
    const brandSuffixes = ["Labs", "Studio", "Holdings", "Ventures", "Collective", "Group", "Systems", "HQ", "Capital", "Solutions", "Media", "Agency", "Interactive", "Technologies", "Partners", "Creative", "Forge", "Networks", "Logic", "Space"];

    const gamerPrefixes = ["Cyber", "Rogue", "Vortex", "Apex", "Shadow", "Grave", "Rune", "Onyx", "Aero", "Phantom", "Slayer", "Viper", "Wrath", "Frost", "Nova", "Vandal", "Reaper", "Zealot", "Static", "Titan"];
    const gamerSuffixes = ["Viper", "Slayer", "Trigger", "Ghost", "Wraith", "Knight", "Blade", "Storm", "Nova", "Strike", "Pulse", "Fury", "Reign", "Echo", "Shade", "Glitch", "Phantom", "Scythe", "Hydra", "Vanguard"];

    const userPrefixes = ["velvet", "haze", "lunar", "cosmic", "minimal", "quiet", "classic", "poetic", "moody", "vivid", "amber", "ethereal", "dreamy", "vintage", "rustic", "urban", "polar", "indigo", "mellow", "neon"];
    const userSuffixes = ["studio", "space", "journal", "archive", "essence", "drift", "wave", "vibe", "lens", "mind", "cloud", "bloom", "gaze", "shade", "haven", "notes", "poetry", "flora", "dusk", "aura"];

    const tiktokPrefixes = ["viral", "hype", "zenith", "vibe", "pulse", "echo", "nova", "flux", "dash", "bolt", "swift", "slick", "apex", "neon", "pixel", "breeze", "chill", "glow", "spark", "orbit"];
    const tiktokSuffixes = ["feed", "tok", "clip", "vibe", "loop", "trend", "wave", "sync", "flow", "hub", "zone", "cast", "spot", "media", "stage", "play", "mix", "beat", "craft", "snap"];

    const discordPrefixes = ["chill", "cozy", "epic", "lunar", "stellar", "quantum", "neon", "mystic", "solar", "retro", "cosmic", "breezy", "velvet", "frost", "silent", "shadow", "wander", "echo", "nova", "pulse"];
    const discordSuffixes = ["lounge", "haven", "sanctuary", "hub", "vault", "realm", "base", "core", "nexus", "den", "bay", "dock", "port", "nook", "nest", "guild", "clan", "crew", "squad", "parlor"];

    const couplePrefixes = ["matching", "dual", "twin", "sweet", "harmony", "destiny", "bonded", "loyal", "cozy", "true", "infinite", "co", "joint", "paired", "ever", "side", "two", "sync", "sweet", "dear"];
    const coupleSuffixes = ["duo", "pair", "bond", "synergy", "canvas", "harmony", "couple", "anchor", "orbit", "echo", "pulse", "flow", "wave", "spark", "bloom", "dawn", "dusk", "star", "moon", "sun"];

    const proPrefixes = ["elite", "prime", "apex", "strategic", "global", "executive", "trusted", "certified", "master", "pioneer", "vision", "nexus", "core", "catalyst", "vertex", "summit", "beacon", "horizon", "axiom", "meridian"];
    const proSuffixes = ["consulting", "partners", "solutions", "group", "advisors", "associates", "strategies", "ventures", "capital", "firm", "guild", "network", "hub", "experts", "corps", "alliance", "services", "labs", "systems", "trust"];

    const nickPrefixes = ["Tiny", "Cozy", "Sweet", "Soft", "Honey", "Little", "Baby", "Sunny", "Peachy", "Dewy", "Cuddle", "Pip", "Chippy", "Dolly", "Fuzzy", "Panda", "Silly", "Wiggle", "Bubbles", "Lucky"];
    const nickSuffixes = ["Bean", "Sprout", "Peach", "Button", "Blossom", "Bear", "Cloud", "Berry", "Sparkle", "Chime", "Bug", "Plum", "Bunny", "Clover", "Poppy", "Honey", "Puff", "Bake", "Waffle", "Noodle"];

    const creatorPrefixes = ["Creative", "Tech", "Lifestyle", "Vibe", "Review", "Stream", "Explore", "Unfiltered", "Cozy", "Daily", "Aero", "Vivid", "Focus", "Vision", "Vocal", "Beyond", "Pure", "Rare", "Social", "True"];
    const creatorSuffixes = ["Channel", "HQ", "Lab", "Media", "Studio", "Lounge", "Diaries", "Vlog", "Central", "Hub", "Show", "Zone", "Network", "Cast", "Chronicles", "Pulse", "Lab", "Digest", "Collective", "Vibe"];

    const aiPrefixes = ["Neural", "Smart", "Cyber", "Auto", "Aero", "Omni", "Nova", "Veloce", "Apex", "Helix", "Cogni", "Synapse", "Tensor", "Vector", "Logic", "Mind", "Robo", "Net", "Matrix", "Byte"];
    const aiSuffixes = ["Agent", "Bot", "Model", "Engine", "Node", "Core", "Flow", "Mesh", "Vault", "Grid", "System", "Brain", "Link", "Sync", "Process", "App", "Shell", "Script", "Unit", "Signal"];

    let pList = userPrefixes;
    let sList = userSuffixes;

    if (cat === "instagram") {
      pList = userPrefixes;
      sList = userSuffixes;
    } else if (cat === "tiktok") {
      pList = tiktokPrefixes;
      sList = tiktokSuffixes;
    } else if (cat === "discord") {
      pList = discordPrefixes;
      sList = discordSuffixes;
    } else if (cat === "couples") {
      pList = couplePrefixes;
      sList = coupleSuffixes;
    } else if (cat === "brands" || cat === "startups") {
      pList = brandPrefixes;
      sList = brandSuffixes;
    } else if (cat === "gamertags" || cat === "teams") {
      pList = gamerPrefixes;
      sList = gamerSuffixes;
    } else if (cat === "nicknames") {
      pList = nickPrefixes;
      sList = nickSuffixes;
    } else if (cat === "creators") {
      pList = creatorPrefixes;
      sList = creatorSuffixes;
    } else if (cat === "professional") {
      pList = proPrefixes;
      sList = proSuffixes;
    } else if (cat === "ai_naming") {
      pList = aiPrefixes;
      sList = aiSuffixes;
    }

    const seen = new Set<string>();
    while (examples.length < 10) {
      const pref = pList[Math.floor(subRand() * pList.length)];
      const suff = sList[Math.floor(subRand() * sList.length)];
      const comb = cat === "instagram" || cat === "tiktok" || cat === "discord" ? `${pref}_${suff}`.toLowerCase() : `${pref} ${suff}`;
      if (!seen.has(comb)) {
        seen.add(comb);
        examples.push(comb);
      }
    }
    return examples;
  };

  // 4. Generate structured sections with practical checklists and example analysis
  let sections = customSections;
  if (!sections) {
    const examplesList = getCuratedExamples(category);
    
    if (category === "instagram") {
      sections = [
        {
          title: `Strategic Principles for Instagram Handle Design`,
          paragraphs: [
            `When users visit your Instagram profile, your handle is the first element they process. A strong Instagram handle should be concise, visually balanced, and reflective of your grid's niche. Utilizing clean separators like a period or underscore (e.g., 'lunar.studio') helps establish a professional editorial aesthetic.`,
            `Avoid stringing together unrelated words or appending birth years, which can clutter your profile header. Instead, focus on evocative nouns and atmospheric modifiers that tell visitors what your content represents before they even scroll down your feed.`
          ]
        },
        {
          title: `Practical Decision Framework: Before Choosing This Name, Verify`,
          paragraphs: [
            `• Readability & Typing Ease: Is the handle effortless to type on mobile keyboards without accidental autocorrect errors?`,
            `• Pronunciation Test: Can followers easily say your handle aloud when recommending your account to others?`,
            `• Privacy Safeguard: Does the username avoid revealing sensitive personal information such as full names, birth years, or locations?`,
            `• Cross-Platform Alignment: Is the handle available or consistent across your backup social channels?`
          ]
        },
        {
          title: `Curated ${capitalizedKeyword} Examples & Analysis`,
          paragraphs: [
            `To help guide your brainstorming process, here are 10 custom-generated handle concepts created by our engine, along with a breakdown of their stylistic strengths and ideal use cases:`,
            `1. ${examplesList[0]} (Ideal for minimalist aesthetic feeds; offers high visual symmetry) | 2. ${examplesList[1]} (Great for creative portfolios; clean editorial tone) | 3. ${examplesList[2]} (Evocative and memorable; fits lifestyle curators) | 4. ${examplesList[3]} (Punchy rhythm; easy to recall) | 5. ${examplesList[4]} (Professional tone; excellent for brand presence) | 6. ${examplesList[5]} (Subtle and refined; perfect for quiet luxury grids) | 7. ${examplesList[6]} (Modern and crisp; strong mobile legibility) | 8. ${examplesList[7]} (Artistic cadence; captures attention instantly) | 9. ${examplesList[8]} (Balanced spacing; avoids clutter) | 10. ${examplesList[9]} (Classic formatting; timeless appeal). Potential drawback: Common words may require minor contextual suffixes if exact matches are claimed.`
          ]
        }
      ];
    } else if (category === "tiktok") {
      sections = [
        {
          title: `Optimizing Usernames for TikTok's For You Page (FYP)`,
          paragraphs: [
            `On TikTok, rapid discoverability is everything. Short, high-tempo usernames with sharp consonant endings perform exceptionally well because viewers scan handles in split seconds while browsing vertical video loops.`,
            `Avoid overly complex spelling variations or silent letters that hinder word-of-mouth promotion. Keeping your handle tightly aligned with your specific content niche (such as dance, comedy, or tech reviews) helps the platform algorithm categorize your account faster.`
          ]
        },
        {
          title: `Practical Decision Framework: Before Choosing This Name, Verify`,
          paragraphs: [
            `• Hook Compatibility: Does the username sound catchy when spoken in video introductions or sign-offs?`,
            `• Character Length: Is it short enough to fit cleanly on overlay watermarks and live stream chat tags?`,
            `• Niche Clarity: Does it give viewers an instant hint about your content category?`,
            `• Avoid Trends That Age Poorly: Does it steer clear of fleeting internet slang that might feel dated in six months?`
          ]
        },
        {
          title: `Curated ${capitalizedKeyword} Examples & Analysis`,
          paragraphs: [
            `Explore 10 viral-ready handle concepts generated by our engine, designed for high-impact short-form creators:`,
            `1. ${examplesList[0]} (High-tempo rhythm; excellent for fast-paced video loops) | 2. ${examplesList[1]} (Catchy and memorable; stands out in comment sections) | 3. ${examplesList[2]} (Sleek modern cadence; ideal for trendsetters) | 4. ${examplesList[3]} (Energetic tone; fits vloggers and creators) | 5. ${examplesList[4]} (Clean formatting; strong visual retention) | 6. ${examplesList[5]} (Sharp consonants; memorable sound) | 7. ${examplesList[6]} (Dynamic feel; great for interactive content) | 8. ${examplesList[7]} (Polished style; builds instant creator trust) | 9. ${examplesList[8]} (Crisp structure; easy to read on mobile screens) | 10. ${examplesList[9]} (Distinctive presence; reduces audience confusion). Potential drawback: High-energy terms work best for entertainment/lifestyle rather than formal corporate accounts.`
          ]
        }
      ];
    } else if (category === "discord") {
      sections = [
        {
          title: `Building Community Trust in Discord Servers`,
          paragraphs: [
            `Discord communities thrive on approachable, friendly, and easy-to-pronounce handles. Whether you are running a gaming guild, an art club, or a study lounge, your display name should encourage friendly interaction and active voice-chat participation.`,
            `With Discord's modern handle system, choosing a clean, unblemished username without messy special characters ensures members can tag you effortlessly during discussions and moderation queues.`
          ]
        },
        {
          title: `Practical Decision Framework: Before Choosing This Name, Verify`,
          paragraphs: [
            `• Voice Comms Pronunciation: Can fellow gamers easily pronounce your handle during high-intensity voice matches?`,
            `• Server Role Compatibility: Does the name look clean alongside custom server roles and nitro badges?`,
            `• Friendly Tone: Does it convey an approachable, welcoming vibe suited for community spaces?`,
            `• Uniqueness: Is it distinct enough to avoid confusion with other active members in large servers?`
          ]
        },
        {
          title: `Curated ${capitalizedKeyword} Examples & Analysis`,
          paragraphs: [
            `Discover 10 community-friendly handle concepts tailored for chat lounges and gaming servers:`,
            `1. ${examplesList[0]} (Approachable and chill; perfect for community lounges) | 2. ${examplesList[1]} (Cozy cadence; great for friendly hangouts) | 3. ${examplesList[2]} (Epic gaming tone; fits cooperative guilds) | 4. ${examplesList[3]} (Stellar imagery; visually appealing in member lists) | 5. ${examplesList[4]} (Clean formatting; easy to ping in chat) | 6. ${examplesList[5]} (Mystic undertones; great for fantasy roleplay) | 7. ${examplesList[6]} (Retro vibe; adds personality to profile cards) | 8. ${examplesList[7]} (Smooth phonetics; effortless to say aloud) | 9. ${examplesList[8]} (Balanced structure; works in any server) | 10. ${examplesList[9]} (Distinctive tag; memorable across communities). Potential drawback: Relaxed casual names may need slight adjustments if used for formal business networking.`
          ]
        }
      ];
    } else if (category === "couples") {
      sections = [
        {
          title: `The Art of Coordinated Naming for Duos`,
          paragraphs: [
            `Matching couple usernames and joint profiles celebrate shared bonds across social media and gaming ecosystems. Creating harmonious dual names requires balancing coordination with individual identity so that each handle stands strong on its own while forming a unified pair.`,
            `When designing matching names, consider complementary themes (such as celestial pairs, nature opposites, or rhythmic phonetic echoes) rather than identical text strings, ensuring a sophisticated and artistic aesthetic.`
          ]
        },
        {
          title: `Practical Decision Framework: Before Choosing This Name, Verify`,
          paragraphs: [
            `• Balanced Coordination: Do both handles share a similar length, font style, and thematic weight?`,
            `• Privacy Preservation: Do the names avoid displaying full real names or intimate personal dates?`,
            `• Timeless Appeal: Will the dual naming structure remain graceful and stylish over the years?`,
            `• Individual Clarity: Can each partner use their handle comfortably on separate solo platforms?`
          ]
        },
        {
          title: `Curated ${capitalizedKeyword} Examples & Analysis`,
          paragraphs: [
            `Explore 10 harmonious dual naming concepts designed for couples, best friends, and gaming partners:`,
            `1. ${examplesList[0]} (Balanced dual synergy; excellent for matching profiles) | 2. ${examplesList[1]} (Poetic coupling; subtle and romantic) | 3. ${examplesList[2]} (Co-op gaming favorite; great for duo matches) | 4. ${examplesList[3]} (Harmonious cadence; visually stunning together) | 5. ${examplesList[4]} (Sweet aesthetic; perfect for photo journals) | 6. ${examplesList[5]} (Classic pairing; timeless appeal) | 7. ${examplesList[6]} (Modern match; clean formatting) | 8. ${examplesList[7]} (Complementary tones; sophisticated style) | 9. ${examplesList[8]} (Shared theme; effortless recognition) | 10. ${examplesList[9]} (Artistic duo tag; elegant and memorable). Potential drawback: Matching sets require both users to maintain active accounts to preserve the paired aesthetic.`
          ]
        }
      ];
    } else if (category === "brands" || category === "startups") {
      sections = [
        {
          title: `The Core Principles of Brand Nomenclature`,
          paragraphs: [
            `A successful brand name must combine semantic clarity with commercial appeal. When clients encounter your name on digital storefronts, pitch decks, or app markets, it should immediately trigger positive associations. The best business names are brief, easy to pronounce, and contain professional root words that convey authority and industry expertise.`,
            `Avoid generic, descriptive words that make trademark registration difficult. Instead, opt for abstract neologisms or sleek compound words (such as combining a high-growth verb with a solid structural noun). This creates an elite brand image that is highly memorable and easily defensible in future trademark filings.`
          ]
        },
        {
          title: `Practical Decision Framework: Before Choosing This Name, Verify`,
          paragraphs: [
            `• Trademark Clearance: Is the name free from existing registrations in your commercial class?`,
            `• Pronunciation Test: Can international clients pronounce the name effortlessly without spelling confusion?`,
            `• Expansion Flexibility: Does the name allow your business to expand into new product lines in the future?`,
            `• Domain Availability: Can you secure a clean .com, .io, or industry-specific domain without awkward hyphens?`
          ]
        },
        {
          title: `Curated ${capitalizedKeyword} Examples & Analysis`,
          paragraphs: [
            `To help jumpstart your brainstorming session, here are 10 highly brandable, professional name combinations generated by our seed-engine, complete with strategic analysis:`,
            `1. ${examplesList[0]} (High-growth tech appeal; excellent for SaaS ventures) | 2. ${examplesList[1]} (Executive tone; strong corporate presence) | 3. ${examplesList[2]} (Modern agency feel; clean market positioning) | 4. ${examplesList[3]} (Innovative cadence; captures investor attention) | 5. ${examplesList[4]} (Scalable structure; flexible for multi-product expansion) | 6. ${examplesList[5]} (Prestigious naming root; premium market feel) | 7. ${examplesList[6]} (Crisp phonetics; high mobile app store legibility) | 8. ${examplesList[7]} (Authoritative vocabulary; builds instant B2B trust) | 9. ${examplesList[8]} (Abstract neologism; simplifies trademark defense) | 10. ${examplesList[9]} (Classic enterprise tone; enduring commercial value). Potential drawback: Distinctive brand names require active marketing investment to establish immediate consumer awareness.`
          ]
        }
      ];
    } else if (category === "gamertags") {
      sections = [
        {
          title: `Esports Phonetics: Crafting Formidable Gamertags`,
          paragraphs: [
            `In the competitive gaming landscape, your gamertag is your digital calling card. A legendary gaming alias should sound sharp, carry rhythmic weight, and look intimidating in high-speed killfeeds. Top-tier professional players often choose single-syllable or double-syllable names with high-impact letters (like X, Z, V, and K) to ensure maximum visual recall.`,
            `Avoid cluttering your alias with generic numbers or symmetrical special symbols (e.g., 'Sniper_99' or 'xX_Slayer_Xx'). Modern lobbies and esports organizations prize clean, unblemished monikers that look professional on jerseys, tournament streams, and player registries.`
          ]
        },
        {
          title: `Practical Decision Framework: Before Choosing This Name, Verify`,
          paragraphs: [
            `• Killfeed Visibility: Is the gamertag short and clean enough to be read instantly in fast-moving killfeeds?`,
            `• Console Limits: Does it comply with strict character length limits (12-16 characters) on PlayStation and Xbox networks?`,
            `• Voice Comms Clarity: Can your squadmates call out your name quickly during intense clutch moments?`,
            `• Number-Free Identity: Does it avoid relying on clumsy birth years or random digits?`
          ]
        },
        {
          title: `Curated ${capitalizedKeyword} Examples & Analysis`,
          paragraphs: [
            `Looking for a spark of inspiration? Here are 10 competitive, high-cadence gamertag ideas generated specifically for this platform style:`,
            `1. ${examplesList[0]} (Aggressive competitive tone; elite killfeed presence) | 2. ${examplesList[1]} (Sharp syllable pacing; excellent for tactical FPS) | 3. ${examplesList[2]} (Intimidating aura; commands respect in lobbies) | 4. ${examplesList[3]} (Clean alphanumeric structure; zero clutter) | 5. ${examplesList[4]} (Esports-ready cadence; tournament verified style) | 6. ${examplesList[5]} (Stealthy aesthetic; perfect for flankers and scouts) | 7. ${examplesList[6]} (High-velocity feel; great for movement shooters) | 8. ${examplesList[7]} (Authoritative ring; strong squad leader vibe) | 9. ${examplesList[8]} (Crisp and memorable; easy for shoutcasters to announce) | 10. ${examplesList[9]} (Legendary persona; stands out on leaderboards). Potential drawback: Aggressive tactical tags may need softening if you transition to casual party games.`
          ]
        }
      ];
    } else if (category === "creators") {
      sections = [
        {
          title: `The Core Blueprint for High-Retention Channel Names`,
          paragraphs: [
            `For creators on YouTube, TikTok, and Twitch, your name is your primary channel brand. A high-retention name is short, rhythmic, easy to recall, and immediately signals your content category. Choosing a name that balances your personal identity with a clear description of your content niche helps platforms index your profile faster and increases organic viewer click-through rates.`,
            `Avoid spelling errors or complicated letter combinations that make word-of-mouth promotion difficult. If a viewer wants to recommend your channel to a friend, they should be able to say your name easily without spelling it out.`
          ]
        },
        {
          title: `Practical Decision Framework: Before Choosing This Name, Verify`,
          paragraphs: [
            `• Search Indexation: Does the display name include a clear keyword or niche identifier for search algorithms?`,
            `• Word-of-Mouth Test: Can viewers spell your channel name correctly just by hearing it spoken in a video?`,
            `• Cross-Platform Handle: Is the associated @handle available across all major video and social networks?`,
            `• Long-Term Niche Flexibility: Does the name allow you to pivot into new content topics without feeling restrictive?`
          ]
        },
        {
          title: `Curated ${capitalizedKeyword} Examples & Analysis`,
          paragraphs: [
            `Build your digital audience on a rock-solid foundation. Here are 10 highly clickable channel name concepts:`,
            `1. ${examplesList[0]} (High-retention structure; ideal for video creators) | 2. ${examplesList[1]} (Professional studio vibe; great for educational content) | 3. ${examplesList[2]} (Catchy rhythm; increases subscriber recall) | 4. ${examplesList[3]} (Search-optimized format; easy to discover) | 5. ${examplesList[4]} (Clean formatting; builds instant channel authority) | 6. ${examplesList[5]} (Engaging tone; perfect for lifestyle vloggers) | 7. ${examplesList[6]} (Crisp phrasing; stands out in recommended sidebars) | 8. ${examplesList[7]} (Authoritative title; excellent for tech reviewers) | 9. ${examplesList[8]} (Memorable cadence; fosters loyal community growth) | 10. ${examplesList[9]} (Polished creator brand; timeless appeal). Potential drawback: Broad titles require strong thumbnail branding to differentiate your content.`
          ]
        }
      ];
    } else if (category === "professional") {
      sections = [
        {
          title: `Executive Presence & Corporate Identity Standards`,
          paragraphs: [
            `In professional networking and corporate consulting, your digital handle acts as your virtual business card. An executive digital presence demands dignity, clarity, and precision, ensuring potential employers, clients, and partners perceive your expertise immediately.`,
            `Avoid informal slang, numbers, or unverified acronyms in professional profiles. Maintaining a clean, standardized format (such as first-name dot last-name or recognized industry terms) establishes immediate trustworthiness.`
          ]
        },
        {
          title: `Practical Decision Framework: Before Choosing This Name, Verify`,
          paragraphs: [
            `• Executive Tone: Does the name convey competence, seriousness, and reliability?`,
            `• LinkedIn Optimization: Is it fully compatible with professional networking search algorithms?`,
            `• Email Domain Harmony: Can you easily provision a matching corporate email address?`,
            `• Absence of Slang: Is the handle entirely free from casual internet jargon or informal memes?`
          ]
        },
        {
          title: `Curated ${capitalizedKeyword} Examples & Analysis`,
          paragraphs: [
            `Explore 10 distinguished professional naming concepts tailored for consultants, executives, and enterprise builders:`,
            `1. ${examplesList[0]} (Executive consulting tone; high B2B credibility) | 2. ${examplesList[1]} (Strategic advisory feel; trusted industry presence) | 3. ${examplesList[2]} (Corporate authority; excellent for LinkedIn profiles) | 4. ${examplesList[3]} (Prestigious structure; establishes expert status) | 5. ${examplesList[4]} (Clean professional formatting; spotless reputation) | 6. ${examplesList[5]} (Enterprise-ready cadence; premium market standing) | 7. ${examplesList[6]} (Authoritative phrasing; inspires client confidence) | 8. ${examplesList[7]} (Global leadership tone; ideal for senior operators) | 9. ${examplesList[8]} (Refined business identity; enduring career value) | 10. ${examplesList[9]} (Distinguished moniker; elite professional polish). Potential drawback: Highly formal names may feel less suited for relaxed creative arts.`
          ]
        }
      ];
    } else {
      sections = [
        {
          title: `The Architecture of an Elite ${capitalizedKeyword} Name`,
          paragraphs: [
            `Creating a name that commands attention requires understanding sound cadence and visual symmetry. When users scroll through platforms, they respond instantly to short, punchy terms that evoke specific imagery. By pairing an active verb or a high-end noun with a stylized adjective, you create a beautiful phonetic rhythm that naturally lodges itself in a user's memory.`,
            `Furthermore, typography plays a silent but major role in name recognition. Capitalizing word boundaries or inserting a singular balanced period improves visual legibility. Our generation engine automatically applies these design principles, crafting names that look like designer labels rather than randomized letters.`
          ]
        },
        {
          title: `Practical Decision Framework: Before Choosing This Name, Verify`,
          paragraphs: [
            `• Visual Symmetry: Does the name look balanced and clean when written out?`,
            `• Pronunciation Clarity: Is it spoken easily without tongue-twisting syllables?`,
            `• Platform Suitability: Does it fit within the character limits of your target network?`,
            `• Timeless Design: Does it avoid short-lived internet trends that may feel outdated soon?`
          ]
        },
        {
          title: `Curated ${capitalizedKeyword} Examples & Analysis`,
          paragraphs: [
            `Looking for a spark of inspiration? Below are 10 unique, custom-generated name combinations using clean formatting and optimal syllables:`,
            `1. ${examplesList[0]} (High visual symmetry; excellent mobile legibility) | 2. ${examplesList[1]} (Clean editorial cadence; professional tone) | 3. ${examplesList[2]} (Evocative imagery; strong audience recall) | 4. ${examplesList[3]} (Punchy structure; memorable and crisp) | 5. ${examplesList[4]} (Balanced word-spacing; avoids clutter) | 6. ${examplesList[5]} (Sophisticated tone; refined aesthetic) | 7. ${examplesList[6]} (Modern styling; crisp digital presence) | 8. ${examplesList[7]} (Artistic flow; captures attention instantly) | 9. ${examplesList[8]} (Classic formatting; timeless appeal) | 10. ${examplesList[9]} (Distinctive moniker; stands out cleanly). Potential drawback: Universal names may require minor tweaks to secure exact handle matches.`
          ]
        }
      ];
    }
  }

  // 5. Generate unique category-specific FAQs (expanded to 5 genuinely useful questions)
  let faqs = customFaqs;
  if (!faqs) {
    if (category === "instagram") {
      faqs = [
        {
          question: `How can I handle an Instagram username that is already taken?`,
          answer: `If your exact name is taken, avoid adding random numbers or strings. Instead, append professional contextual markers like '.studio', '.journal', or '.space' to maintain a clean, high-end profile identity.`
        },
        {
          question: `How often can I change my Instagram username?`,
          answer: `Instagram allows you to change your username once every 14 days. However, frequent changes can temporarily disrupt follower recognition and search lookup consistency.`
        },
        {
          question: `Should personal and business Instagram handles follow different rules?`,
          answer: `Yes. Personal handles can lean toward creative mononyms or aesthetic pseudonyms, while business handles should prioritize clarity, brand matching, and immediate industry recognition.`
        },
        {
          question: `Are generated handles guaranteed to be available on Instagram?`,
          answer: `No. NameFuse generates creative naming concepts for inspiration only. You must manually verify availability directly within the Instagram app or registration page.`
        },
        {
          question: `Do special characters affect handle readability?`,
          answer: `Excessive symbols or complex punctuation can make handles harder to share verbally or remember. Clean alphanumeric formatting with minimal separators generally offers the best readability.`
        }
      ];
    } else if (category === "tiktok") {
      faqs = [
        {
          question: `What is the maximum character length for TikTok usernames?`,
          answer: `TikTok usernames can be up to 24 characters long. Shorter handles (under 15 characters) are generally easier for viewers to remember and type into search bars.`
        },
        {
          question: `Can I include emojis or special symbols in my TikTok handle?`,
          answer: `TikTok allows letters, numbers, underscores, and periods in usernames. Avoiding complex or unusual symbols makes your profile easier to find in cross-platform promotions.`
        },
        {
          question: `Does my TikTok handle impact how viewers find my content?`,
          answer: `While the platform relies on complex engagement and content signals, having a clean, relevant handle helps viewers instantly understand your content focus when they visit your profile.`
        },
        {
          question: `Are generated TikTok handles guaranteed to be unregistered?`,
          answer: `No. NameFuse provides creative ideas for brainstorming purposes. Always check current availability directly on TikTok before committing to branding materials.`
        },
        {
          question: `Should I match my TikTok handle with other social networks?`,
          answer: `Consistency across platforms helps your community recognize you easily when they follow your links from other sites or share your content across networks.`
        }
      ];
    } else if (category === "discord") {
      faqs = [
        {
          question: `How do Discord handles work with the modern system?`,
          answer: `Discord utilizes unique lowercase alphanumeric handles (e.g., @username) without discriminators, making it simple for friends to add you and ping you in active chat channels.`
        },
        {
          question: `Can I use spaces in my Discord display name?`,
          answer: `Yes! While your unique @handle cannot contain spaces, your server display name can include spaces, emojis, and custom styling tailored to each community.`
        },
        {
          question: `What makes a good Discord server name?`,
          answer: `A great Discord server name should be short, welcoming, and reflective of your community's core interest, whether that is gaming, anime, or collaborative art.`
        },
        {
          question: `Are these names guaranteed to be open on Discord?`,
          answer: `No. Because millions of users are active on Discord, you must verify availability in your user settings before assuming a handle is open.`
        },
        {
          question: `How do I maintain consistency across multiple servers?`,
          answer: `Using a consistent base display name or nickname across servers helps community members recognize you instantly during voice and text interactions.`
        }
      ];
    } else if (category === "couples") {
      faqs = [
        {
          question: `How do we coordinate matching handles without looking identical?`,
          answer: `You can use complementary prefixes/suffixes or shared design elements (such as matching aesthetic emojis or matching typography) while keeping the main words distinct.`
        },
        {
          question: `Is it safe to include anniversary dates in couple usernames?`,
          answer: `We generally advise against including exact dates or full names for privacy reasons. Choosing atmospheric or poetic matching words is much safer and more stylish.`
        },
        {
          question: `Can matching handles be used across different gaming networks?`,
          answer: `Yes! Dual naming looks incredible in co-op gaming lobbies, Discord servers, and shared social profiles.`
        },
        {
          question: `Do matching names require both partners to use them simultaneously?`,
          answer: `While paired handles look best when both partners display them together, each handle is structured to remain readable and attractive on its own.`
        },
        {
          question: `Are these coupled suggestions checked for platform availability?`,
          answer: `No. Availability varies widely across platforms, so you will need to check your preferred networks manually.`
        }
      ];
    } else if (category === "brands" || category === "startups") {
      faqs = [
        {
          question: `Does NameFuse perform legal trademark clearance or registration?`,
          answer: `No. NameFuse is an educational brainstorming resource only. We do not perform legal trademark searches, clearance, or legal guarantees. Always consult a qualified trademark attorney before commercial use.`
        },
        {
          question: `How should I check domain name availability for a generated brand name?`,
          answer: `You can use popular domain registrars or our quick lookup links to check whether matching .com, .io, or other domain extensions are currently available for purchase.`
        },
        {
          question: `What is a 'brandable' business name?`,
          answer: `A brandable business name avoids generic descriptive words and instead blends rhythmic sounds, sleek syllables, and memorable industry terminology (like 'Labs' or 'Studio') to create a premium brand identity.`
        },
        {
          question: `Can I use these generated names commercially without risk?`,
          answer: `Because business naming involves complex prior registrations and regional trademark laws, you must conduct a thorough trademark search in your relevant jurisdiction before commercial launch.`
        },
        {
          question: `Are these name ideas certified or verified by branding experts?`,
          answer: `No. These suggestions are produced by procedural linguistic algorithms designed for inspiration and brainstorming rather than formal professional certification.`
        }
      ];
    } else if (category === "gamertags") {
      faqs = [
        {
          question: `What are the character limits for modern gaming consoles?`,
          answer: `Some gaming platforms impose character limits and formatting rules on usernames or gamertags. Check the current requirements of the specific platform before choosing a final name.`
        },
        {
          question: `Why should I avoid special symbols in my gamertag?`,
          answer: `Symbols and rare unicode characters can fail to render correctly in fast-paced lobbies or killfeeds, sometimes appearing as broken characters. Clean alphanumeric names are universally supported.`
        },
        {
          question: `Can I use these gamertags across Steam, Xbox, and PlayStation?`,
          answer: `Yes! These names are formatted to be compatible across major gaming networks, though availability on each specific network must be verified individually.`
        },
        {
          question: `Are generated gamertags verified for availability?`,
          answer: `No. You must verify whether a gamertag is open directly within your console or game launcher network.`
        },
        {
          question: `Does a short gamertag provide any competitive advantage?`,
          answer: `Shorter gamertags are generally easier for teammates to communicate quickly during voice chat and easier for opponents to read in crowded killfeeds.`
        }
      ];
    } else if (category === "creators") {
      faqs = [
        {
          question: `Should my channel display name be different from my handle?`,
          answer: `Yes, your channel display name can include spaces and capitalization (e.g., 'Creative Reviews'), while your unique @handle must be lowercase, continuous, and platform-compliant.`
        },
        {
          question: `How often can I change my channel name or handle?`,
          answer: `Platforms like YouTube and Twitch permit occasional changes, but frequent renaming can temporarily disrupt subscriber recognition and channel search lookup.`
        },
        {
          question: `How do I choose a creator name that scales over time?`,
          answer: `Avoid hyper-specific niche terms if you plan to expand your content topics later. Choose a flexible, brandable handle that accommodates future content growth.`
        },
        {
          question: `Are creator name suggestions guaranteed to be unregistered?`,
          answer: `No. You must check availability directly on YouTube, Twitch, TikTok, or other target platforms before building your brand around a generated idea.`
        },
        {
          question: `Do these channel names guarantee higher viewer retention?`,
          answer: `No. Viewer retention depends entirely on the quality of your video content and audience engagement; names simply help establish initial clarity and memorability.`
        }
      ];
    } else if (category === "professional") {
      faqs = [
        {
          question: `How should I format my professional LinkedIn URL and handle?`,
          answer: `Keep your professional handle as close to your actual professional name as possible (e.g., first-name dot last-name), avoiding informal abbreviations or nicknames.`
        },
        {
          question: `Why is consistency important across professional networks?`,
          answer: `Consistency across LinkedIn, corporate email, and professional portfolios helps prospective clients, recruiters, and colleagues find and recognize you effortlessly.`
        },
        {
          question: `Can I use stylized fonts in professional handles?`,
          answer: `It is best to avoid stylized unicode fonts on professional profiles, as they can interfere with applicant tracking systems (ATS) and screen readers.`
        },
        {
          question: `Are these professional naming suggestions certified?`,
          answer: `No. These are educational suggestions designed to help structure professional online identities.`
        },
        {
          question: `Do professional handles impact search placement on LinkedIn?`,
          answer: `Using your true professional name or recognized industry terminology can support clarity in profile lookups, though search ranking is determined by many platform factors.`
        }
      ];
    } else {
      faqs = [
        {
          question: `What makes a great ${platform.toLowerCase()} name?`,
          answer: `An exceptional name is brief (usually under 15 characters), easy to pronounce, and uses clean syllables without random numbers or confusing symbols.`
        },
        {
          question: `How does the ${capitalizedKeyword} Generator create suggestions?`,
          answer: `Our tool uses a procedural algorithm that combines curated vocabulary roots and platform-compliant suffixes to help spark creative inspiration.`
        },
        {
          question: `Are generated names guaranteed to be available?`,
          answer: `No. Users must independently verify availability on their chosen platforms.`
        },
        {
          question: `Is NameFuse free to use?`,
          answer: `Yes, generating naming ideas and saving favorites is completely free.`
        },
        {
          question: `Can I use these suggestions for commercial projects?`,
          answer: `Yes, for inspiration, though you should verify trademark and domain availability before commercial launch.`
        }
      ];
    }
  }

  return {
    path,
    platform,
    defaultStyle: style,
    metaTitle,
    metaDescription,
    h1,
    subtitle,
    features,
    introduction,
    sections,
    faqs
  };
}
