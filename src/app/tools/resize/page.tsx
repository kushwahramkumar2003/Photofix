import { Metadata } from "next";
import { ResizeImageForm } from "./components/ResizeImageForm";

export const metadata: Metadata = {
  title: "Resize Image | PhotoFix",
  description:
    "Easily resize your images with our AI-powered tool. Adjust dimensions, maintain aspect ratio, and choose your preferred format.",
  openGraph: {
    title: "Resize Image | PhotoFix",
    description:
      "Easily resize your images with our AI-powered tool. Adjust dimensions, maintain aspect ratio, and choose your preferred format.",
    images: [
      {
        url: "/og-image-resize.jpg", // Make sure to add this image to your public folder
        width: 1200,
        height: 630,
        alt: "PhotoFix Image Resizing Tool",
      },
    ],
  },
};

export default function ResizeImagePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
        Resize Image
      </h1>
      <ResizeImageForm />
    </div>
  );
}
