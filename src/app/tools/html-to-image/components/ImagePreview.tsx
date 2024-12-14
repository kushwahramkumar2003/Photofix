"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";

interface ImagePreviewProps {
  html: string;
  imageUrl: string | null;
  onDownload: () => void;
  isConverting: boolean;
}

export function ImagePreview({
  html,
  imageUrl,
  onDownload,
  isConverting,
}: ImagePreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "result">("preview");

  useEffect(() => {
    if (imageUrl) {
      setActiveTab("result");
    }
  }, [imageUrl]);

  return (
    <Card className="bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <CardHeader>
        <CardTitle>Image Preview</CardTitle>
        <CardDescription>Preview your HTML and converted image</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "preview" | "result")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">HTML Preview</TabsTrigger>
            <TabsTrigger value="result">Converted Image</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <div
              id="html-preview"
              className="border rounded-lg p-4 min-h-[200px] max-h-[400px] overflow-y-auto overscroll-contain"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </TabsContent>
          <TabsContent value="result">
            {imageUrl ? (
              <div className="space-y-4">
                <div className="max-h-[400px] overflow-y-auto overscroll-contain">
                  {/* eslint-disable */}
                  <img
                    src={imageUrl}
                    alt="Converted"
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
                <Button
                  onClick={onDownload}
                  disabled={isConverting}
                  className="w-full"
                >
                  {isConverting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Download Image
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Convert your HTML to see the result here
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
