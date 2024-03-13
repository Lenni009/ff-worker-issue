(function() {
  "use strict";
  onmessage = async ({ data }) => {
    try {
      const workerResult = await compressFileWorker(data);
      const transferObject = {
        status: "success",
        data: workerResult
      };
      postMessage(transferObject);
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";
      const transferObject = {
        status: "error",
        data: errorMessage
      };
      postMessage(transferObject);
    } finally {
      close();
    }
  };
  async function compressFileWorker({ blob, config }) {
    const imageBitmap = await createImageBitmap(blob);
    const { width, height } = imageBitmap;
    const offscreenCanvas = new OffscreenCanvas(width, height);
    const ctx = offscreenCanvas.getContext("bitmaprenderer");
    ctx == null ? void 0 : ctx.transferFromImageBitmap(imageBitmap);
    const compressedBlob = await offscreenCanvas.convertToBlob(config);
    return compressedBlob;
  }
})();
