"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

import {
  CompressImageSchema,
  CompressImageInput,
  CompressionResultType,
} from "./schema";
import { s3Client } from "@/lib/aws";

const BUCKET_NAME = process.env.S3_BUCKET_NAME!;
const CLOUDFRONT_DOMAIN = process.env.CLOUDFRONT_DOMAIN!;

export async function compressImage(
  form: FormData
): Promise<CompressionResultType> {
  const data = JSON.parse(form.get("data") as string) as CompressImageInput;
  const result = CompressImageSchema.safeParse(data);
  const image = form.get("image") as File;

  // Image validation
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (!image) {
    return { success: false, error: "No image provided" };
  }

  if (image.size > MAX_FILE_SIZE) {
    return { success: false, error: "Max image size is 5MB." };
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(image.type)) {
    return {
      success: false,
      error: "Only .jpg, .jpeg, .png and .webp formats are supported.",
    };
  }

  if (!result.success) {
    return { success: false, error: JSON.stringify(result.error.format()) };
  }

  const { quality, format, width, height } = result.data;

  try {
    const buffer = Buffer.from(await image.arrayBuffer());
    let sharpInstance = sharp(buffer);

    if (width || height) {
      sharpInstance = sharpInstance.resize(width, height, { fit: "inside" });
    }

    const compressedBuffer = await sharpInstance[format]({
      quality,
    }).toBuffer();

    const fileName = `compressed/${uuidv4()}.${format}`;

    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: compressedBuffer,
      ContentType: `image/${format}`,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    const cloudFrontUrl = `${CLOUDFRONT_DOMAIN}/${fileName}`;

    return {
      fileName,
      success: true,
      fileUrl: cloudFrontUrl,
      originalSize: buffer.length,
      compressedSize: compressedBuffer.length,
    };
  } catch (error) {
    console.error("Image compression or upload failed:", error);
    return { success: false, error: "Image compression or upload failed" };
  }
}
