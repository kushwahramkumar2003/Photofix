"use client";

import { useState } from "react";
import { PdfUpload } from "./PdfUpload";
import { ConversionOptions } from "./ConversionOptions";
import { ConvertedImagesPreview } from "./ConvertedImagesPreview";
import { convertPdfToImages } from "../utils/pdfUtils";
import { toast } from "sonner";
import { ConversionOptions as ConversionOptionsType } from "../types";

export function PdfToImagesForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedImages, setConvertedImages] = useState<string[]>([]);
  const [options, setOptions] = useState<ConversionOptionsType>({
    format: "png",
    quality: 90,
    dpi: 300,
    pageRange: "all",
  });

  const handleConvert = async () => {
    if (!file) {
      toast.error("Please upload a PDF file");
      return;
    }

    setIsConverting(true);
    setConvertedImages([]);
    try {
      const images = await convertPdfToImages(file, options);
      setConvertedImages(images);
      toast.success(`PDF converted to ${images.length} images successfully`);
    } catch (error) {
      console.error("Error converting PDF to images:", error);
      toast.error("Failed to convert PDF to images. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-8">
        <PdfUpload file={file} setFile={setFile} />
        <ConversionOptions
          options={options}
          setOptions={setOptions}
          onConvert={handleConvert}
          isConverting={isConverting}
        />
      </div>
      {convertedImages.length > 0 && (
        <ConvertedImagesPreview images={convertedImages} />
      )}
    </div>
  );
}
