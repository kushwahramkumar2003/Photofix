"use server";

import { s3Client } from "@/lib/aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function removeObject(formData: FormData) {
  const file = formData.get("file") as File;
  const maskDataUrl = formData.get("mask") as string;

  if (!file || !maskDataUrl) {
    return { success: false, error: "Missing required data" };
  }

  try {
    // Convert file to base64
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileBase64 = fileBuffer.toString("base64");
    const fileDataUrl = `data:${file.type};base64,${fileBase64}`;

    // Run inference using Replicate's LaMa model
    const output = await replicate.run(
      "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
      {
        input: {
          image: fileDataUrl,
          mask: maskDataUrl,
        },
      }
    );

    if (!output) {
      throw new Error("Failed to process image");
    }

    //eslint-disable-next-line
    //@ts-ignore
    const response = await fetch(output as string);
    const resultBuffer = Buffer.from(await response.arrayBuffer());

    // Upload to S3
    const fileName = `processed/${Date.now()}.png`;
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: resultBuffer,
      ContentType: "image/png",
    };

    await s3Client.send(new PutObjectCommand(uploadParams));
    const url = `${process.env.CLOUDFRONT_DOMAIN}/${fileName}`;

    return { success: true, url };
  } catch (error) {
    console.error("Error processing image:", error);
    return { success: false, error: "Failed to process image" };
  }
}
