import * as ort from "onnxruntime-web";

// Constants for model configuration
const MODEL_CONFIG = {
  inputSize: 512,
  batchSize: 1,
  channels: 3,
  modelPath: "/models/lama_fp32.onnx",
};

export interface RemovalHistory {
  timestamp: number;
  maskDataUrl: string;
  resultDataUrl: string;
}

export async function removeObject(
  image: File,
  mask: ImageData,
  options: {
    hdStrategy?: "original" | "tile" | "crop";
    strength?: number;
    postprocessing?: boolean;
  } = {}
): Promise<string> {
  try {
    // Initialize model session
    const session = await initializeModel();

    // Process image and mask
    const { processedImage, processedMask } = await preprocessInputs(
      image,
      mask,
      options
    );

    // Run inference with quality preservation
    const result = await runInference(session, processedImage, processedMask);

    // Post-process result
    const finalResult = await postprocessResult(result, image, options);

    return finalResult;
  } catch (error) {
    console.error("Object removal error:", error);
    throw new Error("Failed to process image. Please try again.");
  }
}

async function initializeModel(): Promise<ort.InferenceSession> {
  try {
    const response = await fetch(MODEL_CONFIG.modelPath);
    if (!response.ok) throw new Error("Failed to fetch model");

    const modelArrayBuffer = await response.arrayBuffer();
    return await ort.InferenceSession.create(modelArrayBuffer, {
      executionProviders: ["wasm"],
      graphOptimizationLevel: "all",
      executionMode: "parallel",
    });
  } catch (error) {
    console.error("Model initialization error:", error);
    throw new Error("Failed to initialize AI model");
  }
}

async function preprocessInputs(
  image: File,
  mask: ImageData,
  //eslint-disable-next-line
  options: any
): Promise<{ processedImage: ort.Tensor; processedMask: ort.Tensor }> {
  const imageData = await getImageData(image);
  const { width, height } = imageData;

  // Resize to fixed input size while maintaining aspect ratio
  const resizedImage = resizeImageToFixedInput(imageData);
  const resizedMask = resizeMaskToFixedInput(mask, width, height);

  const inputTensor = preprocessImage(resizedImage);
  const maskTensor = preprocessMask(resizedMask);

  return {
    processedImage: inputTensor,
    processedMask: maskTensor,
  };
}

function resizeImageToFixedInput(imageData: ImageData): ImageData {
  const canvas = document.createElement("canvas");
  canvas.width = MODEL_CONFIG.inputSize;
  canvas.height = MODEL_CONFIG.inputSize;
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Canvas context error");

  // Calculate scaling while maintaining aspect ratio
  const scaleX = MODEL_CONFIG.inputSize / imageData.width;
  const scaleY = MODEL_CONFIG.inputSize / imageData.height;
  const scale = Math.min(scaleX, scaleY);

  const scaledWidth = imageData.width * scale;
  const scaledHeight = imageData.height * scale;

  const dx = (MODEL_CONFIG.inputSize - scaledWidth) / 2;
  const dy = (MODEL_CONFIG.inputSize - scaledHeight) / 2;

  // Create source canvas
  const sourceCanvas = document.createElement("canvas");
  sourceCanvas.width = imageData.width;
  sourceCanvas.height = imageData.height;
  const sourceCtx = sourceCanvas.getContext("2d");

  if (!sourceCtx) throw new Error("Source canvas context error");

  sourceCtx.putImageData(imageData, 0, 0);

  // Fill with black background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, MODEL_CONFIG.inputSize, MODEL_CONFIG.inputSize);

  // Draw scaled image centered
  ctx.drawImage(
    sourceCanvas,
    0,
    0,
    imageData.width,
    imageData.height,
    dx,
    dy,
    scaledWidth,
    scaledHeight
  );

  return ctx.getImageData(0, 0, MODEL_CONFIG.inputSize, MODEL_CONFIG.inputSize);
}

function resizeMaskToFixedInput(
  maskData: ImageData,
  originalWidth: number,
  originalHeight: number
): ImageData {
  const canvas = document.createElement("canvas");
  canvas.width = MODEL_CONFIG.inputSize;
  canvas.height = MODEL_CONFIG.inputSize;
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Canvas context error");

  // Calculate scaling while maintaining aspect ratio
  const scaleX = MODEL_CONFIG.inputSize / originalWidth;
  const scaleY = MODEL_CONFIG.inputSize / originalHeight;
  const scale = Math.min(scaleX, scaleY);

  const scaledWidth = originalWidth * scale;
  const scaledHeight = originalHeight * scale;

  const dx = (MODEL_CONFIG.inputSize - scaledWidth) / 2;
  const dy = (MODEL_CONFIG.inputSize - scaledHeight) / 2;

  // Create source mask canvas
  const sourceCanvas = document.createElement("canvas");
  sourceCanvas.width = maskData.width;
  sourceCanvas.height = maskData.height;
  const sourceCtx = sourceCanvas.getContext("2d");

  if (!sourceCtx) throw new Error("Source canvas context error");

  sourceCtx.putImageData(maskData, 0, 0);

  // Fill with black background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, MODEL_CONFIG.inputSize, MODEL_CONFIG.inputSize);

  // Draw scaled mask centered
  ctx.drawImage(
    sourceCanvas,
    0,
    0,
    maskData.width,
    maskData.height,
    dx,
    dy,
    scaledWidth,
    scaledHeight
  );

  return ctx.getImageData(0, 0, MODEL_CONFIG.inputSize, MODEL_CONFIG.inputSize);
}

function preprocessImage(imageData: ImageData): ort.Tensor {
  const { data, width, height } = imageData;
  const inputArray = new Float32Array(width * height * 3);

  // Normalize to [-1, 1]
  for (let i = 0, j = 0; i < data.length; i += 4, j += 3) {
    inputArray[j] = data[i] / 127.5 - 1; // R channel
    inputArray[j + 1] = data[i + 1] / 127.5 - 1; // G channel
    inputArray[j + 2] = data[i + 2] / 127.5 - 1; // B channel
  }

  return new ort.Tensor("float32", inputArray, [1, 3, height, width]);
}

function preprocessMask(maskData: ImageData): ort.Tensor {
  const { data, width, height } = maskData;
  const inputArray = new Float32Array(width * height);

  // Convert to binary mask
  for (let i = 0, j = 0; i < data.length; i += 4, j++) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    inputArray[j] = avg > 128 ? 1 : 0;
  }

  return new ort.Tensor("float32", inputArray, [1, 1, height, width]);
}

async function runInference(
  session: ort.InferenceSession,
  image: ort.Tensor,
  mask: ort.Tensor
): Promise<Float32Array> {
  try {
    const feeds = {
      image,
      mask,
    };
    const results = await session.run(feeds);
    return results[session.outputNames[0]].data as Float32Array;
  } catch (error) {
    console.error("Inference error:", error);
    throw new Error("Failed to process image");
  }
}

async function postprocessResult(
  result: Float32Array,
  originalImage: File,
  //eslint-disable-next-line
  options: any
): Promise<string> {
  const imageData = await getImageData(originalImage);
  const { width, height } = imageData;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Failed to create canvas context");

  // Apply advanced post-processing if enabled
  if (options.postprocessing) {
    await applyPostProcessing(ctx, result, width, height);
  } else {
    await applyBasicProcessing(ctx, result, width, height);
  }

  return canvas.toDataURL("image/png");
}

async function applyPostProcessing(
  ctx: CanvasRenderingContext2D,
  result: Float32Array,
  width: number,
  height: number
) {
  const outputImageData = ctx.createImageData(width, height);

  // Assuming result is [1, 3, height, width]
  const totalPixels = width * height;
  for (let i = 0; i < totalPixels; i++) {
    const idx = i * 4;
    const r = ((result[i] + 1) * 127.5) | 0;
    const g = ((result[totalPixels + i] + 1) * 127.5) | 0;
    const b = ((result[2 * totalPixels + i] + 1) * 127.5) | 0;

    outputImageData.data[idx] = r;
    outputImageData.data[idx + 1] = g;
    outputImageData.data[idx + 2] = b;
    outputImageData.data[idx + 3] = 255; // Full opacity
  }

  ctx.putImageData(outputImageData, 0, 0);
}

async function applyBasicProcessing(
  ctx: CanvasRenderingContext2D,
  result: Float32Array,
  width: number,
  height: number
) {
  const outputImageData = ctx.createImageData(width, height);

  // Assuming result is [1, 3, height, width]
  const totalPixels = width * height;
  for (let i = 0; i < totalPixels; i++) {
    const idx = i * 4;
    const r = ((result[i] + 1) * 127.5) | 0;
    const g = ((result[totalPixels + i] + 1) * 127.5) | 0;
    const b = ((result[2 * totalPixels + i] + 1) * 127.5) | 0;

    outputImageData.data[idx] = r;
    outputImageData.data[idx + 1] = g;
    outputImageData.data[idx + 2] = b;
    outputImageData.data[idx + 3] = 255; // Full opacity
  }

  ctx.putImageData(outputImageData, 0, 0);
}

async function getImageData(file: File): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to create canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0);
      resolve(ctx.getImageData(0, 0, img.width, img.height));
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
