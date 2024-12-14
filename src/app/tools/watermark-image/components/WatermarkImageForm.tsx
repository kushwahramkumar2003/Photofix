"use client";

import { useState } from "react";
import { WatermarkOptions } from "./WatermarkOptions";
import { addWatermark } from "../actions";
import { toast } from "sonner";
import { ImageUpload } from "./ImageUpload";
import { WatermarkedImagePreview } from "./WatermarkedImagePreview";

export function WatermarkImageForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [watermarkedImageUrl, setWatermarkedImageUrl] = useState<string | null>(
    null
  );

  const handleFileChange = (file: File | null, preview: string | null) => {
    setFile(file);
    setPreview(preview);
    setWatermarkedImageUrl(null);
  };

  const handleAddWatermark = async (formData: FormData) => {
    if (!file) {
      toast.error("Please upload an image first");
      return;
    }

    setIsProcessing(true);
    try {
      formData.append("file", file);
      const result = await addWatermark(formData);
      if (result.success) {
        setWatermarkedImageUrl(result.url ?? null);
        toast.success("Watermark added successfully");
      } else {
        toast.error(result.error || "Failed to add watermark");
      }
    } catch (error) {
      console.error("Error adding watermark:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <ImageUpload
        file={file}
        preview={preview}
        onFileChange={handleFileChange}
      />
      <WatermarkOptions
        onAddWatermark={handleAddWatermark}
        isProcessing={isProcessing}
      />
      {watermarkedImageUrl && (
        <WatermarkedImagePreview url={watermarkedImageUrl} />
      )}
    </div>
  );
}
