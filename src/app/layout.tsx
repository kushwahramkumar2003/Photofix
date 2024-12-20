import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Script from "next/script";
import { Toaster } from "sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.photofix.in.net"),
  title: {
    default: "PhotoFix - AI-powered Image Editing and Manipulation",
    template: "%s | PhotoFix",
  },
  description:
    "Transform your photos with PhotoFix's AI-powered image editing and manipulation tools. Enhance, retouch, and perfect your images effortlessly.",
  keywords: [
    "AI image editing",
    "photo manipulation",
    "image enhancement",
    "AI photo tools",
  ],
  authors: [{ name: "PhotoFix Team" }],
  creator: "PhotoFix",
  publisher: "PhotoFix Inc.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.photofix.in.net",
    siteName: "PhotoFix",
    title: "PhotoFix - AI-powered Image Editing and Manipulation",
    description:
      "Transform your photos with PhotoFix's AI-powered image editing and manipulation tools.",
    images: [
      {
        url: "https://www.photofix.in.net/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PhotoFix - AI Image Editing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PhotoFix - AI-powered Image Editing",
    description: "Transform your photos with PhotoFix's AI-powered tools.",
    images: ["https://www.photofix.in.net/twitter-image.jpg"],
    creator: "@photofix",
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
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://www.photofix.in.net",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta
        name="google-adsense-account"
        content="ca-pub-4733613514580686"
      ></meta>
      <head>
        <link rel="canonical" href="https://www.photofix.in.net" />
        {process.env.NODE_ENV === "production" && (
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4733613514580686"
            crossOrigin="anonymous"
          ></script>
        )}
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <Toaster richColors position="top-right" />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
        <Script id="schema-script" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "PhotoFix",
              "url": "https://www.photofix.in.net",
              "description": "AI-powered image editing and manipulation tools",
              "applicationCategory": "PhotographyApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            }
          `}
        </Script>
      </body>
    </html>
  );
}
