import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";

interface ResizedImagePreviewProps {
  url: string;
}

export function ResizedImagePreview({ url }: ResizedImagePreviewProps) {
  const handleDownload = async () => {
    try {
      const response = await axios.get(url, {
        responseType: "blob",
      });

      const blob = response.data;

      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "resized-image";

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
    <Card className="mt-8 bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50 col-span-full">
      <CardHeader>
        <CardTitle>Resized Image</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={url}
          alt="Resized Image"
          width={500}
          height={300}
          className="mx-auto object-contain"
        />
      </CardContent>
      <CardFooter className="justify-center">
        <Button onClick={handleDownload}>Download Resized Image</Button>
      </CardFooter>
    </Card>
  );
}
