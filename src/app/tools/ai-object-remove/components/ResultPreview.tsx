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
import { Loader2, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultPreviewProps {
  url: string;
  className?: string;
}

export function ResultPreview({ url, className }: ResultPreviewProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "object-removed-image.png";

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
    <Card
      className={cn(
        "bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50",
        className
      )}
    >
      <CardHeader>
        <CardTitle>Result</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
          <Image src={url} alt="Result Image" fill className="object-contain" />
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button onClick={handleDownload} disabled={isDownloading}>
          {isDownloading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Downloading...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download Result
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
