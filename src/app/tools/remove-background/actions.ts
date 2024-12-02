"use server";

import { s3Client } from "@/lib/aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import axios from "axios";

export async function removeBackground(formData: FormData) {
  const file = formData.get("file") as File;
  const outputFormat = formData.get("outputFormat") as string;

  if (!file) {
    return { success: false, error: "No file provided" };
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const formData = new FormData();
    formData.append("image_file", new Blob([buffer]), file.name);
    formData.append("size", "auto");

    const response = await axios.post(
      "https://api.remove.bg/v1.0/removebg",
      formData,
      {
        headers: {
          "X-Api-Key": process.env.REMOVE_BG_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    let processedBuffer: Buffer = Buffer.from(response.data);

    if (outputFormat === "jpg") {
      // Convert to JPG with white background
      const sharp = (await import("sharp")).default;
      processedBuffer = await sharp(processedBuffer)
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .jpeg()
        .toBuffer();
    }

    const fileName = `processed/${Date.now()}.${outputFormat}`;
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: processedBuffer,
      ContentType: `image/${outputFormat}`,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));
    const url = `${process.env.CLOUDFRONT_DOMAIN}/${fileName}`;

    return { success: true, url };
  } catch (error) {
    console.error("Error processing image:", error);
    return { success: false, error: "Failed to process image" };
  }
}
