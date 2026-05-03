import { ResumeType } from "../types/types";
import Resume1111Image from "../assets/resume/1111.png";
import Resume1112Image from "../assets/resume/1112.png";
import Resume1113Image from "../assets/resume/1113.png";
import Resume1114Image from "../assets/resume/1114.png";

const resumeList: ResumeType[] = [
  {
    id: 1,
    slug: "classic-resume",
    name: "Classic Resume",
    image: Resume1111Image,
    type: "resume",
    originalPrice: 201,
    discountPrice: 101,
    shortDescription: "An ATS-ready resume for professionals, especially medical and healthcare practitioners, with executive organization, strong achievement statements, and concise career highlights.",
    longDescription: "Classic Resume is built for professionals who want a polished, recruiter-friendly profile. It emphasizes measurable results, career progression, and skill clusters so both hiring managers and applicant tracking systems can quickly identify your strengths. This format works well for doctors, healthcare administrators, and private-sector professionals seeking trusted presentation.",
    keyFeatures: [
      "Professional top-section summary with career objective",
      "Clear experience timeline with quantified outcomes",
      "Skills and certifications presented for quick scanning",
      "Modern layout that balances white space and content density"
    ],
    benefits: [
      "Improves discoverability in ATS keyword searches",
      "Highlights leadership and clinical achievements",
      "Makes career growth easy to read at a glance",
      "Supports both private hospital and corporate healthcare roles"
    ],
    idealFor: [
      "Doctors and medical professionals",
      "Healthcare administrators and clinical staff",
      "Candidates targeting private-sector healthcare and consulting jobs"
    ],
    highlights: [
      "Results-oriented accomplishment bullets",
      "Visible achievements next to each role",
      "Well-defined skills section for recruiters",
      "Balanced page layout with emphasis on readability"
    ],
    tags: ["ATS-friendly", "Healthcare", "Doctor resume", "Private sector"],
    do: [
      "Use clear clinical or professional accomplishments",
      "List certifications, specializations, and practice areas",
      "Keep the summary concise and results-focused",
      "Highlight patient care, leadership, or administrative skills"
    ],
    dont: [
      "Don't include irrelevant hobbies or personal details",
      "Don't use generic phrases like 'hardworking' without proof",
      "Don't overload the resume with lengthy job descriptions",
      "Don't omit measurable outcomes for clinical roles"
    ]
  },
  {
    id: 2,
    slug: "technical-resume",
    name: "Technical Resume",
    image: Resume1112Image,
    type: "resume",
    originalPrice: 201,
    discountPrice: 101,
    shortDescription: "A structured resume for technical, engineering, or telecalling roles that showcases projects, education, and private-sector skills.",
    longDescription: "Technical Resume is designed to present technical experience and industry-specific credentials clearly. It supports strong section hierarchy for engineering, telecalling, and private job applications so every detail is easy to scan and remember.",
    keyFeatures: [
      "Project-focused sections with outcome-driven summaries",
      "Education and certification layout optimized for credibility",
      "Technical skills organized by competency areas",
      "Compact profile section for fast recruiter review"
    ],
    benefits: [
      "Communicates technical expertise effectively",
      "Highlights engineering projects and process improvements",
      "Organizes telecalling targets, customer handling, and sales skills",
      "Makes resume screening efficient for private-sector jobs"
    ],
    idealFor: [
      "Engineering applicants",
      "Technical and operations candidates",
      "Telecalling and private-sector sales professionals"
    ],
    highlights: [
      "Targeted skills section for keyword matching",
      "Clean project listing with measurable results",
      "Logical order of education and work experience",
      "Readable typography for long-content sections"
    ],
    tags: ["Engineering", "Technical", "Private jobs", "Telecalling"],
    do: [
      "Do list key technical skills and tools clearly",
      "Do highlight successful projects with impact metrics",
      "Do include sales or customer-handling achievements for telecalling",
      "Do keep contact and availability details easy to find"
    ],
    dont: [
      "Don't use overly technical jargon without context",
      "Don't mix unrelated job roles without explaining relevance",
      "Don't let the resume become too long for recruiters",
      "Don't omit important qualifications or certifications"
    ]
  },
  {
    id: 3,
    slug: "leadership-resume",
    name: "Leadership Resume",
    image: Resume1113Image,
    type: "resume",
    originalPrice: 201,
    discountPrice: 101,
    shortDescription: "A high-impact resume template for experienced professionals, including engineering leads and private-sector managers, seeking roles with measurable success and leadership focus.",
    longDescription: "Leadership Resume emphasizes impact statements and leadership contributions. The layout prioritizes role-based achievements, core expertise, and career growth to build a compelling narrative for senior hiring teams in engineering, private operations, and service businesses.",
    keyFeatures: [
      "Leadership and achievement highlights prominently displayed",
      "Core competencies section tailored for senior roles",
      "Structured career history with outcome-focused bullets",
      "Clean, professional design with strong visual hierarchy"
    ],
    benefits: [
      "Projects confidence and credibility",
      "Shows career progression clearly",
      "Improves ATS matching with category-based skills",
      "Positions experience for higher responsibility roles"
    ],
    idealFor: [
      "Experienced engineering and operations professionals",
      "Mid-level and senior job seekers",
      "Candidates applying for private-sector management or service roles"
    ],
    highlights: [
      "Well-balanced professional summary",
      "Strong accomplishments over duties",
      "Role-specific skill emphasis",
      "Focused resume length with maximum impact"
    ],
    tags: ["Leadership", "Engineering", "Private jobs", "Achievement-driven"],
    do: [
      "Do quantify achievements and leadership results",
      "Do emphasize process improvements and team outcomes",
      "Do tailor the resume for private-sector hiring managers",
      "Do present a clear narrative of career growth"
    ],
    dont: [
      "Don't rely on buzzwords without examples",
      "Don't include too much low-impact daily work detail",
      "Don't ignore the importance of concise formatting",
      "Don't leave out the most relevant senior-level skills"
    ]
  },
  {
    id: 4,
    slug: "modern-resume",
    name: "Modern Resume",
    image: Resume1114Image,
    type: "resume",
    originalPrice: 201,
    discountPrice: 101,
    shortDescription: "A visually clean and modern resume for candidates in private jobs like telecalling, sales, engineering, and customer-facing roles who want polished presentation.",
    longDescription: "Modern Resume is built with readability and clarity in mind. It balances profile, accomplishments, and skills so that hiring managers can quickly understand your story, strengths, and fit for roles such as telecalling, private-sector sales, or technical engineering positions.",
    keyFeatures: [
      "Modern layout with smart section spacing",
      "Professional summary that leads with value",
      "Skill clusters grouped by relevance",
      "Readable bullets with achievement focus"
    ],
    benefits: [
      "Creates a strong first impression",
      "Makes your profile easy to evaluate",
      "Helps recruiters scan key information fast",
      "Supports both corporate and private-sector roles"
    ],
    idealFor: [
      "Telecalling and customer-facing professionals",
      "Engineering candidates in private companies",
      "Applicants seeking modern, polished resumes"
    ],
    highlights: [
      "Clean visual structure for recruiter review",
      "Smart placement of skills and experience",
      "Concise impact statements",
      "Well-defined section headings"
    ],
    tags: ["Modern", "Private jobs", "Telecalling", "Readable"],
    do: [
      "Do format the resume for easy scanning by recruiters",
      "Do highlight sales, customer interaction, or technical strengths",
      "Do keep the section headings consistent and clear",
      "Do focus on measurable results and professional growth"
    ],
    dont: [
      "Don't clutter the resume with too many format styles",
      "Don't hide key achievements in long paragraphs",
      "Don't mix unrelated role types without clarity",
      "Don't omit contact and core skill information"
    ]
  }
];

export default resumeList;
