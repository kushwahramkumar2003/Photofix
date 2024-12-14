"use client";

import { useState } from "react";
import { ImageUpload } from "./ImageUpload";
import { ObjectSelection } from "./ObjectSelection";
import { ResultPreview } from "./ResultPreview";
import { toast } from "sonner";
import { removeObject } from "../actions";

export function AIObjectRemoveForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [maskDataUrl, setMaskDataUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);

  const handleFileChange = (file: File | null, preview: string | null) => {
    setFile(file);
    setPreview(preview);
    setMaskDataUrl(null);
    setResultImageUrl(null);
  };

  const handleMaskChange = (dataUrl: string) => {
    setMaskDataUrl(dataUrl);
  };

  const handleRemoveObject = async () => {
    if (!file || !maskDataUrl) {
      toast.error("Please upload an image and select the object to remove");
      return;
    }

    setIsProcessing(true);
    try {
      //eslint-disable-next-line
      const maskImage = await createImageFromDataUrl(maskDataUrl);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("mask", maskDataUrl);
      // Remove the object
      const resultDataUrl = await removeObject(formData);

      setResultImageUrl(resultDataUrl.url ?? null);

      toast.success("Object removed successfully");
    } catch (error) {
      console.error("Error removing object:", error);
      toast.error("Failed to remove object. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Helper function to convert data URL to ImageData
  const createImageFromDataUrl = (dataUrl: string): Promise<ImageData> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Failed to create canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);

        // Ensure mask is binary (black and white)
        for (let i = 0; i < imageData.data.length; i += 4) {
          const avg =
            (imageData.data[i] +
              imageData.data[i + 1] +
              imageData.data[i + 2]) /
            3;
          imageData.data[i] = avg > 128 ? 255 : 0; // Red
          imageData.data[i + 1] = avg > 128 ? 255 : 0; // Green
          imageData.data[i + 2] = avg > 128 ? 255 : 0; // Blue
          imageData.data[i + 3] = 255; // Alpha
        }

        resolve(imageData);
      };

      img.onerror = reject;
      img.src = dataUrl;
    });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-8">
        <ImageUpload
          file={file}
          preview={preview}
          onFileChange={handleFileChange}
        />
        {preview && (
          <ObjectSelection
            imageSrc={preview}
            onMaskChange={handleMaskChange}
            onRemoveObject={handleRemoveObject}
            isProcessing={isProcessing}
          />
        )}
      </div>
      {resultImageUrl && (
        <ResultPreview url={resultImageUrl} className="lg:col-span-2" />
      )}
    </div>
  );
}
