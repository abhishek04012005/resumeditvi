import type { StaticImageData } from "next/image";
import Resume1111Image from "../assets/resume/classicresume.png";
import Resume1112Image from "../assets/resume/leadershipresume.png";
import Resume1113Image from "../assets/resume/modernresume.png";
import Resume1114Image from "../assets/resume/technicalresume.png";

export type SeoData = {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  path: string;
  category: string;
  templatePreview: {
    mainImage: StaticImageData;
  };
  features: string[];
  targetAudience: string[];
};

export const resumeSeoData: Record<string, SeoData> = {
  classicResume: {
    title: "Classic Resume Template | Professional and ATS Friendly",
    description:
      "A polished resume template built for professionals seeking a professional, recruiter-friendly presentation with clear achievements and career highlights.",
    keywords: "classic resume template, professional resume, ATS friendly resume, career resume",
    ogImage: Resume1111Image.src,
    path: "/resume/classic-resume/classic-resume",
    category: "Resume Template",
    templatePreview: {
      mainImage: Resume1111Image,
    },
    features: [
      "Professional top-section summary with career objective",
      "Clear experience timeline with quantified outcomes",
      "Skills and certifications presented for quick scanning",
      "Balanced layout with excellent readability",
    ],
    targetAudience: [
      "Doctors and medical professionals",
      "Healthcare administrators and clinical staff",
      "Experienced professionals seeking professional formatting",
    ],
  },
  technicalResume: {
    title: "Technical Resume Template | Structured for Skills and Projects",
    description:
      "A technical resume design that highlights project work, certifications, and technical skills while keeping the layout easy to scan for hiring managers.",
    keywords: "technical resume template, engineering resume, project resume, technical skills resume",
    ogImage: Resume1112Image.src,
    path: "/resume/technical-resume/technical-resume",
    category: "Resume Template",
    templatePreview: {
      mainImage: Resume1112Image,
    },
    features: [
      "Project-focused sections with outcome-driven summaries",
      "Education and certification layout optimized for credibility",
      "Technical skills organized by competency areas",
      "Compact profile section for fast recruiter review",
    ],
    targetAudience: [
      "Engineering applicants",
      "Technical and operations candidates",
      "Telecalling and private-sector sales professionals",
    ],
  },
  leadershipResume: {
    title: "Leadership Resume Template | Impactful Career Narrative",
    description:
      "A high-impact leadership resume template that emphasizes career progression, achievement statements, and executive-level credibility.",
    keywords: "leadership resume template, senior resume, management resume, executive resume",
    ogImage: Resume1113Image.src,
    path: "/resume/leadership-resume/leadership-resume",
    category: "Resume Template",
    templatePreview: {
      mainImage: Resume1113Image,
    },
    features: [
      "Leadership and achievement highlights prominently displayed",
      "Core competencies section tailored for senior roles",
      "Structured career history with outcome-focused bullets",
      "Strong visual hierarchy for executive profiles",
    ],
    targetAudience: [
      "Experienced engineering and operations professionals",
      "Mid-level and senior job seekers",
      "Candidates applying for private-sector management roles",
    ],
  },
  modernResume: {
    title: "Modern Resume Template | Clean and Contemporary Design",
    description:
      "A modern resume layout designed to keep your profile sharp, readable, and attractive for recruiters in private jobs and technical roles.",
    keywords: "modern resume template, polished resume, private sector resume, clean resume design",
    ogImage: Resume1114Image.src,
    path: "/resume/modern-resume/modern-resume",
    category: "Resume Template",
    templatePreview: {
      mainImage: Resume1114Image,
    },
    features: [
      "Modern layout with smart section spacing",
      "Professional summary that leads with value",
      "Skill clusters grouped by relevance",
      "Readable bullets with achievement focus",
    ],
    targetAudience: [
      "Telecalling and customer-facing professionals",
      "Engineering candidates in private companies",
      "Applicants seeking modern, polished resumes",
    ],
  },
};
