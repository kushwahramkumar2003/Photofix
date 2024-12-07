import { Metadata } from "next";
import { MemeGeneratorForm } from "./components/MemeGeneratorForm";

export const metadata: Metadata = {
  title: "Meme Generator | SnapForge",
  description:
    "Create hilarious memes with our easy-to-use meme generator. Add custom text, images, and effects to make your memes stand out.",
  keywords: [
    "meme generator",
    "meme maker",
    "custom memes",
    "funny images",
    "SnapForge",
  ],
  openGraph: {
    title: "Meme Generator | SnapForge",
    description:
      "Create hilarious memes with our easy-to-use meme generator. Add custom text, images, and effects to make your memes stand out.",
    images: [
      {
        url: "/og-image-meme-generator.jpg",
        width: 1200,
        height: 630,
        alt: "SnapForge Meme Generator Tool",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meme Generator | SnapForge",
    description:
      "Create hilarious memes with our easy-to-use meme generator. Add custom text, images, and effects to make your memes stand out.",
    images: ["/og-image-meme-generator.jpg"],
    creator: "@snapforge",
  },
};

export default function MemeGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
        Meme Generator
      </h1>
      <p className="text-muted-foreground mb-8">
        Create hilarious memes with our easy-to-use meme generator. Add custom
        text, images, and effects to make your memes stand out.
      </p>
      <MemeGeneratorForm />
    </div>
  );
}
