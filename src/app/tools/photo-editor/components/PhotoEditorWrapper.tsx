"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

const PhotoEditor = dynamic(() => import("./PhotoEditor"), {
  loading: () => (
    <div className="flex items-center justify-center h-[700px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  ),
  ssr: false,
});

export function PhotoEditorWrapper() {
  const [image, setImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setEditedImage(null);
        setIsLoading(false);
      };
      reader.onerror = () => {
        toast.error("Error reading file");
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleImageUpload,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif", ".bmp", ".webp"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB max file size
    multiple: false,
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((file) => {
        if (file.errors[0]?.code === "file-too-large") {
          toast.error("File is too large. Maximum size is 10MB");
        } else {
          toast.error(file.errors[0]?.message || "Invalid file");
        }
      });
    },
  });

  const handleSave = (editedImageData: string) => {
    setEditedImage(editedImageData);
    setIsEditing(false);
    toast.success("Image edited successfully!");
  };

  const handleDownload = () => {
    if (editedImage) {
      const link = document.createElement("a");
      link.href = editedImage;
      link.download = "edited-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Image downloaded successfully!");
    }
  };

  return (
    <Card className="bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardContent className="p-6">
        {!image && !isLoading && (
          <div
            {...getRootProps()}
            className={`
              flex flex-col items-center justify-center h-96 border-2 border-dashed 
              rounded-lg transition-colors duration-200 cursor-pointer
              ${
                isDragActive
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-primary"
              }
            `}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              {isDragActive
                ? "Drop the image here"
                : "Drag and drop an image here, or click to select"}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Supports: JPG, PNG, GIF, BMP, WebP (Max 10MB)
            </p>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center h-96">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        )}

        {image && !isEditing && !isLoading && (
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-3xl mx-auto">
              {/* 
                 eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={editedImage || image}
                alt="Uploaded"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="flex space-x-4 mt-6">
              <Button onClick={() => setIsEditing(true)}>Edit Image</Button>
              {editedImage && (
                <Button variant="secondary" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              )}
            </div>
          </div>
        )}

        {image && isEditing && (
          <PhotoEditor
            imageUrl={image}
            onSave={handleSave}
            onClose={() => setIsEditing(false)}
          />
        )}
      </CardContent>
    </Card>
  );
}
