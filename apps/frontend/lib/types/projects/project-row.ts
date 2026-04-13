// types/projects/project-row.ts
import { z } from "zod";

export const projectRowSchema = z.object({
  id: z.uuid(),

  name: z.string(),
  fullname: z.string().nullable(),
  code: z.string(),

  organizationId: z.uuid().nullable(),

  // ===== 主数据（FK → master_data.id）=====
  projectManagementModeCode: z.uuid().nullable(),
  projectRiskLevelCode: z.uuid().nullable(),
  projectTypeCode: z.uuid().nullable(),
  projectStatusCode: z.uuid().nullable(),
  projectAttentionLevelCode: z.uuid().nullable(),
  projectControlLevelCode: z.uuid().nullable(),
  progressStatusCode: z.uuid().nullable(),
  subProjectTypeCode: z.uuid().nullable(),
  subProjectAttentionLevelCode: z.uuid().nullable(),

  // ===== 地理（FK→ master_data.id）=====
  countryCode: z.uuid().nullable(),
  regionCode: z.uuid().nullable(),
  provinceCode: z.uuid().nullable(),
  cityCode: z.uuid().nullable(),
  districtCode: z.uuid().nullable(),

  address: z.string().nullable(),
  longitude: z.number().nullable(),
  latitude: z.number().nullable(),

  // ===== 时间 =====
  planStartDate: z.string().nullable(),
  actualStartDate: z.string().nullable(),
  planEndDate: z.string().nullable(),
  actualEndDate: z.string().nullable(),
  commissioningDate: z.string().nullable(),
});

export type ProjectRow = z.infer<typeof projectRowSchema>;
