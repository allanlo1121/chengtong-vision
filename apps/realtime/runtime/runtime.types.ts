export interface TbmRuntimeData {
  tbmCode: string;

  recordedAt: number;

  values: Record<string, number | boolean | string | null>;
}

export type TbmRuntimeContext = {
  tbmId: string;
  tbmCode: string;
  tunnelId: string | null;
  assignmentId: string | null;
};
