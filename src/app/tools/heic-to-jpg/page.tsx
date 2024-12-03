import { Metadata } from "next";
import { HeicToJpgForm } from "./components/HeicToJpgForm";

export const metadata: Metadata = {
  title: "Convert HEIC to JPG | SnapForge",
  description:
    "Easily convert your HEIC images to JPG format. Fast, free, and secure HEIC to JPG conversion tool.",
  openGraph: {
    title: "Convert HEIC to JPG | SnapForge",
    description:
      "Easily convert your HEIC images to JPG format. Fast, free, and secure HEIC to JPG conversion tool.",
    images: [
      {
        url: "/og-image-heic-to-jpg.jpg", 
        width: 1200,
        height: 630,
        alt: "SnapForge HEIC to JPG Conversion Tool",
      },
    ],
  },
};

export default function HeicToJpgPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
        Convert HEIC to JPG
      </h1>
      <p className="text-muted-foreground mb-8">
        Easily convert your HEIC images to JPG format. Our tool supports batch
        conversion, maintains high quality, and ensures your privacy with
        secure, server-side processing.
      </p>
      <HeicToJpgForm />
    </div>
  );
}
