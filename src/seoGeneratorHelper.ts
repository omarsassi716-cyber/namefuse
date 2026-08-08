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
  if (path.endsWith("usernames")) {
    category = "usernames";
  } else if (path.endsWith("names") && !path.endsWith("brand-names") && !path.endsWith("team-names") && !path.endsWith("creator-names") && !path.endsWith("startup-names") && !path.endsWith("ai-names")) {
    category = "names";
  } else if (path.endsWith("brand-names")) {
    category = "brands";
  } else if (path.endsWith("gamertags")) {
    category = "gamertags";
  } else if (path.endsWith("nicknames")) {
    category = "nicknames";
  } else if (path.endsWith("team-names")) {
    category = "teams";
  } else if (path.endsWith("creator-names")) {
    category = "creators";
  } else if (path.endsWith("startup-names")) {
    category = "startups";
  } else if (path.endsWith("ai-names")) {
    category = "ai_naming";
  } else if (path.endsWith("social-handles")) {
    category = "social_handles";
  } else {
    if (path.includes("username")) category = "usernames";
    else if (path.includes("gamertag")) category = "gamertags";
    else if (path.includes("brand")) category = "brands";
    else if (path.includes("startup")) category = "startups";
    else if (path.includes("team")) category = "teams";
    else if (path.includes("nickname")) category = "nicknames";
    else if (path.includes("creator")) category = "creators";
    else if (path.includes("display-name") || path.includes("display-names")) category = "usernames";
  }

  // 2. Generate Introduction (long, rich paragraph based on category)
  let introduction = customIntroduction;
  if (!introduction) {
    if (category === "brands" || category === "startups") {
      introduction = `Launching a successful business or startup begins with securing a highly brandable, memorable, and trustworthy name. In today's digital economy, your brand name is your first customer touchpoint, directly influencing customer retention, market authority, and organic search positioning. Our specialized ${h1} combines premium, industry-aligned vocabulary with clean phonetic structures to help you discover elite, trademark-ready brand names with a single click. Say goodbye to cluttered, low-quality suggestions and unlock the pristine presence your commercial venture deserves.`;
    } else if (category === "gamertags") {
      introduction = `In the fast-paced multiplayer gaming arena, your gamertag is your shield, your banner, and your digital reputation. Whether you are leading a tactical squad, climbing the competitive ranks, or building immersive virtual worlds, a strong name commands respect and builds instant camaraderie. Our specialized ${h1} produces aggressive, competitive, and esports-ready aliases optimized for killfeeds, Twitch streaming overlays, and server leaderboards. Say goodbye to number-stuffed suggestions and claim your elite moniker.`;
    } else if (category === "usernames" || category === "social_handles") {
      introduction = `A memorable social media username is the cornerstone of your personal brand and online identity. In a visual-first digital ecosystem, your handle is the primary headline of your profile grid, directly impacting follower discoverability, click-through rates, and trust. Our specialized ${h1} combines beautiful aesthetic prefixes with sleek rhythmic suffixes to generate platform-compliant usernames designed to stand out in active comment threads and discovery feeds. Claim the pristine presence you deserve.`;
    } else if (category === "nicknames" || category === "names") {
      introduction = `Choosing the perfect nickname or character name is a deeply creative process, whether you are worldbuilding a fantasy novel, roleplaying in community forums, or selecting an endearing moniker for a loved one. A great name carries emotional warmth, poetic cadence, and memorable imagery. Our specialized ${h1} blends soft, beautiful, and historical naming roots to deliver unique, pleasant-sounding ideas tailored to your characters, gaming avatars, or friend groups.`;
    } else if (category === "teams") {
      introduction = `A powerful team or clan name is the ultimate anchor of group unity, competitive pride, and team spirit. Whether you are forming a professional esports organization, a local sports club, or a raid syndicate in an MMO, your banner needs to look formidable and sound cohesive on the leaderboard. Our specialized ${h1} provides professional, high-energy, and legendary team name formulas designed for tournament brackets and league registers.`;
    } else if (category === "creators") {
      introduction = `For streamers, vloggers, and content creators, a memorable display handle is the foundation of high-retention personal branding. As an online creator, your channel title directly affects search engine indexation, viewer click-through rates, and long-term brand equity across platforms. Our specialized ${h1} generates professional, clean, and catchy naming concepts designed to build trust and capture audience attention instantly.`;
    } else if (category === "ai_naming") {
      introduction = `Naming artificial intelligence systems, bots, or virtual assistants requires a forward-looking, clean, and highly innovative vocabulary. Whether you are launching a SaaS automation tool, a community moderator bot, or a smart neural model, the name should convey competence, futuristic vision, and clean digital efficiency. Our specialized ${h1} produces sleek, cybernetic, and high-tech name concepts tailored for modern agents.`;
    } else {
      introduction = `In the modern digital landscape, establishing a highly polished identity is the ultimate competitive advantage. Whether you are building an empire, designing a professional profile, or setting up a casual moniker to connect with friends, your name acts as the primary visual anchor of your reputation. Our specialized ${h1} utilizes advanced linguistic flow matrices to elevate your brand, seamlessly combining premium styles and structured elements to output 50+ rare, highly brandable, and pleasant-sounding ideas.`;
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

    const nickPrefixes = ["Tiny", "Cozy", "Sweet", "Soft", "Honey", "Little", "Baby", "Sunny", "Peachy", "Dewy", "Cuddle", "Pip", "Chippy", "Dolly", "Fuzzy", "Panda", "Silly", "Wiggle", "Bubbles", "Lucky"];
    const nickSuffixes = ["Bean", "Sprout", "Peach", "Button", "Blossom", "Bear", "Cloud", "Berry", "Sparkle", "Chime", "Bug", "Plum", "Bunny", "Clover", "Poppy", "Honey", "Puff", "Bake", "Waffle", "Noodle"];

    const teamPrefixes = ["United", "Apex", "Vanguard", "Elite", "Tactical", "Rogue", "Valor", "Legacy", "Synergy", "Alpha", "Omega", "Infinity", "Horizon", "Ascent", "Dynasty", "Nexus", "Summit", "Alliance", "Prime", "Iron"];
    const teamSuffixes = ["Alliance", "Syndicate", "Legion", "Squad", "Brigade", "Force", "Collective", "Vanguard", "Apex", "Patrol", "Club", "Guild", "Synergy", "Faction", "Roster", "Regiment", "Unit", "Rangers", "Knights", "Outlaws"];

    const creatorPrefixes = ["Creative", "Tech", "Lifestyle", "Vibe", "Review", "Stream", "Explore", "Unfiltered", "Cozy", "Daily", "Aero", "Vivid", "Focus", "Vision", "Vocal", "Beyond", "Pure", "Rare", "Social", "True"];
    const creatorSuffixes = ["Channel", "HQ", "Lab", "Media", "Studio", "Lounge", "Diaries", "Vlog", "Central", "Hub", "Show", "Zone", "Network", "Cast", "Chronicles", "Pulse", "Lab", "Digest", "Collective", "Vibe"];

    const aiPrefixes = ["Neural", "Smart", "Cyber", "Auto", "Aero", "Omni", "Nova", "Veloce", "Apex", "Helix", "Cogni", "Synapse", "Tensor", "Vector", "Logic", "Mind", "Robo", "Net", "Matrix", "Byte"];
    const aiSuffixes = ["Agent", "Bot", "Model", "Engine", "Node", "Core", "Flow", "Mesh", "Vault", "Grid", "System", "Brain", "Link", "Sync", "Process", "App", "Shell", "Script", "Unit", "Signal"];

    let pList = userPrefixes;
    let sList = userSuffixes;

    if (cat === "brands" || cat === "startups") {
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
    } else if (cat === "ai_naming") {
      pList = aiPrefixes;
      sList = aiSuffixes;
    } else if (cat === "social_handles") {
      pList = userPrefixes;
      sList = userSuffixes;
    }

    const seen = new Set<string>();
    while (examples.length < 10) {
      const pref = pList[Math.floor(subRand() * pList.length)];
      const suff = sList[Math.floor(subRand() * sList.length)];
      const comb = cat === "social_handles" || cat === "usernames" ? `${pref}_${suff}`.toLowerCase() : `${pref} ${suff}`;
      if (!seen.has(comb)) {
        seen.add(comb);
        examples.push(comb);
      }
    }
    return examples;
  };

  // 4. Generate long-form sections (4-6 full-length educational sections with 2 paragraphs each)
  let sections = customSections;
  if (!sections) {
    const examplesList = getCuratedExamples(category);
    
    if (category === "brands" || category === "startups") {
      sections = [
        {
          title: `The Core Principles of Brand Nomenclature`,
          paragraphs: [
            `A successful brand name must combine semantic clarity with commercial appeal. When clients encounter your name on digital storefronts, pitch decks, or app markets, it should immediately trigger positive associations. The best business names are brief, easy to pronounce, and contain professional root words that convey authority and industry expertise.`,
            `Avoid generic, descriptive words that make trademark registration difficult. Instead, opt for abstract neologisms or sleek compound words (such as combining a high-growth verb with a solid structural noun). This creates an elite brand image that is highly memorable and easily defensible in future trademark filings.`
          ]
        },
        {
          title: `Domain Strategy & Multi-Platform Cohesion`,
          paragraphs: [
            `Securing your digital brand requires a proactive domain portfolio strategy. In addition to claiming your primary .com domain, it is essential to lock in identical usernames across LinkedIn, Twitter, and major online directories. Consistency prevents bad actors from hijacking your brand traffic and allows customers to discover your services effortlessly.`,
            `Use our built-in availability shortcuts to verify your name ideas across global registries. By pairing your keyword with professional suffixes like 'Labs', 'HQ', 'Holdings', or 'Studio', you can discover high-value, available domains that preserve a clean, uncluttered brand identity.`
          ]
        },
        {
          title: `10 Curated ${capitalizedKeyword} Examples & Creative Inspiration`,
          paragraphs: [
            `To help jumpstart your brainstorming session, here are 10 highly brandable, professional name combinations generated by our seed-engine. These ideas showcase optimal syllables balance and industry-aligned naming structures:`,
            `1. ${examplesList[0]} | 2. ${examplesList[1]} | 3. ${examplesList[2]} | 4. ${examplesList[3]} | 5. ${examplesList[4]} | 6. ${examplesList[5]} | 7. ${examplesList[6]} | 8. ${examplesList[7]} | 9. ${examplesList[8]} | 10. ${examplesList[9]}`
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
          title: `Console Restrictions and Character Limits`,
          paragraphs: [
            `Every gaming ecosystem maintains strict rules regarding character counts and symbols. For instance, Xbox Live and PlayStation Network restrict online IDs to 12-16 characters, while platforms like Roblox support up to 20. Ensuring proper alignment with these guidelines prevents annoying registration errors during account setup.`,
            `Our procedural gaming generator is automatically calibrated to enforce these exact platform boundaries. Whether you are generating tags for Discord, Steam, or console networks, our names are sanitized to guarantee smooth, error-free claiming.`
          ]
        },
        {
          title: `10 Curated ${capitalizedKeyword} Examples & Creative Inspiration`,
          paragraphs: [
            `Looking for a spark of inspiration? Here are 10 competitive, high-cadence gamertag ideas generated specifically for this platform style. They demonstrate ideal syllable pacing and visual impact:`,
            `1. ${examplesList[0]} | 2. ${examplesList[1]} | 3. ${examplesList[2]} | 4. ${examplesList[3]} | 5. ${examplesList[4]} | 6. ${examplesList[5]} | 7. ${examplesList[6]} | 8. ${examplesList[7]} | 9. ${examplesList[8]} | 10. ${examplesList[9]}`
          ]
        }
      ];
    } else if (category === "usernames" || category === "social_handles") {
      sections = [
        {
          title: `Social Media Branding: The Mononym Advantage`,
          paragraphs: [
            `Establishing a highly polished presence on Instagram, TikTok, or YouTube requires a username that is both memorable and easy to search. The most successful creators utilize a mononym or a highly structured double-word name that functions as a personal brand. Your handle acts as the visual headline of your page, so keeping it clean and readable is a major priority.`,
            `Avoid repeating letters or adding excessive underscores, which confuse voice search algorithms and look unprofessional. A singular balanced dot or underscore between two clean words (e.g., 'haze.studio') is the industry standard for high-end creators and aesthetic grids.`
          ]
        },
        {
          title: `Cross-Platform Handle Synchronization`,
          paragraphs: [
            `As your digital footprint expands, maintaining identical handles across YouTube, TikTok, Pinterest, and Twitter is critical to lock in your brand equity. A unified handle allows your audience to transition seamlessly between your video content, photo galleries, and personal updates without losing track of your profile.`,
            `If your exact desired name is already taken, do not resort to adding random strings of numbers. Instead, try adding clean, contextual tags. For design or photography pages, append '.lens', '.raw', or '.studio'. Personal accounts can use '.space', '.journal', or '.co' for an elegant finish.`
          ]
        },
        {
          title: `10 Curated ${capitalizedKeyword} Examples & Creative Inspiration`,
          paragraphs: [
            `Need some creative ideas? Below are 10 highly aesthetic, unblemished username combinations generated by our engine. They use clean word-boundaries and modern style prefixes:`,
            `1. ${examplesList[0]} | 2. ${examplesList[1]} | 3. ${examplesList[2]} | 4. ${examplesList[3]} | 5. ${examplesList[4]} | 6. ${examplesList[5]} | 7. ${examplesList[6]} | 8. ${examplesList[7]} | 9. ${examplesList[8]} | 10. ${examplesList[9]}`
          ]
        }
      ];
    } else if (category === "nicknames" || category === "names") {
      sections = [
        {
          title: `The Linguistics of Affectionate Nicknames`,
          paragraphs: [
            `A great nickname should feel warm, friendly, and deeply personal. Unlike formal usernames, nicknames thrive on soft phonetic doubling (like 'Coco' or 'Lulu') and sweet, nature-inspired terms that build instant connection. Choosing a nickname is about capturing a charming trait, a shared memory, or a gentle atmosphere.`,
            `Phonetic warmth plays a key role in name recognition. Consonants like M, N, L, and soft vowels create a soothing, comforting cadence when spoken aloud, which is why names like 'Mimi' or 'Bean' feel so endearing.`
          ]
        },
        {
          title: `Baby and Pet Naming Strategies`,
          paragraphs: [
            `Naming the next generation or a new four-legged companion requires blending classic roots with a touch of modern uniqueness. For children, forward-thinking parents are increasingly considering future digital availability, checking domain names alongside traditional registries. For pets, choosing a short, punchy name with sharp phonetic endings (like 'Cookie' or 'Ranger') ensures high auditory recognition.`,
            `Our generator curates gentle, creative, and family-friendly ideas that are perfect for personalized baby blankets, pet collars, and nursery room cards alike.`
          ]
        },
        {
          title: `10 Curated ${capitalizedKeyword} Examples & Creative Inspiration`,
          paragraphs: [
            `Discover a world of cozy, sweet, and unique naming options. Here are 10 custom-generated nickname examples showing off beautiful cadence and warmth:`,
            `1. ${examplesList[0]} | 2. ${examplesList[1]} | 3. ${examplesList[2]} | 4. ${examplesList[3]} | 5. ${examplesList[4]} | 6. ${examplesList[5]} | 7. ${examplesList[6]} | 8. ${examplesList[7]} | 9. ${examplesList[8]} | 10. ${examplesList[9]}`
          ]
        }
      ];
    } else if (category === "teams") {
      sections = [
        {
          title: `Formulating a Legendary Team or Clan Banner`,
          paragraphs: [
            `A powerful team name represents the collective ambition, tactical synergy, and competitive drive of its members. Whether you are launching a tournament-ready esports organization, a local soccer club, or a co-op gaming syndicate, your team name must command respect and foster high morale. The most effective team names combine unified, heroic terminology with aggressive or futuristic modifiers.`,
            `Avoid generic clichés that make your squad blend into the background. Instead, choose names that hint at tactical precision, historical alliances, or unstoppable force, creating a memorable brand for leagues and community leaderboards.`
          ]
        },
        {
          title: `Branding for Esports and Tournaments`,
          paragraphs: [
            `When competing in high-profile leagues, your name is featured on tournament brackets, stream broadcast overlays, and team banners. Choosing a cohesive, balanced title ensures that shoutcasters can announce your name easily and fans can identify your logo instantly. Keeping the main name to a single, high-impact word paired with a team suffix (like 'Syndicate', 'Vanguard', or 'Legion') is a proven esports strategy.`,
            `Use our team name generator to explore diverse, high-energy formulations tailored specifically to your competitive niche, complete with instant clipboard shortcuts.`
          ]
        },
        {
          title: `10 Curated ${capitalizedKeyword} Examples & Creative Inspiration`,
          paragraphs: [
            `Unify your roster under an epic banner. Here are 10 custom-generated team names designed to sound professional and formidable:`,
            `1. ${examplesList[0]} | 2. ${examplesList[1]} | 3. ${examplesList[2]} | 4. ${examplesList[3]} | 5. ${examplesList[4]} | 6. ${examplesList[5]} | 7. ${examplesList[6]} | 8. ${examplesList[7]} | 9. ${examplesList[8]} | 10. ${examplesList[9]}`
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
          title: `Optimizing Your Handle for Search Algorithms`,
          paragraphs: [
            `Including a broad niche keyword (like 'Tech', 'Finance', 'Kitchen', or 'Designs') in your channel display name helps search algorithms index your content and place your videos in relevant recommendation grids. Combine your keyword with professional prefixes or high-retention suffixes (like 'HQ', 'Lab', 'Media', or 'Channel') to build an instant authoritative presence.`,
            `Use our specialized creator name generator to explore beautiful, search-intent-focused ideas that comply with platform limits and preserve professional styling.`
          ]
        },
        {
          title: `10 Curated ${capitalizedKeyword} Examples & Creative Inspiration`,
          paragraphs: [
            `Build your digital audience on a rock-solid foundation. Here are 10 highly clickable, clickable channel name concepts:`,
            `1. ${examplesList[0]} | 2. ${examplesList[1]} | 3. ${examplesList[2]} | 4. ${examplesList[3]} | 5. ${examplesList[4]} | 6. ${examplesList[5]} | 7. ${examplesList[6]} | 8. ${examplesList[7]} | 9. ${examplesList[8]} | 10. ${examplesList[9]}`
          ]
        }
      ];
    } else if (category === "ai_naming") {
      sections = [
        {
          title: `The Cybernetic Aesthetic: Naming AI and Agents`,
          paragraphs: [
            `Naming an AI assistant, autonomous agent, or smart automation model requires a futuristic, clean, and highly innovative vocabulary. The ideal AI name is short, tech-focused, and communicates intelligence and capability. In today's software economy, your AI's name represents the personality of your service, directly influencing customer comfort and trust.`,
            `Avoid overly complex technical labels that feel cold or intimidating. Instead, opt for friendly, cybernetic compound terms or sleek, short mononyms that sound like competent digital companions.`
          ]
        },
        {
          title: `Branding for SaaS and Automation Tools`,
          paragraphs: [
            `For AI-driven SaaS companies and automated developer tools, having a name with a strong .io or .ai domain is critical. Your name should look incredible on pitch deck slides, mobile app store grids, and developer forums, conveying seamless operational efficiency and modern architecture.`,
            `Our specialized AI generator curates high-end tech prefixes with automated, futuristic suffixes, ensuring your software brand looks like a market-leading intelligence suite.`
          ]
        },
        {
          title: `10 Curated ${capitalizedKeyword} Examples & Creative Inspiration`,
          paragraphs: [
            `Discover sleek, modern names for your neural models or digital assistants. Here are 10 high-tech concepts generated by our engine:`,
            `1. ${examplesList[0]} | 2. ${examplesList[1]} | 3. ${examplesList[2]} | 4. ${examplesList[3]} | 5. ${examplesList[4]} | 6. ${examplesList[5]} | 7. ${examplesList[6]} | 8. ${examplesList[7]} | 9. ${examplesList[8]} | 10. ${examplesList[9]}`
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
          title: `Strategic Styling for ${platform} Profiles`,
          paragraphs: [
            `Every social sphere, from gaming lobbies to executive networks, operates on unique cultural signals. Knowing your target audience is key; if your content caters to visual curators, choosing a moniker rich in soft natural elements and aesthetic tones builds instant warmth and approachability.`,
            `To optimize your search, input your favorite custom keyword in our utility bar, select the '${style}' configuration, and observe how our procedural system dynamically wraps your term in elite prefixes and high-retention suffixes.`
          ]
        },
        {
          title: `10 Curated ${capitalizedKeyword} Examples & Creative Inspiration`,
          paragraphs: [
            `Looking for a spark of inspiration? Below are 10 unique, custom-generated name combinations using clean formatting and optimal syllables:`,
            `1. ${examplesList[0]} | 2. ${examplesList[1]} | 3. ${examplesList[2]} | 4. ${examplesList[3]} | 5. ${examplesList[4]} | 6. ${examplesList[5]} | 7. ${examplesList[6]} | 8. ${examplesList[7]} | 9. ${examplesList[8]} | 10. ${examplesList[9]}`
          ]
        }
      ];
    }
  }

  // 5. Generate unique FAQs
  let faqs = customFaqs;
  if (!faqs) {
    if (category === "brands" || category === "startups") {
      faqs = [
        {
          question: `How do I check if a brand name is already trademarked?`,
          answer: `We highly recommend searching the official database of your local trademark office (such as the USPTO in the United States or EUIPO in Europe) before launching. You can also use our built-in links to check domain name availability instantly.`
        },
        {
          question: `What is a 'brandable' business name?`,
          answer: `A brandable business name avoids generic descriptive words and instead blends rhythmic sounds, sleek syllables, and memorable industry terminology (like 'Labs' or 'Studio') to create a premium, stand-out brand identity.`
        },
        {
          question: `Can I use these generated names commercially?`,
          answer: `Yes, all suggested names are 100% free to use. However, doing a comprehensive trademark check is always recommended to avoid local corporate overlaps.`
        }
      ];
    } else if (category === "gamertags") {
      faqs = [
        {
          question: `What are the character limits for modern consoles?`,
          answer: `Xbox Live and PlayStation Network both restrict usernames to 12-16 characters. Roblox supports up to 20 characters. Our generator is pre-programmed to enforce these limits so your tags are ready to claim.`
        },
        {
          question: `Why should I avoid special symbols in my gamertag?`,
          answer: `Symbols like exclamation points or brackets often fail to render correctly in fast-paced lobbies or killfeeds, sometimes showing up as broken boxes. Clean alphanumeric names look elite and are much easier for shoutcasters to read.`
        },
        {
          question: `Can I use these names on Steam or Discord?`,
          answer: `Yes! These names are fully compatible with Steam, Discord, Xbox, PlayStation, and all other major digital gaming networks.`
        }
      ];
    } else if (category === "usernames" || category === "social_handles") {
      faqs = [
        {
          question: `How can I secure a unique social handle if my desired name is taken?`,
          answer: `Try appending a clean contextual prefix or suffix rather than adding cluttered numbers. Excellent additions for visual creators include '.lens', '.raw', or '.studio', while personal pages look elegant with '.space' or '.journal'.`
        },
        {
          question: `Is it better to have the same handle across all platforms?`,
          answer: `Yes! Having a unified username across Instagram, TikTok, YouTube, and Twitter makes it simple for your audience to discover your entire portfolio, preventing copycats and building consistent brand equity.`
        },
        {
          question: `How often can I change my social media handle?`,
          answer: `Most platforms like Instagram and TikTok allow username changes once every 14 days. This gives you flexibility to experiment, but consistency is recommended to maintain indexation.`
        }
      ];
    } else if (category === "nicknames" || category === "names") {
      faqs = [
        {
          question: `What makes a nickname sound warm and friendly?`,
          answer: `Affectionate nicknames often utilize soft double-syllables (like 'Lulu' or 'Coco') and natural, comforting nouns (like 'Bean', 'Sprout', or 'Cloud') which are phonetically pleasing and easy to say.`
        },
        {
          question: `Can I use these names for fantasy worldbuilding?`,
          answer: `Absolutely! Our naming database is rich in historical, poetic, and vintage roots, making it an excellent resource for roleplay campaigns, character sheets, and creative literature.`
        },
        {
          question: `Are these names suitable for pet naming?`,
          answer: `Yes! The soft phonetics and punchy syllable breaks are perfect for dogs, cats, or other animal companions to easily recognize.`
        }
      ];
    } else if (category === "teams") {
      faqs = [
        {
          question: `How long should a professional esports team name be?`,
          answer: `A professional team name should be concise—ideally one or two words. Many elite organizations pair a distinct team word with a structural suffix like 'Syndicate', 'Vanguard', or 'Esports'.`
        },
        {
          question: `Does this team name generator support gaming clans?`,
          answer: `Yes! It produces aggressive, tactical, and legendary team and clan names perfectly formatted for competitive lobbies and league directories.`
        }
      ];
    } else if (category === "creators") {
      faqs = [
        {
          question: `Should my channel display name be different from my handle?`,
          answer: `Yes, your channel display name can include spaces and capitalization (e.g. 'Cozy Reviews'), while your unique @handle must be lowercase, continuous, and platform-compliant.`
        },
        {
          question: `How often can I change my YouTube name or handle?`,
          answer: `YouTube allows name and handle changes twice within a 14-day window. However, frequent changes confuse existing subscribers and can impact search ranking consistency.`
        }
      ];
    } else if (category === "ai_naming") {
      faqs = [
        {
          question: `What are some modern suffix options for AI bot names?`,
          answer: `Futuristic and highly professional suffix choices include 'Agent', 'Bot', 'Engine', 'Node', 'Core', 'Flow', and 'Model', which convey high intelligence and automated efficiency.`
        },
        {
          question: `Is this suitable for SaaS company products?`,
          answer: `Yes, our AI name generator focuses on clean, cybernetic, and premium corporate titles that are perfect for software applications, developer tools, and automation suites.`
        }
      ];
    } else {
      faqs = [
        {
          question: `What makes a great ${platform.toLowerCase()} name?`,
          answer: `An exceptional name is brief (usually under 15 characters), easy to pronounce, and uses ${adjs[0]} syllables. It should avoid random numbers or excessive symbols, which often look low-quality and reduce searchability.`
        },
        {
          question: `How does the ${capitalizedKeyword} Generator ensure unique outputs?`,
          answer: `Our tool uses a complex, procedural database that merges thousands of curated vocabulary roots, thematic adjectives, and platform-compliant suffixes to ensure every search yields a completely fresh array of suggestions.`
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
