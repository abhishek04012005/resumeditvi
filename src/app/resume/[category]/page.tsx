import ResumeDetail from "@/structure/resumedetail/ResumeDetail";
import { Metadata } from "next";
import resumeList from "@/data/resume";
import { getResumeDetailMetadata } from "@/lib/seo";

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

  return getResumeDetailMetadata({
    titleTarget: resume.name,
    slug: resume.slug,
  });
}

export default function ResumePage() {
  return <ResumeDetail />;
}
