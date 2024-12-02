"use client";

import { useState } from "react";

import { RotateOptions } from "./RotateOptions";

import { rotateImage } from "../actions";
import { toast } from "sonner";
import { ImageUpload } from "./ImageUpload";
import { RotatedImagePreview } from "./RotatedImagePreview";

export function RotateImageForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(false);
  const [rotatedImageUrl, setRotatedImageUrl] = useState<string | null>(null);

  const handleFileChange = (file: File | null, preview: string | null) => {
    setFile(file);
    setPreview(preview);
    setRotatedImageUrl(null);
  };

  const handleRotate = async (formData: FormData) => {
    if (!file) {
      toast.error("Please upload an image first");
      return;
    }

    setIsRotating(true);
    try {
      formData.append("file", file);
      const result = await rotateImage(formData);
      if (result.success) {
        setRotatedImageUrl(result.url ?? null);
        toast.success("Image rotated successfully");
      } else {
        toast.error(result.error || "Failed to rotate image");
      }
    } catch (error) {
      console.error("Error rotating image:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsRotating(false);
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <ImageUpload
        file={file}
        preview={preview}
        onFileChange={handleFileChange}
      />
      <RotateOptions onRotate={handleRotate} isRotating={isRotating} />
      {rotatedImageUrl && <RotatedImagePreview url={rotatedImageUrl} />}
    </div>
  );
}
