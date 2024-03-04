import type { WorkerMessage, WorkerResponse } from "./types";
// @ts-ignore
import ImageWorker from "./worker?worker";

export async function handleWorkerProcess(workerMessage: WorkerMessage) {
  return new Promise<Blob>((resolve, reject) => {
    const worker = new ImageWorker();

    // Send the object URL to the worker
	console.warn("transferring!")
    worker.postMessage(workerMessage, [workerMessage.buffer]);

    worker.onmessage = ({ data }: MessageEvent<WorkerResponse>) => {
      if (data.status === "error") {
		console.error('Something went wrong!');
        reject(data.data); // Reject the promise if there's an error
      } else {
        const file = new Blob([data.data], {
          type: workerMessage.config.type,
        });
        resolve(file); // Resolve the promise with the data from the worker
      }
    };
  });
}