// types/project-form.ts
import { z } from "zod";

export const tbmFormSchema = z.object({
  managerNumber: z.string().nullable(),
  tbmTypeCode: z.string().nullable(),

  manufacturerSubjectId: z.string().nullable(),
  tbmCode: z.string().nullable(),
  tbmName: z.string().nullable(),
  tbmModel: z.string().nullable(),

  sortOrder: z.number().nullable(),
  isDisabled: z.boolean().nullable(),
  deleted: z.boolean().nullable(),
});

export type TbmForm = z.infer<typeof tbmFormSchema>;
