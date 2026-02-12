"use server";

import { tbmCreateSchema } from "@frontend/lib/schemas/tbm.schema";
import { insertTbm } from "@frontend/lib/repositories/tbm.repository";
import { createAction } from "@frontend/lib/actions/createAction";
import { insertInitialTbmCodeHistory } from "@frontend/lib/repositories/tbm-code-history.reository";

/**
 * Create TBM Action
 * - Zod 校验
 * - DB unique / FK 自动映射为字段错误
 * - UI 直接消费 state.errors
 */
export const createTbmAction = createAction(
  tbmCreateSchema,
  async ({ data }) => {
    const tbmId = await insertTbm(data);

    await insertInitialTbmCodeHistory({
      tbmId,
      tbmCode: data.tbmCode,
      tbmName: data.tbmName,
    });

    return {
      tbmId,
      message: "TBM created successfully",
    };
  },
  {
    invalidMessage: "Missing required fields",
    dbErrorMap: {
      unique: {
        // 唯一约束：tbm_code
        tbm_code_unique: {
          field: "tbmCode",
          message: "TBM 编号已存在",
        },
      },
      foreignKey: {
        // 外键：tbm_type_code
        tbm_type_code_fkey: {
          field: "tbmTypeCode",
          message: "无效的 TBM 类型",
        },
        // 如果有厂家外键，也可以直接加
        manufacturer_subject_id_fkey: {
          field: "manufacturerSubjectId",
          message: "厂家不存在",
        },
      },
    },
  }
);
