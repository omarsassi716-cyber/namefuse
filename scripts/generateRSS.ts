import fs from "fs";
import path from "path";
import { blogArticles } from "../src/blogData";

const DOMAIN = "https://namefuse.vercel.app";

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case "\"": return "&quot;";
      default: return c;
    }
  });
}

async function generateRSS() {
  console.log("Generating RSS XML Feed...");

  let xml = `<?xml version="1.0" encoding="UTF-8" ?>\n`;
  xml += `<rss version="2.0" xmlns:atom="http://www.w3.org/2002/Atom">\n`;
  xml += `  <channel>\n`;
  xml += `    <title>NameFuse Strategy Blog</title>\n`;
  xml += `    <link>${DOMAIN}/blog</link>\n`;
  xml += `    <description>Masterclass tutorials, branding secrets, and naming frameworks written by industry specialists.</description>\n`;
  xml += `    <language>en-us</language>\n`;
  xml += `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n`;
  xml += `    <atom:link href="${DOMAIN}/feed.xml" rel="self" type="application/rss+xml" />\n`;

  for (const post of blogArticles) {
    const postUrl = `${DOMAIN}/blog/${post.slug}`;
    const pubDate = new Date(`${post.publishDate}T09:00:00Z`).toUTCString();

    xml += `    <item>\n`;
    xml += `      <title>${escapeXml(post.title)}</title>\n`;
    xml += `      <link>${postUrl}</link>\n`;
    xml += `      <guid isPermaLink="true">${postUrl}</guid>\n`;
    xml += `      <description>${escapeXml(post.metaDescription)}</description>\n`;
    xml += `      <category>${escapeXml(post.category)}</category>\n`;
    xml += `      <pubDate>${pubDate}</pubDate>\n`;
    xml += `      <author>${escapeXml(post.author.name)}</author>\n`;
    xml += `    </item>\n`;
  }

  xml += `  </channel>\n`;
  xml += `</rss>\n`;

  const feedPath = path.resolve(process.cwd(), "public/feed.xml");
  fs.writeFileSync(feedPath, xml, "utf-8");
  console.log(`Successfully generated RSS XML Feed with ${blogArticles.length} items at ${feedPath}`);
}

generateRSS().catch((err) => {
  console.error("Failed to generate RSS feed:", err);
  process.exit(1);
});
