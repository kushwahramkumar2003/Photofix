"use client";

import { useState, useRef, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Upload, Image as ImageIcon, Settings2, X } from "lucide-react";
import { z } from "zod";

const CompressImageSchema = z.object({
  image: z.instanceof(File).optional(),
  quality: z.number().min(1).max(100).default(80),
  format: z.enum(["jpeg", "png", "webp"]).default("jpeg"),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
});

type CompressImageInput = z.infer<typeof CompressImageSchema>;

interface CompressionFormProps {
  onSubmit: (data: CompressImageInput) => Promise<void>;
  isCompressing?: boolean;
}

export function CompressionForm({
  isCompressing = false,
  onSubmit,
}: CompressionFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<CompressImageInput>({
    resolver: zodResolver(CompressImageSchema),
    defaultValues: {
      quality: 80,
      format: "jpeg",
    },
  });

  const quality = watch("quality");

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          alert("Please upload a valid image file");
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
          setValue("image", file);
        };
        reader.readAsDataURL(file);
      }
    },
    [setValue]
  );

  const handleRemoveImage = useCallback(() => {
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setValue("image", undefined);
  }, [setValue]);

  const handleFormSubmit = async (data: CompressImageInput) => {
    console.log("sumbitting", data);
    if (!data.image) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("image", data.image);

    try {
      onSubmit(data);
    } catch (error) {
      console.error("Compression failed", error);
      alert("Image compression failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Upload className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Upload Image</h2>
        </div>
        <div className="border-2 border-dashed rounded-lg p-6 text-center relative">
          <Input
            id="image"
            type="file"
            accept="image/*"
            {...register("image")}
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
          {imagePreview ? (
            <div className="relative">
              {/* lint disable next line
               */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="Image preview"
                className="max-h-64 mx-auto rounded-lg object-contain"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Label
              htmlFor="image"
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <ImageIcon className="w-12 h-12 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Click to upload or drag and drop
              </span>
            </Label>
          )}
          {errors.image && (
            <p className="text-red-500 text-sm mt-2">{errors.image.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Settings2 className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Compression Settings</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="quality">Quality: {quality}%</Label>
            <Controller
              name="quality"
              control={control}
              render={({ field }) => (
                <Slider
                  id="quality"
                  min={1}
                  max={100}
                  step={1}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  className="py-2"
                />
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="format">Output Format</Label>
            <Controller
              name="format"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jpeg">JPEG</SelectItem>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="webp">WebP</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="width">Max Width (optional)</Label>
            <Input
              id="width"
              type="number"
              placeholder="Enter width in pixels"
              {...register("width", {
                setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10)),
              })}
            />
            {errors.width && (
              <p className="text-red-500 text-sm">{errors.width.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Max Height (optional)</Label>
            <Input
              id="height"
              type="number"
              placeholder="Enter height in pixels"
              {...register("height", {
                setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10)),
              })}
            />
            {errors.height && (
              <p className="text-red-500 text-sm">{errors.height.message}</p>
            )}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isCompressing || !imagePreview}
        className="w-full sm:w-auto"
        size="lg"
      >
        {isCompressing ? (
          <>
            <Upload className="mr-2 h-4 w-4 animate-spin" />
            Compressing...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Compress Image
          </>
        )}
      </Button>
    </form>
  );
}
