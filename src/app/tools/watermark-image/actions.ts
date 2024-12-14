"use server";

import { z } from "zod";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { s3Client } from "@/lib/aws";

const WatermarkSchema = z.object({
  file: z.instanceof(File),
  watermarkType: z.enum(["text", "image"]),
  text: z.string().optional(),
  imageUrl: z.string().url().optional(),
  position: z.enum([
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight",
    "center",
  ]),
  opacity: z.number().min(0).max(100),
  size: z.number().min(1).max(100),
  rotation: z.number().min(-360).max(360),
  tiled: z.boolean(),
});

//eslint-disable-next-line
type WatermarkInput = z.infer<typeof WatermarkSchema>;
type WatermarkResult =
  | { success: true; url: string }
  | { success: false; error: string };

export async function addWatermark(
  formData: FormData
): Promise<WatermarkResult> {
  try {
    // Validate form data
    const parsedData = WatermarkSchema.parse({
      file: formData.get("file"),
      watermarkType: formData.get("watermarkType"),
      text: formData.get("text"),
      imageUrl: formData.get("imageUrl"),
      position: formData.get("position"),
      opacity: parseFloat(formData.get("opacity") as string),
      size: parseFloat(formData.get("size") as string),
      rotation: parseFloat(formData.get("rotation") as string),
      tiled: formData.get("tiled") === "true",
    });

    const buffer = Buffer.from(await parsedData.file.arrayBuffer());
    const image = sharp(buffer);
    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      throw new Error("Invalid image metadata");
    }

    let watermarkImage: sharp.Sharp;

    if (parsedData.watermarkType === "text") {
      if (!parsedData.text) {
        throw new Error("Text watermark requires text content");
      }

      // Create text watermark
      watermarkImage = sharp({
        create: {
          width: metadata.width,
          height: metadata.height,
          channels: 4,
          background: { r: 255, g: 255, b: 255, alpha: 0.5 },
        },
      });

      watermarkImage = watermarkImage.composite([
        {
          input: Buffer.from(`
            <svg xmlns="http://www.w3.org/2000/svg">
              <text 
                x="50%" 
                y="50%" 
                text-anchor="middle" 
                fill="rgba(0,0,0,0.5)" 
                font-size="${parsedData.size}"
              >
                ${parsedData.text}
              </text>
            </svg>
          `),
          top: 0,
          left: 0,
        },
      ]);
    } else {
      if (!parsedData.imageUrl) {
        throw new Error("Image watermark requires an image URL");
      }

      // Fetch image watermark
      const watermarkResponse = await fetch(parsedData.imageUrl);
      const watermarkBuffer = await watermarkResponse.arrayBuffer();
      watermarkImage = sharp(Buffer.from(watermarkBuffer));
    }

    // Resize watermark
    const resizedWatermark = watermarkImage.resize({
      width: Math.round(metadata.width * (parsedData.size / 100)),
      fit: "inside",
    });

    // Rotate watermark
    const rotatedWatermark = resizedWatermark.rotate(parsedData.rotation);

    // Prepare watermark composition
    const watermarkComposite: sharp.OverlayOptions = {
      input: await rotatedWatermark.toBuffer(),
      //eslint-disable-next-line
      //@ts-ignore
      opacity: parsedData.opacity / 100,
    };

    // Position watermark
    if (parsedData.tiled) {
      throw new Error("Tiled watermarking not fully implemented");
    } else {
      switch (parsedData.position) {
        case "topLeft":
          watermarkComposite.top = 0;
          watermarkComposite.left = 0;
          break;
        case "topRight":
          watermarkComposite.top = 0;
          watermarkComposite.left =
            //eslint-disable-next-line
            //@ts-ignore
            metadata.width - watermarkComposite.input!.width!;
          break;
        case "bottomLeft":
          watermarkComposite.top =
            //eslint-disable-next-line
            //@ts-ignore
            metadata.height - watermarkComposite.input!.height!;
          watermarkComposite.left = 0;
          break;
        case "bottomRight":
          watermarkComposite.top =
            //eslint-disable-next-line
            //@ts-ignore
            metadata.height - watermarkComposite.input!.height!;
          watermarkComposite.left =
            //eslint-disable-next-line
            //@ts-ignore
            metadata.width - watermarkComposite.input!.width!;
          break;
        case "center":
        default:
          watermarkComposite.top = Math.round(
            //eslint-disable-next-line
            //@ts-ignore
            (metadata.height - watermarkComposite.input!.height!) / 2
          );
          watermarkComposite.left = Math.round(
            //eslint-disable-next-line
            //@ts-ignore
            (metadata.width - watermarkComposite.input!.width!) / 2
          );
          break;
      }
    }

    // Composite the watermark
    const processedImage = await image
      .composite([watermarkComposite])
      .jpeg({ quality: 90 })
      .toBuffer();

    // Upload to S3
    const fileName = `watermarked-${Date.now()}.jpg`;
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: processedImage,
      ContentType: "image/jpeg",
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    const url = `${process.env.CLOUDFRONT_DOMAIN}/${fileName}`;
    return { success: true, url };
  } catch (error) {
    console.error("Error processing image:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to process image",
    };
  }
}
