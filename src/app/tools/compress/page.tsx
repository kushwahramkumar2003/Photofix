"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CompressionResultType } from "./schema";
import { compressImage } from "./actions";
import { formatBytes } from "./utils";
import { Card } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";
import { CompressionForm } from "./components/compression-form";
import { CompressionResult } from "./components/compression-result";
import z from "zod";

//disable nextlint nextline
// eslint-disable-next-line
const CompressImageSchema = {
  image: z.instanceof(File).optional(),
  quality: z.number().min(1).max(100).default(80),
  format: z.enum(["jpeg", "png", "webp"]).default("jpeg"),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
};

type CompressImageInput = z.infer<z.ZodObject<typeof CompressImageSchema>>;

export default function CompressImagePage() {
  const [isCompressing, setIsCompressing] = useState(false);
  const [result, setResult] = useState<CompressionResultType | null>(null);

  const onSubmit = async (data: CompressImageInput) => {
    setIsCompressing(true);
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("image", data.image!);
      const compressionResult = await compressImage(formData);
      setResult(compressionResult);
      if (compressionResult.success) {
        toast.success("Image compressed successfully", {
          description: `Original size: ${formatBytes(
            compressionResult.originalSize!
          )}, Compressed size: ${formatBytes(
            compressionResult.compressedSize!
          )}`,
          duration: 5000,
        });
      } else {
        toast.error("Compression failed", {
          description: compressionResult.error,
        });
      }
    } catch {
      toast.error("An error occurred", {
        description: "Please try again later",
      });
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center">
            <div className="bg-primary/10 p-3 rounded-full">
              <ImageIcon className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            Image Compression Tool
          </h1>
          <p className="text-muted-foreground">
            Optimize your images with our advanced compression tool
          </p>
        </div>

        <Card className="p-6 shadow-lg">
          <CompressionForm onSubmit={onSubmit} isCompressing={isCompressing} />
        </Card>

        {result && result.success && (
          <Card className="shadow-lg">
            <CompressionResult
              originalSize={result.originalSize!}
              compressedSize={result.compressedSize!}
              fileName={result.fileName!}
              fileUrl={result.fileUrl!}
            />
          </Card>
        )}
      </div>
    </div>
  );
}
