/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { WhatsApp, Upload } from "@mui/icons-material";
import Image from "next/image";
import Container from "../container/Container";
import styles from "./chooseoption.module.css";
import chooseOptionImage from "../../assets/carousel/resume-1114.png";
import Background from "../background/Background";
import Heading from "../heading/Heading";

export interface UserDetails {
  name?: string;
  [key: string]: unknown;
}

export interface ModelDetails {
  [key: string]: unknown;
}

export interface OptionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  primary?: boolean;
}

const OptionCard: React.FC<OptionCardProps> = ({
  icon,
  title,
  description,
  onClick,
  primary,
}) => (
  <div
    className={`${styles.chooseOptionCard} ${
      primary ? styles.chooseOptionCardPrimary : ""
    }`}
    onClick={onClick}
  >
    <div className={styles.chooseOptionCardIcon}>{icon}</div>
    <h3 className={styles.chooseOptionCardTitle}>{title}</h3>
    <p className={styles.chooseOptionCardDescription}>{description}</p>
  </div>
);

interface ChooseOptionProps {
  userDetails: UserDetails;
  modelDetails: ModelDetails;
}

const ChooseOption: React.FC<ChooseOptionProps> = ({
  userDetails,
  modelDetails,
}) => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleWhatsAppClick = async () => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        name: String(userDetails?.name || ""),
        mobileNumber: String(userDetails?.mobileNumber || ""),
        modelNumber: String(modelDetails?.modelNumber || ""),
        type: String(modelDetails?.type || "resume"),
      });
      router.push(`/confirmation?${queryParams.toString()}`);

      const whatsappMessage = `Hello, I would like to create a Resume
Name: ${userDetails?.name || ""}
Mobile Number: ${userDetails?.mobileNumber || ""}
Model Number: ${modelDetails?.modelNumber || ""}`;

      const whatsappUrl = `https://wa.me/919263767441?text=${encodeURIComponent(
        whatsappMessage
      )}`;
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadResume = () => {
    const searchParams = new URLSearchParams(window.location.search);

    // Prioritize props over URL parameters
    const params = new URLSearchParams();

    if (userDetails || searchParams.get("userDetails")) {
      params.set(
        "userDetails",
        JSON.stringify(
          userDetails ||
            (searchParams.get("userDetails")
              ? JSON.parse(searchParams.get("userDetails")!)
              : {})
        )
      );
    }

    if (modelDetails || searchParams.get("modelDetails")) {
      params.set(
        "modelDetails",
        JSON.stringify(
          modelDetails ||
            (searchParams.get("modelDetails")
              ? JSON.parse(searchParams.get("modelDetails")!)
              : {})
        )
      );
    }

    router.push(`/upload-resume?${params.toString()}`);
  };

  return (
    <Background>
      <Container>
        <Heading
          title="How Would You Like to Proceed?"
          subtitle=" Choose the option that best suits your needs"
        />
        <div className={styles.chooseOptionContent}>
          <div className={styles.chooseOptionGrid}>
            <OptionCard
              icon={<WhatsApp />}
              title="Connect on WhatsApp"
              description="Chat with our experts directly on WhatsApp for quick assistance"
              onClick={handleWhatsAppClick}
              primary
            />
          </div>
        </div>
      </Container>
    </Background>
  );
};

export default ChooseOption;
