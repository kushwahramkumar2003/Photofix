"use server";

import { s3Client } from "@/lib/aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

export async function rotateImage(formData: FormData) {
  const file = formData.get("file") as File;
  const angle = formData.get("angle") as string;
  const flip = formData.get("flip") as string;

  if (!file) {
    return { success: false, error: "No file provided" };
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    let image = sharp(buffer);

    if (angle) {
      image = image.rotate(parseInt(angle));
    }

    if (flip === "horizontal") {
      image = image.flip();
    } else if (flip === "vertical") {
      image = image.flop();
    }

    const rotatedBuffer = await image.toBuffer();

    const fileName = `rotated/${Date.now()}.jpg`;
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: rotatedBuffer,
      ContentType: "image/jpeg",
    };

    await s3Client.send(new PutObjectCommand(uploadParams));
    const url = `${process.env.CLOUDFRONT_DOMAIN}/${fileName}`;

    return { success: true, url };
  } catch (error) {
    console.error("Error rotating image:", error);
    return { success: false, error: "Failed to rotate image" };
  }
}
