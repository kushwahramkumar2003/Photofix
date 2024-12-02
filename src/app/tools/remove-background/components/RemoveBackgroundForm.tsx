"use client";

import { useState } from "react";

import { removeBackground } from "../actions";
import { toast } from "sonner";
import { ImageUpload } from "./ImageUpload";
import { RemovalOptions } from "./RemovalOptions";
import { ProcessedImagePreview } from "./ProcessedImagePreview";

export function RemoveBackgroundForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImageUrls, setProcessedImageUrls] = useState<string[]>([]);

  const handleFilesChange = (newFiles: File[], newPreviews: string[]) => {
    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleRemoveImage = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleRemoveBackground = async (formData: FormData) => {
    if (files.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setIsProcessing(true);
    try {
      const results = await Promise.all(
        files.map(async (file) => {
          const fileFormData = new FormData();
          fileFormData.append("file", file);
          formData.forEach((value, key) => fileFormData.append(key, value));
          return removeBackground(fileFormData);
        })
      );

      const successfulProcessing = results.filter(
        (result): result is { success: true; url: string } => result.success
      );
      const urls = successfulProcessing.map((result) => result.url);
      setProcessedImageUrls(urls);

      if (successfulProcessing.length === results.length) {
        toast.success("All images processed successfully");
      } else {
        toast.warning(
          `${successfulProcessing.length} out of ${results.length} images processed successfully`
        );
      }
    } catch (error) {
      console.error("Error processing images:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <ImageUpload
        files={files}
        previews={previews}
        onFilesChange={handleFilesChange}
        onRemoveImage={handleRemoveImage}
      />
      <RemovalOptions
        onRemoveBackground={handleRemoveBackground}
        isProcessing={isProcessing}
      />
      {processedImageUrls.length > 0 && (
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Processed Images</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {processedImageUrls.map((url, index) => (
              <ProcessedImagePreview key={index} url={url} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
