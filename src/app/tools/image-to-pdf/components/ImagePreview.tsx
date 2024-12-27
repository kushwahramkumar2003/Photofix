import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ImagePreviewProps {
  files: File[];
}

export function ImagePreview({ files }: ImagePreviewProps) {
  const [previews, setPreviews] = useState<{ id: string; url: string }[]>([]);

  const memoizedPreviews = useMemo(() => {
    return files.map((file) => ({
      id: `${file.name}-${file.lastModified}`,
      url: URL.createObjectURL(file),
    }));
  }, [files]);

  useEffect(() => {
    setPreviews(memoizedPreviews);

    return () => {
      memoizedPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [memoizedPreviews]);

  if (files.length === 0) return null;

  return (
    <Card className="bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <CardHeader>
        <CardTitle>Image Previews ({files.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previews.map((preview) => (
              <div key={preview.id} className="relative aspect-square">
                <Image
                  src={preview.url}
                  alt="Preview"
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
