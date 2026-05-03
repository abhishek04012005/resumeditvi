import ResumeDetail from "@/structure/resumedetail/ResumeDetail";
import { Metadata } from "next";
import resumeList from "@/data/resume";
import { getResumeDetailMetadata } from "@/lib/seo";
import { resumeSeoData } from "@/data/seo";

interface ResumePageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({ params }: ResumePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resume = resumeList.find((item) => item.slug === resolvedParams.category);

  if (!resume) {
    return {
      title: "Resume Details",
      description: "View resume details and options",
    };
  }

  const seoData = Object.values(resumeSeoData).find((item) => item.path.split("/")[2] === resume.slug);

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

export default async function ResumePage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const resume = resumeList.find((item) => item.slug === resolvedParams.category);
  const seoData = resume
    ? Object.values(resumeSeoData).find((item) => item.path.split("/")[2] === resume.slug)
    : undefined;

  return <ResumeDetail seoData={seoData} />;
}
