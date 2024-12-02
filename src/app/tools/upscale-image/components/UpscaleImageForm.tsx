"use client";

import { useState } from "react";

import { UpscaleOptions } from "./UpscaleOptions";

import { upscaleImage } from "../actions";
import { toast } from "sonner";
import { ImageUpload } from "./ImageUpload";
import { UpscaledImagePreview } from "./UpscaledImagePreview";

export function UpscaleImageForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [isUpscaling, setIsUpscaling] = useState(false);
  const [upscaledImageUrl, setUpscaledImageUrl] = useState<string | null>(null);

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
    setUpscaledImageUrl(null);
  };

  const handleUpscale = async (formData: FormData) => {
    if (!file) {
      toast.error("Please upload an image first");
      return;
    }

    setIsUpscaling(true);
    try {
      formData.append("file", file);
      const result = await upscaleImage(formData);
      if (result.success) {
        setUpscaledImageUrl(result.url ?? null);
        toast.success("Image upscaled successfully");
      } else {
        toast.error(result.error || "Failed to upscale image");
      }
    } catch (error) {
      console.error("Error upscaling image:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsUpscaling(false);
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
      <UpscaleOptions
        originalDimensions={originalDimensions}
        onUpscale={handleUpscale}
        isUpscaling={isUpscaling}
      />
      {upscaledImageUrl && <UpscaledImagePreview url={upscaledImageUrl} />}
    </div>
  );
}
