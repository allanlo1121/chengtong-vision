// types/project-overview.ts
import { z } from "zod";
import { projectRowSchema } from "./project-row";

export const projectOverviewSchema = projectRowSchema.extend({
  // ===== 主数据 name（view 才有）=====
  organizationName: z.string().nullable(),
  projectManagementModeName: z.string().nullable(),
  projectRiskLevelName: z.string().nullable(),
  projectTypeName: z.string().nullable(),
  projectStatusName: z.string().default("未开工"),
  projectAttentionLevelName: z.string().nullable(),
  projectControlLevelName: z.string().nullable(),
  progressStatusName: z.string().nullable(),
  subProjectTypeName: z.string().nullable(),
  subProjectAttentionLevelName: z.string().nullable(),
  countryName: z.string().nullable(),
  regionName: z.string().nullable(),
  provinceName: z.string().nullable(),
  cityName: z.string().nullable(),
  districtName: z.string().nullable(),
  projectLeaderName: z.string().nullable(),
  partyLeaderName: z.string().nullable(),
  techLeaderName: z.string().nullable(),
  safetyLeaderName: z.string().nullable(),

  // ===== 统计字段 =====
  tunnelCount: z.number().optional(),
  tbmCount: z.number().optional(),
});

export type ProjectOverview = z.infer<typeof projectOverviewSchema>;
