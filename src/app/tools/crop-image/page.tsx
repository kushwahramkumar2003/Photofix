import { Metadata } from "next";
import { CropImageForm } from "./components/CropImageForm";

export const metadata: Metadata = {
  title: "Crop Image | SnapForge",
  description:
    "Crop JPG, PNG or GIF images by defining a rectangle in pixels. Cut your image online with precision.",
  openGraph: {
    title: "Crop Image | SnapForge",
    description:
      "Crop JPG, PNG or GIF images by defining a rectangle in pixels. Cut your image online with precision.",
    images: [
      {
        url: "/og-image-crop.jpg",
        width: 1200,
        height: 630,
        alt: "SnapForge Image Cropping Tool",
      },
    ],
  },
};

export default function CropImagePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
        Crop Image
      </h1>
      <p className="text-muted-foreground mb-8">
        Crop JPG, PNG or GIF by defining a rectangle in pixels. Cut your image
        online with precision.
      </p>
      <CropImageForm />
    </div>
  );
}
