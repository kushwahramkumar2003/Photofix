"use client";

import { useDropzone } from "react-dropzone";
import { Upload, X, FileText } from "lucide-react";
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

interface PdfUploadProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

export function PdfUpload({ file, setFile }: PdfUploadProps) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
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

  const handleRemoveFile = () => {
    setFile(null);
  };

  return (
    <Card className="bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <CardHeader>
        <CardTitle>Upload PDF</CardTitle>
        <CardDescription>
          Drag and drop or click to upload a PDF file
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-primary/50 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <input {...getInputProps()} />
          {file ? (
            <div className="flex items-center justify-center space-x-4">
              <FileText className="h-8 w-8 text-primary" />
              <span className="font-medium">{file.name}</span>
              <Button
                variant="destructive"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-muted-foreground">
                Drop your PDF here, or click to select
              </p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
