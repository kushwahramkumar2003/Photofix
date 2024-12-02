"use server";

import { s3Client } from "@/lib/aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

export async function convertToJpg(formData: FormData) {
  const file = formData.get("file") as File;
  const quality = parseInt(formData.get("quality") as string);

  if (!file) {
    return { success: false, error: "No file provided" };
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const convertedBuffer = await sharp(buffer).jpeg({ quality }).toBuffer();

    const fileName = `converted/${Date.now()}.jpg`;
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: convertedBuffer,
      ContentType: "image/jpeg",
    };

    await s3Client.send(new PutObjectCommand(uploadParams));
    const url = `${process.env.CLOUDFRONT_DOMAIN}/${fileName}`;

    return { success: true, url };
  } catch (error) {
    console.error("Error converting image:", error);
    return { success: false, error: "Failed to convert image" };
  }
}
