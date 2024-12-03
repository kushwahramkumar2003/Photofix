"use server";
import { s3Client } from "@/lib/aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import heicConvert from "heic-convert";

export async function convertHeicToJpg(formData: FormData) {
  const file = formData.get("file") as File;
  const quality = parseInt(formData.get("quality") as string);

  if (!file) {
    return { success: false, error: "No file provided" };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const jpegBuffer = await heicConvert({
      //disable next line lint

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      //@ts-expect-error some error
      buffer: buffer,
      format: "JPEG",
      quality: quality || 85,
    });

    const fileName = `converted/${Date.now()}.jpg`;
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: Buffer.from(jpegBuffer),
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
