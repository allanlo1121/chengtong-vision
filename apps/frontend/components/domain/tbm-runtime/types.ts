export interface RuntimeSeriesPoint {
  ts: string;
  ring: number | null;
  value: number | null;
}

export type RingArea = {
  ring: number;
  x1: string;
  x2: string;
};
