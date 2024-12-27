import JSZip from "jszip";

export async function createZipFile(
  images: string[],
  onProgress?: (progress: number) => void
): Promise<Blob> {
  const zip = new JSZip();
  const totalImages = images.length;

  for (let i = 0; i < totalImages; i++) {
    const imageUrl = images[i];
    const imageBlob = await fetchImageAsBlob(imageUrl);
    zip.file(`image_${i + 1}.${getImageExtension(imageUrl)}`, imageBlob);

    if (onProgress) {
      onProgress((i + 1) / totalImages);
    }
  }

  return await zip.generateAsync({ type: "blob" }, (metadata) => {
    if (onProgress) {
      onProgress(metadata.percent / 100);
    }
  });
}

async function fetchImageAsBlob(url: string): Promise<Blob> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }
  return await response.blob();
}

function getImageExtension(dataUrl: string): string {
  const match = dataUrl.match(/^data:image\/(\w+);base64,/);
  return match ? match[1] : "png";
}
