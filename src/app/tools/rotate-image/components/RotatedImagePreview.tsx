"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface RotatedImagePreviewProps {
  url: string;
}

export function RotatedImagePreview({ url }: RotatedImagePreviewProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await axios.get(url, {
        responseType: "blob",
      });

      const blob = response.data;
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "rotated-image.jpg";

      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      }, 100);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download image. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card className="bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <CardHeader>
        <CardTitle>Rotated Image</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={url}
          alt="Rotated Image"
          width={300}
          height={300}
          className="w-full h-auto object-contain rounded-md"
        />
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full"
        >
          {isDownloading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Downloading...
            </>
          ) : (
            "Download Rotated Image"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
