"use client";

import { useState, useEffect } from "react";
import { ImageUpload } from "./ImageUpload";
import { MemeEditor } from "./MemeEditor";
import { MemePreview } from "./MemePreview";
import { generateMeme } from "../actions";
import { toast } from "sonner";

export function MemeGeneratorForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMemeUrl, setGeneratedMemeUrl] = useState<string | null>(null);
  const [memeText, setMemeText] = useState({ topText: "", bottomText: "" });
  const [textStyle, setTextStyle] = useState({
    fontSize: 32,
    fontColor: "#ffffff",
    fontFamily: "Impact",
    textAlign: "center",
    strokeColor: "#000000",
    strokeWidth: 2,
  });

  const handleFileChange = (file: File | null, preview: string | null) => {
    setFile(file);
    setPreview(preview);
    setGeneratedMemeUrl(null);
  };

  const handleGenerateMeme = async () => {
    if (!file) {
      toast.error("Please upload an image first");
      return;
    }

    setIsGenerating(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("topText", memeText.topText);
      formData.append("bottomText", memeText.bottomText);
      formData.append("textStyle", JSON.stringify(textStyle));

      const result = await generateMeme(formData);
      if (result.success) {
        setGeneratedMemeUrl(result.url ?? null);
        toast.success("Meme generated successfully");
      } else {
        toast.error(result.error || "Failed to generate meme");
      }
    } catch (error) {
      console.error("Error generating meme:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (preview) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx!.drawImage(img, 0, 0);
        ctx!.font = `bold ${textStyle.fontSize}px ${textStyle.fontFamily}, Arial, sans-serif`;
        ctx!.fillStyle = textStyle.fontColor;
        ctx!.strokeStyle = textStyle.strokeColor;
        ctx!.lineWidth = textStyle.strokeWidth;
        ctx!.textAlign = textStyle.textAlign as CanvasTextAlign;

        // Draw top text
        const topLines = memeText.topText.split("\n");
        topLines.forEach((line, index) => {
          const y = textStyle.fontSize * (index + 1);
          ctx!.strokeText(line, canvas.width / 2, y);
          ctx!.fillText(line, canvas.width / 2, y);
        });

        // Draw bottom text
        const bottomLines = memeText.bottomText.split("\n");
        bottomLines.reverse().forEach((line, index) => {
          const y = canvas.height - textStyle.fontSize * (index + 1);
          ctx!.strokeText(line, canvas.width / 2, y);
          ctx!.fillText(line, canvas.width / 2, y);
        });

        setGeneratedMemeUrl(canvas.toDataURL());
      };
      img.src = preview;
    }
  }, [preview, memeText, textStyle]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-8">
        <ImageUpload
          file={file}
          preview={preview}
          onFileChange={handleFileChange}
        />
        {preview && (
          <MemeEditor
            memeText={memeText}
            setMemeText={setMemeText}
            textStyle={textStyle}
            setTextStyle={setTextStyle}
            onGenerateMeme={handleGenerateMeme}
            isGenerating={isGenerating}
          />
        )}
      </div>
      {generatedMemeUrl && (
        <MemePreview
          url={generatedMemeUrl}
          onSave={handleGenerateMeme}
          isGenerating={isGenerating}
        />
      )}
    </div>
  );
}
