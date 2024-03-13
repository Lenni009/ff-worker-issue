import type {
  WorkerErrorResponse,
  WorkerMessage,
  WorkerSuccessResponse,
} from "./types";

onmessage = async ({ data }: MessageEvent<WorkerMessage>) => {
  try {
    const workerResult = await compressFileWorker(data);
    const transferObject: WorkerSuccessResponse = {
      status: "success",
      data: workerResult,
    };
    postMessage(transferObject);
  } catch (error) {
	console.error(error)
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    const transferObject: WorkerErrorResponse = {
      status: "error",
      data: errorMessage,
    };
    postMessage(transferObject);
  } finally {
    close();
  }
};

async function compressFileWorker({ blob, config }: WorkerMessage) {
  const imageBitmap = await createImageBitmap(blob);

  const { width, height } = imageBitmap;

  // Create an OffscreenCanvas
  const offscreenCanvas = new OffscreenCanvas(width, height);
  const ctx = offscreenCanvas.getContext("bitmaprenderer");

  // Draw the ImageBitmap onto the OffscreenCanvas
  ctx?.transferFromImageBitmap(imageBitmap);

  const compressedBlob = await offscreenCanvas.convertToBlob(config);

  return compressedBlob;
}
