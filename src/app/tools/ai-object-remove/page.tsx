import { Metadata } from "next";
import { AIObjectRemoveForm } from "./components/AIObjectRemoveForm";

export const metadata: Metadata = {
  title: "AI Object Removal | SnapForge",
  description:
    "Remove unwanted objects from your images with our advanced AI-powered tool. Fast, accurate, and easy to use.",
  keywords: [
    "AI object removal",
    "image editing",
    "inpainting",
    "photo manipulation",
    "SnapForge",
  ],
  openGraph: {
    title: "AI Object Removal | SnapForge",
    description:
      "Remove unwanted objects from your images with our advanced AI-powered tool. Fast, accurate, and easy to use.",
    images: [
      {
        url: "/og-image-ai-object-remove.jpg",
        width: 1200,
        height: 630,
        alt: "SnapForge AI Object Removal Tool",
      },
    ],
    type: "website",
  },
};

export default function AIObjectRemovePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
        AI Object Removal
      </h1>
      <p className="text-muted-foreground mb-8">
        Remove unwanted objects from your images with our cutting-edge AI
        technology. Simply upload your image, select the object you want to
        remove, and let our AI do the rest.
      </p>
      <AIObjectRemoveForm />
    </div>
  );
}
