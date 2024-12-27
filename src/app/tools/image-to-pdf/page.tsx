import { Metadata } from "next";
import { ImageToPdfForm } from "./components/ImageToPdfForm";

export const metadata: Metadata = {
  title: "Convert Images to PDF | PhotoFix",
  description:
    "Transform your images into high-quality PDF documents with our advanced Image to PDF converter. Support for multiple image formats, custom PDF settings, and instant downloads.",
  keywords: [
    "image to PDF",
    "PDF converter",
    "image conversion",
    "document creation",
    "PhotoFix",
  ],
  openGraph: {
    title: "Convert Images to PDF | PhotoFix",
    description:
      "Create professional PDFs from your images with our powerful conversion tool. Perfect for documents, presentations, and more.",
    images: [
      {
        url: "/og-image-image-to-pdf.jpg",
        width: 1200,
        height: 630,
        alt: "PhotoFix Image to PDF Conversion Tool",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert Images to PDF | PhotoFix",
    description:
      "Transform images to PDFs effortlessly. Ideal for creating professional documents from your visual content.",
    images: ["/og-image-image-to-pdf.jpg"],
  },
};

export default function ImageToPdfPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
        Convert Images to PDF
      </h1>
      <p className="text-muted-foreground mb-8">
        Transform your images into high-quality PDF documents. Perfect for
        creating professional reports, portfolios, or archiving your visual
        content. Our tool supports multiple image formats and offers advanced
        customization options.
      </p>
      <ImageToPdfForm />
    </div>
  );
}
