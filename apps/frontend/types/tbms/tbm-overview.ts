// types/tunnel-overview.ts
import { z } from "zod";
import { tbmRowSchema } from "./tbm-row";

export const tbmOverviewSchema = tbmRowSchema.extend({
  manufacturerSubjectName: z.string().nullable(),
  tbmCode: z.string().nullable(),
  tbmName: z.string().nullable(),
  tbmTypeName: z.string().nullable(),
  equipmentStatusCode: z.string().nullable(),
  equipmentStatusName: z.string().nullable(),
  mechSourceTypeCode: z.string().nullable(),
  mechSourceTypeName: z.string().nullable(),
  ownerSubjectId: z.string().nullable(),
  ownerSubjectName: z.string().nullable(),
  custodianSubjectId: z.string().nullable(),
  custodianSubjectName: z.string().nullable(),
});

export type TbmOverview = z.infer<typeof tbmOverviewSchema>;
