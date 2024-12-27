"use client";

import React, { useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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
import { ConversionOptionsProps } from "../types";

const formSchema = z.object({
  pageSize: z.enum(["A4", "Letter", "Legal"] as const),
  orientation: z.enum(["portrait", "landscape"] as const),
  margin: z.number().min(0).max(100),
  quality: z.number().min(0.1).max(1),
});

type FormSchema = z.infer<typeof formSchema>;

const ConversionOptions: React.FC<ConversionOptionsProps> = ({
  options,
  setOptions,
  onConvert,
  isConverting,
  showPreview,
}) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: options,
  });

  const handleOptionsChange = useCallback(
    (value: Partial<FormSchema>) => {
      setOptions((prev) => ({ ...prev, ...value }));
      if (showPreview) {
        onConvert();
      }
    },
    [setOptions, showPreview, onConvert]
  );

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value) {
        handleOptionsChange(value as Partial<FormSchema>);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, handleOptionsChange]);

  return (
    <Card className="bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <CardHeader>
        <CardTitle>Conversion Options</CardTitle>
        <CardDescription>Customize your PDF output</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <FormField
              control={form.control}
              name="pageSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Page Size</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select page size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="A4">A4</SelectItem>
                      <SelectItem value="Letter">Letter</SelectItem>
                      <SelectItem value="Legal">Legal</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="orientation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Orientation</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select orientation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="portrait">Portrait</SelectItem>
                      <SelectItem value="landscape">Landscape</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="margin"
              //eslint-disable-next-line
              //@ts-ignore
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Margin (mm)</FormLabel>
                  <FormControl>
                    <Controller
                      name="margin"
                      control={form.control}
                      render={({ field }) => (
                        <Slider
                          min={0}
                          max={100}
                          step={1}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                      )}
                    />
                  </FormControl>
                  <FormDescription>{form.watch("margin")}mm</FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quality"
              //eslint-disable-next-line
              //@ts-ignore
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Quality</FormLabel>
                  <FormControl>
                    <Controller
                      name="quality"
                      control={form.control}
                      render={({ field }) => (
                        <Slider
                          min={0.1}
                          max={1}
                          step={0.1}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                      )}
                    />
                  </FormControl>
                  <FormDescription>
                    {Math.round(form.watch("quality") * 100)}%
                  </FormDescription>
                </FormItem>
              )}
            />

            <Button
              type="button"
              className="w-full"
              disabled={isConverting}
              onClick={onConvert}
            >
              {isConverting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Converting...
                </>
              ) : (
                "Convert to PDF"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ConversionOptions;
