"use client";
import { useDropzone } from "react-dropzone";

import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface ImageUploadProps {
  file: File | null;
  preview: string | null;
  originalDimensions: { width: number; height: number } | null;
  onFileChange: (
    file: File | null,
    preview: string | null,
    dimensions: { width: number; height: number } | null
  ) => void;
  onRemoveImage: () => void;
}

export function ImageUpload({
  file,
  preview,
  originalDimensions,
  onFileChange,
  onRemoveImage,
}: ImageUploadProps) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".svg", ".gif"],
    },
    maxSize: MAX_FILE_SIZE,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.createElement("img");
          img.onload = () => {
            onFileChange(file, e.target?.result as string, {
              width: img.naturalWidth,
              height: img.naturalHeight,
            });
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    },
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((file) => {
        file.errors.forEach((err) => {
          if (err.code === "file-too-large") {
            toast.error(
              `File is too large. Max size is ${MAX_FILE_SIZE / 1024 / 1024}MB`
            );
          } else {
            toast.error(err.message);
          }
        });
      });
    },
  });

  return (
    <Card className="bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
        <CardDescription>
          Drag and drop or click to upload an image
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-primary/50 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <input {...getInputProps()} />
          {preview ? (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Preview"
                className="mx-auto max-w-[300px] max-h-[300px] object-contain"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-0 right-0 m-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveImage();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          )}
          <p className="mt-2 text-muted-foreground">
            {file ? file.name : "Drop your image here, or click to select"}
          </p>
        </div>
      </CardContent>
      {originalDimensions && (
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Original dimensions: {originalDimensions.width}x
            {originalDimensions.height}
          </p>
        </CardFooter>
      )}
    </Card>
  );
}
