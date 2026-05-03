"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import "../../styles/slick-carousel.css";
import Container from "../container/Container";
import {
  ArrowForward,
  ArrowBack,
  Visibility,
  ShoppingCart,
  EditDocument,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import styles from "./resume.module.css";
import Heading from "../heading/Heading";
import Button from "../button/Button";
import Background from "../background/Background";
import EnquiryPopup from "../enquiryPopup/EnquiryPopup";

interface ArrowProps {
  className?: string;
  onClick?: () => void;
}

interface ResumeType {
  id: string | number;
  slug: string;
  name: string;
  image: StaticImageData | string;
  type: string;
}

interface BioDataCardStructureProps {
  data: ResumeType;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onGetNow: () => void;
  onPreview: () => void;
}

interface ResumeCardProps {
  title: string;
  resumeDetails: ResumeType[];
  subtitle: string;
  isSlider?: boolean;
  showButton?: boolean;
}

const NextArrow: React.FC<ArrowProps> = ({ className, onClick }) => (
  <ArrowForward
    className={`${className} ${styles.customArrow}`}
    onClick={onClick}
  />
);

const PrevArrow: React.FC<ArrowProps> = ({ className, onClick }) => (
  <ArrowBack
    className={`${className} ${styles.customArrow}`}
    onClick={onClick}
  />
);

const BioDataCardStructure: React.FC<BioDataCardStructureProps> = ({
  data,
  isHovered,
  onHover,
  onLeave,
  onGetNow,
  onPreview,
}) => (
  <div
    className={`${styles.resumeCard} ${
      isHovered ? styles.resumeCardHovered : ""
    }`}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    <div className={styles.resumeCardInner}>
      <div className={styles.resumeCardMedia}>
        <Image
          src={data.image}
          alt={data.name}
          width={500}
          height={600}
          className={styles.resumeCardImage}
        />
      </div>

      <div className={styles.resumeCardContent}>
        <h3 className={styles.resumeContentTitle}>{data.name}</h3>

        <div className={styles.resumeButtons}>
          <Button
            className={styles.actionButtonCard}
            variant="primary"
            onClick={onGetNow}
          >
            <ShoppingCart />
            Enquiry Now
          </Button>
          <Button
            className={styles.actionButtonCard}
            variant="secondary"
            onClick={onPreview}
          >
            <Visibility />
            Preview
          </Button>
        </div>
      </div>
    </div>
  </div>
);

const ResumeCard: React.FC<ResumeCardProps> = ({
  title,
  resumeDetails,
  subtitle,
  isSlider = true,
  showButton,
}) => {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "30px",
        },
      },
    ],
  };

  const renderCards = () => {
    if (isSlider) {
      return (
        <div className={styles.cardsSlider}>
          <Slider {...settings}>
            {resumeDetails.map((resume) => (
              <div className={styles.sliderItem} key={resume.id}>
                <BioDataCardStructure
                  data={resume}
                  isHovered={hoveredCard === resume.id}
                  onHover={() => setHoveredCard(resume.id)}
                  onLeave={() => setHoveredCard(null)}
                  onGetNow={() => {
                    setSelectedModel(resume.slug);
                    setIsPopupOpen(true);
                  }}
                  onPreview={() => router.push(`/resume/${resume.slug}`)}
                />
              </div>
            ))}
          </Slider>
        </div>
      );
    }

    return (
      <div className={styles.cardsGrid}>
        {resumeDetails.map((resume) => (
          <BioDataCardStructure
            key={resume.id}
            data={resume}
            isHovered={hoveredCard === resume.id}
            onHover={() => setHoveredCard(resume.id)}
            onLeave={() => setHoveredCard(null)}
            onGetNow={() => {
              setSelectedModel(resume.slug);
              setIsPopupOpen(true);
            }}
            onPreview={() => router.push(`/resume/${resume.slug}`)}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <Background>
        <div className={styles.content}>
          <Container>
            <Heading title={title} subtitle={subtitle} />

            {showButton && (
              <Button onClick={() => router.push("/")} variant="secondary">
                <ArrowBack />
                Back
              </Button>
            )}

            {renderCards()}
            {isSlider && (
              <div className={styles.resumeMore}>
                <Button
                  variant="primary"
                  className={styles.cardReadmoreButton}
                  onClick={() => router.push("/resume")}
                >
                  <EditDocument />
                  <span>View More</span>
                  <ArrowForward />
                </Button>
              </div>
            )}
          </Container>
        </div>
      </Background>
      <EnquiryPopup
        isOpen={isPopupOpen}
        heading="Request Resume"
        paragraph="Please fill these details."
        buttonTitle="Save and Continue"
        onClose={() => {
          setIsPopupOpen(false);
          setSelectedModel("");
        }}
        modelDetails={{
          modelNumber: selectedModel,
          language: "English",
          type: "resume",
          amount: 0,
        }}
      />
    </>
  );
};

export default ResumeCard;
