export type ImportBatch = {
  id: string;
  entity_type: string;
  total: number;
  success: number;
  failed: number;
  status: "running" | "done" | "failed";
};
