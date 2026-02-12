import { z } from "zod";

export const tbmEditableFieldsSchema = z.object({
  managementNumber: z.string().nullable(),
  serialNumber: z.string().nullable().optional(),
  assetCode: z.string().nullable().optional(),
  tbmTypeCode: z.string().refine(Boolean, { message: "请选择 TBM 类型" }),

  manufacturerSubjectId: z.string().refine(Boolean, { message: "请选择厂家" }),
  tbmCode: z.string(),
  tbmName: z.string(),
  tbmModel: z.string().nullable().optional(),

  mechSourceTypeCode: z.string().refine(Boolean, { message: "请选择设备来源" }),
  ownerSubjectId: z.string().refine(Boolean, { message: "请选择所有者" }),

  sortOrder: z.coerce.number().default(0),
  isDisabled: z.coerce.boolean().default(false),
  deleted: z.coerce.boolean().default(false),
});

export type TbmEditableFields = z.infer<typeof tbmEditableFieldsSchema>;
