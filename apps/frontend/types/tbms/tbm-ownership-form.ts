// types/project-form.ts

import { z } from "zod";

export const tbmOwnershipFormSchema = z.object({
  tbmId: z.string().nullable(),

  ownerSubjectId: z.string().nullable(),
  validFrom: z.string().nullable(),
  validTo: z.string().nullable(),

  mechSourceTypeCode: z.string().nullable(),

  createdAt: z.string().nullable(),
});

export type TbmOwnershipForm = z.infer<typeof tbmOwnershipFormSchema>;
