import { Metadata } from "next";
import { RemoveBackgroundForm } from "./components/RemoveBackgroundForm";

export const metadata: Metadata = {
  title: "Remove Background | SnapForge",
  description:
    "Cut out image backgrounds with exceptional quality. Remove the background of your JPG and PNG images easily.",
  openGraph: {
    title: "Remove Background | SnapForge",
    description:
      "Cut out image backgrounds with exceptional quality. Remove the background of your JPG and PNG images easily.",
    images: [
      {
        url: "/og-image-remove-background.jpg", // Make sure to add this image to your public folder
        width: 1200,
        height: 630,
        alt: "SnapForge Background Removal Tool",
      },
    ],
  },
};

export default function RemoveBackgroundPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
        Remove Background
      </h1>
      <p className="text-muted-foreground mb-8">
        Cut out image backgrounds with exceptional quality. Remove the
        background of your JPG and PNG images easily.
      </p>
      <RemoveBackgroundForm />
    </div>
  );
}
