"use client";

import { useState } from "react";
import {
  Loader2,
  RotateCcw,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
} from "lucide-react";
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

interface RotateOptionsProps {
  onRotate: (formData: FormData) => Promise<void>;
  isRotating: boolean;
}

export function RotateOptions({ onRotate, isRotating }: RotateOptionsProps) {
  const [angle, setAngle] = useState(0);

  const handleRotate = (rotateAngle: number) => {
    const formData = new FormData();
    formData.append("angle", rotateAngle.toString());
    onRotate(formData);
  };

  const handleFlip = (direction: "horizontal" | "vertical") => {
    const formData = new FormData();
    formData.append("flip", direction);
    onRotate(formData);
  };

  return (
    <Card className="bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <CardHeader>
        <CardTitle>Rotate Options</CardTitle>
        <CardDescription>Adjust the rotation of your image</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <Button onClick={() => handleRotate(-90)} disabled={isRotating}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Rotate Left
          </Button>
          <Button onClick={() => handleRotate(90)} disabled={isRotating}>
            <RotateCw className="mr-2 h-4 w-4" />
            Rotate Right
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="custom-angle">Custom Angle:</Label>
          <Input
            id="custom-angle"
            type="number"
            value={angle}
            onChange={(e) => setAngle(parseInt(e.target.value))}
            className="w-20"
          />
          <Button onClick={() => handleRotate(angle)} disabled={isRotating}>
            Rotate
          </Button>
        </div>
        <div className="flex justify-between">
          <Button
            onClick={() => handleFlip("horizontal")}
            disabled={isRotating}
          >
            <FlipHorizontal className="mr-2 h-4 w-4" />
            Flip Horizontal
          </Button>
          <Button onClick={() => handleFlip("vertical")} disabled={isRotating}>
            <FlipVertical className="mr-2 h-4 w-4" />
            Flip Vertical
          </Button>
        </div>
        {isRotating && (
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
