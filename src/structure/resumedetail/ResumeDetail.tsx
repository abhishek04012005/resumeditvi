"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./resumedetail.module.css";
import Background from "../background/Background";
import { Description, ShoppingCart, CheckCircle } from "@mui/icons-material";
import Container from "../container/Container";
import EnquiryPopup from "../enquiryPopup/EnquiryPopup";
import resumeDetails from "@/data/resume";
import Button from "../button/Button";
import Image from "next/image";
import { ResumeType } from "@/types/types";

const ResumeDetail: React.FC = () => {
  const router = useRouter();
  const params = useParams<{ category?: string; resumeId?: string; slug?: string }>();
  const resumeId = params.resumeId;
  const category = params.category ?? params.slug;
  const actualCategory = resumeId
    ? resumeId.replace(/^resume(\d+)$/, "resume-$1")
    : category;
  const resume = resumeDetails.find(
    (item) => item.slug === actualCategory
  ) as ResumeType | undefined;
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

  const savings = resume.originalPrice - resume.discountPrice;

  return (
    <Background>
      <Container>
        <div className={styles.inner}>
          <div className={styles.header}>
            <div>
              <p className={styles.subTitle}>Resume details</p>
              <h1 className={styles.title}>{resume.name}</h1>
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
                <p>Clean structure, easy-to-edit sections, and recruiter-friendly layout.</p>
              </div>

              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <p className={styles.statLabel}>Starting price</p>
                  <strong>₹{resume.discountPrice}</strong>
                </div>
                <div className={styles.statItem}>
                  <p className={styles.statLabel}>You save</p>
                  <strong>₹{savings}</strong>
                </div>
              </div>

              <div className={styles.priceCard}>
                <div>
                  <span className={styles.originalPrice}>₹{resume.originalPrice}</span>
                  <span className={styles.discountLabel}>Most popular</span>
                </div>
                <div className={styles.priceTag}>₹{resume.discountPrice}</div>
              </div>

              <div className={styles.featuresBlock}>
                <h3>What you get</h3>
                <ul>
                  <li>
                    <CheckCircle className={styles.checkIcon} />
                    ATS-friendly resume design
                  </li>
                  <li>
                    <CheckCircle className={styles.checkIcon} />
                    Editable sections for your career story
                  </li>
                  <li>
                    <CheckCircle className={styles.checkIcon} />
                    Fast delivery & ready to download
                  </li>
                </ul>
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

              <div className={styles.description}>
                <div className={styles.descriptionHeader}>
                  <Description />
                  <h3>About this template</h3>
                </div>
                <p className={styles.descriptionText}>
                  This resume template is optimized for professional presentation and clean readability. It is ideal for job seekers who want a strong first impression with a modern, structured layout.
                </p>
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
          amount: resume.discountPrice,
        }}
      />
    </Background>
  );
};

export default ResumeDetail;
