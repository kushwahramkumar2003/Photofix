import type { Metadata } from "next";
import { Github, Mail, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Login to PhotoFix - AI-Powered Image Editing Platform",
  description:
    "Sign in to your PhotoFix account and start editing your images with our AI-powered tools. Multiple login options available for your convenience.",
  keywords: [
    "PhotoFix login",
    "AI image editing",
    "secure login",
    "photo enhancement",
  ],
  openGraph: {
    title: "Login to PhotoFix",
    description:
      "Access your PhotoFix account and unleash your creativity with AI-powered image editing.",
    url: "https://www.photofix.tech/login",
    siteName: "PhotoFix",
    images: [
      {
        url: "https://www.photofix.tech/og-login.jpg",
        width: 1200,
        height: 630,
        alt: "PhotoFix Login Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Login to PhotoFix",
    description:
      "Access your PhotoFix account and unleash your creativity with AI-powered image editing.",
    images: ["https://www.photofix.tech/twitter-login.jpg"],
    creator: "@photofix",
  },
};

export default function LoginPage() {
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
            Welcome to PhotoFix
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Sign in to your account and start creating amazing images
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div>
                <Button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Mail className="w-5 h-5 mr-2" />
                  Continue with Email
                </Button>
              </div>

              <div>
                <Button variant="outline" className="w-full">
                  <Github className="w-5 h-5 mr-2" />
                  Continue with GitHub
                </Button>
              </div>

              <div>
                <Button variant="outline" className="w-full">
                  <Facebook className="w-5 h-5 mr-2" />
                  Continue with Facebook
                </Button>
              </div>

              <div>
                <Button variant="outline" className="w-full">
                  <Twitter className="w-5 h-5 mr-2" />
                  Continue with Twitter
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                    Or
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <Link
                    href="/signup"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Sign up
                  </Link>
                </div>
                <div>
                  <Link
                    href="/forgot-password"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 max-w-md mx-auto">
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            Why Choose PhotoFix?
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
                Advanced AI-powered image editing tools
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
                User-friendly interface for both beginners and professionals
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
                Secure cloud storage for your projects
              </p>
            </li>
          </ul>
        </div>
      </div>
      <Script
        id="login-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Login to PhotoFix",
            description:
              "Sign in to your PhotoFix account and start editing your images with our AI-powered tools.",
            url: "https://www.photofix.tech/login",
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
