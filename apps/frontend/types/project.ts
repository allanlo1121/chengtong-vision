// types/project.ts
import { z } from "zod";

export const projectSchema = z.object({
  id: z.uuid(),

  name: z.string(),
  fullname: z.string().nullable(),
  code: z.string(),

  organizationId: z.uuid().nullable(),

  // ===== 主数据（使用 code，而不是 uuid）=====
  managementMode: z.string().nullable(),
  riskLevel: z.string().nullable(),
  projectType: z.string().nullable(),
  projectStatus: z.string().nullable(),
  attentionLevel: z.string().nullable(),
  controlLevel: z.string().nullable(),
  progressStatus: z.string().nullable(),

  // ===== 地理 =====
  country: z.string().nullable(),
  region: z.string().nullable(),
  province: z.string().nullable(),
  city: z.string().nullable(),
  district: z.string().nullable(),

  address: z.string().nullable(),
  longitude: z.number().nullable(),
  latitude: z.number().nullable(),

  // ===== 时间 =====
  planStartDate: z.string().nullable(),
  actualStartDate: z.string().nullable(),
  planEndDate: z.string().nullable(),
  actualEndDate: z.string().nullable(),
  commissioningDate: z.string().nullable(),

  // ===== 展示型字段（view 才有）=====
  tunnelCount: z.number().optional(),
  tbmCount: z.number().optional(),
});

export type Project = z.infer<typeof projectSchema>;
