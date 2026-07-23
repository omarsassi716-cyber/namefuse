// Vocabulary lists for procedural username generation
const prefixesMap: Record<string, string[]> = {
  Gaming: [
    "Vortex", "Shadow", "Apex", "Pixel", "Titan", "Glitch", "Nexus", "Spectre",
    "Rogue", "Cyber", "Alpha", "Nova", "Ghost", "Hyper", "Phantom", "Retro",
    "Omega", "Matrix", "Cipher", "Bullet", "Zero", "Storm", "Rage", "Viper",
    "Strike", "Thunder", "Blaze", "Chaos", "Pulse", "Static", "Frost", "Wraith",
    "Havoc", "Vandal", "Scythe", "Echo"
  ],
  Cool: [
    "Neon", "Vibe", "Echo", "Aura", "Flux", "Zenith", "Cipher", "Shift",
    "Ignite", "Riddle", "Drift", "Pulse", "Lunar", "Solar", "Static", "Vertex",
    "Onyx", "Quantum", "Volt", "Aero", "Krypton", "Vector", "Mirage", "Prism",
    "Astro", "Cosmo", "Orbit", "Helix", "Catalyst", "Kinetic", "Ignis", "Wave"
  ],
  Professional: [
    "Pro", "Apex", "Prime", "Core", "Elite", "Nova", "Omni", "Inno", "Sync",
    "Veritas", "Aegis", "Sovereign", "Intel", "Axis", "Stellar", "Focus", "Vantage",
    "Nexus", "Beacon", "Pinnacle", "Summit", "Crest", "Vista", "Alpha", "Zenith"
  ],
  Funny: [
    "Silly", "Wobbly", "Derpy", "Goofy", "Chunky", "Funky", "Sassy", "Cheeky",
    "Wonky", "Bumpy", "Dizzy", "Loopy", "Lazy", "Wacky", "Clumsy", "Dumpy",
    "Grumpy", "Nutty", "Salty", "Spicy", "Snoozy", "Bouncy", "Giggly", "Flabby"
  ],
  Aesthetic: [
    "Ethereal", "Luminous", "Serene", "Velvet", "Cosmic", "Pastel", "Golden",
    "Floral", "Dewy", "Silk", "Hazy", "Soft", "Sweet", "Honey", "Cherry",
    "Satin", "Lilac", "Ivory", "Amber", "Opal", "Cloudy", "Dusk", "Dawn", "Petal",
    "Celeste", "Luna", "Aura", "Solitude", "Melancholy"
  ],
  Dark: [
    "Void", "Grim", "Doom", "Abyss", "Crypt", "Vamp", "Nocturne", "Necro",
    "Phantom", "Cinder", "Sorrow", "Hollow", "Eclipse", "Wraith", "Scythe",
    "Tomb", "Shade", "Bane", "Spectre", "Ruin", "Fallen", "Gothic", "Midnight"
  ],
  Cute: [
    "Tiny", "Baby", "Fluffy", "Chibi", "Sunny", "Peachy", "Pinky", "Mimi",
    "Puffy", "Mini", "Cozy", "Sweetie", "Snuggly", "Little", "Bitty", "Cuddly",
    "Sugar", "Milky", "Cookie", "Panda", "Koala", "Pixie", "Fairy", "Bubbles"
  ],
  Creator: [
    "Art", "Studio", "By", "IAm", "Design", "Built", "Make", "Pixel", "Craft",
    "Hello", "The", "HeyIts", "ThisIs", "Lens", "Mind", "Visual", "Alpha", "Idea",
    "Concept", "Canvas", "Raw"
  ],
  Influencer: [
    "HeyIts", "IAm", "Meet", "Daily", "LifeOf", "TheReal", "With", "Hey", "Just",
    "Hello", "Its", "Simply", "Chasing", "Always", "Only", "Ask"
  ],
  Business: [
    "Apex", "Prime", "Core", "Elite", "Nexus", "Vertex", "Stellar", "Vantage",
    "Beacon", "Pinnacle", "Summit", "Crest", "Vista", "Alpha", "Zenith", "Nordic",
    "Omni", "Nova", "Optima", "Sovereign", "Aegis", "Intel", "Veritas"
  ],
  Minimal: [
    "Neo", "Luxe", "Zen", "Vibe", "Flux", "Pure", "Soft", "Nova", "Halo", "Solo",
    "Raw", "Arc", "One", "Un", "Re", "Ox", "Vigo", "Argo", "Kite"
  ],
  Luxury: [
    "Onyx", "Ivory", "Royal", "Sovereign", "Imperial", "Aegis", "Satin", "Gilded",
    "Velvet", "Crown", "Monarch", "Noble", "Elysian", "Regal", "Aura", "Vanguard",
    "Grand", "Luxe", "Signature", "Prism", "Sable"
  ]
};

const suffixesMap: Record<string, string[]> = {
  Gaming: [
    "GG", "Plays", "PvP", "Gaming", "Racer", "Slayer", "Hunter", "Sniper",
    "Storm", "Force", "Mode", "Fury", "Claw", "Viper", "Beast", "Knight",
    "Ninja", "Squad", "Clan", "Ops", "Gamer", "Edge", "Grid", "Trigger", "Havoc", "Vandal"
  ],
  Cool: [
    "HQ", "Hub", "Lab", "Mind", "Wave", "Soul", "Flow", "Grid", "Loop",
    "Vault", "Realm", "Zone", "Draft", "Link", "Span", "Sphere", "Craft",
    "Forge", "Nest", "Central", "Hive", "Pulse", "Sync", "Shift"
  ],
  Professional: [
    "Group", "Media", "Studio", "Consulting", "Labs", "Digital", "Partners",
    "Global", "Network", "Creative", "Solutions", "Agency", "Ventures", "Capital",
    "Co", "Corp", "Systems", "Design", "Tech", "Press", "Guild"
  ],
  Funny: [
    "Saurus", "Potato", "Noodle", "Muffin", "Goblin", "Panda", "Sloth", "Burrito",
    "Taco", "Pickle", "Banana", "Waffle", "Unicorn", "Donut", "Marshmallow", "Yeti",
    "Chicken", "McFly", "Crab", "Sausage", "Nugget", "Cactus", "Onion"
  ],
  Aesthetic: [
    "Aesthetics", "Dreams", "Clouds", "Petal", "Mist", "Breeze", "Glow", "Dust",
    "Sigh", "Muse", "Soft", "Blush", "Flora", "Vibe", "Poem", "Lyrics", "Loom",
    "Meadow", "Whisper", "Rain", "Chime", "Melody", "Echo", "Hours", "Garden", "Fable"
  ],
  Dark: [
    "Soul", "Bane", "Grave", "Shadow", "Ash", "Reap", "Crypt", "Woe", "Ruin",
    "Fang", "Claw", "Thorn", "Veil", "Dagger", "Curse", "Blight", "Plague", "Shroud"
  ],
  Cute: [
    "Bunny", "Kitten", "Berry", "Puff", "Cheeks", "Cupcake", "Boba", "Bear",
    "Sweets", "Peep", "Star", "Angel", "Dolly", "Sparkle", "Sprinkles", "Daisy",
    "Sprout", "Pip", "Bug", "Plum", "Heart", "Honey", "Doughnut"
  ],
  Creator: [
    "Creates", "Creative", "Design", "Art", "Studio", "Media", "Craft", "Photo",
    "Films", "Draws", "Concept", "Works", "Space", "Journal", "Vlogs", "Clicks"
  ],
  Influencer: [
    "Vibe", "Life", "Diaries", "Journal", "Style", "Fits", "Chic", "Social",
    "World", "Feed", "Loop", "Living", "Days", "Mode", "Space", "Story", "Note"
  ],
  Business: [
    "Group", "Labs", "Agency", "Solutions", "Ventures", "Capital", "Co", "Corp",
    "Systems", "Creative", "Studio", "Partners", "Digital", "Global", "Network",
    "Consulting", "Holdings", "Enterprise"
  ],
  Minimal: [
    "HQ", "Box", "Lab", "Run", "Ink", "Dot", "Air", "Bay", "Raw", "Cut", "Arc", "Zip"
  ],
  Luxury: [
    "Luxe", "Prime", "Gold", "Crest", "Elite", "Saga", "Maison", "Atelier", "Estate",
    "Silk", "Opal", "Manor", "Club", "Bespoke", "Private", "Reserve"
  ]
};

// Vocabulary lists for brandable and viral combinations
const viralAdjectives = [
  "Golden", "Velvet", "Silent", "Cosmic", "Retro", "Vivid", "Liquid", "Ethereal",
  "Serene", "Pastel", "Glowing", "Lunar", "Solar", "Vapor", "Urban", "Stellar",
  "Nordic", "Noble", "Royal", "Gilded", "Aero", "Onyx", "Sable", "Pure", "Soft"
];

const viralNouns = [
  "Pulse", "Echo", "Glow", "Hour", "Vibe", "Wave", "Drift", "Shift", "Aura",
  "Pixel", "Storm", "Bloom", "Haze", "Mirage", "Prism", "Helix", "Orbit", "Spark",
  "Tide", "Loom", "Fable", "Craft", "Forge", "Quest", "Zenith", "Summit"
];

// Phonetically clean syllables for brandable neologisms (invented brand words)
const startSyllables = [
  "ve", "lu", "zo", "ae", "sy", "ca", "fi", "no", "re", "te", "am", "or", "ly",
  "ko", "xe", "so", "vy", "mi", "ze", "el", "ar", "ob", "ki", "py", "fa", "gl",
  "cr", "st", "al", "en", "im"
];

const midSyllables = [
  "ra", "lo", "ni", "da", "xi", "va", "co", "me", "li", "se", "ty", "bo", "ri",
  "ka", "tu", "ne", "go", "fa", "vi", "za", "ly"
];

const endSyllables = [
  "a", "is", "ex", "ly", "ify", "io", "ia", "us", "ax", "on", "ic", "os", "um",
  "or", "et", "it", "en", "el", "is", "ora", "eda", "ave", "ox"
];

// Helper to sanitize keywords according to platform rules
export function sanitizeKeyword(keyword: string, platform: string): string {
  let clean = keyword.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // strip accents
  
  if (platform === "Instagram" || platform === "TikTok" || platform === "Twitch" || platform === "Roblox") {
    if (platform === "Instagram" || platform === "TikTok") {
      clean = clean.replace(/[^a-zA-Z0-9_.]/g, "");
    } else {
      clean = clean.replace(/[^a-zA-Z0-9_]/g, "");
    }
  } else if (platform === "YouTube" || platform === "Discord") {
    clean = clean.replace(/[^a-zA-Z0-9_.-]/g, "");
  } else {
    clean = clean.replace(/[^a-zA-Z0-9_.-]/g, "");
  }
  
  return clean;
}

// Check platform length and character constraints and format
function formatUsername(name: string, platform: string): string {
  let formatted = name;

  if (["Instagram", "TikTok", "Discord"].includes(platform)) {
    formatted = formatted.toLowerCase();
  }

  // Remove consecutive dots, underscores, or dashes
  formatted = formatted.replace(/\.{2,}/g, ".");
  formatted = formatted.replace(/_{2,}/g, "_");
  formatted = formatted.replace(/-{2,}/g, "-");

  // Ensure names don't start or end with a dot or underscore on strict platforms
  if (["Instagram", "TikTok", "Roblox"].includes(platform)) {
    if (formatted.startsWith(".")) formatted = formatted.substring(1);
    if (formatted.endsWith(".")) formatted = formatted.slice(0, -1);
    if (platform === "Roblox") {
      if (formatted.startsWith("_")) formatted = formatted.substring(1);
      if (formatted.endsWith("_")) formatted = formatted.slice(0, -1);
    }
  }

  // Length constraints
  let maxLength = 32;
  if (platform === "Instagram" || platform === "YouTube") maxLength = 30;
  else if (platform === "TikTok") maxLength = 24;
  else if (platform === "Twitch") maxLength = 25;
  else if (platform === "Roblox") maxLength = 20;

  if (formatted.length > maxLength) {
    formatted = formatted.substring(0, maxLength);
    if (formatted.endsWith(".") || formatted.endsWith("_") || formatted.endsWith("-")) {
      formatted = formatted.slice(0, -1);
    }
  }

  return formatted;
}

// ADVANCED FILTER: Detects awkward robotic combinations and pronouncability issues
function isValidUsernameQuality(name: string): boolean {
  const lower = name.toLowerCase();

  // 1. Basic safety checks
  if (lower.length < 3) return false;
  
  // 2. No triple repeating characters
  for (let i = 0; i < lower.length - 2; i++) {
    if (lower[i] === lower[i+1] && lower[i] === lower[i+2]) {
      return false;
    }
  }

  // 3. Prevent clumsy special character combinations
  if (/[._-]{2,}/.test(lower)) return false;
  if (lower.startsWith(".") || lower.endsWith(".") || lower.startsWith("-") || lower.endsWith("-") || lower.startsWith("_") || lower.endsWith("_")) {
    return false;
  }
  if (/\.[_-]/.test(lower) || /_[.-]/.test(lower) || /-[._]/.test(lower)) {
    return false;
  }

  // 4. Pronouncability & Vowel check: Check for awkward consonant clusters
  // Consonants list (excluding 'y' which can act as a vowel)
  const consonants = "bcdfghjklmnpqrstvwxz";
  const vowels = "aeiouy";

  // Check if string contains at least one vowel/pseudo-vowel
  let hasVowel = false;
  for (const char of lower) {
    if (vowels.includes(char)) {
      hasVowel = true;
      break;
    }
  }
  if (!hasVowel && !/[0-9]/.test(lower)) return false; // purely consonant string (gibberish)

  // Standard English digraphs, trigraphs and common consonant blends are fine
  const allowedConsonantBlends = [
    "str", "chr", "thr", "sch", "ph", "sh", "ch", "th", "ck", "st", "sp", "sc",
    "cl", "cr", "dr", "fl", "fr", "gl", "gr", "pl", "pr", "sl", "sm", "sn", "sw",
    "tr", "tw", "br", "gh", "ng", "nd", "nt", "lk", "mp", "rt", "rd", "sk"
  ];

  // Match consecutive consonants
  let consecutiveConsonantsCount = 0;
  let currentCluster = "";

  for (let i = 0; i < lower.length; i++) {
    const char = lower[i];
    if (consonants.includes(char)) {
      consecutiveConsonantsCount++;
      currentCluster += char;

      if (consecutiveConsonantsCount >= 4) {
        // Check if the 4-consonant cluster can be broken into allowed standard blends
        let isSafeBlend = false;
        for (const blend of allowedConsonantBlends) {
          if (currentCluster.includes(blend)) {
            // If the remaining letters also form a valid blend or are tiny, let it pass
            const remaining = currentCluster.replace(blend, "");
            if (remaining.length <= 1 || allowedConsonantBlends.includes(remaining)) {
              isSafeBlend = true;
              break;
            }
          }
        }
        if (!isSafeBlend) {
          return false; // too hard to pronounce or purely awkward AI combination
        }
      }
    } else {
      consecutiveConsonantsCount = 0;
      currentCluster = "";
    }
  }

  // Prevent awkward repeating syllables, e.g. "GamerGamer" or "VibeVibe"
  if (lower.length >= 8) {
    const half = Math.floor(lower.length / 2);
    if (lower.substring(0, half) === lower.substring(half)) {
      return false;
    }
  }

  return true;
}

// ONE-WORD GENERATION ENGINE:
// Generates pristine, premium, highly brandable single words (blending or inventing neologisms)
function generateOneWordName(keyword: string, style: string): string {
  // If we have a keyword, we try to blend it beautifully or neologize it
  if (keyword) {
    const cleanKey = keyword.charAt(0).toUpperCase() + keyword.slice(1).toLowerCase();
    const cleanKeyLower = keyword.toLowerCase();
    const mode = Math.floor(Math.random() * 4);

    if (mode === 0) {
      // Elegant suffix blend: coffeely, coffeeify, coffeeio, coffeeia
      const suffixes = ["ly", "ify", "io", "ia", "ex", "is", "ax", "on", "et", "it", "en", "el"];
      const s = suffixes[Math.floor(Math.random() * suffixes.length)];
      return `${cleanKeyLower}${s}`;
    } else if (mode === 1) {
      // Spliced word blend: take first 3-4 chars + vowel + short ending
      const core = cleanKeyLower.substring(0, Math.min(cleanKeyLower.length, 4));
      const end = endSyllables[Math.floor(Math.random() * endSyllables.length)];
      return `${core}${end}`;
    } else if (mode === 2) {
      // Classic startup prefixes with keyword: e.g. "Novacoffee", "Omnicoffee", "Aurocoffee"
      const preList = ["Nova", "Omni", "Aero", "Onyx", "Zeno", "Velo", "Sync", "Aura", "Pure", "Neo"];
      const p = preList[Math.floor(Math.random() * preList.length)];
      return `${p}${cleanKeyLower}`;
    } else {
      // Natural blend of keywords with high-end brand suffixes: "Crest", "Elite", "Prime"
      const brandEndings = ["luxe", "prime", "crest", "elite", "aura", "vibe", "glow", "flow", "shift"];
      const e = brandEndings[Math.floor(Math.random() * brandEndings.length)];
      return `${cleanKeyLower}${e}`;
    }
  }

  // No keyword: generate high-quality invented single-word brands (e.g. "Velura", "Zonexa", "Vexis")
  const hasMid = Math.random() < 0.5;
  const start = startSyllables[Math.floor(Math.random() * startSyllables.length)];
  const mid = hasMid ? midSyllables[Math.floor(Math.random() * midSyllables.length)] : "";
  const end = endSyllables[Math.floor(Math.random() * endSyllables.length)];
  
  let result = `${start}${mid}${end}`;
  // Capitalize properly
  return result.charAt(0).toUpperCase() + result.slice(1);
}

// Core generator engine function
export function generateUsernames(
  keyword: string,
  platform: string,
  style: string,
  count: number = 50
): string[] {
  const usernamesSet = new Set<string>();
  const sanitizedKeyword = sanitizeKeyword(keyword, platform);

  let styleKey = style;
  if (style === "Random") {
    const keys = Object.keys(prefixesMap).filter(k => k !== "Random");
    styleKey = keys[Math.floor(Math.random() * keys.length)];
  }

  const pList = prefixesMap[styleKey] || prefixesMap["Cool"];
  const sList = suffixesMap[styleKey] || suffixesMap["Cool"];

  // Custom separator decision: keep dots/underscores very rare and contextual
  const getSeparator = (plat: string): string => {
    // 75% probability of direct clean merge (no separators) for a modern, high-end look
    if (Math.random() < 0.75) return "";

    if (plat === "Instagram" || plat === "TikTok") {
      return Math.random() < 0.5 ? "." : "_";
    }
    if (plat === "YouTube" || plat === "Discord" || plat === "Universal") {
      const rand = Math.random();
      if (rand < 0.3) return ".";
      if (rand < 0.7) return "_";
      return "-";
    }
    if (plat === "Gaming" || plat === "Roblox" || plat === "Twitch") {
      return "_";
    }
    return "";
  };

  let iterations = 0;
  // We want to fill up the request count but safely prevent infinite loops
  while (usernamesSet.size < count && iterations < 3000) {
    iterations++;

    let candidate = "";
    const randFormula = Math.random();

    // Select suitable formula types (including brandable one-word & viral formulas)
    if (randFormula < 0.20 && styleKey !== "Funny") {
      // 1. BRANDABLE ONE-WORD GENERATION (20% weight)
      candidate = generateOneWordName(sanitizedKeyword, styleKey);
    } else if (randFormula < 0.45) {
      // 2. VIRAL FORMULA: ADJECTIVE + NOUN (25% weight)
      const adj = viralAdjectives[Math.floor(Math.random() * viralAdjectives.length)];
      const noun = viralNouns[Math.floor(Math.random() * viralNouns.length)];
      
      if (sanitizedKeyword) {
        if (Math.random() < 0.5) {
          candidate = `${adj}${sanitizedKeyword}`;
        } else {
          candidate = `${sanitizedKeyword}${noun}`;
        }
      } else {
        candidate = `${adj}${noun}`;
      }
    } else if (randFormula < 0.65) {
      // 3. VIRAL FORMULA: CREATOR STYLE (20% weight)
      const prefixes = ["its", "the", "heyits", "by", "thisis", "real", "hello", "simply", "daily", "meet"];
      const suffixes = ["create", "studio", "design", "media", "craft", "hq", "space", "vlogs", "living"];
      const p = prefixes[Math.floor(Math.random() * prefixes.length)];
      const s = suffixes[Math.floor(Math.random() * suffixes.length)];
      
      const targetWord = sanitizedKeyword || pList[Math.floor(Math.random() * pList.length)];
      
      if (Math.random() < 0.5) {
        const separator = getSeparator(platform);
        candidate = `${p}${separator}${targetWord}`;
      } else {
        const separator = getSeparator(platform);
        candidate = `${targetWord}${separator}${s}`;
      }
    } else if (randFormula < 0.80) {
      // 4. VIRAL FORMULA: SHORT MEMORABLE STYLES (15% weight)
      // Alternating high quality phonetic constructs (C-V-C-V, etc.)
      const shortWord = generateOneWordName("", styleKey).substring(0, 5);
      if (sanitizedKeyword) {
        const cleanShort = sanitizedKeyword.substring(0, Math.min(sanitizedKeyword.length, 5));
        candidate = Math.random() < 0.5 ? `${cleanShort}${shortWord}` : `${shortWord}${cleanShort}`;
      } else {
        candidate = shortWord;
      }
    } else {
      // 5. CLASSIC STYLE SPECIFIC MIX (20% weight)
      const prefix = pList[Math.floor(Math.random() * pList.length)];
      const suffix = sList[Math.floor(Math.random() * sList.length)];
      const separator = getSeparator(platform);

      if (sanitizedKeyword) {
        if (Math.random() < 0.5) {
          candidate = `${prefix}${separator}${sanitizedKeyword}`;
        } else {
          candidate = `${sanitizedKeyword}${separator}${suffix}`;
        }
      } else {
        candidate = `${prefix}${separator}${suffix}`;
      }
    }

    // Numbers are kept extremely rare and smart: only 5% of usernames get a number, 
    // never for Luxury, Business, Minimal or Professional styles
    let numberSuffix = "";
    if (Math.random() < 0.05 && !["Business", "Luxury", "Minimal", "Professional"].includes(styleKey)) {
      const randVal = Math.random();
      if (randVal < 0.4) {
        numberSuffix = String(Math.floor(Math.random() * 9) + 1); // Single lucky digit
      } else if (randVal < 0.8) {
        numberSuffix = String(Math.floor(Math.random() * 90) + 10); // Nice double digit
      } else {
        numberSuffix = String(Math.floor(Math.random() * 26) + 2000).substring(2); // Short year
      }
    }

    candidate += numberSuffix;

    const formatted = formatUsername(candidate, platform);

    // Apply advanced quality filtering before adding
    if (isValidUsernameQuality(formatted)) {
      usernamesSet.add(formatted);
    }
  }

  // Fallback generation in case of strict filters
  if (usernamesSet.size < count) {
    let fallbackIdx = 0;
    while (usernamesSet.size < count && fallbackIdx < 500) {
      fallbackIdx++;
      const designKey = sanitizedKeyword || "fuse";
      const name = formatUsername(`${designKey}_${styleKey.toLowerCase()}${fallbackIdx}`, platform);
      if (isValidUsernameQuality(name)) {
        usernamesSet.add(name);
      }
    }
  }

  return Array.from(usernamesSet).slice(0, count);
}

// Improved calculateUsernameScore(): REAL, dynamic mathematical evaluation of username quality
export function calculateUsernameScore(
  name: string,
  style: string,
  platform: string
): {
  originality: number;
  brandability: number;
  memorability: number;
  overall: number;
} {
  const lower = name.toLowerCase();
  
  // 1. Originality Scoring
  // Unique combinations of letters, length balance, less common patterns.
  let originality = 85;
  
  // Having numbers hurts uniqueness slightly (often used as a filler fallback)
  if (/[0-9]/.test(name)) originality -= 10;
  // Multiple numbers hurts more
  const digitCount = (name.match(/\d/g) || []).length;
  if (digitCount > 2) originality -= 8;
  
  // Having multiple symbols lowers pristine originality
  const symbolCount = (name.match(/[._-]/g) || []).length;
  if (symbolCount > 1) originality -= 8;

  // Length penalties/rewards for originality
  if (lower.length > 15) originality -= 5; // long handles feel standard
  if (lower.length < 5) originality += 8;   // ultra short is highly original / rare

  // 2. Brandability Scoring
  // High-end look: Clean letter flow, NO numbers, NO symbols, perfect length (5-10 chars)
  let brandability = 90;
  
  // Severe penalties for startup/luxury brandability with numbers or symbols
  if (/[0-9]/.test(name)) brandability -= 25;
  if (/[._-]/.test(name)) brandability -= 12;
  
  // Perfect length reward (5 to 10 chars is premium brand material)
  if (name.length >= 5 && name.length <= 10) {
    brandability += 5;
  } else if (name.length > 14) {
    brandability -= 15; // too long for a crisp brand
  } else if (name.length < 4) {
    brandability -= 10; // too short to register as a distinct brand word
  }

  // Style alignment bonuses
  if (["Business", "Luxury", "Minimal", "Professional"].includes(style)) {
    // If it is clean, bump brandability
    if (!/[0-9._-]/.test(name)) brandability += 4;
  }

  // 3. Memorability Scoring
  // Easy to recall: short, alternating consonants/vowels, no confusing hyphens or numbers
  let memorability = 85;

  if (/[0-9]/.test(name)) memorability -= 15;
  if (/[_-]/.test(name)) memorability -= 10; // underscores and hyphens are hard to recall verbally
  if (/\./.test(name)) memorability -= 5;   // dots are slightly better but still a barrier

  // Length factor: short is punchy and memorable
  if (name.length <= 7) {
    memorability += 10;
  } else if (name.length > 12) {
    memorability -= (name.length - 12) * 3; // drops progressively
  }

  // Vowel-Consonant balance check for verbal recall (pronouncability check)
  const vowels = "aeiouy";
  let vowelCount = 0;
  for (const char of lower) {
    if (vowels.includes(char)) vowelCount++;
  }
  const vowelRatio = vowelCount / Math.max(1, name.length);
  // Perfect sweet spot is 30% to 50% vowels (e.g. "Aura", "Pixel", "Nova")
  if (vowelRatio >= 0.3 && vowelRatio <= 0.55) {
    memorability += 4;
  } else {
    memorability -= 8; // heavy consonants or pure vowels are harder to remember
  }

  // Clamp function to keep results elegant (between 65 and 99)
  const clamp = (val: number) => Math.max(65, Math.min(99, Math.round(val)));

  const origClamped = clamp(originality);
  const brandClamped = clamp(brandability);
  const memoClamped = clamp(memorability);
  const overall = Math.round((origClamped + brandClamped + memoClamped) / 3);

  return {
    originality: origClamped,
    brandability: brandClamped,
    memorability: memoClamped,
    overall
  };
}

// Vocabulary lists specifically designed for Display Names (natural, high quality, spaced)
const displayAdjectives: Record<string, string[]> = {
  Cool: [
    "Shadow", "Neon", "Silent", "Vivid", "Static", "Aero", "Nova", "Cosmic", "Lunar", "Solar",
    "Apex", "Prime", "Zero", "Spectre", "Rogue", "Hyper", "Vortex", "Cipher", "Drift", "Aura",
    "Quantum", "Vector", "Helix", "Prism", "Zenith", "Volt", "Pulse", "Onyx", "Krypton", "Mirage",
    "Alpha", "Midnight", "Astro", "Cosmo", "Aegis", "Velocity"
  ],
  Aesthetic: [
    "Ethereal", "Luminous", "Serene", "Velvet", "Cosmic", "Pastel", "Golden", "Floral", "Dewy", "Silk",
    "Hazy", "Soft", "Sweet", "Honey", "Cherry", "Satin", "Lilac", "Ivory", "Amber", "Opal", "Cloudy",
    "Dusk", "Dawn", "Celeste", "Luna", "Melancholy", "Solitude", "Warm", "Vintage", "Retro", "Blushing"
  ],
  Gaming: [
    "Apex", "Vortex", "Pixel", "Titan", "Glitch", "Nexus", "Spectre", "Rogue", "Alpha", "Nova",
    "Hyper", "Phantom", "Retro", "Omega", "Matrix", "Cipher", "Bullet", "Storm", "Rage", "Viper",
    "Strike", "Thunder", "Blaze", "Chaos", "Pulse", "Frost", "Wraith", "Havoc", "Vandal", "Scythe",
    "Savage", "Fatal", "Rebel", "Wild", "Mystic", "Iron", "Steel", "Dark", "Grim", "Silent",
    "Sniper", "Slayer", "Phoenix"
  ],
  Professional: [
    "Prime", "Core", "Elite", "Omni", "Inno", "Stellar", "Focus", "Vantage", "Pinnacle", "Summit",
    "Crest", "Vista", "Alpha", "Zenith", "Beacon", "First", "Global", "Nexus", "Direct", "Leading",
    "Veritas", "Aegis", "Sovereign", "Nordic", "Optima", "Select", "Infinite", "True", "Noble"
  ],
  Funny: [
    "Silly", "Wobbly", "Derpy", "Goofy", "Chunky", "Funky", "Sassy", "Cheeky", "Wonky", "Bumpy",
    "Dizzy", "Loopy", "Lazy", "Wacky", "Clumsy", "Dumpy", "Grumpy", "Nutty", "Salty", "Spicy",
    "Snoozy", "Bouncy", "Giggly", "Flabby", "Cheesy", "Goose", "Screaming", "Confused", "Sleepy"
  ],
  Cute: [
    "Tiny", "Fluffy", "Chibi", "Sunny", "Peachy", "Pinky", "Mimi", "Puffy", "Mini", "Cozy",
    "Sweet", "Snuggly", "Little", "Bitty", "Cuddly", "Sugar", "Milky", "Cookie", "Pixie", "Fairy",
    "Bubbles", "Berry", "Honey", "Dolly", "Baby", "Cute", "Sleepy", "Soft", "Panda", "Koala"
  ],
  Dark: [
    "Void", "Grim", "Doom", "Abyss", "Crypt", "Vamp", "Nocturne", "Necro", "Cinder", "Sorrow",
    "Hollow", "Eclipse", "Wraith", "Scythe", "Tomb", "Shade", "Bane", "Spectre", "Ruin", "Fallen",
    "Gothic", "Midnight", "Obsidian", "Phantom", "Lost", "Forsaken", "Cursed", "Wicked", "Morbid"
  ],
  Luxury: [
    "Onyx", "Ivory", "Royal", "Sovereign", "Imperial", "Aegis", "Satin", "Gilded", "Velvet", "Noble",
    "Elysian", "Regal", "Aura", "Vanguard", "Grand", "Luxe", "Signature", "Prism", "Sable", "Golden",
    "Crown", "Monarch", "Majestic", "Opulent", "Plush", "Silk", "Diamond", "Platinum", "Supreme"
  ],
  Minimal: [
    "Neo", "Luxe", "Zen", "Vibe", "Flux", "Pure", "Soft", "Nova", "Halo", "Solo",
    "Raw", "Arc", "One", "Un", "Re", "Ox", "Vigo", "Argo", "Kite", "Clean",
    "Fine", "Base", "Form", "Plain", "Flat", "Mono", "Dual", "Null", "Void"
  ]
};

const displayNouns: Record<string, string[]> = {
  Cool: [
    "Wolf", "Ghost", "Echo", "Shift", "Vortex", "Horizon", "Phantom", "Riddle", "Drift", "Pulse",
    "Vertex", "Onyx", "Orbit", "Wave", "Flow", "Grid", "Loop", "Vault", "Realm", "Zone",
    "Link", "Sphere", "Forge", "Hive", "Sync", "Rider", "Walker", "Chaser", "Seeker", "Keeper",
    "Vision", "Studio", "Raven", "Falcon", "Nova", "Cosmo"
  ],
  Aesthetic: [
    "Dream", "Moon", "Petal", "Aesthetic", "Mist", "Breeze", "Glow", "Dust", "Sigh", "Muse",
    "Blush", "Flora", "Poem", "Lyrics", "Loom", "Meadow", "Whisper", "Rain", "Chime", "Melody",
    "Echo", "Hour", "Garden", "Fable", "Sky", "Cloud", "River", "Willow", "Ocean", "Star",
    "Raven", "Horizon", "Symphony"
  ],
  Gaming: [
    "Hunter", "Slayer", "Sniper", "Gamer", "Knight", "Ninja", "Beast", "Fury", "Claw", "Squad",
    "Clan", "Ops", "Edge", "Grid", "Trigger", "Force", "Power", "Rebel", "Warlord", "Gladiator",
    "Racer", "Plays", "Lord", "Legend", "Asylum", "Viper", "Scythe", "Rogue", "Ghost", "Shadow",
    "Wolf", "Echo", "Void", "Glitch"
  ],
  Professional: [
    "Studio", "Group", "Media", "Consulting", "Lab", "Digital", "Partner", "Network", "Creative", "Solution",
    "Agency", "Venture", "Capital", "Corp", "System", "Design", "Tech", "Guild", "Press", "Consultant",
    "Director", "Executive", "Hub", "Institute", "Collective", "Syndicate", "Forum", "Council",
    "Vision", "Horizon"
  ],
  Funny: [
    "Potato", "Noodle", "Muffin", "Goblin", "Sloth", "Burrito", "Taco", "Pickle", "Banana", "Waffle",
    "Unicorn", "Donut", "Marshmallow", "Yeti", "Chicken", "Crab", "Sausage", "Nugget", "Cactus", "Onion",
    "Toaster", "Penguin", "Panda", "Broccoli", "Tomato", "Spoon", "Fork", "Sock", "Wombat", "Hippo"
  ],
  Cute: [
    "Bunny", "Kitten", "Puff", "Cheeks", "Cupcake", "Boba", "Bear", "Sweets", "Peep", "Star",
    "Angel", "Daisy", "Sprout", "Pip", "Bug", "Plum", "Heart", "Doughnut", "Panda", "Koala",
    "Sparkle", "Sprinkles", "Peachy", "Button", "Bean", "Chibi", "Mimi", "Puffy", "Honey", "Cookie"
  ],
  Dark: [
    "Soul", "Bane", "Grave", "Shadow", "Ash", "Reap", "Woe", "Ruin", "Fang", "Claw",
    "Thorn", "Veil", "Dagger", "Curse", "Blight", "Plague", "Shroud", "Wraith", "Knight", "Reaper",
    "Spectre", "Demon", "Phantom", "Crypt", "Abyss", "Tomb", "Necro", "Fallen", "Sorrow", "Doom",
    "Raven", "Wolf", "Ghost"
  ],
  Luxury: [
    "Maison", "Atelier", "Estate", "Manor", "Club", "Reserve", "Silk", "Opal", "Crest", "Elite",
    "Saga", "Legacy", "Palace", "Bespoke", "Private", "Luxe", "Haven", "Villa", "Lounge", "Chateau",
    "Studio", "Design", "Aura", "Gilded", "Royal", "Sovereign", "Monarch", "Crown", "Imperial",
    "Vision"
  ],
  Minimal: [
    "HQ", "Box", "Lab", "Run", "Ink", "Dot", "Air", "Bay", "Raw", "Cut",
    "Arc", "Zip", "Vibe", "Core", "Form", "Space", "Line", "Grid", "Wave", "Flow",
    "Unit", "Node", "Site", "Base", "Null", "Void", "Solo", "One", "Pure"
  ]
};

// Additional natural, gorgeous, viral display name combinations
const viralDisplayAdjectives = [
  "Golden", "Velvet", "Silent", "Cosmic", "Retro", "Vivid", "Liquid", "Ethereal",
  "Serene", "Pastel", "Glowing", "Lunar", "Solar", "Vapor", "Urban", "Stellar",
  "Nordic", "Noble", "Royal", "Gilded", "Aero", "Onyx", "Sable", "Pure", "Soft",
  "Infinite", "Wild", "Mystic", "Ancient", "Primal"
];

const viralDisplayNouns = [
  "Pulse", "Echo", "Glow", "Hour", "Vibe", "Wave", "Drift", "Shift", "Aura",
  "Pixel", "Storm", "Bloom", "Haze", "Mirage", "Prism", "Helix", "Orbit", "Spark",
  "Tide", "Loom", "Fable", "Craft", "Forge", "Quest", "Zenith", "Summit", "Horizon",
  "Dream", "Moon", "Shadow", "Walker", "Hunter", "Echo", "Raven", "Studio", "Vision"
];

export function generateDisplayNames(
  keyword: string,
  platform: string,
  style: string,
  count: number = 50
): string[] {
  const namesSet = new Set<string>();

  // Format keyword neatly (Title Case)
  let cleanKeyword = keyword.trim();
  if (cleanKeyword) {
    cleanKeyword = cleanKeyword
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  let styleKey = style;
  if (style === "Random" || !displayAdjectives[style]) {
    const keys = Object.keys(displayAdjectives);
    styleKey = keys[Math.floor(Math.random() * keys.length)];
  }

  const adjList = displayAdjectives[styleKey] || displayAdjectives["Cool"];
  const nounList = displayNouns[styleKey] || displayNouns["Cool"];

  let iterations = 0;
  while (namesSet.size < count && iterations < 3000) {
    iterations++;
    let name = "";
    const randFormula = Math.random();

    if (cleanKeyword) {
      if (randFormula < 0.35) {
        // [Keyword] [Noun] (e.g. "Ghost Hunter")
        const noun = nounList[Math.floor(Math.random() * nounList.length)];
        name = `${cleanKeyword} ${noun}`;
      } else if (randFormula < 0.70) {
        // [Adjective] [Keyword] (e.g. "Shadow Ghost")
        const adj = adjList[Math.floor(Math.random() * adjList.length)];
        name = `${adj} ${cleanKeyword}`;
      } else {
        // Viral Display adjective/noun integration
        if (Math.random() < 0.5) {
          const vNoun = viralDisplayNouns[Math.floor(Math.random() * viralDisplayNouns.length)];
          name = `${cleanKeyword} ${vNoun}`;
        } else {
          const vAdj = viralDisplayAdjectives[Math.floor(Math.random() * viralDisplayAdjectives.length)];
          name = `${vAdj} ${cleanKeyword}`;
        }
      }
    } else {
      // Procedural generation (no keyword)
      if (randFormula < 0.40) {
        // Style specific adjective + noun (e.g. "Shadow Wolf")
        const adj = adjList[Math.floor(Math.random() * adjList.length)];
        const noun = nounList[Math.floor(Math.random() * nounList.length)];
        name = `${adj} ${noun}`;
      } else if (randFormula < 0.80) {
        // Viral combinations (e.g. "Lunar Dream")
        const adj = viralDisplayAdjectives[Math.floor(Math.random() * viralDisplayAdjectives.length)];
        const noun = viralDisplayNouns[Math.floor(Math.random() * viralDisplayNouns.length)];
        name = `${adj} ${noun}`;
      } else {
        // Blend of Style Specific & Viral
        if (Math.random() < 0.5) {
          const adj = adjList[Math.floor(Math.random() * adjList.length)];
          const noun = viralDisplayNouns[Math.floor(Math.random() * viralDisplayNouns.length)];
          name = `${adj} ${noun}`;
        } else {
          const adj = viralDisplayAdjectives[Math.floor(Math.random() * viralDisplayAdjectives.length)];
          const noun = nounList[Math.floor(Math.random() * nounList.length)];
          name = `${adj} ${noun}`;
        }
      }
    }

    // Apply platform formatting constraints:
    // Twitch doesn't support spaces: use PascalCase or remove spaces
    if (platform === "Twitch") {
      name = name.replace(/\s+/g, "");
    } else if (platform === "Roblox") {
      // Roblox only allows alphanumeric and spaces for display names, no special characters or symbols
      name = name.replace(/[^a-zA-Z0-9 ]/g, "");
    } else if (platform === "Instagram" || platform === "TikTok" || platform === "YouTube" || platform === "Discord") {
      // Standard natural display names are perfect here. Optionally we can apply style accents for certain platforms
    }

    // Quality check
    if (name && name.length >= 2 && name.length <= 32) {
      namesSet.add(name);
    }
  }

  // Fallback generation if set size is too small
  if (namesSet.size < count) {
    let fallbackIdx = 0;
    const baseWord = cleanKeyword || "Nova";
    while (namesSet.size < count && fallbackIdx < 500) {
      fallbackIdx++;
      const name = `${baseWord} ${styleKey} ${fallbackIdx}`;
      if (platform === "Twitch") {
        namesSet.add(name.replace(/\s+/g, ""));
      } else {
        namesSet.add(name);
      }
    }
  }

  return Array.from(namesSet).slice(0, count);
}
