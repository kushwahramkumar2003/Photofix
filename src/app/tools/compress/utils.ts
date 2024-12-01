export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function calculateCompressionRatio(
  originalSize: number,
  compressedSize: number
): string {
  return ((compressedSize / originalSize) * 100).toFixed(2);
}
