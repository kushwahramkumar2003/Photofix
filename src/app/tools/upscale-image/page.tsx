import { Metadata } from "next";
import { UpscaleImageForm } from "./components/UpscaleImageForm";

export const metadata: Metadata = {
  title: "Upscale Image | SnapForge",
  description:
    "Easily increase the resolution of your images with our advanced upscaling tool. Enhance image quality without losing details.",
  openGraph: {
    title: "Upscale Image | SnapForge",
    description:
      "Easily increase the resolution of your images with our advanced upscaling tool. Enhance image quality without losing details.",
    images: [
      {
        url: "/og-image-upscale.jpg", // Make sure to add this image to your public folder
        width: 1200,
        height: 630,
        alt: "SnapForge Image Upscaling Tool",
      },
    ],
  },
};

export default function UpscaleImagePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
        Upscale Image
      </h1>
      <p className="text-muted-foreground mb-8">
        Easily increase the resolution of your images with our advanced
        upscaling tool. Enhance image quality without losing details.
      </p>
      <UpscaleImageForm />
    </div>
  );
}
