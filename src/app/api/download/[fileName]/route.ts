import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { fileName: string } }
) {
  const fileName = params.fileName;
  const filePath = path.join(process.cwd(), "tmp", fileName);

  // In a real-world scenario, you'd fetch this file from your cloud storage service
  // For this example, we'll pretend we're reading it from the local filesystem

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return new NextResponse("File not found", { status: 404 });
  }

  // Read file
  const fileBuffer = fs.readFileSync(filePath);

  // Set headers
  const headers = new Headers();
  headers.set("Content-Disposition", `attachment; filename=${fileName}`);
  headers.set("Content-Type", `image/${path.extname(fileName).slice(1)}`);

  // Return file
  return new NextResponse(fileBuffer, { headers });
}
