import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const CompressImageSchema = z.object({
  // image: z
  //   .any()
  //   .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
  //   .refine(
  //     (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
  //     "Only .jpg, .jpeg, .png and .webp formats are supported."
  //   ),
  quality: z.coerce.number().min(1).max(100),
  format: z.enum(["jpeg", "png", "webp"]),
  width: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
});

export type CompressImageInput = z.infer<typeof CompressImageSchema>;

export interface CompressionResultType {
  success: boolean;
  fileUrl?: string;
  fileName?: string;
  originalSize?: number;
  compressedSize?: number;
  error?: string;
}
