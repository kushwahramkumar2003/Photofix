import { PDFDocument, PageSizes } from "pdf-lib";
import { ConversionOptions } from "../types";

export async function convertImagesToPdf(
  files: File[],
  options: ConversionOptions
): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();

  const pageSize = getPageSize(options.pageSize, options.orientation);

  for (const file of files) {
    const imageBytes = await file.arrayBuffer();
    let image;

    if (file.type === "image/jpeg") {
      image = await pdfDoc.embedJpg(imageBytes);
    } else if (file.type === "image/png") {
      image = await pdfDoc.embedPng(imageBytes);
    } else {
      throw new Error(`Unsupported image type: ${file.type}`);
    }

    const page = pdfDoc.addPage(pageSize);
    const { width, height } = page.getSize();
    const imageAspectRatio = image.width / image.height;
    const pageAspectRatio = width / height;

    let imageWidth, imageHeight;
    if (imageAspectRatio > pageAspectRatio) {
      imageWidth = width - 2 * options.margin;
      imageHeight = imageWidth / imageAspectRatio;
    } else {
      imageHeight = height - 2 * options.margin;
      imageWidth = imageHeight * imageAspectRatio;
    }

    page.drawImage(image, {
      x: (width - imageWidth) / 2,
      y: (height - imageHeight) / 2,
      width: imageWidth,
      height: imageHeight,
    });
  }

  const pdfBytes = await pdfDoc.save({
    useObjectStreams: false,
    addDefaultPage: false,
    //eslint-disable-next-line
    //@ts-ignore
    compress: true,
    quality: options.quality,
  });

  return new Blob([pdfBytes], { type: "application/pdf" });
}

function getPageSize(size: string, orientation: string): [number, number] {
  let pageSize: [number, number];

  switch (size) {
    case "A4":
      pageSize = PageSizes.A4;
      break;
    case "Letter":
      pageSize = PageSizes.Letter;
      break;
    case "Legal":
      pageSize = PageSizes.Legal;
      break;
    default:
      pageSize = PageSizes.A4;
  }

  return orientation === "landscape" ? [pageSize[1], pageSize[0]] : pageSize;
}
