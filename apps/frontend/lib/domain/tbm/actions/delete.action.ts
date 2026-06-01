"use server";

import { ActionResult } from "@/lib/shared/contracts";
import { deleteTbm } from "../services";
import { Tbm } from "../types";

export async function deleteTbmAction(id: string): Promise<ActionResult<number>> {
  console.log("===deleteTbm===", id);

  try {
    const result = await deleteTbm(id);

    return {
      success: true,
      message: "删除成功",
      data: 1,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "删除失败",
    };
  }
}
