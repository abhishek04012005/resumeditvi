// src/components/confirmation/ConfirmationPage.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CheckCircle,
  WhatsApp,
  Person,
  Category,
  Phone,
} from "@mui/icons-material";
import styles from "./requestconfirmation.module.css";
import Background from "@/structure/background/Background";
import Container from "@/structure/container/Container";
import { ConfirmationDetails } from "@/utils/types";

export default function ConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [details, setDetails] = useState<ConfirmationDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const confirmationDetails: ConfirmationDetails = {
        mobileNumber: searchParams.get("mobileNumber") || "",
        modelNumber: searchParams.get("modelNumber") || "",
        type: searchParams.get("service") || searchParams.get("type") || "",
        name: searchParams.get("name") || "",
        profileUrl: searchParams.get("profileUrl") || "",
        resumeUrl: searchParams.get("resumeUrl") || "",
        uploadDate: searchParams.get("uploadDate") || new Date().toISOString(),
      };

      if (!confirmationDetails.mobileNumber) {
        throw new Error("Invalid request details");
      }

      setDetails(confirmationDetails);
    } catch (error) {
      console.error("Error loading confirmation details:", error);
      setTimeout(() => router.push("/"), 2000);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams, router]);

  const handleWhatsApp = () => {
    if (!details?.mobileNumber) return;
    
    const message = `Hello! My name is ${details.name || 'there'}. I'd like to check the status of my resume request.`;
    window.open(
      `https://wa.me/${details.mobileNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const maskMobileNumber = (number: string): string => {
    return number.replace(/(\d{2})(\d{6})(\d{2})/, "$1******$3");
  };

  if (isLoading) {
    return (
      <Background>
        <Container>
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Loading confirmation details...</p>
          </div>
        </Container>
      </Background>
    );
  }

  if (!details) {
    return (
      <Background>
        <Container>
          <div className={styles.errorContainer}>
            <p>Request details not found. Redirecting...</p>
          </div>
        </Container>
      </Background>
    );
  }

  return (
    <Background>
      <Container>
        <div className={styles.confirmationCard}>
          <div className={styles.header}>
            <CheckCircle className={styles.successIcon} />
            <h1>Request Confirmed</h1>
          </div>

          <div className={styles.content}>
            <div className={styles.requestInfo}>
              {details.name && (
                <div className={styles.infoItem}>
                  <Person className={styles.icon} />
                  <div>
                    <label>Name</label>
                    <p>{details.name}</p>
                  </div>
                </div>
              )}

              <div className={styles.infoItem}>
                <Phone className={styles.icon} />
                <div>
                  <label>Mobile Number</label>
                  <p>{maskMobileNumber(details.mobileNumber)}</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Category className={styles.icon} />
                <div>
                  <label>Model Details</label>
                  <p>{details.modelNumber} ({details.type})</p>
                </div>
              </div>
            </div>

            <div className={styles.successMessage}>
              <CheckCircle className={styles.icon} />
              <p>Your resume request has been successfully received</p>
            </div>

            <button
              onClick={handleWhatsApp}
              className={styles.whatsappButton}
            >
              <WhatsApp /> Connect on WhatsApp
            </button>
          </div>
        </div>
      </Container>
    </Background>
  );
}