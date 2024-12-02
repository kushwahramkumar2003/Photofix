import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | PhotoFix",
  description:
    "Read our Terms of Service to understand the rules and regulations governing the use of PhotoFix SaaS.",
  openGraph: {
    title: "PhotoFix Terms of Service",
    description:
      "Our Terms of Service outline the rules for using our image processing platform.",
    type: "website",
    url: "https://www.photofix.tech/terms",
  },
  twitter: {
    card: "summary_large_image",
    title: "PhotoFix Terms of Service",
    description:
      "Our Terms of Service outline the rules for using our image processing platform.",
  },
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Terms of Service</h1>
      <div className="prose prose-lg mx-auto">
        <p>
          Welcome to PhotoFix. By using our services, you agree to comply with
          and be bound by the following terms and conditions:
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using PhotoFix, you agree to be bound by these Terms
          of Service and all applicable laws and regulations.
        </p>

        <h2>2. Use of Service</h2>
        <p>
          You agree to use PhotoFix only for purposes that are legal, proper,
          and in accordance with these terms and any applicable laws or
          regulations.
        </p>

        <h2>3. User Account</h2>
        <p>
          To access certain features of PhotoFix, you may be required to create
          an account. You are responsible for maintaining the confidentiality of
          your account information.
        </p>

        <h2>4. Intellectual Property</h2>
        <p>
          The content, features, and functionality of PhotoFix SaaS are owned by
          us and are protected by international copyright, trademark, patent,
          trade secret, and other intellectual property laws.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          PhotoFix SaaS shall not be liable for any indirect, incidental,
          special, consequential, or punitive damages resulting from your use of
          or inability to use the service.
        </p>

        <h2>6. Changes to Terms</h2>
        <p>
          We reserve the right to modify or replace these Terms of Service at
          any time. It is your responsibility to check these terms periodically
          for changes.
        </p>

        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about these Terms of Service, please contact
          us at terms@PhotoFix-saas.com.
        </p>
      </div>
    </div>
  );
}
