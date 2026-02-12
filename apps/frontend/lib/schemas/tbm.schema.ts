// types/project-form.ts
import { mechSourceTypes } from "@frontend/components/tbmConnectivitys/data/data";
import { z } from "zod";

export const tbmFormSchema = z.object({
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

export type TbmForm = z.infer<typeof tbmFormSchema>;

// export const tbmOverviewSchema = tbmRowSchema.extend({

//   manufacturerSubjectName: z.string().nullable(),
//   tbmCode: z.string(),
//   tbmName: z.string(),
//   tbmTypeName: z.string().nullable(),
//   equipmentStatusCode: z.string().nullable(),
//   equipmentStatusName: z.string().nullable(),
//   mechSourceTypeCode: z.string().nullable(),
//   mechSourceTypeName: z.string().nullable(),
//   ownerSubjectId: z.string().nullable(),
//   ownerSubjectName: z.string().nullable(),
//   custodianSubjectId: z.string().nullable(),
//   custodianSubjectName: z.string().nullable(),

// });

// export type TbmOverview = z.infer<typeof tbmOverviewSchema>;

import { tbmEditableFieldsSchema } from "./tbm.fields";

export const tbmCreateSchema = tbmEditableFieldsSchema;

export type TbmCreateInput = z.infer<typeof tbmCreateSchema>;

export const tbmUpdateSchema = tbmEditableFieldsSchema.pick({
  managementNumber: true,
  serialNumber: true,
  assetCode: true,
  tbmTypeCode: true,
  tbmCode: true,
  tbmName: true,

  manufacturerSubjectId: true,
  mechSourceTypeCode: true,
  ownerSubjectId: true,
  sortOrder: true,
  isDisabled: true,
  deleted: true,
});

export type TbmUpdateInput = z.infer<typeof tbmUpdateSchema>;

export const tbmChangeCodeSchema = z.object({
  tbmCode: z.string().min(1, "请输入 TBM 新编号").max(50),

  tbmName: z.string().min(1, "请输入 TBM 新名称").max(100),

  effectiveFrom: z.coerce.date().refine((date) => date instanceof Date, {
    message: "请输入生效时间",
  }),

  reason: z.string().max(200).optional(),
});

export type TbmChangeCodeInput = z.infer<typeof tbmChangeCodeSchema>;
