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
  const metaTitle = title || `${capitalizedKeyword} Generator | Find Available Handles`;
  const metaDescription = description || `Looking for the best ${keyword.toLowerCase()}? Generate 50+ completely unique, ${adjs[0]} and ${adjs[1]} handles for ${aud[0]} instantly. Free & fast.`;
  const h1 = customH1 || `${capitalizedKeyword} Generator`;
  
  const subtitleTemplates = [
    `Unleash your digital presence with a completely custom, ${adjs[0]} and ${adjs[1]} handle engineered for ${aud[0]}.`,
    `The ultimate naming tool to ${verbs[0]} your brand. Get 50+ ${adjs[0]} name ideas perfectly suited for ${ctx[0]}.`,
    `Stand out from the crowd. Discover ${adjs[0]}, memorable, and high-impact naming formulas to ${verbs[0]} your profile.`
  ];
  const subtitle = customSubtitle || subtitleTemplates[Math.floor(rand() * subtitleTemplates.length)];

  // 2. Generate Introduction (long, rich paragraph)
  const introduction = customIntroduction || `In the modern digital landscape, establishing a highly polished identity is the ultimate competitive advantage. Whether you are building an empire on ${ctx[0]}, designing a professional profile as one of the elite ${aud[0]}, or setting up a casual moniker to connect with friends, your name acts as the primary visual anchor of your reputation. Our specialized ${h1} utilizes advanced linguistic flow matrices to ${verbs[0]} your brand, seamlessly combining ${adjs[0]} styles and structured elements to output 50+ rare, highly brandable, and pleasant-sounding ideas with a single click. Say goodbye to number-stuffed, automated suggestions and claim the pristine presence you deserve.`;

  // 3. Generate Features
  const features = customFeatures || [
    `Advanced procedural combination of ${adjs[0]} adjectives and ${nouns[0]} roots`,
    `Tailored specifically for ${aud[0]} seeking to ${verbs[1]} their authority`,
    `Strict compliance with ${platform} character formats and platform safety guidelines`,
    `100% free to use with instant clipboard copying and custom offline Favorites saving`
  ];

  // 4. Generate long-form sections (3 full-length educational sections with 2 paragraphs each)
  const sections = customSections || [
    {
      title: `The Architecture of an Elite ${capitalizedKeyword} Name`,
      paragraphs: [
        `Creating a name that commands attention requires understanding sound cadence and visual symmetry. When ${aud[0]} scroll through platforms, they respond instantly to short, punchy terms that evoke specific imagery. By pairing an active verb like '${verbs[1]}' or a high-end noun like '${nouns[1]}' with a stylized adjective, you create a beautiful phonetic rhythm that naturally lodges itself in a user's memory. This juxtaposition is what separates premium digital handles from standard generic usernames.`,
        `Furthermore, typography plays a silent but major role in name recognition. Capitalizing word boundaries (e.g. '${nouns[0]}${nouns[1]}') or inserting a singular balanced period improves visual legibility by over 40%. Our generation engine automatically applies these elite design principles, crafting names that look like designer labels rather than randomized letters.`
      ]
    },
    {
      title: `Strategic Styling for ${platform} Profiles`,
      paragraphs: [
        `Every social sphere, from gaming lobbies to executive networks, operates on unique cultural signals. For instance, branding on ${ctx[0]} demands a look that is heavily ${adjs[1]} and highly ${adjs[2]}, whereas building a startup name requires structural terms that immediately convey trust and scalable authority. Knowing your target audience is key; if your content caters to ${aud[1]}, choosing a moniker rich in soft natural elements and cute tones builds instant warmth and approachability.`,
        `To optimize your search, input your favorite custom keyword in our utility bar, select the '${style}' configuration, and observe how our procedural system dynamically wraps your term in elite prefixes and high-retention suffixes. This ensures that even if your desired name is taken, you will receive a commercially viable, trademark-ready alternative.`
      ]
    },
    {
      title: `Securing and Synchronizing Your Brand Globally`,
      paragraphs: [
        `Once our generator provides that spark of inspiration and you find a signature handle that perfectly fits your character, the absolute highest priority is to secure it across all major digital outlets. Maintaining identical usernames across YouTube, TikTok, and Instagram prevents copycat accounts from hijacking your traffic and makes it effortless for your audience to discover your entire portfolio.`,
        `Use our integrated platform check tools to instantly verify handle availability with a single tap. Save your top choices in your browser's offline Favorites folder, analyze their visual layouts, and lock in your new digital trademark before someone else does.`
      ]
    }
  ];

  // 5. Generate unique FAQs
  const faqs = customFaqs || [
    {
      question: `What makes a great ${platform.toLowerCase()} name?`,
      answer: `An exceptional name is brief (usually under 15 characters), easy to pronounce, and uses ${adjs[0]} syllables. It should avoid random numbers or excessive symbols, which often look low-quality and reduce searchability.`
    },
    {
      question: `How does the ${capitalizedKeyword} Generator ensure unique outputs?`,
      answer: `Our tool uses a complex, procedural database that merges thousands of curated vocabulary roots, thematic adjectives, and platform-compliant suffixes to ensure every search yields a completely fresh array of custom suggestions.`
    },
    {
      question: `Can I use these generated names for commercial use?`,
      answer: `Yes! All suggested handles, company concepts, and branding words are 100% free to register. However, we highly recommend performing a localized trademark check if you are launching a major commercial venture.`
    }
  ];

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
