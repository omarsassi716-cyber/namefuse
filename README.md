# NameFuse - Unique Username Generator Website

A free, highly optimized, and SEO-ready full-stack web application designed to instantly generate creative, brandable, and realistic usernames for social media and gaming platforms.

## Key Features

1. **Procedural Username Engine**:
   - Generates exactly 50 unique handles per click.
   - Combines prefixes, user-input keywords, suffixes, and digits using 12+ dynamic linguistic formulas.
   - Strictly enforces character length, casing, and symbol constraints for each specific target network.
   - Guarantees zero duplicate results per session.

2. **Advanced Platform & Style Tailoring**:
   - Supports 8 platforms: Instagram, TikTok, YouTube, Discord, Twitch, Roblox, Gaming, and Universal.
   - Features 8 distinct style presets: Cool, Gaming, Professional, Funny, Aesthetic, Dark, Cute, and Random.

3. **High-Performance Full-Stack SEO Routing**:
   - Fully optimized sub-path URLs matching landing pages requested by crawlers:
     - `/username-generator` (Universal Hub)
     - `/instagram-username-generator`
     - `/tiktok-username-generator`
     - `/gaming-username-generator`
     - `/youtube-name-generator`
   - Express backend intercepts landing page requests to dynamically inject optimized server-side SEO `<title>` and `<meta name="description">` tags into the static markup before client-side hydration begins.

4. **Sleek Client-Side Utility Features**:
   - Staggered entrance animations for results using `motion`.
   - Star/Save favorites list powered by Client-Side local state and local storage.
   - One-click copy for individual handles or the entire saved list.
   - Direct-download as a `.txt` file for brainstorming list storage.
   - Quick external availability search lookups on native networks.

5. **Monetization Ready**:
   - Strategically designed placeholder containers for high-performance Google AdSense placements:
     - Top Leaderboard Ad Banner (728x90)
     - In-Feed Native Ad Space (embedded inside the username results grid)
     - Bottom Large Banner Ad Space (970x250)

6. **Bespoke Visual Identity**:
   - Elegant dark mode UI with deep charcoal panels and glowing violet accents.
   - Sophisticated typography pairing: "Inter" for interface controls and "JetBrains Mono" for username outputs and parameters.

---

## Local Development Guide

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your system.

### 1. Project Initialization

Clone or extract this directory into your workspace, open your terminal, and install the required dependencies:

```bash
npm install
```

### 2. Run the Development Server

Start the local full-stack development server. The server runs Express with live Vite middleware on Port 3000:

```bash
npm run dev
```

Now open [http://localhost:3000](http://localhost:3000) in your browser. Navigating to any of the generator subpaths will work instantly with fast client-side transitions and hot-reloading!

### 3. Production Compilation & Build

To compile NameFuse for production, bundle the client-side SPA static assets and compile the Express backend server into a single bundled CommonJS file:

```bash
npm run build
```

This generates:
- React static assets inside `/dist`
- A single compiled, optimized server file at `/dist/server.cjs`

### 4. Run the Production Build

Start the compiled Express server in standalone production mode:

```bash
npm run start
```

The app is now running with maximized performance, and serves fully optimized, server-injected SEO headers to crawl bots!

---

## Technical Stack & Credits

- **Frontend**: React 19, Vite 6, TypeScript
- **Styling**: Tailwind CSS v4, Lucide Icons
- **Backend**: Express, Node.js
- **Animations**: `motion/react`
- **Build System**: `esbuild` (server bundling), `vite` (client bundling)
- **Monetization**: Styled Google AdSense layout integration slots
