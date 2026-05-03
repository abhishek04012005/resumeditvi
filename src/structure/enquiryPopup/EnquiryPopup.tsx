/* eslint-disable @typescript-eslint/no-unused-vars */
// src/structure/enquiryPopup/EnquiryPopup.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./enquiryPopup.module.css";
import Button from "../button/Button";

interface EnquiryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  modelDetails: {
    modelNumber: string;
    language: string;
    type: string;
    amount: number;
  };
  heading?: string;
  paragraph?: string;
  buttonTitle?: string;
  isLeadMagnet?: boolean;
}

const EnquiryPopup: React.FC<EnquiryPopupProps> = ({
  isOpen,
  onClose,
  modelDetails,
  heading = "Request Resume",
  paragraph = "Please fill these details.",
  buttonTitle = "Save and Continue",
  isLeadMagnet = false,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
  });

  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setError(false);
      setFormData({ name: "", mobileNumber: "" });
    }
  }, [isOpen]);

  const handleClosePopup = () => {
    setSuccess(false);
    setFormData({ name: "", mobileNumber: "" });
    onClose();
  };

  const handleSuccessClose = () => {
    setSuccess(false);
    setFormData({ name: "", mobileNumber: "" });
    onClose();
    if (isLeadMagnet) {
      router.push("/resume");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // Form validation
    if (!formData.name || !formData.mobileNumber) {
      setError(true);
      alert("Please fill in all required fields");
      return;
    }

    if (formData.mobileNumber.length !== 10) {
      setError(true);
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsLoading(true);
    setError(false);

    const savedName = formData.name;
    const savedMobileNumber = formData.mobileNumber;
    const savedService = isLeadMagnet ? "resume" : modelDetails?.type?.trim() || "resume";

    const response = await fetch("/api/enquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: savedName,
        mobileNumber: savedMobileNumber,
        service: savedService,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Failed to save enquiry");
    }

    setFormData({ name: "", mobileNumber: "" });
    setSuccess(true);
    return;
  } catch (error) {
    setError(true);
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("Unable to submit form. Please try again later.");
    }
    console.error("Error submitting form:", error);
  } finally {
    setIsLoading(false);
  }
};

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      if (success) {
        handleClosePopup();
      } else {
        onClose();
      }
    }
  };

  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value || /^[6-9]/.test(value)) {
      setFormData((prev) => ({
        ...prev,
        mobileNumber: value,
      }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^A-Za-z\s]/g, "");
    setFormData((prev) => ({
      ...prev,
      name: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className={styles.getnowOverlay} onClick={handleOverlayClick}>
      <div
        className={styles.getnowContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.getnowCloseButton}
          onClick={handleClosePopup}
          aria-label="Close"
        >
          &times;
        </button>
        <div className={styles.getnowHeader}>
          <h2>{heading}</h2>
          <p>{paragraph}</p>
        </div>
        {success ? (
          <div className={styles.successContent}>
            <div className={styles.successIcon}>✓</div>
            <h3 className={styles.successTitle}>Success!</h3>
            <p className={styles.successText}>
              Your enquiry has been submitted successfully. We will contact you soon.
            </p>
            <Button type="button" variant="primary" onClick={handleSuccessClose}>
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
          <div className={styles.getnowFormGroup}>
            <label htmlFor="name">Full Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleNameChange}
              onKeyPress={(e) => {
                if (!/[A-Za-z\s]/.test(e.key) && e.key.length === 1) {
                  e.preventDefault();
                }
              }}
              pattern="[A-Za-z\s]{3,50}"
              required
              minLength={3}
              maxLength={50}
              title="Please enter a valid name (letters and spaces only)"
              aria-label="Full name"
            />
          </div>
          <div className={styles.getnowFormGroup}>
            <label htmlFor="whatsapp">WhatsApp Number:</label>
            <input
              id="mobileNumber"
              type="tel"
              name="mobileNumber"
              placeholder="Enter your WhatsApp number"
              value={formData.mobileNumber}
              onChange={handleMobileNumberChange}
              onKeyPress={(e) => {
                if (
                  (formData.mobileNumber.length === 0 &&
                    !/[6-9]/.test(e.key)) ||
                  !/[0-9]/.test(e.key) ||
                  formData.mobileNumber.length >= 10
                ) {
                  e.preventDefault();
                }
              }}
              pattern="[6-9][0-9]{9}"
              maxLength={10}
              minLength={10}
              inputMode="numeric"
              autoComplete="tel"
              title="Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9"
              required
              aria-label="WhatsApp number"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            className={styles.getnowSubmitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className={styles.loader} />
                Submitting...
              </>
            ) : (
              buttonTitle
            )}
          </Button>
        </form>
        )}
      </div>
    </div>
  );
};

export default EnquiryPopup;
