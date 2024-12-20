import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Image, Zap, Sparkles } from "lucide-react";
import Script from "next/script";

export const metadata: Metadata = {
  title: "PhotoFix - AI-Powered Image Editing and Enhancement",
  description:
    "Transform your images with PhotoFix's AI-powered tools. Compress, resize, enhance, and remove backgrounds effortlessly.",
  keywords: [
    "AI image editing",
    "photo enhancement",
    "image compression",
    "background removal",
  ],
  openGraph: {
    title: "PhotoFix - AI-Powered Image Editing",
    description: "Transform your images with AI-powered tools",
    images: [
      {
        url: "https://www.photofix.in.net/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PhotoFix - AI-Powered Image Editing",
    description: "Transform your images with AI-powered tools",
    images: ["https://www.photofix.in.net/twitter-image.jpg"],
  },
};

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-background/95">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                  Transform Your Images with AI
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground text-lg sm:text-xl md:text-2xl mt-4">
                  Powerful image editing tools powered by artificial
                  intelligence. Compress, resize, and enhance your images in
                  seconds.
                </p>
              </div>
              <div className="space-x-4 mt-8">
                <Button
                  asChild
                  size="lg"
                  className="h-12 px-8 text-lg bg-primary hover:bg-primary/90"
                >
                  <Link href="/tools">Get Started for Free</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-lg border-primary/20 hover:bg-primary/10"
                >
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
          aria-labelledby="our-tools"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2
              id="our-tools"
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
            >
              Our Tools
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                // eslint-disable-next-line
                icon={<Image className="h-10 w-10" />}
                title="Image Compression"
                description="Reduce file size without losing quality using our advanced AI compression algorithm"
              />
              <FeatureCard
                icon={<Zap className="h-10 w-10" />}
                title="AI Enhancement"
                description="Automatically improve image quality with our state-of-the-art AI models"
              />
              <FeatureCard
                icon={<Sparkles className="h-10 w-10" />}
                title="Background Removal"
                description="Remove backgrounds instantly with perfect edge detection"
              />
            </div>
          </div>
        </section>

        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-background"
          aria-labelledby="how-it-works"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2
              id="how-it-works"
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
            >
              How It Works
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <StepCard
                number="01"
                title="Upload"
                description="Drag and drop or select your image file. We support all major formats."
              />
              <StepCard
                number="02"
                title="Edit"
                description="Choose from our range of AI-powered tools to transform your image."
              />
              <StepCard
                number="03"
                title="Download"
                description="Get your transformed image instantly in your preferred format."
              />
            </div>
          </div>
        </section>

        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
          aria-labelledby="pricing"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2
              id="pricing"
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
            >
              Simple Pricing
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <PricingCard
                title="Free"
                price="$0"
                description="Perfect for occasional use"
                features={[
                  "5 images per day",
                  "Basic AI tools",
                  "Standard support",
                ]}
              />
              <PricingCard
                title="Pro"
                price="$9.99"
                description="Ideal for regular users"
                features={[
                  "Unlimited images",
                  "All AI tools",
                  "Priority support",
                ]}
                highlighted={true}
              />
              <PricingCard
                title="Enterprise"
                price="Custom"
                description="For large scale operations"
                features={[
                  "Custom solutions",
                  "API access",
                  "Dedicated support",
                ]}
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/10 to-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                  Ready to Transform Your Images?
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground text-lg sm:text-xl">
                  Join thousands of users who are already enhancing their images
                  with PhotoFix.
                </p>
              </div>
              <div className="space-x-4 mt-8">
                <Button asChild size="lg" className="h-12 px-8 text-lg">
                  <Link href="/signup">Sign Up Now</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-lg"
                >
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "PhotoFix",
            url: "https://www.photofix.in.net",
            description: "AI-powered image editing and enhancement tools",
            applicationCategory: "PhotographyApplication",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            featureList: [
              "Image Compression",
              "AI Enhancement",
              "Background Removal",
            ],
          }),
        }}
      />
    </>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="relative overflow-hidden border-primary/10 bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <CardHeader>
        <div className="mb-2 rounded-full bg-primary/10 p-2 w-12 h-12 flex items-center justify-center text-primary">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <Card className="relative overflow-hidden border-primary/10 bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <CardHeader>
        <div className="text-6xl font-bold text-primary/20">{number}</div>
        <CardTitle className="text-xl mt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function PricingCard({
  title,
  price,
  description,
  features,
  highlighted = false,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <Card
      className={`relative overflow-hidden border-primary/10 bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50 ${
        highlighted ? "ring-2 ring-primary shadow-lg" : ""
      }`}
    >
      {highlighted && (
        <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-primary-foreground text-sm font-medium">
          Popular
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
          {price}
        </div>
        <ul className="space-y-2 text-muted-foreground">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <ArrowRight className="mr-2 h-4 w-4 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
