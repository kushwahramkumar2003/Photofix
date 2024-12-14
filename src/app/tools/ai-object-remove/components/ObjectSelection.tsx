"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Loader2, Undo, Redo, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DrawState {
  maskDataUrl: string;
  timestamp: number;
}

interface ObjectSelectionProps {
  imageSrc: string;
  onMaskChange: (maskDataUrl: string) => void;
  onRemoveObject: () => void;
  isProcessing: boolean;
}

export function ObjectSelection({
  imageSrc,
  onMaskChange,
  onRemoveObject,
  isProcessing,
}: ObjectSelectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(20);
  const [brushHardness, setBrushHardness] = useState(0.5);
  const [brushOpacity, setBrushOpacity] = useState(1);
  //eslint-disable-next-line
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  // History management
  const [history, setHistory] = useState<DrawState[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [brushMode, setBrushMode] = useState<"draw" | "erase">("draw");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Calculate dimensions preserving aspect ratio
      const maxWidth = 800;
      const maxHeight = 600;
      //eslint-disable-next-line
      let { width, height } = calculateDimensions(
        img.width,
        img.height,
        maxWidth,
        maxHeight
      );

      // Set canvas size
      canvas.width = width;
      canvas.height = height;
      setCanvasSize({ width, height });

      // Draw image
      ctx.drawImage(img, 0, 0, width, height);

      // Initialize history
      saveToHistory();
    };
    img.src = imageSrc;
  }, [imageSrc]);

  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const newState: DrawState = {
      maskDataUrl: canvas.toDataURL(),
      timestamp: Date.now(),
    };


    const newHistory = history.slice(0, currentStep + 1);
    setHistory([...newHistory, newState]);
    setCurrentStep(currentStep + 1);

  
    onMaskChange(newState.maskDataUrl);
  }, [currentStep, history, onMaskChange]);

  const undo = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      loadState(history[currentStep - 1]);
    }
  }, [currentStep, history]);

  const redo = useCallback(() => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
      loadState(history[currentStep + 1]);
    }
  }, [currentStep, history]);

  const loadState = useCallback(
    (state: DrawState) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        onMaskChange(state.maskDataUrl);
      };
      img.src = state.maskDataUrl;
    },
    [onMaskChange]
  );

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  }, []);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
    saveToHistory();
  }, [saveToHistory]);

  const draw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const pos = getMousePos(e, canvas);

      // Configure brush
      ctx.globalAlpha = brushOpacity;
      ctx.fillStyle =
        brushMode === "draw" ? "rgba(255, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)";
      ctx.globalCompositeOperation =
        brushMode === "draw" ? "source-over" : "destination-out";

      // Draw with anti-aliasing
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, brushSize, 0, Math.PI * 2);
      ctx.fill();

      // Apply brush hardness
      if (brushHardness < 1) {
        const gradient = ctx.createRadialGradient(
          pos.x,
          pos.y,
          0,
          pos.x,
          pos.y,
          brushSize
        );
        gradient.addColorStop(0, "rgba(255, 0, 0, " + brushOpacity + ")");
        gradient.addColorStop(
          brushHardness,
          "rgba(255, 0, 0, " + brushOpacity * 0.5 + ")"
        );
        gradient.addColorStop(1, "rgba(255, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    },
    [isDrawing, brushSize, brushHardness, brushOpacity, brushMode]
  );

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      saveToHistory();
    };
    img.src = imageSrc;
  }, [imageSrc, saveToHistory]);

  return (
    <Card className="bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <CardHeader>
        <CardTitle>Select Object to Remove</CardTitle>
        <CardDescription>
          Draw over the object you want to remove
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="brush" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="brush">Brush Settings</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="brush" className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground w-24">Size:</span>
              <Slider
                value={[brushSize]}
                onValueChange={(value) => setBrushSize(value[0])}
                min={5}
                max={50}
                step={1}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground w-12">
                {brushSize}px
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground w-24">
                Hardness:
              </span>
              <Slider
                value={[brushHardness * 100]}
                onValueChange={(value) => setBrushHardness(value[0] / 100)}
                min={0}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground w-12">
                {Math.round(brushHardness * 100)}%
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground w-24">
                Opacity:
              </span>
              <Slider
                value={[brushOpacity * 100]}
                onValueChange={(value) => setBrushOpacity(value[0] / 100)}
                min={0}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground w-12">
                {Math.round(brushOpacity * 100)}%
              </span>
            </div>
            <div className="flex justify-between">
              <Button
                variant={brushMode === "draw" ? "default" : "outline"}
                onClick={() => setBrushMode("draw")}
              >
                Draw
              </Button>
              <Button
                variant={brushMode === "erase" ? "default" : "outline"}
                onClick={() => setBrushMode("erase")}
              >
                Erase
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="history" className="space-y-4">
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={undo}
                disabled={currentStep <= 0}
              >
                <Undo className="mr-2 h-4 w-4" />
                Undo
              </Button>
              <Button
                variant="outline"
                onClick={redo}
                disabled={currentStep >= history.length - 1}
              >
                <Redo className="mr-2 h-4 w-4" />
                Redo
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onMouseLeave={stopDrawing}
            className="cursor-crosshair absolute inset-0 w-full h-full"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" className="flex-1" onClick={clearCanvas}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Clear
          </Button>
          <Button
            onClick={onRemoveObject}
            className="flex-1"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Remove Object"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function getMousePos(
  e: React.MouseEvent<HTMLCanvasElement>,
  canvas: HTMLCanvasElement
) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };
}

function calculateDimensions(
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number
) {
  let newWidth = width;
  let newHeight = height;

  if (width > maxWidth) {
    newWidth = maxWidth;
    newHeight = (height * maxWidth) / width;
  }

  if (newHeight > maxHeight) {
    newHeight = maxHeight;
    newWidth = (width * maxHeight) / height;
  }

  return { width: newWidth, height: newHeight };
}
