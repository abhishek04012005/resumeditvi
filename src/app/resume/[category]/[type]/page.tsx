import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { resumeSeoData, type SeoData } from '@/data/seo';
import { getResumeTargetBySlug } from '@/lib/seo';
import { createSlug } from '@/lib/slug';
import ResumeTemplate from '../../../../component/resumetemplate/ResumeTemplate';
import ResumeDetail from '@/structure/resumedetail/ResumeDetail';

interface Props {
  params: {
    category: string;
    type: string;
  };
}

const findBaseSeoData = (category: string): SeoData => {
  const baseKey = Object.keys(resumeSeoData).find((key) =>
    createSlug(resumeSeoData[key].path.split('/')[2]) === createSlug(category)
  );

  return baseKey ? resumeSeoData[baseKey] : resumeSeoData.classicResume;
};

const createFallbackSeoData = (category: string, type: string): SeoData | null => {
  const titleTarget = getResumeTargetBySlug(createSlug(type));
  if (!titleTarget) return null;

  const baseSeoData = findBaseSeoData(category);
  return {
    ...baseSeoData,
    title: titleTarget,
    description: `A resume template designed for ${titleTarget}. Download this ATS-friendly resume and showcase your career accomplishments.`,
    keywords: `resume template, ${titleTarget.toLowerCase()}, ATS friendly resume`,
    path: `/resume/${createSlug(category)}/${createSlug(type)}`,
    category: baseSeoData.category,
    ogImage: baseSeoData.ogImage,
    templatePreview: baseSeoData.templatePreview,
    features: baseSeoData.features,
    targetAudience: baseSeoData.targetAudience,
  };
};

export async function generateMetadata({ params }: { params: Promise<Props['params']> }): Promise<Metadata> {
  const resolvedParams = await params;
  const searchPath = `/resume/${createSlug(resolvedParams.category)}/${createSlug(resolvedParams.type)}`;
  const seoKey = Object.keys(resumeSeoData).find((key) => {
    const normalizedPath = resumeSeoData[key].path
      .split('/')
      .map(createSlug)
      .join('/');
    return normalizedPath === searchPath;
  });

  const seoData = seoKey
    ? resumeSeoData[seoKey]
    : createFallbackSeoData(resolvedParams.category, resolvedParams.type);

  if (!seoData) return { title: 'Resume Template Not Found' };

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

export async function generateStaticParams() {
  return Object.values(resumeSeoData).map(data => {
    const [, category, type] = data.path.split('/');
    return { category, type };
  });
}

export default async function ResumePage({ params }: { params: Promise<Props['params']> }) {
  const resolvedParams = await params;
  const searchPath = `/resume/${createSlug(resolvedParams.category)}/${createSlug(resolvedParams.type)}`;
  const seoKey = Object.keys(resumeSeoData).find((key) => {
    const normalizedPath = resumeSeoData[key].path
      .split('/')
      .map(createSlug)
      .join('/');
    return normalizedPath === searchPath;
  });

  const seoData = seoKey
    ? resumeSeoData[seoKey]
    : createFallbackSeoData(resolvedParams.category, resolvedParams.type);

  if (!seoData) notFound();

  return seoKey ? <ResumeTemplate seoData={seoData} /> : <ResumeDetail seoData={seoData} />;
}