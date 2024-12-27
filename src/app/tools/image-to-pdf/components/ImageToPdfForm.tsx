"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { ImageUpload } from "./ImageUpload";
import { PdfPreview } from "./PdfPreview";
import { ImagePreview } from "./ImagePreview";
import { AnimatedLoader } from "./AnimatedLoader";
import { convertImagesToPdf } from "../utils/pdfUtils";
import { toast } from "sonner";
import ConversionOptions from "./ConversionOptions";
import {
  ConversionOptions as ConversionOptionsType,
  ImageToPdfFormProps,
} from "../types";

const defaultOptions: ConversionOptionsType = {
  pageSize: "A4",
  orientation: "portrait",
  margin: 20,
  quality: 0.8,
};

export const ImageToPdfForm: React.FC<ImageToPdfFormProps> = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfSize, setPdfSize] = useState<number | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [options, setOptions] = useState<ConversionOptionsType>(defaultOptions);
  const [showPreview, setShowPreview] = useState(false);

  const memoizedFiles = useMemo(() => files, [files]);

  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  const handleConvert = useCallback(async () => {
    if (files.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setIsConverting(true);
    try {
      const pdfBlob = await convertImagesToPdf(files, options);
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
      setPdfSize(pdfBlob.size);
      setShowPreview(true);
      toast.success("Images converted to PDF successfully");
    } catch (error) {
      console.error("Error converting images to PDF:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to convert images to PDF"
      );
    } finally {
      setIsConverting(false);
    }
  }, [files, options, pdfUrl]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-8">
        <ImageUpload files={memoizedFiles} setFiles={setFiles} />
        <ImagePreview files={memoizedFiles} />
        <ConversionOptions
          options={options}
          setOptions={setOptions}
          onConvert={handleConvert}
          isConverting={isConverting}
          showPreview={showPreview}
        />
      </div>
      <div className="space-y-8">
        {isConverting ? (
          <AnimatedLoader />
        ) : showPreview && pdfUrl ? (
          <PdfPreview
            url={pdfUrl}
            pdfSize={pdfSize}
            fileName={
              files.length === 1
                ? `${files[0].name}.pdf`
                : "converted-images.pdf"
            }
          />
        ) : null}
      </div>
    </div>
  );
};
