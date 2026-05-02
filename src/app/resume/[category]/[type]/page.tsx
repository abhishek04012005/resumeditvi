import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { resumeSeoData } from '@/data/seo';
import { createSlug } from '@/lib/slug';
import ResumeTemplate from '../../../../component/resumetemplate/ResumeTemplate';

interface Props {
  params: {
    category: string;
    type: string;
  };
}

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
  
  if (!seoKey) return { title: 'Resume Template Not Found' };
  
  const seoData = resumeSeoData[seoKey];
  
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

  if (!seoKey) notFound();

  return <ResumeTemplate seoData={resumeSeoData[seoKey]} />;
}