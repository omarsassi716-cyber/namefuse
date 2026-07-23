import { seoGroup1Configs } from "./seoGroup1";
import { seoGroup2Configs } from "./seoGroup2";
import { seoGroup3Configs } from "./seoGroup3";
import { seoGroup4Configs } from "./seoGroup4";
import { seoGroup5Configs } from "./seoGroup5";
import { seoGroup6Configs } from "./seoGroup6";

import { generateSEOPage } from "./seoGeneratorHelper";

export interface SEOPageData {
  path: string;
  platform: string;
  defaultStyle: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  features: string[];
  introduction: string;
  sections: {
    title: string;
    paragraphs: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface SEOPageConfig {
  path: string;
  keyword: string;
  platform: string;
  style: string;
  title?: string;
  description?: string;
  h1?: string;
  subtitle?: string;
  features?: string[];
  introduction?: string;
  sections?: { title: string; paragraphs: string[] }[];
  faqs?: { question: string; answer: string }[];
}

const coreConfigs: SEOPageConfig[] = [
  {
    path: "/username-generator",
    platform: "Universal",
    style: "Cool",
    keyword: "Username Generator",
    title: "Free Username Generator | Create Unique Names Instantly",
    description: "Generate over 50+ unique, creative, and brandable usernames instantly. Customize by style, keyword, and platform. Free tool with platform availability checks.",
    h1: "Generate Unique Usernames Instantly",
    subtitle: "Stop spending hours guessing. Get 50+ unique, catchy, and tailored usernames for any social media, gaming profile, or brand with one single click.",
    features: [
      "50 unique names generated per click",
      "Multiple styling options (Cool, Gaming, Aesthetic, etc.)",
      "Tailored formatting for every major platform",
      "One-click copy and custom Favorites list",
      "Fully responsive, high-speed procedural engine"
    ],
    introduction: "In today's digital era, your username is your first impression. Whether you are launching a professional portfolio, setting up a gaming profile, or starting a new social media page, finding an available and memorable handle can be extremely challenging. Our procedural Username Generator combines advanced patterns with custom styling presets to instantly output realistic, brandable, and attractive names tailored to your personality.",
    sections: [
      {
        title: "How to Choose the Perfect Username",
        paragraphs: [
          "A great username should be easy to remember, simple to spell, and cohesive with your brand identity. It acts as your digital signature, enabling people to search and tag you easily across various digital ecosystems.",
          "Keep it short and punchy. Usernames that are too long or contain repetitive characters often get forgotten. If your desired name is taken, try using clean prefixes like 'The', 'Real', or 'Hey' instead of stuffing it with excessive numbers.",
          "Consistency is key for personal branding. Ideally, you should secure the exact same handle across Instagram, TikTok, YouTube, and Twitter to build trust and allow your audience to follow you everywhere effortlessly."
        ]
      },
      {
        title: "Tips for Creating Memorable Handles",
        paragraphs: [
          "1. Use relevant keywords: Incorporate a core word related to your niche (e.g., 'design', 'codes', 'fits', 'cooks') so users immediately understand what your account is about.",
          "2. Blend contrast styles: Combine a cool adjective with an abstract noun (e.g., 'NeonWave', 'AuraVault') to create a strong, professional yet imaginative persona.",
          "3. Avoid excessive special characters: While underscores and periods are great for readability, using too many of them can make your profile look spammy and harder to find in search results."
        ]
      }
    ],
    faqs: [
      {
        question: "Is this username generator completely free?",
        answer: "Yes! Our tool is 100% free to use. You can generate unlimited usernames, copy them to your clipboard, and save your favorites without any hidden charges or registration."
      },
      {
        question: "How do I check if a username is available?",
        answer: "Our tool provides direct lookup links for each generated name. Simply click the globe or external link icon next to any username in your results grid to quickly check its availability on that specific platform."
      },
      {
        question: "Can I use these usernames for business accounts?",
        answer: "Absolutely! By selecting the 'Professional' style, you can generate clean, brandable, and corporate-ready names perfect for startups, creators, and consulting businesses."
      },
      {
        question: "What makes a username 'brandable'?",
        answer: "A brandable username avoids standard random numbers and instead combines rhythmic sounds, sleek syllables, and relevant industry terminology to create a professional brand presence."
      }
    ]
  },
  {
    path: "/instagram-username-generator",
    platform: "Instagram",
    style: "Aesthetic",
    keyword: "Instagram Username Generator",
    title: "Instagram Username Generator | Find Cool IG Handles",
    description: "Generate beautiful, aesthetic, and professional Instagram usernames. Custom keyword support. Instantly formatted to fit Instagram's 30-character limits.",
    h1: "Instagram Username Generator",
    subtitle: "Elevate your grid with a stunning handle. Generate 50+ aesthetic, cool, or minimal Instagram usernames designed to stand out on the feed.",
    features: [
      "Strict compliance with Instagram's 30-character limit",
      "Uses only valid Instagram characters (letters, numbers, underscores, dots)",
      "Tailored aesthetic and cute preset configurations",
      "Instant copy and offline storage for your ideas"
    ],
    introduction: "Instagram is a visual-first platform where curation and aesthetics rule. Your profile handle is the literal headline of your digital gallery. It needs to reflect your vibe, whether that is ultra-minimalist, high-contrast streetwear, retro film, or soft pastel colors. This Instagram-specific generator produces beautiful names designed to fit perfectly inside the IG profile header.",
    sections: [
      {
        title: "Crafting an Aesthetic Instagram Handle",
        paragraphs: [
          "Instagram handles look best when they feel clean and typographic. Aesthetic names often utilize words that evoke mood, texture, or color—such as 'velvet', 'haze', 'lunar', or 'studio'.",
          "Using a single dot (.) or underscore (_) in the middle of a two-word name can improve legibility dramatically (e.g., 'velvet.blush' vs 'velvetblush'). Keep in mind that Instagram does not allow consecutive dots, or ending your username with a period.",
          "If your real name or main brand is already taken, try adding context tags. Creative fields like photography can use '.lens' or '.raw', while personal bloggers can append '.journal' or '.space' for an elegant finish."
        ]
      },
      {
        title: "Instagram Character Restrictions to Know",
        paragraphs: [
          "Your Instagram username can only contain lowercase letters, numbers, periods, and underscores. It cannot be longer than 30 characters.",
          "Our engine automatically sanitizes all generated handles: it converts capital letters to lowercase, replaces dashes with underscores, and filters out forbidden special characters, ensuring every name is instantly ready to claim!"
        ]
      }
    ],
    faqs: [
      {
        question: "Can I change my Instagram username later?",
        answer: "Yes, Instagram allows you to change your username in your profile settings. If you change it, your old username is released and someone else can claim it, so proceed with caution!"
      },
      {
        question: "How do I secure an aesthetic username?",
        answer: "Aesthetic names are highly sought after. Use our keyword filter combined with the 'Aesthetic' or 'Cute' styles to blend your own niche words with dreamy, mood-evoking prefixes and suffixes."
      },
      {
        question: "Why should my Instagram handle match my other platforms?",
        answer: "Matching handles make it simple for followers to discover your content on TikTok, YouTube, or Pinterest without having to search for different names, accelerating your brand's growth."
      }
    ]
  },
  {
    path: "/tiktok-username-generator",
    platform: "TikTok",
    style: "Funny",
    keyword: "TikTok Username Generator",
    title: "TikTok Username Generator | Catchy & Funny TikTok Handles",
    description: "Generate catchy, funny, and highly viral TikTok usernames in seconds. Tailored for creators, dancers, gamers, and short-form video stars.",
    h1: "TikTok Username Generator",
    subtitle: "Get viral-ready handles for the For You Page. Create 50+ funny, aesthetic, or high-energy usernames tailored to capture short-form attention.",
    features: [
      "Vibrant, energetic style matching short-form culture",
      "Strict compliance with TikTok's 24-character display limit",
      "Optimized for quick pronunciation and visual brand memory",
      "Interactive features to save and organize your handle ideas"
    ],
    introduction: "TikTok is all about speed, humor, and trendsetting. A viral TikTok profile needs an upbeat, memorable username that sounds great when spoken aloud in videos and fits neatly into the comment section. Our TikTok username engine blends current creator slang, punchy prefixes, and rhythmic suffixes to give you a distinctive name that stands out on the For You page.",
    sections: [
      {
        title: "How to Stand Out on the For You Page",
        paragraphs: [
          "TikTok usernames thrive on being memorable and relatable. Since viewers scroll through content at lighting speed, your handle needs to lock in their attention within a fraction of a second.",
          "Rhythm and rhyme work wonders on TikTok. Names with matching starting letters (alliteration) or punchy jokes (funny style) tend to have high recall. Select our 'Funny' or 'Dark' presets to find entertaining word mashups.",
          "Keep it simple to pronounce. If a viewer wants to tell their friend about your video, they should be able to say your username easily without spelling out complex combinations of letters and numbers."
        ]
      },
      {
        title: "TikTok Handle Constraints and Formatting",
        paragraphs: [
          "TikTok handles are limited to 24 characters and can only include letters, numbers, underscores, and periods. Spaces and emojis are strictly not allowed.",
          "Our procedural engine enforces these exact constraints, so you never have to worry about character cutoffs or invalid character errors during your registration process."
        ]
      }
    ],
    faqs: [
      {
        question: "What is the difference between a TikTok username and nickname?",
        answer: "Your username contains the @ symbol and is unique to your account, used for logging in and tagging. Your nickname is the display name shown at the top of your profile, which does not have to be unique."
      },
      {
        question: "How can I make my TikTok username sound catchy?",
        answer: "Choose the 'Cool' or 'Funny' presets and add a simple keyword related to your content, like 'cooks', 'hacks', or 'dance' to generate engaging name formulas."
      },
      {
        question: "Can I use periods in my TikTok handle?",
        answer: "Yes, periods are allowed, but they cannot be placed at the end of the username, and you cannot have multiple consecutive periods."
      }
    ]
  },
  {
    path: "/gaming-username-generator",
    platform: "Gaming",
    style: "Gaming",
    keyword: "Gaming Username Generator",
    title: "Gaming Username Generator | Unique Esports & Gamer Tags",
    description: "Generate cool, aggressive, and memorable gamer tags for Roblox, Xbox, PlayStation, Discord, and esports leagues. Customize with style selectors.",
    h1: "Gaming Username & Gamertag Generator",
    subtitle: "Unleash your multiplayer persona. Generate 50+ aggressive, competitive, or sci-fi gamer tags for Fortnite, Roblox, Call of Duty, and Discord.",
    features: [
      "Esports-ready formulas combining competitive prefixes and suffixes",
      "Sleek sci-fi, dark, and tactical styling configurations",
      "Fully compatible with Discord, Twitch, Steam, and console networks",
      "Zero duplicates—every single click creates a fresh arsenal of handles"
    ],
    introduction: "In the multiplayer arena, your gamer tag is your shield and your banner. It strikes fear into opponents and builds camaraderie with teammates. Whether you are leading a raid in an MMO, clutching a round in a tactical shooter, or building worlds in Roblox, you need a powerful, unique alias. Our Gaming Generator specializes in high-intensity, futuristic, and heroic names.",
    sections: [
      {
        title: "Rules for Creating an Epic Gamertag",
        paragraphs: [
          "A legendary gamer tag should sound powerful and look sleek in killfeeds and lobbies. Traditional gaming names often use high-impact terms like 'Shadow', 'Apex', 'Vortex', 'Slayer', or 'Nova'.",
          "Avoid excessive numbers unless they have a specific meaning. Usernames like 'Sniper998273' look generic and automated. Instead, stand out by combining sharp contrast elements, like 'GhostMod' or 'RoguePixel'.",
          "Think about esports branding. If you plan to stream or enter competitive tournaments, choose a tag that fits well on jerseys, team banners, and stream overlays."
        ]
      },
      {
        title: "Consoles and Game Platform Length Guidelines",
        paragraphs: [
          "Most gaming platforms (including Xbox Live and PlayStation Network) restrict usernames to 12-16 characters to keep display cards organized. Roblox allows up to 20 characters.",
          "Select the specific platform in our tool (like Twitch, Roblox, or Gaming) to automatically adjust length limits and characters, ensuring a seamless setup process."
        ]
      }
    ],
    faqs: [
      {
        question: "Can I use special symbols in my gamer tag?",
        answer: "Most modern multiplayer servers and console networks restrict symbols to letters, numbers, and basic underscores to avoid rendering issues on standard display cards."
      },
      {
        question: "What is a good username for competitive esports?",
        answer: "Short, single-syllable or double-syllable names with sharp letters (like X, Z, V, K) look highly professional and are easy for shoutcasters to announce during tournaments."
      },
      {
        question: "How do I generate a Roblox-compatible username?",
        answer: "Select the 'Roblox' platform option in our generator. Our engine will curate names under 20 characters that only use valid letters, numbers, and singular underscores, and do not start or end with invalid elements."
      }
    ]
  },
  {
    path: "/youtube-name-generator",
    platform: "YouTube",
    style: "Professional",
    keyword: "YouTube Name Generator",
    title: "YouTube Name Generator | Creator Handles & Channel Names",
    description: "Generate professional, brandable, and SEO-friendly YouTube channel names and creator handles. Perfect for tech, lifestyle, educational, and gaming channels.",
    h1: "YouTube Channel Name & Handle Generator",
    subtitle: "Launch your channel with a professional brand. Generate 50+ high-retention channel name ideas and handles tailored to your target niche.",
    features: [
      "Brandable multi-word concepts for channel names",
      "Sleek and professional handle formatting under 30 characters",
      "Tailored styling for Vlogs, Tech, Education, and Entertainment",
      "Supports integration of specific niche keywords"
    ],
    introduction: "YouTube is the world's second-largest search engine. Choosing a channel name is a major business decision that directly affects your search rankings, subscriber click-through rate, and long-term brand authority. Our YouTube generator produces premium, professional, and memorable channel names and matching @handles to kickstart your content creation journey.",
    sections: [
      {
        title: "Establishing a Successful YouTube Brand Identity",
        paragraphs: [
          "Your YouTube name should reflect your content strategy. If you are building a personal brand around vlogging or consulting, using your real name or a variation of it (e.g., 'HeyItsSam', 'SamConsults') is highly effective.",
          "For niche channels (e.g., tech reviews, cooking tutorials, travel hacks), combine a primary descriptive keyword with a professional suffix. Presets like 'HQ', 'Lab', 'Media', or 'Studio' immediately signal high-quality production.",
          "Ensure your YouTube handle matches your channel name as closely as possible. Since YouTube introduced handles (@username) for comments, mentions, and Shorts, having a unified identity is more critical than ever."
        ]
      },
      {
        title: "Optimizing Your YouTube Name for SEO",
        paragraphs: [
          "Including a broad keyword in your channel name (like 'Tech', 'Finance', 'Kitchen') helps YouTube's recommendation algorithm index your channel faster and place your videos in relevant search results.",
          "Use our keyword filter, type in your core subject, and select the 'Professional' or 'Cool' style to instantly discover optimized, premium channel name ideas."
        ]
      }
    ],
    faqs: [
      {
        question: "Can my YouTube channel name be different from my handle?",
        answer: "Yes, your channel display name (which can include spaces and capital letters) can be different from your unique @handle (which is lowercase and has no spaces)."
      },
      {
        question: "How often can I change my YouTube name?",
        answer: "YouTube allows you to change your channel name and handle twice within a 14-day period. However, frequent changes can confuse existing subscribers and impact search ranking consistency."
      },
      {
        question: "What makes a YouTube name 'high-retention'?",
        answer: "High-retention names are short, rhythmic, and easy to recall. They build instant association with your channel's content category and are easily recognizable on subscriber feeds."
      }
    ]
  },
  {
    path: "/display-name-generator",
    platform: "Universal",
    style: "Cool",
    keyword: "Display Name Generator",
    title: "Free Display Name Generator | Catchy Profile Names Instantly",
    description: "Generate 50+ unique, creative, and professional display names with spaces. Customize by style and platform for Discord, YouTube, TikTok, and Roblox.",
    h1: "Free Display Name Generator",
    subtitle: "Stand out in every server, channel, and feed. Generate 50+ stylish, natural, and memorable display names tailored to your online personality.",
    features: [
      "Natural double-word spaced combinations",
      "Pristine capitalization and clean aesthetics",
      "100% compliant with Roblox, Discord, and YouTube display limits",
      "Custom styles ranging from Gaming to Minimal and Luxury"
    ],
    introduction: "A display name is your digital face to the world. Unlike rigid, technical usernames that require underscores or numbers, a display name is clean, elegant, and fully capitalized. Our professional Display Name Generator uses advanced semantic styling to create natural, memorable titles that elevate your identity on Discord, YouTube, TikTok, and beyond.",
    sections: [
      {
        title: "Display Names vs. Usernames: What is the Difference?",
        paragraphs: [
          "A username is a unique identifier used to log in or tag you (e.g., @cyber_knight_99). It is strictly unique and often full of symbols to pass availability checks.",
          "A display name, on the other hand, is what other players or users see on your public profile or in chat (e.g., 'Cyber Knight'). It allows spaces, doesn't need numbers, and can be shared by multiple users, making it far more creative and elegant."
        ]
      }
    ],
    faqs: [
      {
        question: "Does Roblox allow spaces in display names?",
        answer: "Yes! Roblox display names can have spaces and are completely separate from your rigid login username. Our generator produces perfectly formatted names for Roblox."
      },
      {
        question: "How long can my display name be?",
        answer: "Most platforms, including Discord and YouTube, support display names up to 32 characters, which allows plenty of space for natural two-word names."
      }
    ]
  },
  {
    path: "/cool-display-names",
    platform: "Universal",
    style: "Cool",
    keyword: "Cool Display Names",
    title: "Cool Display Names Generator | Sleek & Unique Profile Ideas",
    description: "Generate cool, modern, and eye-catching display names with spaces. Explore stylish presets for gamers, streamers, and social media creators.",
    h1: "Cool Display Names Generator",
    subtitle: "Elevate your profile's aesthetic. Discover 50+ sleek, highly-polished cool display names that make a memorable and confident first impression.",
    features: [
      "Futuristic, cyberpunk, and cosmic word combinations",
      "Sleek and minimalist design presets",
      "Optimal word length for clear readability",
      "Fully compatible with Discord, Instagram, and Steam"
    ],
    introduction: "When you want to project confidence, intrigue, and modern energy, a cool display name is your best tool. It balances stylish, high-impact vocabulary with sleek syllables. Avoid outdated clichés and explore premium, hand-curated word-blends designed to elevate your profile above the crowd.",
    sections: [
      {
        title: "What Makes a Display Name Sound 'Cool'?",
        paragraphs: [
          "Coolness comes from brevity, abstract concepts, and powerful contrast. Combining a space/cosmic element with an earthly physical object creates instant rhythm (e.g., 'Neon Shadow', 'Vivid Drift').",
          "Keep punctuation minimal. On display names, a simple space is far cooler than adding random digits or brackets, preserving a clean, custom-made luxury vibe."
        ]
      }
    ],
    faqs: [
      {
        question: "Where can I use these cool display names?",
        answer: "These are perfect for Discord, Twitch, Steam, Xbox, PlayStation, and any modern social application that supports spaced display names."
      }
    ]
  },
  {
    path: "/gaming-display-names",
    platform: "Universal",
    style: "Gaming",
    keyword: "Gaming Display Names",
    title: "Gaming Display Names Generator | Epic Gamertags & Clan Tags",
    description: "Generate powerful, aggressive, and heroic gaming display names for lobbies and killfeeds. Perfect for Roblox, Fortnite, and Discord.",
    h1: "Gaming Display Names Generator",
    subtitle: "Command the scoreboard. Generate 50+ high-intensity, competitive, and epic gaming display names to make your mark in any multiplayer match.",
    features: [
      "Competitive esports and battle-hardened naming formulas",
      "Sleek sci-fi, heroic fantasy, and tactical soldier presets",
      "Designed to stand out in active killfeeds and server lobbies",
      "Perfect length formatting for quick tactical readability"
    ],
    introduction: "In gaming, your display name is your battle standard. It is the name your opponents see when you clutch a round or top the leaderboard. Whether you play tactical shooters, fantasy RPGs, or sandbox worlds like Roblox, you need an alias that commands respect. Our Gaming Display Name Generator creates epic, high-impact titles.",
    sections: [
      {
        title: "Tips for an Unforgettable Gaming Display Name",
        paragraphs: [
          "1. Keep it bold and action-oriented: Verbs and strong nouns (e.g., 'Hunter', 'Slayer', 'Viper') work incredibly well to convey skill and energy.",
          "2. Avoid clutter: Brackets, symbols, and excess numbers make your tag hard to read in fast-paced gameplay. Standard spaced names look clean and elite."
        ]
      }
    ],
    faqs: [
      {
        question: "Is this compatible with console gamertags?",
        answer: "Yes! While Xbox and PlayStation have specific gamertag rules, their modern display systems allow spaced names, making our gaming names perfect."
      }
    ]
  },
  {
    path: "/aesthetic-display-names",
    platform: "Universal",
    style: "Aesthetic",
    keyword: "Aesthetic Display Names",
    title: "Aesthetic Display Names Generator | Soft, Cute & Dreamy Ideas",
    description: "Generate aesthetic, dreamy, and soft display names with spaces. Explore pastel, celestial, and minimalist styles for TikTok and Instagram.",
    h1: "Aesthetic Display Names Generator",
    subtitle: "Curate your digital vibe. Discover 50+ dreamy, celestial, and elegant display names crafted with beautiful semantic pairings.",
    features: [
      "Floral, celestial, and soft atmospheric word blending",
      "Elegant and vintage-inspired naming aesthetics",
      "Perfect for creative portfolios, beauty blogs, and personal pages",
      "One-click copy and instant favorites tracking"
    ],
    introduction: "Your profile's aesthetic is an expression of your soul. Aesthetic display names rely on gentle, poetic, and beautiful vocabulary—blending themes of nature, cosmos, nostalgia, and light. If you are curating a visually-driven profile on TikTok, Instagram, or Discord, these dreamy names provide the perfect finishing touch.",
    sections: [
      {
        title: "The Art of Selecting an Aesthetic Display Name",
        paragraphs: [
          "Aesthetic names rely on sensory language. Words describing soft sights (e.g., 'Pastel', 'Dewy', 'Hazy'), sweet sounds (e.g., 'Whisper', 'Chime'), or celestial concepts ('Luna', 'Cosmic') evoke instant emotions.",
          "Maintain lower complexity. Let the pure poetic combination of the words speak for itself without cluttering the display with unnecessary symbols."
        ]
      }
    ],
    faqs: [
      {
        question: "Can I use emojis in aesthetic display names?",
        answer: "Yes! Emojis pair beautifully with aesthetic names on platforms like Discord and TikTok. Copy our names and add your favorite pastel or floral emoji!"
      }
    ]
  },
  {
    path: "/funny-display-names",
    platform: "Universal",
    style: "Funny",
    keyword: "Funny Display Names",
    title: "Funny Display Names Generator | Hilarious & Witty Profile Ideas",
    description: "Generate funny, witty, and sarcastic display names with spaces. Laugh-out-loud profile name ideas for Discord, Roblox, and gaming lobbies.",
    h1: "Funny Display Names Generator",
    subtitle: "Bring humor to the chat. Generate 50+ witty, sarcastic, and hilarious display names that guarantee a double-take in any server lobby.",
    features: [
      "Witty food, animal, and awkward everyday object pairings",
      "Sarcastic, self-deprecating, and cartoonish name presets",
      "Guaranteed to spark conversation and lighthearted laughs",
      "Instantly formatted and 100% free to copy"
    ],
    introduction: "In a world of serious gamers and intense influencers, a hilarious display name is a breath of fresh air. It breaks the ice, invites friendly banter, and shows you do not take yourself too seriously. Our Funny Display Name Generator mixes silly adjectives with quirky nouns to generate laugh-out-loud combinations.",
    sections: [
      {
        title: "How to Style a Hilarious Display Name",
        paragraphs: [
          "Pairing an intense or high-status adjective with an incredibly mundane noun creates instant comedic irony (e.g., 'Savage Potato', 'Elite Noodle').",
          "Unusual animal names, funny sound words, and food items are always a safe bet for generating smiles in any multiplayer lobby or discord channel."
        ]
      }
    ],
    faqs: [
      {
        question: "Are these funny names safe for family gaming?",
        answer: "Absolutely! Our generator uses lighthearted, PG-rated, and family-friendly humor so you can safely use them in Roblox, Minecraft, and school servers."
      }
    ]
  },
  {
    path: "/professional-display-names",
    platform: "Universal",
    style: "Professional",
    keyword: "Professional Display Names",
    title: "Professional Display Names Generator | Clean & Credible Business Names",
    description: "Generate clean, professional, and credible display names with spaces. Perfect for LinkedIn, Slack, YouTube channels, and business profiles.",
    h1: "Professional Display Names Generator",
    subtitle: "Build instant trust and authority. Generate 50+ clean, corporate-ready, and professional display names for your brand or consultancy.",
    features: [
      "Sleek and authoritative industry-aligned configurations",
      "Perfect for startups, independent consultancies, and YouTube educators",
      "Builds instant credibility with clean, numeric-free formatting",
      "Optimized for high retention and word-of-mouth branding"
    ],
    introduction: "When conducting business online, credibility is everything. A professional display name projects competence, leadership, and structured growth. Our Professional Display Name Generator curates trustworthy prefixes with established corporate suffixes, ensuring your digital presence matches your real-world expertise.",
    sections: [
      {
        title: "Designing a Highly Credible Professional Display Name",
        paragraphs: [
          "Choose standard business suffixes like 'Consulting', 'Studio', 'Lab', or 'Collective' to signal specialized team knowledge and high production value.",
          "Keep the name completely clean. Avoid numbers, slang, or emojis, ensuring a pristine presentation that looks incredible on business cards and LinkedIn summaries."
        ]
      }
    ],
    faqs: [
      {
        question: "Is this suitable for corporate Slack and Teams?",
        answer: "Yes! These clean, spaced name templates conform to standard professional directory formats, making them highly appropriate for corporate communications."
      }
    ]
  }
];

import { tools } from "./toolsConfig";

const allConfigs: SEOPageConfig[] = [
  ...coreConfigs,
  ...seoGroup1Configs,
  ...seoGroup2Configs,
  ...seoGroup3Configs,
  ...seoGroup4Configs,
  ...seoGroup5Configs,
  ...seoGroup6Configs
];

export const seoPages: Record<string, SEOPageData> = {};

for (const config of allConfigs) {
  seoPages[config.path] = generateSEOPage(config);
}

// Dynamically generate SEO pages for any registered tools that don't have explicit pages
for (const tool of tools) {
  if (!seoPages[tool.path]) {
    seoPages[tool.path] = generateSEOPage({
      path: tool.path,
      keyword: tool.name,
      platform: tool.defaultPlatform,
      style: tool.defaultStyle,
      h1: tool.name,
      subtitle: tool.description
    });
  }
}

