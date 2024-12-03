import { Metadata } from "next";
import { PhotoEditorWrapper } from "./components/PhotoEditorWrapper";



export const metadata: Metadata = {
  title: "Professional Photo Editor | SnapForge",
  description:
    "Edit your photos like a pro with our advanced online photo editor. Crop, resize, add filters, adjust colors, and more - all in your browser!",
  openGraph: {
    title: "Professional Photo Editor | SnapForge",
    description:
      "Edit your photos like a pro with our advanced online photo editor. Crop, resize, add filters, adjust colors, and more - all in your browser!",
    images: [
      {
        url: "/og-image-photo-editor.jpg", 
        width: 1200,
        height: 630,
        alt: "SnapForge Professional Photo Editor",
      },
    ],
  },
};

export default function PhotoEditorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
        Professional Photo Editor
      </h1>
      <p className="text-muted-foreground mb-8">
        Unleash your creativity with our powerful online photo editor. Crop,
        resize, adjust colors, add filters, draw, add shapes and text, and more
        - all in your browser!
      </p>
      <PhotoEditorWrapper />
    </div>
  );
}
