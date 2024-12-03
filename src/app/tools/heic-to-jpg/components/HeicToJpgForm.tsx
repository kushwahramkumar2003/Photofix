"use client";

import { useState } from "react";
import { ImageUpload } from "./ImageUpload";

import { convertHeicToJpg } from "../actions";
import { toast } from "sonner";
import { ConversionOptions } from "./ConversionOptions";
import { ConvertedImagePreview } from "./ConvertedImagePreview";

export function HeicToJpgForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedImageUrls, setConvertedImageUrls] = useState<string[]>([]);

  const handleFilesChange = (newFiles: File[], newPreviews: string[]) => {
    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleRemoveImage = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleConvert = async (formData: FormData) => {
    if (files.length === 0) {
      toast.error("Please upload at least one HEIC image");
      return;
    }

    setIsConverting(true);
    try {
      const results = await Promise.all(
        files.map(async (file) => {
          const fileFormData = new FormData();
          fileFormData.append("file", file);
          formData.forEach((value, key) => fileFormData.append(key, value));
          return convertHeicToJpg(fileFormData);
        })
      );

      const successfulConversions = results.filter(
        (result): result is { success: true; url: string } => result.success
      );
      const urls = successfulConversions.map((result) => result.url);
      setConvertedImageUrls(urls);

      if (successfulConversions.length === results.length) {
        toast.success("All images converted successfully");
      } else {
        toast.warning(
          `${successfulConversions.length} out of ${results.length} images converted successfully`
        );
      }
    } catch (error) {
      console.error("Error converting images:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsConverting(false);
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
      <ConversionOptions
        onConvert={handleConvert}
        isConverting={isConverting}
      />
      {convertedImageUrls.length > 0 && (
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Converted Images</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {convertedImageUrls.map((url, index) => (
              <ConvertedImagePreview key={index} url={url} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
