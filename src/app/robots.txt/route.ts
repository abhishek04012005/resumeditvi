import { NextResponse } from "next/server";
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ditvi-resume.example";

export function GET() {
  const content = `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
