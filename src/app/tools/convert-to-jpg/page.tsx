import { Metadata } from "next";
import { ConvertToJpgForm } from "./components/ConvertToJpgForm";

export const metadata: Metadata = {
  title: "Convert to JPG | SnapForge",
  description:
    "Convert PNG, GIF, TIF, PSD, SVG, WEBP, HEIC or RAW images to JPG format. Batch convert multiple images online.",
  openGraph: {
    title: "Convert to JPG | SnapForge",
    description:
      "Convert PNG, GIF, TIF, PSD, SVG, WEBP, HEIC or RAW images to JPG format. Batch convert multiple images online.",
    images: [
      {
        url: "/og-image-convert-jpg.jpg", // Make sure to add this image to your public folder
        width: 1200,
        height: 630,
        alt: "SnapForge Convert to JPG Tool",
      },
    ],
  },
};

export default function ConvertToJpgPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
        Convert to JPG
      </h1>
      <p className="text-muted-foreground mb-8">
        Transform PNG, GIF, TIF, PSD, SVG, WEBP, HEIC or RAW to JPG format.
        Convert many images to JPG online at once.
      </p>
      <ConvertToJpgForm />
    </div>
  );
}
