"use server";

import { s3Client } from "@/lib/aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

export async function resizeImage(formData: FormData) {
  const file = formData.get("file") as File;
  const resizeType = formData.get("resizeType") as string;
  const width = parseInt(formData.get("width") as string);
  const height = parseInt(formData.get("height") as string);
  const maintainAspectRatio = formData.get("maintainAspectRatio") === "true";
  const format = formData.get("format") as keyof sharp.FormatEnum;
  const quality = parseInt(formData.get("quality") as string);

  if (!file) {
    return { success: false, error: "No file provided" };
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const resizeOptions: sharp.ResizeOptions = {};

    if (resizeType === "percentage") {
      const image = sharp(buffer);
      const metadata = await image.metadata();
      resizeOptions.width = Math.round((metadata.width || 0) * (width / 100));
      resizeOptions.height = Math.round(
        (metadata.height || 0) * (height / 100)
      );
    } else {
      resizeOptions.width = width;
      resizeOptions.height = height;
    }

    if (maintainAspectRatio) {
      resizeOptions.fit = sharp.fit.inside;
    }

    const resizedBuffer = await sharp(buffer)
      .resize(resizeOptions)
      .toFormat(format, { quality })
      .toBuffer();

    const fileName = `resized/${Date.now()}.${format}`;
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: resizedBuffer,
      ContentType: `image/${format}`,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));
    const url = `${process.env.CLOUDFRONT_DOMAIN}/${fileName}`;

    return { success: true, url };
  } catch (error) {
    console.error("Error processing image:", error);
    return { success: false, error: "Failed to process image" };
  }
}
