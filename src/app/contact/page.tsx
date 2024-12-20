import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us | PhotoFix ",
  description:
    "Get in touch with our team for support, inquiries, or feedback about our image processing services.",
  openGraph: {
    title: "Contact PhotoFix ",
    description: "Reach out to us for any questions or support needs.",
    type: "website",
    url: "https://www.photofix.in.net/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact PhotoFix ",
    description: "Reach out to us for any questions or support needs.",
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <div className="max-w-2xl mx-auto">
        <p className="text-lg text-center mb-8">
          Have questions or need assistance? We&apos;re here to help! Fill out
          the form below, and our team will get back to you as soon as possible.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
