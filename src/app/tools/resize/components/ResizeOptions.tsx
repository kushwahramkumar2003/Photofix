"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
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

const formSchema = z.object({
  resizeType: z.enum(["percentage", "pixels"]),
  width: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Width must be a positive number",
  }),
  height: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Height must be a positive number",
  }),
  maintainAspectRatio: z.boolean(),
  format: z.enum(["jpeg", "png", "webp", "gif"]),
  quality: z.number().min(1).max(100),
});

interface ResizeOptionsProps {
  originalDimensions: { width: number; height: number } | null;
  onResize: (formData: FormData) => Promise<void>;
  isResizing: boolean;
}

export function ResizeOptions({
  originalDimensions,
  onResize,
  isResizing,
}: ResizeOptionsProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resizeType: "pixels",
      width: originalDimensions?.width.toString() || "",
      height: originalDimensions?.height.toString() || "",
      maintainAspectRatio: true,
      format: "jpeg",
      quality: 80,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    onResize(formData);
  };

  const handleAspectRatioChange = (checked: boolean) => {
    form.setValue("maintainAspectRatio", checked);
    if (checked && originalDimensions) {
      const currentWidth = Number(form.getValues("width"));
      const newHeight = Math.round(
        (currentWidth / originalDimensions.width) * originalDimensions.height
      );
      form.setValue("height", newHeight.toString());
    }
  };

  const handleDimensionChange = (
    dimension: "width" | "height",
    value: string
  ) => {
    form.setValue(dimension, value);
    if (form.getValues("maintainAspectRatio") && originalDimensions) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      if (dimension === "width") {
        const newHeight = Math.round(Number(value) / aspectRatio);
        form.setValue("height", newHeight.toString());
      } else {
        const newWidth = Math.round(Number(value) * aspectRatio);
        form.setValue("width", newWidth.toString());
      }
    }
  };

  return (
    <Card className="bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <CardHeader>
        <CardTitle>Resize Options</CardTitle>
        <CardDescription>Customize your image resize settings</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="resizeType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resize Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value === "percentage" && originalDimensions) {
                          form.setValue("width", "100");
                          form.setValue("height", "100");
                        } else if (value === "pixels" && originalDimensions) {
                          form.setValue(
                            "width",
                            originalDimensions.width.toString()
                          );
                          form.setValue(
                            "height",
                            originalDimensions.height.toString()
                          );
                        }
                      }}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="pixels" />
                        </FormControl>
                        <FormLabel className="font-normal">Pixels</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="percentage" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Percentage
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Width</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) =>
                          handleDimensionChange("width", e.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) =>
                          handleDimensionChange("height", e.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="maintainAspectRatio"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Maintain Aspect Ratio
                    </FormLabel>
                    <FormDescription>
                      Keep the original aspect ratio of the image
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={handleAspectRatioChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="format"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Output Format</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select output format" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="jpeg">JPEG</SelectItem>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="webp">WebP</SelectItem>
                      <SelectItem value="gif">GIF</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quality</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="1"
                      max="100"
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Set the quality of the output image (1-100)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isResizing}>
              {isResizing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resizing...
                </>
              ) : (
                "Resize Image"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
