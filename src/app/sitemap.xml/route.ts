import { NextResponse } from "next/server";
import blogPosts from "@/data/blog";
import resumeList from "@/data/resume";
import { resumeSeoTargets } from "@/lib/seo";
import { createSlug } from "@/lib/slug";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://resume.ditvi.org";
const currentDate = new Date().toISOString();

const buildUrls = () => {
  const urls = [
    `${baseUrl}/`,
    `${baseUrl}/resume`,
    `${baseUrl}/blog`,
    `${baseUrl}/how-we-work`,
    `${baseUrl}/why-us`,


  ];

  const resumeIds = resumeList.map((resume) => resume.slug);

  resumeIds.forEach((resumeId) => {
    urls.push(`${baseUrl}/${resumeId}`);
    resumeSeoTargets.forEach((target) => {
      const targetSlug = createSlug(target);
      urls.push(`${baseUrl}/${resumeId}/${targetSlug}`);
    });
  });

  blogPosts.forEach((post) => {
    const slug = createSlug(post.title);
    urls.push(`${baseUrl}/blog/${slug}`);
  });

  return urls;
};

export function GET() {
  const urls = buildUrls();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
      .map(
        (url) => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`
      )
      .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
