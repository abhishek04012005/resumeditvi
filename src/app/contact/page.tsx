import Contact from "@/component/contact/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Ditvi Resume Service",
  description: "Get in touch with Ditvi for resume help, support, and expert guidance.",
};

export default function ContactPage() {
  return <Contact />;
}
