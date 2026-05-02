'use client';
import Image from 'next/image';
import { useState } from 'react';
import EnquiryPopup from '@/structure/enquiryPopup/EnquiryPopup';
import type { SeoData } from '../../data/seo';
import styles from './ResumeTemplate.module.css';

interface Props {
  seoData: SeoData;
}

export default function ResumeTemplate({ seoData }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className={styles.container}>
      <div className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <h1 className={styles.heroTitle}>{seoData.title}</h1>
          <p className={styles.heroDescription}>{seoData.description}</p>
        </section>

        {/* Main Content Section */}
        <section className={styles.contentSection}>
          <div className={styles.templatePreview}>
            <div className={styles.imageWrapper}>
              <Image
                src={seoData.templatePreview.mainImage}
                alt={seoData.title}
                width={600}
                height={800}
                className={styles.previewImage}
                priority
              />
              <div className={styles.imageOverlay}>
                <EnquiryPopup
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  modelDetails={{
                    modelNumber: seoData.path.split('/').pop() || '',
                    language: "English",
                    type: seoData.category,
                    amount: 0,
                  }}
                  heading={`Get ${seoData.title.split('|')[0].trim()}`}
                  paragraph="Fill in your details to get started with this template"
                  buttonTitle="Download Now"
                  isLeadMagnet={true}
                />
              </div>
            </div>
          </div>

          <div className={styles.detailsSection}>
            {/* Features Section */}
            <div className={styles.features}>
              <h2 className={styles.sectionTitle}>Template Features</h2>
              <ul className={styles.featuresList}>
                {seoData.features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    <svg 
                      className={styles.featureIcon} 
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Target Audience Section */}
            <div className={styles.audienceSection}>
              <h3 className={styles.audienceTitle}>Perfect For:</h3>
              <div className={styles.audienceTags}>
                {seoData.targetAudience.map((audience, index) => (
                  <span
                    key={index}
                    className={styles.audienceTag}
                  >
                    {audience}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className={styles.ctaButton}
            >
              Get This Template Now
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}