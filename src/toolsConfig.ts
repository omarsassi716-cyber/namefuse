import {
  Sparkles,
  User,
  Smile,
  Award,
  Briefcase,
  Rocket,
  Building2,
  Users,
  Shield,
  Crown,
  Gamepad2,
  LucideIcon
} from "lucide-react";

export interface ToolConfig {
  id: string;
  name: string;
  path: string;
  description: string;
  icon: LucideIcon;
  platforms: string[];
  styles: string[];
  defaultPlatform: string;
  defaultStyle: string;
  placeholder: string;
  resultLabel: string;
  generateButtonText: string;
}

export const tools: ToolConfig[] = [
  {
    id: "username",
    name: "Username Generator",
    path: "/username-generator",
    description: "Create memorable, platform-compliant usernames for social media and games.",
    icon: Sparkles,
    platforms: ["Universal", "Instagram", "TikTok", "YouTube", "Discord", "Twitch", "Roblox", "Gaming"],
    styles: ["Cool", "Aesthetic", "Minimal", "Luxury", "Funny", "Dark", "Cute", "Creator", "Influencer", "Random"],
    defaultPlatform: "Universal",
    defaultStyle: "Cool",
    placeholder: "e.g. ghost, velvet",
    resultLabel: "Username",
    generateButtonText: "Generate 50 Usernames"
  },
  {
    id: "display-name",
    name: "Display Name Generator",
    path: "/display-name-generator",
    description: "Generate creative, eye-catching profile names for Discord, Roblox, and TikTok.",
    icon: User,
    platforms: ["Universal", "Discord", "YouTube", "TikTok", "Instagram", "Twitch", "Roblox"],
    styles: ["Cool", "Aesthetic", "Gaming", "Professional", "Funny", "Cute", "Dark", "Luxury", "Minimal"],
    defaultPlatform: "Universal",
    defaultStyle: "Cool",
    placeholder: "e.g. shadow, angel",
    resultLabel: "Display Name",
    generateButtonText: "Generate 50 Display Names"
  },
  {
    id: "nickname",
    name: "Nickname Generator",
    path: "/nickname-generator",
    description: "Find cute, short, or funny nickname ideas for friends, family, or gaming.",
    icon: Smile,
    platforms: ["Universal", "Cute", "Gaming", "Friends", "Baby Boy", "Baby Girl"],
    styles: ["Cute", "Cool", "Funny", "Short", "Aesthetic", "Random"],
    defaultPlatform: "Universal",
    defaultStyle: "Cute",
    placeholder: "e.g. bub, honey",
    resultLabel: "Nickname",
    generateButtonText: "Generate 50 Nicknames"
  },
  {
    id: "brand-name",
    name: "Brand Name Generator",
    path: "/brand-name-generator",
    description: "Engineer unique, high-retention brand name ideas for your new venture or blog.",
    icon: Award,
    platforms: ["Universal", "Modern", "Tech", "Fashion", "Fitness", "Food", "Creative"],
    styles: ["Minimal", "Luxury", "Cool", "Professional", "Aesthetic", "Random"],
    defaultPlatform: "Universal",
    defaultStyle: "Minimal",
    placeholder: "e.g. flow, peak",
    resultLabel: "Brand Name",
    generateButtonText: "Generate 50 Brand Names"
  },
  {
    id: "business-name",
    name: "Business Name Generator",
    path: "/business-name-generator",
    description: "Generate catchy, professional, and corporate-ready company names instantly.",
    icon: Briefcase,
    platforms: ["Universal", "Agency", "Consulting", "Finance", "Logistics", "Tech", "Creative"],
    styles: ["Professional", "Business", "Luxury", "Minimal", "Cool", "Random"],
    defaultPlatform: "Universal",
    defaultStyle: "Professional",
    placeholder: "e.g. synergy, crest",
    resultLabel: "Business Name",
    generateButtonText: "Generate 50 Business Names"
  },
  {
    id: "startup-name",
    name: "Startup Name Generator",
    path: "/startup-name-generator",
    description: "Discover modern, catchy, and trademark-friendly startup name formulas.",
    icon: Rocket,
    platforms: ["Universal", "AI", "SaaS", "Fintech", "Health", "E-commerce", "Crypto"],
    styles: ["Minimal", "Cool", "Professional", "Business", "Random"],
    defaultPlatform: "Universal",
    defaultStyle: "Minimal",
    placeholder: "e.g. apex, cloud",
    resultLabel: "Startup Name",
    generateButtonText: "Generate 50 Startup Names"
  },
  {
    id: "company-name",
    name: "Company Name Generator",
    path: "/company-name-generator",
    description: "Find structured, trustworthy, and scalable company names for any industry.",
    icon: Building2,
    platforms: ["Universal", "Agency", "Consultancy", "Tech", "Finance", "Logistics", "Creative"],
    styles: ["Professional", "Business", "Luxury", "Minimal", "Random"],
    defaultPlatform: "Universal",
    defaultStyle: "Professional",
    placeholder: "e.g. summit, alpha",
    resultLabel: "Company Name",
    generateButtonText: "Generate 50 Company Names"
  },
  {
    id: "team-name",
    name: "Team Name Generator",
    path: "/team-name-generator",
    description: "Get cool, creative, and motivating names for corporate, sports, or trivia teams.",
    icon: Users,
    platforms: ["Universal", "Corporate", "Creative", "Sports", "Fitness", "Trivia", "Gaming"],
    styles: ["Cool", "Funny", "Dark", "Professional", "Random"],
    defaultPlatform: "Universal",
    defaultStyle: "Cool",
    placeholder: "e.g. eagles, elite",
    resultLabel: "Team Name",
    generateButtonText: "Generate 50 Team Names"
  },
  {
    id: "clan-name",
    name: "Clan Name Generator",
    path: "/clan-name-generator",
    description: "Build legendary clan names for FPS, RPG, and competitive gaming squads.",
    icon: Shield,
    platforms: ["Universal", "Competitive", "FPS", "RPG", "Fantasy", "Cool", "Dark"],
    styles: ["Gaming", "Dark", "Cool", "Random"],
    defaultPlatform: "Universal",
    defaultStyle: "Gaming",
    placeholder: "e.g. storm, viper",
    resultLabel: "Clan Name",
    generateButtonText: "Generate 50 Clan Names"
  },
  {
    id: "guild-name",
    name: "Guild Name Generator",
    path: "/guild-name-generator",
    description: "Forge epic, medieval, or fantasy guild names for MMOs and cooperative gaming.",
    icon: Crown,
    platforms: ["Universal", "MMO", "RPG", "Fantasy", "Medieval", "Badass", "Cozy"],
    styles: ["Gaming", "Dark", "Luxury", "Cool", "Random"],
    defaultPlatform: "Universal",
    defaultStyle: "Gaming",
    placeholder: "e.g. eon, templar",
    resultLabel: "Guild Name",
    generateButtonText: "Generate 50 Guild Names"
  },
  {
    id: "gamertag",
    name: "Gamertag Generator",
    path: "/gamertag-generator",
    description: "Create aggressive, sleek, or futuristic Xbox and PlayStation gamertags.",
    icon: Gamepad2,
    platforms: ["Universal", "Xbox", "PlayStation", "Steam", "Nintendo", "Esports", "Gaming"],
    styles: ["Gaming", "Cool", "Dark", "Funny", "Random"],
    defaultPlatform: "Universal",
    defaultStyle: "Gaming",
    placeholder: "e.g. nexus, bullet",
    resultLabel: "Gamertag",
    generateButtonText: "Generate 50 Gamertags"
  }
];

// Helper to find the matching tool configuration for a given path/URL
export function getToolForPath(path: string): ToolConfig {
  // Direct match check first
  const directMatch = tools.find((t) => t.path === path);
  if (directMatch) return directMatch;

  // Pattern checks (e.g. sub-paths)
  const lowerPath = path.toLowerCase();
  
  if (lowerPath.includes("display-name")) {
    return tools.find((t) => t.id === "display-name") || tools[0];
  }
  if (lowerPath.includes("nickname") || lowerPath.includes("baby-nickname")) {
    return tools.find((t) => t.id === "nickname") || tools[0];
  }
  if (lowerPath.includes("brand-name")) {
    return tools.find((t) => t.id === "brand-name") || tools[0];
  }
  if (lowerPath.includes("business-name") || lowerPath.includes("business-usernames") || lowerPath.includes("business-brand-names") || lowerPath.includes("business-agency-names")) {
    return tools.find((t) => t.id === "business-name") || tools[0];
  }
  if (lowerPath.includes("startup-name") || lowerPath.includes("startup-")) {
    return tools.find((t) => t.id === "startup-name") || tools[0];
  }
  if (lowerPath.includes("company-name") || lowerPath.includes("company-")) {
    return tools.find((t) => t.id === "company-name") || tools[0];
  }
  if (lowerPath.includes("team-name") || lowerPath.includes("team-")) {
    return tools.find((t) => t.id === "team-name") || tools[0];
  }
  if (lowerPath.includes("clan-name") || lowerPath.includes("clan-")) {
    return tools.find((t) => t.id === "clan-name") || tools[0];
  }
  if (lowerPath.includes("guild-name") || lowerPath.includes("guild-")) {
    return tools.find((t) => t.id === "guild-name") || tools[0];
  }
  if (lowerPath.includes("gamertag") || lowerPath.includes("xbox") || lowerPath.includes("psn")) {
    return tools.find((t) => t.id === "gamertag") || tools[0];
  }

  // Default fallback to Tool #1 (Username Generator)
  return tools[0];
}
