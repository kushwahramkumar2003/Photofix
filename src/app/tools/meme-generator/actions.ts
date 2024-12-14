"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";

import sharp from "sharp";
import { createCanvas, loadImage } from "canvas";
import { s3Client } from "@/lib/aws";

const CLOUDFRONT_DOMAIN = process.env.CLOUDFRONT_DOMAIN!;
export async function generateMeme(formData: FormData) {
  const file = formData.get("file") as File;
  const topText = formData.get("topText") as string;
  const bottomText = formData.get("bottomText") as string;
  const textStyle = JSON.parse(formData.get("textStyle") as string);

  if (!file) {
    return { success: false, error: "No file provided" };
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const image = sharp(buffer);
    const metadata = await image.metadata();

    const canvas = createCanvas(metadata.width!, metadata.height!);
    const ctx = canvas.getContext("2d");

    const img = await loadImage(buffer);
    ctx.drawImage(img, 0, 0, metadata.width!, metadata.height!);

    //registerFont('path/to/impact.ttf', { family: 'Impact' })

    ctx.font = `bold ${textStyle.fontSize}px ${textStyle.fontFamily}, Arial, sans-serif`;
    ctx.fillStyle = textStyle.fontColor;
    ctx.strokeStyle = textStyle.strokeColor;
    ctx.lineWidth = textStyle.strokeWidth;
    ctx.textAlign = textStyle.textAlign as CanvasTextAlign;

    //eslint-disable-next-line
    //@ts-ignore
    drawText(ctx, topText, metadata.width! / 2, textStyle.fontSize, textStyle);

    drawText(
      //eslint-disable-next-line
      //@ts-ignore
      ctx,
      bottomText,
      metadata.width! / 2,
      metadata.height! - textStyle.fontSize / 2,
      textStyle
    );

    const memeBuffer = canvas.toBuffer("image/png");

    const fileName = `memes/${Date.now()}.png`;
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: memeBuffer,
      ContentType: "image/png",
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    const url = `${CLOUDFRONT_DOMAIN}/${fileName}`;

    return { success: true, url };
  } catch (error) {
    console.error("Error generating meme:", error);
    return { success: false, error: "Failed to generate meme" };
  }
}

function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style: any
) {
  ctx.textBaseline = "middle";
  const lines = text.toUpperCase().split("\n");

  for (let i = 0; i < lines.length; i++) {
    ctx.strokeText(lines[i], x, y + i * style.fontSize);
    ctx.fillText(lines[i], x, y + i * style.fontSize);
  }
}
