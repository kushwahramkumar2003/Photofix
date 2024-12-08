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

const formSchema = z.object({
  format: z.enum(["png", "jpeg", "svg"]),
  scale: z.number().min(1).max(3),
  quality: z.number().min(0.1).max(1),
  backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, {
    message: "Invalid hex color",
  }),
});

interface ConversionOptionsProps {
  options: z.infer<typeof formSchema>;
  setOptions: React.Dispatch<React.SetStateAction<z.infer<typeof formSchema>>>;
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
    setOptions(values);
    onConvert();
  };

  return (
    <Card className="bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <CardHeader>
        <CardTitle>Conversion Options</CardTitle>
        <CardDescription>Customize your image output</CardDescription>
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
                      <SelectItem value="svg">SVG</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scale"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scale</FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={3}
                      step={0.1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormDescription>{field.value.toFixed(1)}x</FormDescription>
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
                      min={0.1}
                      max={1}
                      step={0.01}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormDescription>
                    {Math.round(field.value * 100)}%
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="backgroundColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Color</FormLabel>
                  <FormControl>
                    <div className="flex space-x-2">
                      <Input
                        type="color"
                        {...field}
                        className="w-12 h-12 p-1"
                      />
                      <Input
                        {...field}
                        placeholder="#ffffff"
                        className="flex-grow"
                      />
                    </div>
                  </FormControl>
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
                "Convert to Image"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
