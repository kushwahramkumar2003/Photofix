import { Metadata } from "next";
import { PdfToImagesForm } from "./components/PdfToImagesForm";

export const metadata: Metadata = {
  title: "Convert PDF to Images | SnapForge",
  description:
    "Transform your PDF documents into high-quality images with our advanced PDF to Image converter. Support for multiple image formats, custom settings, and batch processing.",
  keywords: [
    "PDF to Image",
    "document conversion",
    "image extraction",
    "PDF tools",
    "SnapForge",
  ],
  openGraph: {
    title: "Convert PDF to Images | SnapForge",
    description:
      "Transform PDF documents into high-quality images. Perfect for presentations, social media, and more.",
    images: [
      {
        url: "/og-image-pdf-to-images.jpg",
        width: 1200,
        height: 630,
        alt: "SnapForge PDF to Images Conversion Tool",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert PDF to Images | SnapForge",
    description:
      "Transform PDF documents into high-quality images effortlessly. Ideal for creating visual content from your documents.",
    images: ["/og-image-pdf-to-images.jpg"],
  },
};

export default function PdfToImagesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
        Convert PDF to Images
      </h1>
      <p className="text-muted-foreground mb-8">
        Transform your PDF documents into high-quality images. Perfect for
        creating visual content, sharing on social media, or enhancing your
        presentations. Our tool supports multiple image formats and offers
        advanced customization options.
      </p>
      <PdfToImagesForm />
    </div>
  );
}
