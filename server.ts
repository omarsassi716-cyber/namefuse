import express from "express";
import path from "path";
import fs from "fs";
import compression from "compression";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { seoPages } from "./src/seoData";
import { tools } from "./src/toolsConfig";
import { BLOG_CATEGORIES, BLOG_AUTHORS, getArticleBySlug } from "./src/blogData";
import { getLocalizedSEOContent } from "./src/translations";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Parse incoming JSON payloads
  app.use(express.json());

  // Compress all responses
  app.use(compression());

  // Global Security Headers Middleware
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    
    // Content Security Policy
    // Ensure development resources like Vite's HMR websockets, inline scripts, and dynamic CSS are allowed
    const isDev = process.env.NODE_ENV !== "production";
    const connectSrc = isDev 
      ? "connect-src 'self' ws: wss: https://pagead2.googlesyndication.com;"
      : "connect-src 'self' https://pagead2.googlesyndication.com;";
    
    res.setHeader(
      "Content-Security-Policy",
      `default-src 'self'; ` +
      `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagservices.com https://adservice.google.com https://adservice.google.co.uk; ` +
      `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; ` +
      `img-src 'self' data: https://images.unsplash.com https://pagead2.googlesyndication.com https://adservice.google.com https://adservice.google.co.uk; ` +
      `font-src 'self' https://fonts.gstatic.com data:; ` +
      `${connectSrc} ` +
      `frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://pagead2.googlesyndication.com; ` +
      `object-src 'none';`
    );
    next();
  });

  // Lazy-loaded Gemini client setup
  let genAI: GoogleGenAI | null = null;
  function getGenAI() {
    if (!genAI) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not defined in server environment variables.");
      }
      genAI = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return genAI;
  }

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // AI Username & Display Name Generation Route
  app.post("/api/ai-generate", async (req, res) => {
    try {
      const { keyword, platform, style, count = 50, generatorType = "username", filters } = req.body;

      // Validate platform and style
      if (!platform || !style) {
        res.status(400).json({ error: "Platform and Style parameters are required." });
        return;
      }

      const client = getGenAI();

      // Find tool configuration for tailored prompt
      const matchingTool = tools.find(t => t.id === generatorType);
      const targetEntity = matchingTool ? matchingTool.name : "naming suggestions";
      const goalDesc = matchingTool ? matchingTool.description : "Create memorable name options.";

      let prompt = `Generate exactly ${count} unique ${targetEntity} suggestions for the target context: "${platform}".`;
      prompt += `\nGoal: ${goalDesc}`;
      prompt += `\nRequired Aesthetic/Style: "${style}".`;
      if (keyword) {
        prompt += `\nInclude or base them around the seed keyword: "${keyword}".`;
      }
      if (filters) {
        prompt += `\nConstraints:`;
        if (filters.minLength) prompt += `\n- Minimum length: ${filters.minLength} characters.`;
        if (filters.maxLength) prompt += `\n- Maximum length: ${filters.maxLength} characters.`;
        if (filters.startsWith) prompt += `\n- Must start with: "${filters.startsWith}".`;
        if (filters.endsWith) prompt += `\n- Must end with: "${filters.endsWith}".`;
        if (filters.allowNumbers === false) prompt += `\n- MUST NOT contain any numbers.`;
        if (filters.allowSymbols === false) prompt += `\n- MUST NOT contain any special characters, spaces, or symbols.`;
      }
      prompt += `\nOutput MUST be a single flat JSON array of strings, where each element is a generated name. Do not include any nested fields or additional keys. Do not duplicate names. Output exactly ${count} names.`;

      const response = await client.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction: `You are a creative brand naming specialist, linguist, and social media consultant. You generate exceptionally creative, modern, stylish, and brandable ${targetEntity}. Keep them punchy, highly readable, eye-catching, and tailored to the context.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
            description: "A flat list of unique generated names matching the criteria.",
          },
        },
      });

      const textOutput = response.text;
      if (!textOutput) {
        throw new Error("Empty response received from the AI model.");
      }

      const names = JSON.parse(textOutput);
      if (!Array.isArray(names)) {
        throw new Error("Invalid response format received from the AI model.");
      }

      res.json({ names });
    } catch (error: any) {
      console.error("[AI Generate Route Error]:", error?.message || error);
      res.status(500).json({
        error: error?.message || "Internal server error occurred during generation.",
        fallback: true
      });
    }
  });

  // Serve sitemap.xml and language-specific sitemaps (sitemap_es.xml, etc.)
  app.get("/sitemap*.xml", (req, res) => {
    const filename = req.path.substring(1) || "sitemap.xml";
    const buildSitemapPath = path.resolve(process.cwd(), "dist", filename);
    const devSitemapPath = path.resolve(process.cwd(), "public", filename);
    const sitemapPath = fs.existsSync(buildSitemapPath) ? buildSitemapPath : devSitemapPath;

    if (fs.existsSync(sitemapPath)) {
      res.header("Content-Type", "application/xml");
      res.sendFile(sitemapPath);
    } else {
      res.status(404).send("Sitemap not found");
    }
  });

  // Serve RSS feed.xml
  app.get(["/feed.xml", "/blog/feed.xml"], (req, res) => {
    const buildFeedPath = path.resolve(process.cwd(), "dist/feed.xml");
    const devFeedPath = path.resolve(process.cwd(), "public/feed.xml");
    const feedPath = fs.existsSync(buildFeedPath) ? buildFeedPath : devFeedPath;

    if (fs.existsSync(feedPath)) {
      res.header("Content-Type", "application/xml");
      res.sendFile(feedPath);
    } else {
      res.status(404).send("RSS Feed not found");
    }
  });

  // Serve robots.txt dynamically to ensure current host is used for sitemap
  app.get("/robots.txt", (req, res) => {
    const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
    const host = req.get("host");
    res.type("text/plain");
    res.send(`User-agent: *
Allow: /
Sitemap: ${protocol}://${host}/sitemap.xml`);
  });

  // Serve the generated OpenGraph image
  app.get("/og-image.jpg", (req, res) => {
    const dirPath = path.resolve(process.cwd(), "src/assets/images");
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      const ogFile = files.find(f => f.startsWith("namefuse_og_preview") && f.endsWith(".jpg"));
      if (ogFile) {
        res.sendFile(path.join(dirPath, ogFile));
        return;
      }
    }
    // Safe fallback to default public OG image if premium previews are missing
    const publicPath = path.resolve(process.cwd(), "public/og-image.png");
    const distPath = path.resolve(process.cwd(), "dist/og-image.png");
    const fallbackPath = fs.existsSync(distPath) ? distPath : publicPath;
    
    if (fs.existsSync(fallbackPath)) {
      res.sendFile(fallbackPath);
    } else {
      res.status(404).send("OG Image not found");
    }
  });

  // Check if current request path is one of our SEO pages or blog paths
  const getSeoMetadata = (urlPath: string) => {
    let matchedPath = urlPath.split("?")[0];
    if (matchedPath.endsWith("/") && matchedPath.length > 1) {
      matchedPath = matchedPath.slice(0, -1);
    }

    // Detect language prefix
    let lang = "en";
    const pathParts = matchedPath.split("/").filter(Boolean);
    if (pathParts.length > 0 && ["es", "fr", "de", "ar"].includes(pathParts[0])) {
      lang = pathParts[0];
      matchedPath = "/" + pathParts.slice(1).join("/");
    }

    if (matchedPath === "/" || matchedPath === "") {
      matchedPath = "/username-generator";
    }

    if (matchedPath.startsWith("/blog")) {
      const parts = matchedPath.split("/").filter(Boolean);
      if (parts.length === 1) {
        return {
          metaTitle: "Strategic Brand & Username Articles | NameFuse Blog",
          metaDescription: "Discover professional naming guides, esports tag checklists, social media handle strategy, and digital safety tutorials.",
          h1: "NameFuse Strategy Blog"
        };
      } else if (parts[1] === "category") {
        const catId = parts[2] || "";
        const catObj = BLOG_CATEGORIES.find(c => c.id === catId);
        return {
          metaTitle: catObj ? `${catObj.name} Guides & Tactics | NameFuse Blog` : "Category Articles | NameFuse Blog",
          metaDescription: catObj ? catObj.desc : "Read our collection of articles.",
          h1: catObj ? catObj.name : "Blog Category"
        };
      } else if (parts[1] === "tag") {
        const tag = parts[2] || "";
        return {
          metaTitle: `#${tag} Insights & Strategic Guides | NameFuse Blog`,
          metaDescription: `Handpicked masterclasses and tactical naming suggestions focusing specifically on the ${tag} ecosystem.`,
          h1: `#${tag} Tag`
        };
      } else if (parts[1] === "author") {
        const authorId = parts[2] || "";
        const authorObj = BLOG_AUTHORS[authorId];
        return {
          metaTitle: authorObj ? `${authorObj.name} Naming Articles | NameFuse Blog` : "Author Profile | NameFuse Blog",
          metaDescription: authorObj ? `${authorObj.name} is a ${authorObj.role}. Read their deep-dive guides.` : "Author profile.",
          h1: authorObj ? authorObj.name : "Author Profile"
        };
      } else {
        const slug = parts[1] || "";
        const post = getArticleBySlug(slug);
        if (post) {
          return {
            metaTitle: post.metaTitle,
            metaDescription: post.metaDescription,
            h1: post.title
          };
        } else {
          return {
            metaTitle: "Article Not Found | NameFuse Blog",
            metaDescription: "The requested article could not be located.",
            h1: "Article Not Found"
          };
        }
      }
    }

    if (matchedPath === "/about-us") {
      return {
        metaTitle: "About NameFuse | The Procedural Username Generator Team",
        metaDescription: "Learn about NameFuse, our mission, our unique Procedural Syllables Engine, and our focus on generating readable and brandable usernames for creators and gamers.",
        h1: "About NameFuse"
      };
    }

    if (matchedPath === "/contact") {
      return {
        metaTitle: "Contact Us | NameFuse Support & Feedback",
        metaDescription: "Get in touch with the NameFuse team. Submit feature suggestions, bug reports, partnerships, or ask questions about our username generator.",
        h1: "Contact Our Team"
      };
    }

    if (matchedPath === "/privacy-policy") {
      return {
        metaTitle: "Privacy Policy | NameFuse",
        metaDescription: "Read the Privacy Policy of NameFuse. Learn how we handle your personal data and protect your transient generated username ideas.",
        h1: "Privacy Policy"
      };
    }

    if (matchedPath === "/terms-of-service") {
      return {
        metaTitle: "Terms of Service | NameFuse",
        metaDescription: "Review the Terms of Service for using the NameFuse username generation engine and services.",
        h1: "Terms of Service"
      };
    }

    const basePage = seoPages[matchedPath] || seoPages["/username-generator"];
    if (lang !== "en" && basePage) {
      const localized = getLocalizedSEOContent(basePage.platform, basePage.platform, basePage.defaultStyle, lang);
      if (localized) {
        return {
          metaTitle: localized.metaTitle,
          metaDescription: localized.metaDescription,
          h1: localized.h1
        };
      }
    }

    return basePage;
  };

  // Helper to inject title, description, and OpenGraph/Twitter/JSON-LD tags into index.html content
  const injectSeoTags = (
    html: string,
    title: string,
    description: string,
    currentPageUrl: string,
    ogImageUrl: string,
    currentPath: string
  ): string => {
    let modified = html;
    
    // Inject title
    if (modified.includes("<title>")) {
      modified = modified.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
    } else {
      modified = modified.replace("<head>", `<head>\n    <title>${title}</title>`);
    }

    let matchedPath = currentPath.split("?")[0];
    if (matchedPath.endsWith("/") && matchedPath.length > 1) {
      matchedPath = matchedPath.slice(0, -1);
    }
    const pathParts = matchedPath.split("/").filter(Boolean);
    if (pathParts.length > 0 && ["es", "fr", "de", "ar"].includes(pathParts[0])) {
      matchedPath = "/" + pathParts.slice(1).join("/");
    }
    if (matchedPath === "/" || matchedPath === "") {
      matchedPath = "/username-generator";
    }

    const getLocalizedHref = (lang: string) => {
      const DOMAIN = "https://namefuse.vercel.app";
      if (lang === "en") return `${DOMAIN}${matchedPath}`;
      return `${DOMAIN}/${lang}${matchedPath}`;
    };

    const hreflangTags = `
    <link rel="alternate" hreflang="en" href="${getLocalizedHref("en")}" />
    <link rel="alternate" hreflang="es" href="${getLocalizedHref("es")}" />
    <link rel="alternate" hreflang="fr" href="${getLocalizedHref("fr")}" />
    <link rel="alternate" hreflang="de" href="${getLocalizedHref("de")}" />
    <link rel="alternate" hreflang="ar" href="${getLocalizedHref("ar")}" />
    <link rel="alternate" hreflang="x-default" href="${getLocalizedHref("en")}" />
    `;

    // Prepare JSON-LD
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": title,
      "description": description,
      "url": currentPageUrl,
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "publisher": {
        "@type": "Organization",
        "name": "NameFuse"
      }
    };

    // Prepare SEO tags block
    const seoTags = `
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${currentPageUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${currentPageUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${ogImageUrl}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${ogImageUrl}" />
    ${hreflangTags}
    <script type="application/ld+json">
      ${JSON.stringify(jsonLd, null, 2)}
    </script>
    `;

    modified = modified.replace("<head>", `<head>${seoTags}`);
    return modified;
  };

  if (process.env.NODE_ENV !== "production") {
    // Development mode with Vite middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom", // Use custom so we intercept the HTML loading ourselves
    });
    
    app.use(vite.middlewares);

    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
      const host = req.get("host");
      let cleanPath = req.path;
      if (cleanPath.endsWith("/") && cleanPath.length > 1) {
        cleanPath = cleanPath.slice(0, -1);
      }
      const currentPageUrl = `${protocol}://${host}${cleanPath}`;
      const ogImageUrl = `${protocol}://${host}/og-image.jpg`;

      try {
        let template = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
        
        // Transform index.html through Vite first
        template = await vite.transformIndexHtml(url, template);

        // Inject SEO details
        const meta = getSeoMetadata(url);
        const title = meta?.metaTitle || "NameFuse | Free Unique Username Generator";
        const description = meta?.metaDescription || "Generate over 50+ unique, creative, and brandable usernames instantly.";
        
        const html = injectSeoTags(template, title, description, currentPageUrl, ogImageUrl, req.path);

        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    
    // Serve static files with caching
    app.use(express.static(distPath, {
      index: false,
      maxAge: "1y",
      setHeaders: (res, filepath) => {
        if (filepath.endsWith(".html")) {
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        } else {
          // Cache fonts, images, scripts, and stylesheets heavily
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      }
    }));

    app.get("*", (req, res) => {
      const url = req.originalUrl;
      const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
      const host = req.get("host");
      let cleanPath = req.path;
      if (cleanPath.endsWith("/") && cleanPath.length > 1) {
        cleanPath = cleanPath.slice(0, -1);
      }
      const currentPageUrl = `${protocol}://${host}${cleanPath}`;
      const ogImageUrl = `${protocol}://${host}/og-image.jpg`;
      const htmlPath = path.join(distPath, "index.html");
      
      if (fs.existsSync(htmlPath)) {
        let template = fs.readFileSync(htmlPath, "utf-8");
        
        // Inject SEO details
        const meta = getSeoMetadata(url);
        const title = meta?.metaTitle || "NameFuse | Free Unique Username Generator";
        const description = meta?.metaDescription || "Generate over 50+ unique, creative, and brandable usernames instantly.";

        const html = injectSeoTags(template, title, description, currentPageUrl, ogImageUrl, req.path);

        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } else {
        res.status(404).send("Application build files not found.");
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server", err);
});
