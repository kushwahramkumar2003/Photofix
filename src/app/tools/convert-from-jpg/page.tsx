import { Metadata } from "next";
import { ConvertFromJpgForm } from "./components/ConvertFromJpgForm";

export const metadata: Metadata = {
  title: "Convert from JPG | PhotoFix",
  description:
    "Transform JPG images to PNG or GIF formats. Convert multiple JPG images online at once with our powerful tool.",
  openGraph: {
    title: "Convert from JPG | PhotoFix",
    description:
      "Transform JPG images to PNG or GIF formats. Convert multiple JPG images online at once with our powerful tool.",
    images: [
      {
        url: "/og-image-convert-from-jpg.jpg", // Make sure to add this image to your public folder
        width: 1200,
        height: 630,
        alt: "PhotoFix Convert from JPG Tool",
      },
    ],
  },
};

export default function ConvertFromJpgPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
        Convert from JPG
      </h1>
      <p className="text-muted-foreground mb-8">
        Transform JPG images to PNG or GIF formats. Convert multiple JPG images
        online at once with our powerful tool.
      </p>
      <ConvertFromJpgForm />
    </div>
  );
}
