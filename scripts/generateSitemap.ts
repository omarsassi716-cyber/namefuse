import fs from "fs";
import path from "path";
import { seoPages } from "../src/seoData";

const DOMAIN = "https://namefuse.com";

async function generateSitemap() {
  console.log("Generating sitemap...");
  
  const staticPaths = [
    "",
    "/about-us",
    "/contact",
    "/privacy-policy",
    "/terms-of-service"
  ];

  const dynamicPaths = Object.keys(seoPages);
  
  // Combine all unique paths
  const allPaths = Array.from(new Set([...staticPaths, ...dynamicPaths])).sort();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const p of allPaths) {
    const loc = `${DOMAIN}${p}`;
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
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  const sitemapPath = path.resolve(process.cwd(), "public/sitemap.xml");
  fs.writeFileSync(sitemapPath, xml, "utf-8");
  console.log(`Successfully generated sitemap with ${allPaths.length} URLs at ${sitemapPath}`);
}

generateSitemap().catch((err) => {
  console.error("Failed to generate sitemap:", err);
  process.exit(1);
});
