import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
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

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 20;
const ACCEPTED_TYPES = {
  "image/jpeg": [".jpeg", ".jpg"],
  "image/png": [".png"],
  "image/gif": [".gif"],
  "image/webp": [".webp"],
};

interface ImageUploadProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export function ImageUpload({ files, setFiles }: ImageUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const uniqueFiles = acceptedFiles.filter(
        (newFile) =>
          !files.some((existingFile) => existingFile.name === newFile.name)
      );

      if (files.length + uniqueFiles.length > MAX_FILES) {
        toast.error(`Maximum ${MAX_FILES} files allowed`);
        return;
      }

      setFiles((prevFiles) => [...prevFiles, ...uniqueFiles]);
    },
    [files, setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_FILE_SIZE,
    maxFiles: MAX_FILES - files.length,
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((file) => {
        file.errors.forEach((err) => {
          switch (err.code) {
            case "file-too-large":
              toast.error(
                `${file.file.name} is too large. Max size is ${
                  MAX_FILE_SIZE / 1024 / 1024
                }MB`
              );
              break;
            case "file-invalid-type":
              toast.error(
                `${file.file.name} has an invalid type. Please upload only images.`
              );
              break;
            case "too-many-files":
              toast.error(`Maximum ${MAX_FILES} files allowed`);
              break;
            default:
              toast.error(err.message);
          }
        });
      });
    },
  });

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // Cleanup URLs when component unmounts
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        //eslint-disable-next-line
        //@ts-ignore
        if (file.preview) {
          //eslint-disable-next-line
          //@ts-ignore
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, []);

  return (
    <Card className="bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <CardHeader>
        <CardTitle>Upload Images</CardTitle>
        <CardDescription>
          Drag and drop or click to upload images (max {MAX_FILES})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-primary/50 hover:border-primary"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-2 text-muted-foreground">
            {isDragActive
              ? "Drop the files here..."
              : "Drop your images here, or click to select"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Supported formats: JPEG, PNG, GIF, WebP
          </p>
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between bg-muted p-2 rounded-md"
              >
                <div className="flex items-center space-x-2 truncate">
                  <span className="truncate max-w-[200px]">{file.name}</span>
                  <span className="text-sm text-muted-foreground">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="ml-2 shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
