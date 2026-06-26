// types/projects/project-row.ts
import { z } from "zod";

export const projectRowSchema = z.object({
  id: z.uuid(),

  name: z.string(),
  fullname: z.string().nullable(),
  code: z.string(),

  organizationId: z.uuid().nullable(),

  // ===== 主数据（FK → master_data.id）=====
  projectManagementModeId: z.uuid().nullable(),
  projectRiskLevelId: z.uuid().nullable(),
  projectTypeId: z.uuid().nullable(),
  projectStatusId: z.uuid().nullable(),
  projectAttentionLevelId: z.uuid().nullable(),
  projectControlLevelId: z.uuid().nullable(),
  progressStatusId: z.uuid().nullable(),
  subProjectTypeId: z.uuid().nullable(),
  subProjectAttentionLevelId: z.uuid().nullable(),

  // ===== 地理（FK→ master_data.id）=====
  countryId: z.uuid().nullable(),
  regionId: z.uuid().nullable(),
  provinceId: z.uuid().nullable(),
  cityId: z.uuid().nullable(),
  districtId: z.uuid().nullable(),

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
