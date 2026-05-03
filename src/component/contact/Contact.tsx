// Contact.tsx
"use client";

import ContactForm from "./ContactForm";
import styles from "./contact.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Container from "@/structure/container/Container";
import Background from "@/structure/background/Background";
import Heading from "@/structure/heading/Heading";

const SOCIAL_LINKS = [
  {
    icon: FacebookIcon,
    url: "https://facebook.com/ditvifoundation",
    label: "Follow us on Facebook",
  },
  {
    icon: InstagramIcon,
    url: "https://instagram.com/ditvifoundation",
    label: "Follow us on Instagram",
  },
  {
    icon: PinterestIcon,
    url: "https://in.pinterest.com/ditvifoundation/",
    label: "Follow us on Pinterest",
  },
  {
    icon: YouTubeIcon,
    url: "https://www.youtube.com/@ditvifoundation",
    label: "Subscribe to our YouTube channel",
  },
];

const CONTACT_INFO = [
  {
    icon: PhoneIcon,
    title: "Call Us",
    details: ["+91 9285248504"],
  },
  {
    icon: EmailIcon,
    title: "Email Us",
    details: ["care@ditvi.org"],
  },
];

const Contact = () => {
  return (
    <Background>
      <Container>
        <Heading
        title="Contact Us"
        subtitle="We'd love to hear from you! Reach out to us for any inquiries or collaborations."
        />
        <div className={styles.content}>
          <div className={styles.info}>

            <div className={styles.contactInfo}>
              {CONTACT_INFO.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className={styles.contactItem}>
                    <div className={styles.icon}>
                      <Icon />
                    </div>
                    <div>
                      <h3>{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i}>{detail}</p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.social}>
              {SOCIAL_LINKS.map(({ icon: Icon, url, label }, index) => (
                <a
                  key={index}
                  href={url}
                  className={styles.socialLink}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className={styles.formContainer}>
            <ContactForm />
          </div>
        </div>
      </Container>
    </Background>
  );
};

export default Contact;
