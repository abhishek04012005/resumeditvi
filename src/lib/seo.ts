import type { Metadata } from "next";
import { createSlug } from "./slug";

interface ResumeSeoArgs {
  titleTarget?: string;
  name?: string;
  slug?: string;
  resumeId?: string;
}

export const resumeSeoTargets = [
  "Best Resume for Telle calling",
  "Best Resume for IT fresher job",
  "Best resume for professor",
  "Best Resume for IT job",
];

const getTargetDescription = (target: string) =>
  target.replace(/^best resume for\s*/i, "").trim();

export function getResumeDetailMetadata({ titleTarget, name, slug, resumeId }: ResumeSeoArgs): Metadata {
  const target = titleTarget || name || resumeSeoTargets[0];
  const normalizedTarget = target.trim();
  const title = normalizedTarget.toLowerCase().startsWith("best resume for")
    ? normalizedTarget
    : `Best resume for ${normalizedTarget}`;
  const descriptionTarget = getTargetDescription(normalizedTarget);
  const description = `Download the best resume for ${descriptionTarget}. This resume template is perfect for ${descriptionTarget} candidates seeking professional, fresher-friendly job-ready formatting.`;
  const canonicalSlug = slug || createSlug(normalizedTarget);
  const canonicalPath = resumeId ? `/${resumeId}/${canonicalSlug}` : `/resume1111/${canonicalSlug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalPath,
      siteName: "Ditvi Resume",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${normalizedTarget} resume template`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: canonicalPath,
    },
  };
}

export function getResumeTargetBySlug(slug: string): string | undefined {
  return resumeSeoTargets.find((target) => createSlug(target) === slug);
}

export function getResumeDetailMetadataFromSlug(slug: string, resumeId?: string): Metadata {
  const titleTarget = getResumeTargetBySlug(slug) || slug.replace(/-/g, " ");
  return getResumeDetailMetadata({ titleTarget, slug, resumeId });
}

export function getResumeDetailMetadataList(titleTargets: string[]): Metadata[] {
  return titleTargets.map((target) => getResumeDetailMetadata({ titleTarget: target }));
}
