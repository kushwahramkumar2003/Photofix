"use server";

import { s3Client } from "@/lib/aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

export async function convertFromJpg(formData: FormData) {
  const file = formData.get("file") as File;
  const format = formData.get("format") as string;

  if (!file) {
    return { success: false, error: "No file provided" };
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    let convertedBuffer: Buffer;

    if (format === "png") {
      convertedBuffer = await sharp(buffer).png().toBuffer();
    } else if (format === "gif") {
      convertedBuffer = await sharp(buffer).gif().toBuffer();
    } else {
      return { success: false, error: "Invalid format specified" };
    }

    const fileName = `converted/${Date.now()}.${format}`;
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: convertedBuffer,
      ContentType: `image/${format}`,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));
    const url = `${process.env.CLOUDFRONT_DOMAIN}/${fileName}`;

    return { success: true, url };
  } catch (error) {
    console.error("Error converting image:", error);
    return { success: false, error: "Failed to convert image" };
  }
}
