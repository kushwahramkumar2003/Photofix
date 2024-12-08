import { Metadata } from "next";
import { HtmlToImageForm } from "./components/HtmlToImageForm";

export const metadata: Metadata = {
  title: "HTML to Image Converter | SnapForge",
  description:
    "Convert HTML code snippets to high-quality images. Perfect for sharing code on social media, creating visual documentation, or generating custom graphics.",
  keywords: [
    "HTML to Image",
    "code to image",
    "HTML converter",
    "visual documentation",
    "SnapForge",
  ],
  openGraph: {
    title: "HTML to Image Converter | SnapForge",
    description:
      "Transform HTML code into stunning images with our powerful conversion tool. Ideal for developers, designers, and content creators.",
    images: [
      {
        url: "/og-image-html-to-image.jpg",
        width: 1200,
        height: 630,
        alt: "SnapForge HTML to Image Conversion Tool",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HTML to Image Converter | SnapForge",
    description:
      "Convert HTML to images effortlessly. Perfect for sharing code snippets and creating visual content.",
    images: ["/og-image-html-to-image.jpg"],
  },
};

export default function HtmlToImagePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
        HTML to Image Converter
      </h1>
      <p className="text-muted-foreground mb-8">
        Transform your HTML code snippets into high-quality images. Ideal for
        sharing on social media, creating visual documentation, or generating
        custom graphics for your projects.
      </p>
      <HtmlToImageForm />
    </div>
  );
}
