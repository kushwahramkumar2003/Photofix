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

interface WatermarkedImagePreviewProps {
  url: string;
}

export function WatermarkedImagePreview({ url }: WatermarkedImagePreviewProps) {
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
      link.download = "watermarked-image.jpg";

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
    <Card className="mt-8 bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50 col-span-full">
      <CardHeader>
        <CardTitle>Watermarked Image</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={url}
          alt="Watermarked Image"
          width={500}
          height={300}
          className="mx-auto object-contain"
        />
      </CardContent>
      <CardFooter className="justify-center">
        <Button onClick={handleDownload} disabled={isDownloading}>
          {isDownloading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Downloading...
            </>
          ) : (
            "Download Watermarked Image"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
