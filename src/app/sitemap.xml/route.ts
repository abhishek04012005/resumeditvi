import { NextResponse } from "next/server";
import blogPosts from "@/data/blog";
import resumeList from "@/data/resume";
import { resumeSeoTargets } from "@/lib/seo";
import { createSlug } from "@/lib/slug";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ditvi-resume.example";

const buildUrls = () => {
  const urls = [
    `${baseUrl}/`,
    `${baseUrl}/resume`,
    `${baseUrl}/blog`,
    `${baseUrl}/confirmation`,
  ];

  const resumeIds = resumeList.map((resume) => resume.slug.replace("resume-", "resume"));

  resumeIds.forEach((resumeId) => {
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
      (url) => `  <url>\n    <loc>${url}</loc>\n  </url>`
    )
    .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
