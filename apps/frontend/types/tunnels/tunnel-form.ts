// types/project-form.ts
import { z } from "zod";

export const projectFormSchema = z.object({
  name: z.string().min(1, "项目名称不能为空"),
  fullname: z.string().nullable(),
  code: z.string().min(1),

  organizationId: z.uuid().nullable(),

  // ===== 主数据 code =====
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
});

export type ProjectForm = z.infer<typeof projectFormSchema>;
