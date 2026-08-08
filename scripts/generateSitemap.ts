import fs from "fs";
import path from "path";
import { seoPages } from "../src/seoData";
import { blogArticles } from "../src/blogData";

const DOMAIN = "https://namefuse.vercel.app";
const LANGUAGES = ["en", "es", "fr", "de", "ar"];

function getLocalizedPath(p: string, lang: string) {
  if (lang === "en") return p === "" ? "/" : p;
  const base = p === "" ? "/username-generator" : p;
  return `/${lang}${base}`;
}

async function generateSitemap() {
  console.log("Generating language-specific sitemaps & index...");

  const staticPaths = [
    "",
    "/about-us",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
    "/blog"
  ];

  const dynamicPaths = Object.keys(seoPages);
  
  // Add all blog article paths
  const blogPaths = blogArticles.map((post) => `/blog/${post.slug}`);

  // Combine all unique paths
  const allPaths = Array.from(new Set([...staticPaths, ...dynamicPaths, ...blogPaths])).sort();

  // Create sitemaps for each language
  for (const lang of LANGUAGES) {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

    for (const p of allPaths) {
      const currentLoc = `${DOMAIN}${getLocalizedPath(p, lang)}`;
      let priority = "0.6";
      let changefreq = "weekly";

      if (p === "") {
        priority = "1.0";
        changefreq = "daily";
      } else if (["/about-us", "/contact", "/privacy-policy", "/terms-of-service"].includes(p)) {
        priority = "0.5";
        changefreq = "monthly";
      } else if (p.includes("-generator")) {
        priority = "0.9";
        changefreq = "weekly";
      }

      xml += `  <url>\n`;
      xml += `    <loc>${currentLoc}</loc>\n`;
      xml += `    <changefreq>${changefreq}</changefreq>\n`;
      xml += `    <priority>${priority}</priority>\n`;

      // Cross-link all languages (hreflang tags)
      for (const alternateLang of LANGUAGES) {
        const altLoc = `${DOMAIN}${getLocalizedPath(p, alternateLang)}`;
        xml += `    <xhtml:link rel="alternate" hreflang="${alternateLang}" href="${altLoc}" />\n`;
      }
      
      // x-default fallback is English
      const defaultLoc = `${DOMAIN}${getLocalizedPath(p, "en")}`;
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultLoc}" />\n`;

      xml += `  </url>\n`;
    }

    xml += `</urlset>\n`;

    const sitemapFile = `sitemap_${lang}.xml`;
    const sitemapPath = path.resolve(process.cwd(), `public/${sitemapFile}`);
    fs.writeFileSync(sitemapPath, xml, "utf-8");
    console.log(`Generated ${sitemapFile} with ${allPaths.length} URLs.`);
  }

  // Generate Master Sitemap Index
  let indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  indexXml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const lang of LANGUAGES) {
    indexXml += `  <sitemap>\n`;
    indexXml += `    <loc>${DOMAIN}/sitemap_${lang}.xml</loc>\n`;
    indexXml += `  </sitemap>\n`;
  }

  indexXml += `</sitemapindex>\n`;

  const sitemapIndexPath = path.resolve(process.cwd(), "public/sitemap.xml");
  fs.writeFileSync(sitemapIndexPath, indexXml, "utf-8");
  console.log(`Successfully generated master sitemap.xml index.`);
}

generateSitemap().catch((err) => {
  console.error("Failed to generate sitemap:", err);
  process.exit(1);
});
