"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { canvasPreview } from "@/utils/canvasPreview";
import { useDebounceEffect } from "@/utils/useDebounce";

interface CropInterfaceProps {
  imageSrc: string;
  onCrop: (croppedImageBlob: Blob, cropData: string) => void;
  isCropping: boolean;
  maxImageSize?: number;
}

export function CropInterface({
  imageSrc,
  onCrop,
  isCropping,
  maxImageSize = 10 * 1024 * 1024,
}: CropInterfaceProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  //disable linting for the next line
  // eslint-disable-next-line
  const [scale, setScale] = useState(1);
  // eslint-disable-next-line
  const [rotate, setRotate] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const checkImageSize = async () => {
      try {
        const response = await fetch(imageSrc);
        const blob = await response.blob();

        if (blob.size > maxImageSize) {
          console.error("Image size exceeds maximum limit");
          return false;
        }
        setImageLoaded(true);
      } catch (error) {
        console.error("Error loading image:", error);
        return false;
      }
    };

    checkImageSize();
  }, [imageSrc, maxImageSize]);

  const handleCropComplete = useCallback(async () => {
    if (!imageLoaded) {
      console.error("Image not loaded properly");
      return;
    }

    try {
      const startTime = performance.now();

      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        const blob = await canvasPreview(
          // eslint-disable-next-line
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );

        const endTime = performance.now();
        console.log(`Crop processing time: ${endTime - startTime}ms`);

        if (blob) {
          if (blob.size > maxImageSize) {
            console.error("Cropped image size exceeds maximum limit");
            return;
          }
          onCrop(blob, JSON.stringify(completedCrop));
        }
      }
    } catch (error) {
      console.error("Error during crop processing:", error);
    }
  }, [completedCrop, scale, rotate, onCrop, imageLoaded, maxImageSize]);

  useDebounceEffect(
    async () => {
      if (
        !imageLoaded ||
        !completedCrop?.width ||
        !completedCrop?.height ||
        !imgRef.current ||
        !previewCanvasRef.current
      ) {
        return;
      }

      try {
        await canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      } catch (error) {
        console.error("Preview generation error:", error);
      }
    },
    100,
    [completedCrop, scale, rotate, imageLoaded]
  );

  if (!imageLoaded) {
    return (
      <Card>
        <CardContent>Loading image...</CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <CardHeader>
        <CardTitle>Crop Image</CardTitle>
        <CardDescription>Drag the crop area to adjust</CardDescription>
      </CardHeader>
      <CardContent>
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={undefined}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            alt="Crop me"
            src={imageSrc}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
          />
        </ReactCrop>
        <canvas
          ref={previewCanvasRef}
          style={{
            display: "none",
            width: completedCrop?.width ?? 0,
            height: completedCrop?.height ?? 0,
          }}
        />
        <Button
          onClick={handleCropComplete}
          className="w-full mt-4"
          disabled={isCropping || !imageLoaded}
        >
          {isCropping ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Cropping...
            </>
          ) : (
            "Crop Image"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
