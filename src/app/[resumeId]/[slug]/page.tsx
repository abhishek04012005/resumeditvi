import type { Metadata } from "next";
import ResumeDetail from "@/structure/resumedetail/ResumeDetail";
import { getResumeDetailMetadataFromSlug } from "@/lib/seo";

interface ResumeSlugPageProps {
  params: Promise<{
    resumeId: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ResumeSlugPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return getResumeDetailMetadataFromSlug(resolvedParams.slug, resolvedParams.resumeId);
}

export default function ResumeSlugPage() {
  return <ResumeDetail />;
}
