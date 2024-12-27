"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, Loader2 } from "lucide-react";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import { createZipFile } from "../utils/zipUtils";

interface ConvertedImagesPreviewProps {
  images: string[];
}

export function ConvertedImagesPreview({
  images,
}: ConvertedImagesPreviewProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleDownloadAll = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    try {
      const zip = await createZipFile(images, (progress) => {
        setDownloadProgress(Math.round(progress * 100));
      });
      saveAs(zip, "converted_images.zip");
      toast.success("Images downloaded successfully");
    } catch (error) {
      console.error("Error downloading images:", error);
      toast.error("Failed to download images. Please try again.");
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  return (
    <Card className="bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <CardHeader>
        <CardTitle>Converted Images</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={image}
                alt={`Converted Image ${index + 1}`}
                fill
                className="object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleDownloadAll}
          disabled={isDownloading}
          className="w-full"
        >
          {isDownloading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Downloading... {downloadProgress}%
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download All Images
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
