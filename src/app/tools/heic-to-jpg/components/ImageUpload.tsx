"use client";

import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_FILES = 10;

interface ImageUploadProps {
  files: File[];
  previews: string[];
  onFilesChange: (files: File[], previews: string[]) => void;
  onRemoveImage: (index: number) => void;
}

export function ImageUpload({
  files,
  previews,
  onFilesChange,
  onRemoveImage,
}: ImageUploadProps) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/heic": [".heic"],
    },
    maxSize: MAX_FILE_SIZE,
    maxFiles: MAX_FILES,
    onDrop: (acceptedFiles) => {
      if (files.length + acceptedFiles.length > MAX_FILES) {
        toast.error(`You can only upload up to ${MAX_FILES} files at a time`);
        return;
      }

      const newFiles = [...files, ...acceptedFiles];
      const newPreviews = [...previews];

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviews.push(e.target?.result as string);
          if (newPreviews.length === newFiles.length) {
            onFilesChange(newFiles, newPreviews);
          }
        };
        reader.readAsDataURL(file);
      });
    },
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((file) => {
        file.errors.forEach((err) => {
          if (err.code === "file-too-large") {
            toast.error(
              `File is too large. Max size is ${MAX_FILE_SIZE / 1024 / 1024}MB`
            );
          } else if (err.code === "file-invalid-type") {
            toast.error("Only HEIC files are allowed");
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
        <CardTitle>Upload HEIC Images</CardTitle>
        <CardDescription>
          Drag and drop or click to upload HEIC images (max {MAX_FILES})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-primary/50 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <input {...getInputProps()} />
          {previews.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative">
                  <Image
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    width={100}
                    height={100}
                    className="object-cover rounded-md"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-0 right-0 m-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveImage(index);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-muted-foreground">
                Drop your HEIC images here, or click to select
              </p>
            </>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {files.length} / {MAX_FILES} images selected
        </p>
      </CardContent>
    </Card>
  );
}
