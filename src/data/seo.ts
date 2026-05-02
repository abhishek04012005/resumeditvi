export interface SeoData {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  path: string;
  category: 'college' | 'job' | 'navy' | 'other';
  features: string[];
  targetAudience: string[];
  templatePreview: {
    mainImage: string;
    samples: string[];
  };
}

export const resumeSeoData: Record<string, SeoData> = {
  // College Segment
  "acropolis-college": {
    title: "Resume Templates for Acropolis College Students | Professional CV Format",
    description: "Specialized resume templates for Acropolis College students. Highlight your academic achievements and internships effectively. Perfect for campus placements!",
    keywords: ["acropolis college resume", "campus placement cv", "student resume", "internship resume"],
    ogImage: "/images/resume-acropolis-preview.jpg",
    path: "/resume/college/acropolis",
    category: "college",
    features: [
      "College Project Highlights",
      "Academic Achievement Section",
      "Internship Experience Layout",
      "Extra-curricular Activities",
      "Technical Skills Format"
    ],
    targetAudience: ["Final Year Students", "Internship Seekers", "Campus Placement"],
    templatePreview: {
      mainImage: "/images/templates/acropolis/main.jpg",
      samples: [
        "/images/templates/acropolis/sample1.jpg",
        "/images/templates/acropolis/sample2.jpg"
      ]
    }
  },

  // Job Segment
  "btech-jobs": {
    title: "Professional Resume Template for B.Tech Jobs | Engineering CV Format",
    description: "Create a winning resume for B.Tech jobs with our professional templates. Perfect for fresher engineers and experienced professionals.",
    keywords: ["btech resume", "engineering cv", "technical resume", "fresher resume"],
    ogImage: "/images/resume-btech-preview.jpg",
    path: "/resume/job/btech",
    category: "job",
    features: [
      "Technical Skills Section",
      "Project Portfolio",
      "Engineering Achievements",
      "Industrial Training",
      "Technical Certifications"
    ],
    targetAudience: ["B.Tech Graduates", "Engineering Professionals", "Tech Lead Positions"],
    templatePreview: {
      mainImage: "/images/templates/btech/main.jpg",
      samples: [
        "/images/templates/btech/sample1.jpg",
        "/images/templates/btech/sample2.jpg"
      ]
    }
  },

  // Navy Segment
  "navy-personnel": {
    title: "Professional Resume Templates for Navy Personnel | Military to Civilian CV",
    description: "Specialized resume templates for Navy personnel transitioning to civilian careers. Translate your military experience into corporate success.",
    keywords: ["navy resume", "military cv", "veteran resume", "naval officer resume"],
    ogImage: "/images/resume-navy-preview.jpg",
    path: "/resume/military/navy",
    category: "navy",
    features: [
      "Military Experience Translation",
      "Leadership Skills Highlight",
      "Security Clearance Section",
      "Technical Expertise Format",
      "Awards & Commendations"
    ],
    targetAudience: ["Navy Veterans", "Naval Officers", "Military Technicians"],
    templatePreview: {
      mainImage: "/images/templates/navy/main.jpg",
      samples: [
        "/images/templates/navy/sample1.jpg",
        "/images/templates/navy/sample2.jpg"
      ]
    }
  }
};

export const getResumesByCategory = (category: string) => {
  return Object.entries(resumeSeoData)
    .filter(([, data]) => data.category === category)
    .map(([key, data]) => ({ key, ...data }));
};