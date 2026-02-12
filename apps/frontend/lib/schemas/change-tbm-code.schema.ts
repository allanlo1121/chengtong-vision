// lib/schemas/change-tbm-code.schema.ts
import { z } from "zod";

export const changeTbmCodeSchema = z.object({
  tbmId: z.string(),

  newTbmCode: z.string().min(1, "TBM 编号不能为空"),
  newTbmName: z.string().min(1, "TBM 名称不能为空"),

  change_reason: z.string().min(1, "请填写变更原因"),
});
