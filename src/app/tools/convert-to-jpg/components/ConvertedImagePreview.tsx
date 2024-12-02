"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface ConvertedImagePreviewProps {
  url: string;
}

export function ConvertedImagePreview({ url }: ConvertedImagePreviewProps) {
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
      link.download = "converted-image.jpg";

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
      <CardContent className="p-4">
        <Image
          src={url}
          alt="Converted Image"
          width={300}
          height={300}
          className="w-full h-auto object-cover rounded-md"
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
            "Download"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
