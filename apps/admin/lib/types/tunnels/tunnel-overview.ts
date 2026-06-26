// types/tunnel-overview.ts
import { z } from "zod";

export const tunnelOverviewSchema = z.object({
  id: z.string(),
  name: z.string(),
  regionName: z.string().nullable(), // text
  projectName: z.string(), // text NOT NULL
  workPointName: z.string().nullable(), // text
  workPointFullName: z.string().nullable(), // text
  status: z.string().default("未开工"), // text NOT NULL
  tunnelLength: z.number().nullable(), // numeric(10,3)
  segmentCount: z.number().nullable(), // integer
  tbmName: z.string().nullable(), // text
});

export type TunnelOverview = z.infer<typeof tunnelOverviewSchema>;
