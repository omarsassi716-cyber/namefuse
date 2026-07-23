import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { seoPages } from "./src/seoData";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Serve sitemap.xml automatically from seoPages
  app.get("/sitemap.xml", (req, res) => {
    const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
    const host = req.get("host");
    const domain = `${protocol}://${host}`;

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Add homepage "/"
    xml += `  <url>\n`;
    xml += `    <loc>${domain}/</loc>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>1.0</priority>\n`;
    xml += `  </url>\n`;

    // Add every page in seoPages
    Object.values(seoPages).forEach((page) => {
      const pathVal = page.path.startsWith("/") ? page.path : `/${page.path}`;
      if (pathVal !== "/") {
        xml += `  <url>\n`;
        xml += `    <loc>${domain}${pathVal}</loc>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
      }
    });

    xml += `</urlset>\n`;
    res.header("Content-Type", "application/xml");
    res.status(200).send(xml);
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
    res.status(404).send("OG Image not found");
  });

  // Check if current request path is one of our SEO pages
  const getSeoMetadata = (urlPath: string) => {
    let matchedPath = urlPath.split("?")[0];
    if (matchedPath === "/" || matchedPath === "") {
      matchedPath = "/username-generator";
    }
    return seoPages[matchedPath] || seoPages["/username-generator"];
  };

  // Helper to inject title, description, and OpenGraph/Twitter/JSON-LD tags into index.html content
  const injectSeoTags = (
    html: string,
    title: string,
    description: string,
    currentPageUrl: string,
    ogImageUrl: string
  ): string => {
    let modified = html;
    
    // Inject title
    if (modified.includes("<title>")) {
      modified = modified.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
    } else {
      modified = modified.replace("<head>", `<head>\n    <title>${title}</title>`);
    }

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
      const currentPageUrl = `${protocol}://${host}${req.path}`;
      const ogImageUrl = `${protocol}://${host}/og-image.jpg`;

      try {
        let template = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
        
        // Transform index.html through Vite first
        template = await vite.transformIndexHtml(url, template);

        // Inject SEO details
        const meta = getSeoMetadata(url);
        const title = meta?.metaTitle || "NameFuse | Free Unique Username Generator";
        const description = meta?.metaDescription || "Generate over 50+ unique, creative, and brandable usernames instantly.";
        
        const html = injectSeoTags(template, title, description, currentPageUrl, ogImageUrl);

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
    app.use(express.static(distPath, { index: false }));

    app.get("*all", (req, res) => {
      const url = req.originalUrl;
      const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
      const host = req.get("host");
      const currentPageUrl = `${protocol}://${host}${req.path}`;
      const ogImageUrl = `${protocol}://${host}/og-image.jpg`;
      const htmlPath = path.join(distPath, "index.html");
      
      if (fs.existsSync(htmlPath)) {
        let template = fs.readFileSync(htmlPath, "utf-8");
        
        // Inject SEO details
        const meta = getSeoMetadata(url);
        const title = meta?.metaTitle || "NameFuse | Free Unique Username Generator";
        const description = meta?.metaDescription || "Generate over 50+ unique, creative, and brandable usernames instantly.";

        const html = injectSeoTags(template, title, description, currentPageUrl, ogImageUrl);

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
