import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../component/navbar/Navbar";
import Footer from "@/component/footer/Footer";

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
  title: "Ditvi Resume | Traditional Resume & Professional Resume Templates",
  description:
    "Design and download traditional resume, marriage profiles, college resumes, and professional CVs tailored for students, job seekers, and veterans.",
  metadataBase: new URL(baseUrl),
  keywords: [
    "traditional resume",
    "resume templates",
    "marriage resume",
    "professional resume",
    "college resume",
    "navy resume",
    "ATS-friendly resume",
    "resume maker",
  ],
  openGraph: {
    title: "Ditvi Resume | Traditional Resume & Professional Resume Templates",
    description:
      "Design and download traditional resume, marriage profiles, college resumes, and professional CVs tailored for students, job seekers, and veterans.",
    type: "website",
    siteName: "Ditvi Resume",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Professional traditional resume templates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ditvi Resume | Traditional Resume & Professional Resume Templates",
    description:
      "Design and download traditional resume, marriage profiles, college resumes, and professional CVs tailored for students, job seekers, and veterans.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
      </body>
    </html>
  );
}
