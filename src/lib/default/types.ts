import { WorkerMessageConfig } from "../genericTypes";

export interface WorkerMessage {
  img: { width: number; height: number };
  blob: Blob;
  config: WorkerMessageConfig;
}

type Status = "success" | "error";
type WorkerData = Blob | string;

interface GenericWorkerResponse<T extends Status, U extends WorkerData> {
  status: T;
  data: U;
}

export type WorkerSuccessResponse = GenericWorkerResponse<"success", Blob>;
export type WorkerErrorResponse = GenericWorkerResponse<"error", string>;

export type WorkerResponse = WorkerSuccessResponse | WorkerErrorResponse;
