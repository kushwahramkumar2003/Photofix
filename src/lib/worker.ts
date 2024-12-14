import { removeObject } from "@/utils/objectRemoval";

export function createWorker() {
  // Create a web worker for handling heavy computations
  const worker = new Worker(new URL("./worker.js", import.meta.url), {
    type: "module",
  });
  return worker;
}

// worker.js
self.onmessage = async (event) => {
  //eslint-disable-next-line
  const { image, mask, options } = event.data;
  // Perform heavy computations here
  // For example, call the removeObject function
  const result = await removeObject(image, mask);
  self.postMessage(result);
};
