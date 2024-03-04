import { WorkerMessageConfig } from "../genericTypes";

export interface WorkerMessage {
  img: { width: number; height: number };
  buffer: ArrayBuffer;
  config: WorkerMessageConfig;
}

type Status = "success" | "error";
type WorkerData = ArrayBuffer | string;

interface GenericWorkerResponse<T extends Status, U extends WorkerData> {
  status: T;
  data: U;
}

export type WorkerSuccessResponse = GenericWorkerResponse<"success", ArrayBuffer>;
export type WorkerErrorResponse = GenericWorkerResponse<"error", string>;

export type WorkerResponse = WorkerSuccessResponse | WorkerErrorResponse;
