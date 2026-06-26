// types/tbms/tbm-row.ts

import { z } from "zod";

export const tbmRowSchema = z.object({
  id: z.string(),

  managementNumber: z.string().optional(),

  serialNumber: z.preprocess((v) => (v === "" ? undefined : v), z.string().optional()),

  assetCode: z.preprocess((v) => (v === "" ? undefined : v), z.string().optional()),

  tbmTypeCode: z.string(),
  tbmModel: z.string().optional(),
  tbmCode: z.string(),
  tbmName: z.string(),

  manufacturerSubjectId: z.string(),

  sortOrder: z.coerce.number().default(0),
  isDisabled: z.coerce.boolean().default(false),
  deleted: z.coerce.boolean().default(false),
});

export type TbmRow = z.infer<typeof tbmRowSchema>;
