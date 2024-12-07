"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MemeEditorProps {
  memeText: { topText: string; bottomText: string };
  setMemeText: React.Dispatch<
    React.SetStateAction<{ topText: string; bottomText: string }>
  >;
  textStyle: {
    fontSize: number;
    fontColor: string;
    fontFamily: string;
    textAlign: string;
    strokeColor: string;
    strokeWidth: number;
  };
  setTextStyle: React.Dispatch<
    React.SetStateAction<{
      fontSize: number;
      fontColor: string;
      fontFamily: string;
      textAlign: string;
      strokeColor: string;
      strokeWidth: number;
    }>
  >;
  onGenerateMeme: () => void;
  isGenerating: boolean;
}

export function MemeEditor({
  memeText,
  setMemeText,
  textStyle,
  setTextStyle,
  onGenerateMeme,
  isGenerating,
}: MemeEditorProps) {
  return (
    <Card className="bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <CardHeader>
        <CardTitle>Meme Editor</CardTitle>
        <CardDescription>Customize your meme text and style</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="text">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>
          <TabsContent value="text" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topText">Top Text</Label>
              <Input
                id="topText"
                value={memeText.topText}
                onChange={(e) =>
                  setMemeText({ ...memeText, topText: e.target.value })
                }
                placeholder="Enter top text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bottomText">Bottom Text</Label>
              <Input
                id="bottomText"
                value={memeText.bottomText}
                onChange={(e) =>
                  setMemeText({ ...memeText, bottomText: e.target.value })
                }
                placeholder="Enter bottom text"
              />
            </div>
          </TabsContent>
          <TabsContent value="style" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fontSize">Font Size</Label>
              <Slider
                id="fontSize"
                min={12}
                max={72}
                step={1}
                value={[textStyle.fontSize]}
                onValueChange={(value) =>
                  setTextStyle({ ...textStyle, fontSize: value[0] })
                }
              />
              <span className="text-sm text-muted-foreground">
                {textStyle.fontSize}px
              </span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fontColor">Font Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="fontColor"
                  type="color"
                  value={textStyle.fontColor}
                  onChange={(e) =>
                    setTextStyle({ ...textStyle, fontColor: e.target.value })
                  }
                  className="w-12 h-12 p-1"
                />
                <Input
                  type="text"
                  value={textStyle.fontColor}
                  onChange={(e) =>
                    setTextStyle({ ...textStyle, fontColor: e.target.value })
                  }
                  className="flex-grow"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fontFamily">Font Family</Label>
              <Select
                value={textStyle.fontFamily}
                onValueChange={(value) =>
                  setTextStyle({ ...textStyle, fontFamily: value })
                }
              >
                <SelectTrigger id="fontFamily">
                  <SelectValue placeholder="Select font family" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Impact">Impact</SelectItem>
                  <SelectItem value="Arial">Arial</SelectItem>
                  <SelectItem value="Helvetica">Helvetica</SelectItem>
                  <SelectItem value="Comic Sans MS">Comic Sans MS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="textAlign">Text Alignment</Label>
              <Select
                value={textStyle.textAlign}
                onValueChange={(value) =>
                  setTextStyle({ ...textStyle, textAlign: value })
                }
              >
                <SelectTrigger id="textAlign">
                  <SelectValue placeholder="Select text alignment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="strokeColor">Stroke Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="strokeColor"
                  type="color"
                  value={textStyle.strokeColor}
                  onChange={(e) =>
                    setTextStyle({ ...textStyle, strokeColor: e.target.value })
                  }
                  className="w-12 h-12 p-1"
                />
                <Input
                  type="text"
                  value={textStyle.strokeColor}
                  onChange={(e) =>
                    setTextStyle({ ...textStyle, strokeColor: e.target.value })
                  }
                  className="flex-grow"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="strokeWidth">Stroke Width</Label>
              <Slider
                id="strokeWidth"
                min={0}
                max={5}
                step={0.5}
                value={[textStyle.strokeWidth]}
                onValueChange={(value) =>
                  setTextStyle({ ...textStyle, strokeWidth: value[0] })
                }
              />
              <span className="text-sm text-muted-foreground">
                {textStyle.strokeWidth}px
              </span>
            </div>
          </TabsContent>
        </Tabs>
        <Button
          onClick={onGenerateMeme}
          className="w-full"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Meme...
            </>
          ) : (
            "Generate Meme"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
