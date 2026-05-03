import ResumeDetail from "@/structure/resumedetail/ResumeDetail";
import { Metadata } from "next";
import resumeList from "@/data/resume";
import { getResumeDetailMetadata } from "@/lib/seo";
import { resumeSeoData } from "@/data/seo";

interface ResumePageProps {
  params: Promise<{
    resumeId: string;
  }>;
}

// ✅ Metadata
export async function generateMetadata(
  { params }: ResumePageProps
): Promise<Metadata> {
  const { resumeId } = await params;

  const resume = resumeList.find(
    (item) => item.slug === resumeId
  );

  if (!resume) {
    return {
      title: "Resume Details",
      description: "View resume details and options",
    };
  }

  const seoData = Object.values(resumeSeoData).find(
    (item) => item.path.split("/")[2] === resume.slug
  );

  if (seoData) {
    return {
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
      openGraph: {
        title: seoData.title,
        description: seoData.description,
        images: [{ url: seoData.ogImage }],
      },
    };
  }

  return getResumeDetailMetadata({
    titleTarget: resume.name,
    slug: resume.slug,
    resumeId: "resume",
  });
}

// ✅ Page Component
export default async function ResumePage(
  { params }: ResumePageProps
) {
  const { resumeId } = await params;

  const resume = resumeList.find(
    (item) => item.slug === resumeId
  );

  const seoData = resume
    ? Object.values(resumeSeoData).find(
        (item) => item.path.split("/")[2] === resume.slug
      )
    : undefined;

  return <ResumeDetail seoData={seoData} />;
}