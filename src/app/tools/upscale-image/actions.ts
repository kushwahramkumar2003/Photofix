"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function upscaleImage(formData: FormData) {
  const file = formData.get("file") as File;
  const scale = parseInt(formData.get("scale") as string);
  const format = formData.get("format") as keyof sharp.FormatEnum;
  const quality = parseInt(formData.get("quality") as string);

  if (!file) {
    return { success: false, error: "No file provided" };
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const image = sharp(buffer);
    const metadata = await image.metadata();

    const upscaledBuffer = await image
      .resize({
        width: (metadata.width || 0) * scale,
        height: (metadata.height || 0) * scale,
        fit: "fill",
      })
      .toFormat(format, { quality })
      .toBuffer();

    const fileName = `upscaled/${Date.now()}.${format}`;
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: upscaledBuffer,
      ContentType: `image/${format}`,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    // const expiresIn = 60 * 60; // URL expires in 1 hour
    // const url = await getSignedUrl(
    //   s3Client,
    //   new PutObjectCommand(uploadParams),
    //   { expiresIn }
    // );

    const url = `${process.env.CLOUDFRONT_DOMAIN}/${fileName}`;

    return { success: true, url };
  } catch (error) {
    console.error("Error processing image:", error);
    return { success: false, error: "Failed to process image" };
  }
}
