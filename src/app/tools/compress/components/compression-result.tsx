import { Button } from "@/components/ui/button";
import { formatBytes, calculateCompressionRatio } from "../utils";
import { Download, Scale } from "lucide-react";
import axios from "axios";

interface CompressionResultProps {
  originalSize: number;
  compressedSize: number;
  fileName: string;
  fileUrl: string;
}

export function CompressionResult({
  originalSize,
  compressedSize,
  fileName,
  fileUrl,
}: CompressionResultProps) {
  const ratio = parseFloat(
    calculateCompressionRatio(originalSize, compressedSize)
  );
  const savings = 100 - ratio;

  const handleDownload = async () => {
    try {
      const response = await axios.get(fileUrl, {
        responseType: "blob",
      });

      const blob = response.data;

      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName || "compressed-image";


      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      }, 100);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download image. Please try again.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Scale className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">Compression Result</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="p-4 rounded-lg bg-primary/10 dark:bg-primary/5">
          <p className="text-sm text-muted-foreground">Original Size</p>
          <p className="text-2xl font-bold">{formatBytes(originalSize)}</p>
        </div>

        <div className="p-4 rounded-lg bg-primary/10 dark:bg-primary/5">
          <p className="text-sm text-muted-foreground">Compressed Size</p>
          <p className="text-2xl font-bold">{formatBytes(compressedSize)}</p>
        </div>

        <div className="p-4 rounded-lg bg-primary/10 dark:bg-primary/5">
          <p className="text-sm text-muted-foreground">Space Saved</p>
          <p className="text-2xl font-bold">{savings.toFixed(1)}%</p>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <Button size="lg" onClick={handleDownload}>
          <Download className="mr-2 h-5 w-5" />
          Download Compressed Image
        </Button>
      </div>
    </div>
  );
}
