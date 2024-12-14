"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  watermarkType: z.enum(["text", "image"]),
  text: z.string().min(1).max(50).optional(),
  imageUrl: z.string().url().optional(),
  position: z.enum([
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight",
    "center",
  ]),
  opacity: z.number().min(0).max(100),
  size: z.number().min(1).max(100),
  rotation: z.number().min(-180).max(180),
  tiled: z.boolean(),
});

interface WatermarkOptionsProps {
  onAddWatermark: (formData: FormData) => Promise<void>;
  isProcessing: boolean;
}

export function WatermarkOptions({
  onAddWatermark,
  isProcessing,
}: WatermarkOptionsProps) {
  const [watermarkType, setWatermarkType] = useState<"text" | "image">("text");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      watermarkType: "text",
      text: "Watermark",
      imageUrl: "",
      position: "bottomRight",
      opacity: 50,
      size: 20,
      rotation: 0,
      tiled: false,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("watermark handleSubmit called with values: ", values);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    onAddWatermark(formData);
  };

  return (
    <Card className="bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <CardHeader>
        <CardTitle>Watermark Options</CardTitle>
        <CardDescription>Customize your watermark settings</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="watermarkType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Watermark Type</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setWatermarkType(value as "text" | "image");
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select watermark type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* {} */}
                </FormItem>
              )}
            />

            {watermarkType === "text" && (
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Watermark Text</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter watermark text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {watermarkType === "image" && (
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Watermark Image URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter image URL" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="topLeft">Top Left</SelectItem>
                      <SelectItem value="topRight">Top Right</SelectItem>
                      <SelectItem value="bottomLeft">Bottom Left</SelectItem>
                      <SelectItem value="bottomRight">Bottom Right</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="opacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opacity</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormDescription>
                    Adjust the transparency of the watermark
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={100}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormDescription>
                    Adjust the size of the watermark
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rotation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rotation</FormLabel>
                  <FormControl>
                    <Slider
                      min={-180}
                      max={180}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormDescription>
                    Rotate the watermark (in degrees)
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tiled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Tiled Watermark</FormLabel>
                    <FormDescription>
                      Repeat the watermark across the entire image
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isProcessing}
              onClick={form.handleSubmit(handleSubmit)}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Watermark...
                </>
              ) : (
                "Add Watermark"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
