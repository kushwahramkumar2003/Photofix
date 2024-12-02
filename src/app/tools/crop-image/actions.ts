"use server";

import { s3Client } from "@/lib/aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
}

export async function cropImage(formData: FormData) {
  const file = formData.get("file") as File;
  const cropDataString = formData.get("cropData") as string;
  const croppedImageBlob = formData.get("croppedImage") as Blob;

  if (!file || !cropDataString || !croppedImageBlob) {
    return { success: false, error: "Missing required data" };
  }

  try {
    const cropData: CropData = JSON.parse(cropDataString);
    const buffer = Buffer.from(await croppedImageBlob.arrayBuffer());

    const croppedBuffer = await sharp(buffer)
      .extract({
        left: Math.round(cropData.x),
        top: Math.round(cropData.y),
        width: Math.round(cropData.width),
        height: Math.round(cropData.height),
      })
      .toBuffer();

    const fileName = `cropped/${Date.now()}.jpg`;
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: croppedBuffer,
      ContentType: "image/jpeg",
    };

    await s3Client.send(new PutObjectCommand(uploadParams));
    const url = `${process.env.CLOUDFRONT_DOMAIN}/${fileName}`;

    return { success: true, url };
  } catch (error) {
    console.error("Error cropping image:", error);
    return { success: false, error: "Failed to crop image" };
  }
}
