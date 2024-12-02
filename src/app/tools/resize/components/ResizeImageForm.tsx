"use client";

import { useState } from "react";
import { resizeImage } from "../actions";
import { toast } from "sonner";
import { ImageUpload } from "./ImageUpload";
import { ResizeOptions } from "./ResizeOptions";
import { ResizedImagePreview } from "./ResizedImagePreview";

export function ResizeImageForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [resizedImageUrl, setResizedImageUrl] = useState<string | null>(null);

  const handleFileChange = (
    file: File | null,
    preview: string | null,
    dimensions: { width: number; height: number } | null
  ) => {
    setFile(file);
    setPreview(preview);
    setOriginalDimensions(dimensions);
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreview(null);
    setOriginalDimensions(null);
    setResizedImageUrl(null);
  };

  const handleResize = async (formData: FormData) => {
    if (!file) {
      toast.error("Please upload an image first");
      return;
    }

    setIsResizing(true);
    try {
      formData.append("file", file);
      const result = await resizeImage(formData);
      if (result.success) {
        setResizedImageUrl(result.url || null);
        toast.success("Image resized successfully");
      } else {
        toast.error(result.error || "Failed to resize image");
      }
    } catch (error) {
      console.error("Error resizing image:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsResizing(false);
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <ImageUpload
        file={file}
        preview={preview}
        originalDimensions={originalDimensions}
        onFileChange={handleFileChange}
        onRemoveImage={handleRemoveImage}
      />
      <ResizeOptions
        originalDimensions={originalDimensions}
        onResize={handleResize}
        isResizing={isResizing}
      />
      {resizedImageUrl && <ResizedImagePreview url={resizedImageUrl} />}
    </div>
  );
}
