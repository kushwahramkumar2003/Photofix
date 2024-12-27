"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ConversionOptions as ConversionOptionsType } from "../types";

const formSchema = z.object({
  format: z.enum(["png", "jpeg", "webp", "tiff"]),
  quality: z.number().min(1).max(100),
  dpi: z.number().min(72).max(600),
  pageRange: z.string().regex(/^(\d+(-\d+)?)(,\s*\d+(-\d+)?)*$|^all$/),
});

interface ConversionOptionsProps {
  options: ConversionOptionsType;
  setOptions: React.Dispatch<React.SetStateAction<ConversionOptionsType>>;
  onConvert: () => void;
  isConverting: boolean;
}

export function ConversionOptions({
  options,
  setOptions,
  onConvert,
  isConverting,
}: ConversionOptionsProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: options,
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    //eslint-disable-next-line
    // @ts-ignore
    setOptions(values);
    onConvert();
  };

  return (
    <Card className="bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <CardHeader>
        <CardTitle>Conversion Options</CardTitle>
        <CardDescription>
          Customize your PDF to image conversion settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
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
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="jpeg">JPEG</SelectItem>
                      <SelectItem value="webp">WebP</SelectItem>
                      <SelectItem value="tiff">TIFF</SelectItem>
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
                    <Slider
                      min={1}
                      max={100}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormDescription>{field.value}%</FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dpi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DPI (Dots Per Inch)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pageRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Page Range</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., 1-3, 5, 7-9 or 'all'"
                    />
                  </FormControl>
                  <FormDescription>
                    Specify page ranges (e.g., 1-3, 5, 7-9) or &apos;all&apos;
                    for entire document
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isConverting}>
              {isConverting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Converting...
                </>
              ) : (
                "Convert PDF to Images"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
