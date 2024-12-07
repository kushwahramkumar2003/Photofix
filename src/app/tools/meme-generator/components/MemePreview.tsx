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
import { Download, Loader2, Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface MemePreviewProps {
  url: string;
  className?: string;
  onSave: () => void;
  isGenerating: boolean;
}

export function MemePreview({
  url,
  className,
  onSave,
  isGenerating,
}: MemePreviewProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "generated-meme.png";

      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      }, 100);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download meme. Please try again.");
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
        <CardTitle>Meme Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={url}
            alt="Generated Meme"
            fill
            className="object-contain"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={onSave} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Meme
            </>
          )}
        </Button>
        <Button onClick={handleDownload} disabled={isDownloading}>
          {isDownloading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Downloading...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download Meme
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
