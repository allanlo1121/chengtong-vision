"use server";

import { insertEmployee } from "../repositories";
import { EmployeeInsertInput } from "../schemas";
import { WriterResult } from "@/modules/import/types";

export const employeeWriter = async (data: EmployeeInsertInput): Promise<WriterResult> => {
  try {
    const res = await insertEmployee(data);

    return {
      success: true,
      ...res, // { employee_id, action }
    };
  } catch (err) {
    console.error("Failed to upsert employee:", err);

    return {
      success: false,
      error: {
        message: err instanceof Error ? err.message : String(err),
        raw: data, // 很关键，方便 UI 展示
      },
    };
  }
};
