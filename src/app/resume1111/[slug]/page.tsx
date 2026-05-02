import type { Metadata } from "next";
import ResumeDetail from "@/structure/resumedetail/ResumeDetail";
import { getResumeDetailMetadataFromSlug } from "@/lib/seo";

interface Resume1111PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Resume1111PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return getResumeDetailMetadataFromSlug(resolvedParams.slug, "resume1111");
}

export default function Resume1111SeoPage() {
  return <ResumeDetail />;
}
