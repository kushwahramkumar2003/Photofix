import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { AnimatedImage } from "@/components/animated-image";

export const metadata: Metadata = {
  title: "404 - Page Not Found | ImagePro SaaS",
  description:
    "Oops! The page you're looking for doesn't exist. Let's get you back on track.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20">
      <div className="text-center space-y-8 px-4">
        <AnimatedImage />
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          404 - Page Not Found
        </h1>
        <p className="text-xl text-muted-foreground max-w-prose mx-auto">
          Oops! It looks like you&apos;ve wandered into uncharted territory. The
          page you&apos;re looking for has either been moved, deleted, or never
          existed in the first place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/">Return Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
