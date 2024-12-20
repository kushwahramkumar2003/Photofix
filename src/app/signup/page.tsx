import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Mail, Facebook, Twitter } from "lucide-react";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Sign Up for PhotoFix - AI-Powered Image Editing Platform",
  description:
    "Create your PhotoFix account and start transforming your images with our advanced AI-powered editing tools. Join thousands of satisfied users today!",
  keywords: [
    "PhotoFix signup",
    "AI image editing",
    "photo enhancement",
    "create account",
  ],
  openGraph: {
    title: "Join PhotoFix - AI Image Editing Made Easy",
    description:
      "Sign up for PhotoFix and unlock the power of AI in your image editing process.",
    url: "https://www.photofix.in.net/signup",
    siteName: "PhotoFix",
    images: [
      {
        url: "https://www.photofix.in.net/og-signup.jpg",
        width: 1200,
        height: 630,
        alt: "PhotoFix Signup Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Join PhotoFix - AI Image Editing Made Easy",
    description:
      "Sign up for PhotoFix and unlock the power of AI in your image editing process.",
    images: ["https://www.photofix.in.net/twitter-signup.jpg"],
    creator: "@photofix",
  },
};

export default function SignupPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            src="/logo.png"
            alt="PhotoFix Logo"
            width={100}
            height={100}
            className="mx-auto"
          />
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your PhotoFix account
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Join thousands of creators and start editing like a pro
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Button type="submit" className="w-full">
                  Sign up
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="w-5 h-5 mr-2" />
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <Facebook className="w-5 h-5 mr-2" />
                  Facebook
                </Button>
                <Button variant="outline" className="w-full">
                  <Twitter className="w-5 h-5 mr-2" />
                  Twitter
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Log in here
            </Link>
          </p>
        </div>

        <div className="mt-8 max-w-md mx-auto">
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            Why Join PhotoFix?
          </h2>
          <ul className="mt-4 space-y-4 text-gray-600 dark:text-gray-400">
            <li className="flex items-start">
              <svg
                className="flex-shrink-0 h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="ml-3 text-sm">
                Access to cutting-edge AI image editing tools
              </p>
            </li>
            <li className="flex items-start">
              <svg
                className="flex-shrink-0 h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="ml-3 text-sm">
                Cloud storage for your projects and edited images
              </p>
            </li>
            <li className="flex items-start">
              <svg
                className="flex-shrink-0 h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="ml-3 text-sm">
                Regular updates with new features and improvements
              </p>
            </li>
          </ul>
        </div>
      </div>
      <Script
        id="signup-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Sign Up for PhotoFix",
            description:
              "Create your PhotoFix account and start transforming your images with our advanced AI-powered editing tools.",
            url: "https://www.photofix.in.net/signup",
            mainEntity: {
              "@type": "WebApplication",
              name: "PhotoFix",
              applicationCategory: "PhotographyApplication",
              operatingSystem: "Web",
            },
          }),
        }}
      />
    </>
  );
}
