"use client";

import { useState } from "react";
import styles from "./contact.module.css";
import { ContactUsStorage } from "../../supabase/ContactSupabase";
import Button from "@/structure/button/Button";

export interface ContactFormData {
  name: string;
  message: string;
  mobile: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    message: "",
    mobile: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.mobile.trim()) {
      errors.mobile = "Mobile number is required";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      message: "",
      mobile: "",
    });
    setFieldErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      await ContactUsStorage.saveContactUs({
        name: formData.name,
        mobile: formData.mobile,
        message: formData.message,
      });

      setStatus("success");
      setShowSuccessModal(true);
      resetForm();
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send message"
      );
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    setStatus("idle");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formGroup}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className={`${styles.input} ${
            fieldErrors.name ? styles.errorInput : ""
          }`}
          disabled={status === "submitting"}
        />
        {fieldErrors.name && (
          <span className={styles.errorText}>{fieldErrors.name}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <input
          type="tel"
          name="mobile"
          placeholder="Your Mobile"
          value={formData.mobile}
          onChange={handleInputChange}
          required
          className={`${styles.input} ${
            fieldErrors.mobile ? styles.errorInput : ""
          }`}
          disabled={status === "submitting"}
        />
        {fieldErrors.mobile && (
          <span className={styles.errorText}>{fieldErrors.mobile}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleInputChange}
          required
          className={`${styles.textarea} ${
            fieldErrors.message ? styles.errorInput : ""
          }`}
          rows={5}
          disabled={status === "submitting"}
        />
        {fieldErrors.message && (
          <span className={styles.errorText}>{fieldErrors.message}</span>
        )}
      </div>

      <Button
        type="submit"
        disabled={status === "submitting"}
        className={styles.CustomSubmitButton}
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>

      {status === "error" && (
        <p className={styles.errorMessage}>
          {errorMessage || "Failed to send message. Please try again."}
        </p>
      )}

      {showSuccessModal && (
        <div className={styles.successModalOverlay} onClick={closeModal}>
          <div
            className={styles.successModal}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Message Sent</h3>
            <p>Your message has been sent successfully. We will contact you soon.</p>
            <button
              type="button"
              className={styles.modalCloseButton}
              onClick={closeModal}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
