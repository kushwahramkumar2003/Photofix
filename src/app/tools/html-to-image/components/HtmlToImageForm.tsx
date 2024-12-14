"use client";

import { useState } from "react";
import { HtmlInput } from "./HtmlInput";
import { ImagePreview } from "./ImagePreview";
import { ConversionOptions } from "./ConversionOptions";
import { toPng, toJpeg, toSvg } from "html-to-image";
import { toast } from "sonner";

export function HtmlToImageForm() {
  const [html, setHtml] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [options, setOptions] = useState({
    format: "png",
    scale: 1,
    quality: 0.92,
    backgroundColor: "#ffffff",
  });

  const handleConvert = async () => {
    if (!html) {
      toast.error("Please enter some HTML code");
      return;
    }

    setIsConverting(true);
    try {
      const node = document.getElementById("html-preview");
      if (!node) throw new Error("Preview element not found");

      let dataUrl: string;
      switch (options.format) {
        case "jpeg":
          dataUrl = await toJpeg(node, {
            quality: options.quality,
            backgroundColor: options.backgroundColor,
            //eslint-disable-next-line
            //@ts-ignore
            scale: options.scale,
          });
          break;
        case "svg":
          dataUrl = await toSvg(node, {
            quality: options.quality,
            backgroundColor: options.backgroundColor,
            //eslint-disable-next-line
            //@ts-ignore
            scale: options.scale,
          });
          break;
        default:
          dataUrl = await toPng(node, {
            quality: options.quality,
            backgroundColor: options.backgroundColor,
            //eslint-disable-next-line
            //@ts-ignore
            scale: options.scale,
          });
      }

      setImageUrl(dataUrl);
      toast.success("HTML converted to image successfully");
    } catch (error) {
      console.error("Error converting HTML to image:", error);
      toast.error("Failed to convert HTML to image");
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `converted-image.${options.format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2 items-start">
      <div className="space-y-8">
        <HtmlInput html={html} setHtml={setHtml} />
        <ConversionOptions
          //eslint-disable-next-line
          //@ts-ignore
          options={options}
          //eslint-disable-next-line
          //@ts-ignore
          setOptions={setOptions}
          onConvert={handleConvert}
          isConverting={isConverting}
        />
      </div>
      <div className="lg:sticky lg:top-4">
        <ImagePreview
          html={html}
          imageUrl={imageUrl}
          onDownload={handleDownload}
          isConverting={isConverting}
        />
      </div>
    </div>
  );
}
