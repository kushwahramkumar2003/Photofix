"use client";

import { useState } from "react";

import { cropImage } from "../actions";
import { toast } from "sonner";
import { ImageUpload } from "./ImageUpload";
import { CropInterface } from "./CropInterface";
import { CroppedImagePreview } from "./CroppedImagePreview";

export function CropImageForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);

  const handleFileChange = (file: File | null, preview: string | null) => {
    setFile(file);
    setPreview(preview);
    setCroppedImageUrl(null);
  };

  const handleCrop = async (croppedImageBlob: Blob, cropData: string) => {
    if (!file) {
      toast.error("Please upload an image first");
      return;
    }

    setIsCropping(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("cropData", cropData);
      formData.append("croppedImage", croppedImageBlob);

      const result = await cropImage(formData);
      if (result.success) {
        setCroppedImageUrl(result.url || null);
        toast.success("Image cropped successfully");
      } else {
        toast.error(result.error || "Failed to crop image");
      }
    } catch (error) {
      console.error("Error cropping image:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsCropping(false);
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <ImageUpload
        file={file}
        preview={preview}
        onFileChange={handleFileChange}
      />
      {preview && (
        <CropInterface
          imageSrc={preview}
          onCrop={handleCrop}
          isCropping={isCropping}
        />
      )}
      {croppedImageUrl && <CroppedImagePreview url={croppedImageUrl} />}
    </div>
  );
}
