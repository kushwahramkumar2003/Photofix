import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | PhotoFix",
  description:
    "Learn about how PhotoFix collects, uses, and protects your personal information.",
  openGraph: {
    title: "PhotoFix Privacy Policy",
    description:
      "Our Privacy Policy explains how we handle your personal data.",
    type: "website",
    url: "https://www.photofix.tech/privacy",
  },
  twitter: {
    card: "summary_large_image",
    title: "PhotoFix Privacy Policy",
    description:
      "Our Privacy Policy explains how we handle your personal data.",
  },
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
      <div className="prose prose-lg mx-auto">
        <p>
          At PhotoFix, we are committed to protecting your privacy and ensuring
          the security of your personal information. This Privacy Policy
          outlines our practices concerning the collection, use, and disclosure
          of your data.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as when you
          create an account, use our services, or contact us for support. This
          may include your name, email address, and usage data.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information we collect to provide, maintain, and improve
          our services, to communicate with you, and to comply with legal
          obligations.
        </p>

        <h2>3. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to
          protect your personal information against unauthorized or unlawful
          processing, accidental loss, destruction, or damage.
        </p>

        <h2>4. Data Sharing and Disclosure</h2>
        <p>
          We do not sell your personal information. We may share your
          information with third-party service providers who perform services on
          our behalf, subject to confidentiality agreements.
        </p>

        <h2>5. Your Rights and Choices</h2>
        <p>
          You have the right to access, correct, or delete your personal
          information. You may also have the right to object to or restrict
          certain types of processing.
        </p>

        <h2>6. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page.
        </p>

        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at privacy@PhotoFix-saas.com.
        </p>
      </div>
    </div>
  );
}
