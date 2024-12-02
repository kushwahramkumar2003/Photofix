import type { Metadata } from "next";
import { PricingPlans } from "./components/pricing-plans";

export const metadata: Metadata = {
  title: "Pricing Plans | PhotoFix SaaS",
  description:
    "Choose the perfect plan for your image processing needs. From free tier to premium features, we have a plan that fits your requirements.",
  keywords:
    "image processing, SaaS pricing, AI image tools, photo editing subscription",
  openGraph: {
    title: "Pricing Plans | PhotoFix SaaS",
    description: "Affordable image processing plans for all your needs",
    url: "https://www.photofix.tech/pricing",
    siteName: "PhotoFix SaaS",
    images: [
      {
        url: "https://www.photofix.tech/og-pricing.jpg",
        width: 1200,
        height: 630,
        alt: "PhotoFix SaaS Pricing Plans",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing Plans | PhotoFix SaaS",
    description: "Affordable image processing plans for all your needs",
    images: ["https://www.photofix.tech/twitter-pricing.jpg"],
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
  // canonical: "https://PhotoFix-saas.com/pricing",
};

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    features: [
      "10 image processes per day",
      "Basic compression and resizing",
      "Access to community support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    features: [
      "Unlimited image processes",
      "Advanced AI features",
      "Priority support",
      "No ads",
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Custom integration",
      "Dedicated account manager",
      "SLA guarantees",
      "Advanced analytics",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Choose Your Plan</h1>
      <p className="text-xl text-center text-gray-600 mb-12">
        Select the perfect plan for your image processing needs
      </p>
      <PricingPlans plans={pricingPlans} />
    </div>
  );
}
