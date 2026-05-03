"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./resumedetail.module.css";
import Background from "../background/Background";
import { Description, ShoppingCart, CheckCircle } from "@mui/icons-material";
import Container from "../container/Container";
import EnquiryPopup from "../enquiryPopup/EnquiryPopup";
import resumeDetails from "@/data/resume";
import { SeoData } from "@/data/seo";
import Button from "../button/Button";
import Image from "next/image";
import { ResumeType } from "@/types/types";

interface ResumeDetailProps {
  overrideSlug?: string;
  seoData?: SeoData;
}

const ResumeDetail: React.FC<ResumeDetailProps> = ({ overrideSlug, seoData }) => {
  const router = useRouter();
  const params = useParams<{ category?: string; resumeId?: string; slug?: string }>();
  const resumeId = params.resumeId;
  const category = params.category ?? params.slug;
  const actualCategory = overrideSlug
    ? overrideSlug
    : resumeId
    ? resumeId.replace(/^resume(\d+)$/, "resume-$1")
    : category;
  const resume = resumeDetails.find(
    (item) => item.slug === actualCategory
  ) as ResumeType | undefined;

  const pageTitle = seoData?.title.split("|")[0].trim() || resume?.name || "Resume Template";
  const pageDescription = seoData?.description || resume?.shortDescription || "Professional resume template details.";

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!resume) {
      router.push("/resume");
      return;
    }
    setSelectedModel(resume.slug);
  }, [resume, router]);

  if (!resume) {
    return null;
  }

  const totalPrice = resume.discountPrice;

  return (
    <Background>
      <Container>
        <div className={styles.inner}>
          <div className={styles.header}>
            <div>
              <p className={styles.subTitle}>Resume details</p>
              <h1 className={styles.title}>{pageTitle}</h1>
              <p className={styles.pageDescription}>{pageDescription}</p>
            </div>
            <Button variant="secondary" onClick={() => router.push("/resume")}> 
              Back to templates
            </Button>
          </div>

          <div className={styles.content}>
            <div className={styles.imageWrapper}>
              <div className={`${styles.image} ${imageLoaded ? styles.loaded : ""}`}>
                <Image
                  src={resume.image}
                  alt={resume.name}
                  width={520}
                  height={680}
                  priority
                  onLoadingComplete={() => setImageLoaded(true)}
                />
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.topRow}>
                <span className={styles.badge}>Resume Template</span>
                <span className={styles.badgeSecondary}>Professional</span>
              </div>

              <div className={styles.headingRow}>
                <h2>{resume.name}</h2>
                <p>Professional, ATS-friendly formatting with clean sections for recruiters.</p>
              </div>

              <div className={styles.priceCard}>
                <div>
                  <div className={styles.priceOriginal}>
                    <span className={styles.priceLabel}>Original</span>
                    <span className={styles.priceValue}>₹{resume.originalPrice}</span>
                  </div>
                  <div className={styles.priceFinal}>
                    <span className={styles.priceLabel}>Offer Price</span>
                    <span className={styles.priceValue}>₹{totalPrice}</span>
                  </div>
                </div>
                <div className={styles.priceTag}>Save ₹{resume.originalPrice - resume.discountPrice}</div>
              </div>

              <div className={styles.actions}>
                <Button
                  variant="primary"
                  className={styles.actionButton}
                  onClick={() => setIsPopupOpen(true)}
                >
                  <ShoppingCart />
                  Enquiry Now
                </Button>
                <Button
                  variant="secondary"
                  className={styles.secondaryButton}
                  onClick={() => router.push("/resume")}
                >
                  View all templates
                </Button>
              </div>
            </div>
          </div>

          <div className={styles.bottomDetails}>
            <div className={styles.featuresBlock}>
              <h3>What you get</h3>
              <ul>
                <li>
                  <CheckCircle className={styles.checkIcon} />
                  ATS-friendly layout with recruiter-first sections
                </li>
                <li>
                  <CheckCircle className={styles.checkIcon} />
                  Strong presentation for skills, education, and achievements
                </li>
                <li>
                  <CheckCircle className={styles.checkIcon} />
                  Optimized resume structure for both fresher and experienced roles
                </li>
              </ul>
            </div>
            <div className={styles.featuresBlock}>
              <h3>Resume Details</h3>
              <ul>
                <li>
                  <CheckCircle className={styles.checkIcon} />
                  Includes editable sections for career objective and summary
                </li>
                <li>
                  <CheckCircle className={styles.checkIcon} />
                  Highlights strengths and career achievements clearly
                </li>
                <li>
                  <CheckCircle className={styles.checkIcon} />
                  Designed for fast review by hiring managers and ATS systems
                </li>
              </ul>
            </div>
            <div className={styles.description}>
              <div className={styles.descriptionHeader}>
                <Description />
                <h3>About this template</h3>
              </div>
              <p className={styles.descriptionText}>
                {resume.longDescription}
              </p>
            </div>

            <div className={styles.detailSection}>
              <h3>Resume Detail Overview</h3>
              <p className={styles.detailIntro}>{resume.shortDescription}</p>
              <div className={styles.detailGrid}>
                <div className={styles.detailCard}>
                  <h4>Key Features</h4>
                  <ul>
                    {resume.keyFeatures.map((feature, index) => (
                      <li key={index}>
                        <CheckCircle className={styles.checkIcon} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.detailCard}>
                  <h4>Benefits</h4>
                  <ul>
                    {resume.benefits.map((benefit, index) => (
                      <li key={index}>
                        <CheckCircle className={styles.checkIcon} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.detailCard}>
                  <h4>Best For</h4>
                  <ul>
                    {resume.idealFor.map((item, index) => (
                      <li key={index}>
                        <CheckCircle className={styles.checkIcon} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.detailCard}>
                  <h4>Highlights</h4>
                  <ul>
                    {resume.highlights.map((highlight, index) => (
                      <li key={index}>
                        <CheckCircle className={styles.checkIcon} />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.doDontSection}>
                <div className={styles.doDontCard}>
                  <h4>Do</h4>
                  <ul>
                    {resume.do.map((item, index) => (
                      <li key={index}>
                        <CheckCircle className={styles.checkIcon} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.doDontCard}>
                  <h4>Don&apos;t</h4>
                  <ul>
                    {resume.dont.map((item, index) => (
                      <li key={index}>
                        <CheckCircle className={styles.checkIcon} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.info}>
              <div className={styles.model}>
                <h2>Resume Summary</h2>
                <div className={styles.divider} />
                <p>
                  {resume.name} is designed to help you stand out in applicant tracking systems and in front of hiring managers. It includes strong section hierarchy, skill highlights, and streamlined formatting for fresher and experienced roles.
                </p>
              </div>

              <div className={styles.options}>
                <div className={styles.optionsGroup}>
                  <h3 className={styles.optionsTitle}>Key Features</h3>
                  <ul>
                    <li>
                      <CheckCircle className={styles.checkIcon} />
                      Clean, modern resume layout
                    </li>
                    <li>
                      <CheckCircle className={styles.checkIcon} />
                      ATS keyword friendly structure
                    </li>
                    <li>
                      <CheckCircle className={styles.checkIcon} />
                      Mobile-ready and recruiter-friendly
                    </li>
                  </ul>
                </div>

                <div className={styles.optionsGroup}>
                  <h3 className={styles.optionsTitle}>Best For</h3>
                  <ul>
                    <li>
                      <CheckCircle className={styles.checkIcon} />
                      Freshers applying for professional jobs
                    </li>
                    <li>
                      <CheckCircle className={styles.checkIcon} />
                      Candidates needing strong experience presentation
                    </li>
                    <li>
                      <CheckCircle className={styles.checkIcon} />
                      Anyone seeking an ATS-friendly resume design
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <EnquiryPopup
        isOpen={isPopupOpen}
        heading="Request Resume"
        paragraph="Please fill these details."
        buttonTitle="Save and Continue"
        onClose={() => {
          setIsPopupOpen(false);
        }}
        modelDetails={{
          modelNumber: selectedModel,
          language: "English",
          type: resume.type ?? "resume",
          amount: totalPrice,
        }}
      />
    </Background>
  );
};

export default ResumeDetail;
