import React from "react";
import ResumeCard from "../../structure/resume/resume";
import resumeList from "../../data/resume";
import Script from "next/script";

export async function generateMetadata() {
  return {
    title: "Resume Templates | Professional Resume Designs",
    description:
      "Browse our collection of professional resume templates to create a polished career presentation.",
    keywords: "resume templates, professional resume designs, career resume, modern resume templates",
    openGraph: {
      title: "Resume Templates | Professional Resume Designs",
      description:
        "Browse our collection of professional resume templates to create a polished career presentation.",
      images: ["https://your-domain.com/images/resume-templates-preview.jpg"],
    },
  };
}

const schemaData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Professional Resume Templates",
  description: "Collection of professional resume templates",
  publisher: {
    "@type": "Organization",
    name: "Resume Maker",
    logo: {
      "@type": "ImageObject",
      url: "https://your-domain.com/logo.png",
    },
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: resumeList.length,
    itemListElement: resumeList.map((template, index) => ({
      "@type": "Product",
      position: index + 1,
      name: template.name,
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
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
