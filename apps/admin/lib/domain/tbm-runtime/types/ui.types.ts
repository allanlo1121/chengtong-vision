import { WorkPhaseType } from "./realdata.types";

export type RuntimeWorkMode = "all" | "advance" | "assembly" | "shutdown";

export interface WorkPhaseSegment {
  id: string;
  type: WorkPhaseType;
  start: string;
  end: string;
}

export interface RuntimeSeriesValue {
  ts: string;
  ring: number | null;
  values: Record<string, number | null>;
}

export interface RingSegment {
  id: string | number;
  ringNo: number | string;
  start: string | Date;
  end: string | Date;
}

export type PhaseDuration = {
  phase: WorkPhaseType;
  seconds: number;
};

export type RuntimeQueryMode = "time" | "ring";

export type RuntimeSeriesQueryParams =
  | {
      mode: "ring";
      tbmId: string;
      from: number; // fromRing
      to: number; // toRing
      fields: string[];
      workMode?: RuntimeWorkMode;
    }
  | {
      mode: "time";
      tbmId: string;
      from: string; // ISO 或 'yyyy-MM-dd' 字符串
      to: string;
      fields: string[];
      workMode?: RuntimeWorkMode;
    };

export type RuntimeQueryDraft = {
  mode: RuntimeQueryMode;
  from: string | number; // 根据 mode 不同，可能是时间字符串或环号
  to: string | number;
  workMode?: RuntimeWorkMode;
};
