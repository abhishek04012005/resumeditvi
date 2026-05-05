// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import blogPosts from "../../../data/blog";
import BlogDetail from "@/structure/blogdetail/BlogDetail";

export const dynamic = "force-dynamic";

interface BlogPageParams {
  slug: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<BlogPageParams>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogPosts.find((post) => post.slug === resolvedParams.slug);

  if (!post) {
    return {
      title: "Blog Not Found",
      description: "The requested blog does not exist.",
    };
  }

  const imageUrl = typeof post.image === "string" ? post.image : post.image.src;

  return {
    title: `${post.title} | Ditvi Resume`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${resolvedParams.slug}`,
    },
    openGraph: {
      type: "article",
      siteName: "Ditvi Resume",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${resolvedParams.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<BlogPageParams>;
}) {
  const resolvedParams = await params;
  const post = blogPosts.find((post) => post.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <BlogDetail post={post} />
    </main>
  );
}
