import {
  adminRegionCodeSchema,
  countryCodeSchema,
  idSchema,
  latitudeSchema,
  longitudeSchema,
  optionalFields,
} from "../shared/schema";
import { z } from "zod";

/**
 * 基础字段规则
 */
export const organizationFields = {
  name: z
    .string()
    .min(2, { message: "组织名称至少2个字符" })
    .max(50, { message: "组织名称最多50个字符" }),

  code: z
    .string()
    .regex(/^[A-Z0-9_]+$/, { message: "编码只能包含大写字母、数字和下划线" })
    .optional(),

  fullName: z.string().max(100, { message: "组织全称最多100个字符" }).optional(),

  description: z.string().max(200, { message: "描述最多200个字符" }).optional(),

  parentId: idSchema.nullable().optional(),

  orgTypeId: idSchema,

  businessId: idSchema.optional(),

  regionId: idSchema,

  countryCode: countryCodeSchema,

  adminRegionCode: adminRegionCodeSchema.optional(),

  address: z.string().max(200, { message: "地址最多200个字符" }).optional(),

  latitude: latitudeSchema.optional(),

  longitude: longitudeSchema.optional(),
};

export const createOrganizationSchema = z.object({ ...organizationFields });

export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>;

export const updateSchema = z.object({
  id: idSchema,
  ...optionalFields(organizationFields),
});
