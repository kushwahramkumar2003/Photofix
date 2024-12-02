import { Metadata } from "next";
import { RotateImageForm } from "./components/RotateImageForm";

export const metadata: Metadata = {
  title: "Rotate Image | SnapForge",
  description:
    "Easily rotate your images with our AI-powered tool. Adjust orientation and flip images horizontally or vertically.",
  openGraph: {
    title: "Rotate Image | SnapForge",
    description:
      "Easily rotate your images with our AI-powered tool. Adjust orientation and flip images horizontally or vertically.",
    images: [
      {
        url: "/og-image-rotate.jpg", // Make sure to add this image to your public folder
        width: 1200,
        height: 630,
        alt: "SnapForge Image Rotation Tool",
      },
    ],
  },
};

export default function RotateImagePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
        Rotate Image
      </h1>
      <p className="text-muted-foreground mb-8">
        Adjust the orientation of your images with precision. Rotate by specific
        degrees or flip horizontally and vertically.
      </p>
      <RotateImageForm />
    </div>
  );
}
