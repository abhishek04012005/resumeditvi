import HowWeWork from "@/component/howwework/HowWeWork";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How We Work | Ditvi Resume Service",
  description: "Discover how Ditvi crafts, reviews, and delivers resumes with care and precision.",
};

export default function HowWeWorkPage() {
  return <HowWeWork />;
}
