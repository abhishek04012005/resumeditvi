import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../component/navbar/Navbar";
import Footer from "@/component/footer/Footer";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ditvi-resume.example";

export const metadata: Metadata = {
  title:
    "Ditvi Resume | AI ATS-Friendly Resume Builder, Professional CV & Marriage Biodata Templates",
  
  description:
    "Create AI-powered ATS-friendly resumes, professional CVs, traditional marriage biodata, and college resumes. Build, customize, and download job-winning resumes instantly with Ditvi Resume.",
  
  metadataBase: new URL(baseUrl),

  keywords: [
    "AI resume builder",
    "ATS resume builder",
    "ATS-friendly resume",
    "resume maker online free",
    "professional CV templates",
    "modern resume templates",
    "traditional resume India",
    "marriage biodata maker",
    "biodata for marriage format",
    "college resume for students",
    "fresher resume templates",
    "government job resume India",
    "navy army resume format",
    "resume builder with AI",
    "best resume builder 2026",
  ],

  authors: [{ name: "Ditvi Resume Team" }],
  creator: "Ditvi Resume",
  publisher: "Ditvi Resume",

  category: "Career & Jobs",

  openGraph: {
    title:
      "AI Resume Builder | ATS-Friendly CV, Marriage Biodata & Professional Templates",
    description:
      "Build job-winning ATS resumes, professional CVs, and traditional marriage biodata with AI. Fast, customizable, and recruiter-approved templates.",
    type: "website",
    url: baseUrl,
    siteName: "Ditvi Resume",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI ATS Resume Builder - Ditvi Resume",
      },
    ],
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "AI Resume Builder | ATS-Friendly CV & Biodata Templates",
    description:
      "Create ATS-friendly resumes, CVs, and marriage biodata instantly using AI-powered templates.",
    images: ["/og-image.png"],
    creator: "@ditviresume",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "U61z9WvB238RUEavCgIuOpCpDLFPVOMv2i-Ax3ACxPI",
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
  },

  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        {children}
        <Footer />
        <div className="whatsappFloating">
          <a
            href="https://wa.me/919285248504?text=Hello%20*Ditvi%20Resume*%2C%0AI%E2%80%99m%20looking%20to%20create%20a%20professional%20resume.%0ACould%20you%20please%20assist%20me%20with%20the%20best%20design%20and%20format%20for%20my%20profile%3F" aria-label="Chat with us on WhatsApp"
          >
            <WhatsAppIcon fontSize="small" />
          </a>
        </div>
      </body>
    </html>
  );
}
