import React from "react";
import ResumeCard from "../../structure/resume/resume";
import resumeList from "../../data/resume";
import Script from "next/script";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://resume.ditvi.org";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Resume Templates | Professional Resume Designs",
    description:
      "Browse our collection of professional resume templates to create a polished career presentation.",
    keywords: "resume templates, professional resume designs, career resume, modern resume templates",
    alternates: {
      canonical: `${baseUrl}/resume`,
    },
    openGraph: {
      title: "Resume Templates | Professional Resume Designs",
      description:
        "Browse our collection of professional resume templates to create a polished career presentation.",
      url: `${baseUrl}/resume`,
      images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630, alt: "Ditvi Resume templates" }],
    },
  };
}

const schemaData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Professional Resume Templates",
  description: "Collection of professional resume templates for job seekers and students.",
  url: `${baseUrl}/resume`,
  publisher: {
    "@type": "Organization",
    name: "Ditvi Resume",
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/favicon-32x32.png`,
    },
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: resumeList.length,
    itemListElement: resumeList.map((template, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: template.name,
        description: `Professional resume template: ${template.name}`,
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  },
};

const AllResume: React.FC = () => {
  return (
    <>
      <Script type="application/ld+json" id="schema-jsonld">
        {JSON.stringify(schemaData)}
      </Script>
      <div className="allresume">
        <ResumeCard
          title="Resume Templates"
          subtitle="Discover our curated resume designs for professional profiles"
          resumeDetails={resumeList}
          isSlider={false}
          showButton={true}
        />
      </div>
    </>
  );
};

export default AllResume;
