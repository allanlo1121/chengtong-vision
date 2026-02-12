"use server";

import { tbmUpdateSchema } from "@frontend/lib/schemas/tbm.schema";
import { updateTbm } from "@frontend/lib/repositories/tbm.repository";
import { insertInitialTbmCodeHistory } from "@frontend/lib/repositories/tbm-code-history.reository";
import { createUpdateAction } from "@frontend/lib/actions/createUpdateAction";

/**
 * Update TBM Action
 * - Zod 校验
 * - DB unique / FK 自动映射为字段错误
 * - UI 直接消费 state.errors
 */
export const updateTbmAction = createUpdateAction(
  tbmUpdateSchema,
  {
    getId: (formData) => formData.get("id") as string | null,
    invalidMessage: "缺少或非法字段",
    missingIdMessage: "缺少 TBM ID",
    dbErrorMap: {
      unique: {
        tbm_code_unique: {
          field: "tbmCode",
          message: "TBM 编号已存在",
        },
      },
      foreignKey: {
        tbm_type_code_fkey: {
          field: "tbmTypeCode",
          message: "无效的 TBM 类型",
        },
        manufacturer_subject_id_fkey: {
          field: "manufacturerSubjectId",
          message: "厂家不存在",
        },
      },
    },
  },
  async ({ id, data }) => {
    await updateTbm(id, data);

    return {
      tbmId: id,
      message: "TBM 更新成功",
    };
  }
);
