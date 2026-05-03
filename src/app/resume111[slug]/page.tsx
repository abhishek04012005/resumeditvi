import { notFound } from "next/navigation";
import ResumeDetail from "@/structure/resumedetail/ResumeDetail";
import resumeList from "@/data/resume";
import type { Metadata } from "next";

interface Resume111PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const getResumeSlug = (slug: string) => `resume-111${slug}`;

export async function generateMetadata({ params }: Resume111PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resumeSlug = getResumeSlug(resolvedParams.slug);
  const resume = resumeList.find((item) => item.slug === resumeSlug);

  if (!resume) {
    return {
      title: "Resume not found",
      description: "The requested resume template was not found.",
    };
  }

  const description = `View details for ${resume.name}, a premium resume template optimized for recruiters and fresher job applications.`;

  return {
    title: resume.name,
    description,
    alternates: {
      canonical: `/resume111${resolvedParams.slug}`,
    },
    openGraph: {
      title: resume.name,
      description,
      url: `/resume111${resolvedParams.slug}`,
      siteName: "Ditvi Resume",
    },
  };
}

export default async function Resume111Page({ params }: Resume111PageProps) {
  const resolvedParams = await params;
  const resumeSlug = getResumeSlug(resolvedParams.slug);
  const resume = resumeList.find((item) => item.slug === resumeSlug);

  if (!resume) {
    notFound();
  }

  return <ResumeDetail overrideSlug={resumeSlug} />;
}
