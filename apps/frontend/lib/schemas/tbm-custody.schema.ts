// schemas/tbm-custody.schema.ts

import { z } from "zod";

export const tbmCustodyFormSchema = z.object({
  tbmId: z.string().nullable(),

  custodianSubjectId: z.string().nullable(),
  effectiveFrom: z.string().nullable(),
  effectiveTo: z.string().nullable(),
  equipmentStatuses: z.string().nullable(),
});

export type TbmCustodyForm = z.infer<typeof tbmCustodyFormSchema>;
