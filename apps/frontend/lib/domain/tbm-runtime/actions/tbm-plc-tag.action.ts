"use server";

import { ActionResult, toActionError } from "@/lib/shared/contracts/action-result";
import { deleteTbmPlcTag, importTbmPlcTags, updateTbmPlcTag } from "../services";
import {
  CreateTbmPlcTagInput,
  CreateTbmPlcTagSchema,
  ImportTbmPlcTagInput,
  ImportTbmPlcTagsSchema,
  UpdateTbmPlcTagInput,
  UpdateTbmPlcTagSchema,
} from "../schemas";

import { TbmPlcTag } from "../types";
import { createTbmPlcTag } from "../services/tbm-plc-tag.service";

export async function createTbmPlcTagAction(
  data: CreateTbmPlcTagInput
): Promise<ActionResult<TbmPlcTag>> {
  console.log("===createTbmPlcTagAction===", data);

  try {
    const parsed = CreateTbmPlcTagSchema.parse(data);

    const result = await createTbmPlcTag(parsed);

    return {
      success: true,
      data: result,
      message: "创建TBM PLC标签成功",
    };
  } catch (error) {
    console.error("Error creating TBM PLC tag:", error);
    return toActionError(error);
  }
}

export async function updateTbmPlcTagAction(
  data: UpdateTbmPlcTagInput
): Promise<ActionResult<TbmPlcTag>> {
  console.log("===updateTbmPlcTagAction===", data);

  try {
    const parsed = UpdateTbmPlcTagSchema.parse(data);

    const result = await updateTbmPlcTag(parsed);

    return {
      success: true,
      data: result,
      message: "更新TBM PLC标签成功",
    };
  } catch (error) {
    console.error("Error updating TBM PLC tag:", error);
    return toActionError(error);
  }
}

export async function importTbmPlcTagsAction(
  tbmId: string,
  rows: ImportTbmPlcTagInput[]
): Promise<ActionResult<{ count: number }>> {
  console.log("===importTbmlcTagsAction===", rows);
  try {
    const parsed = ImportTbmPlcTagsSchema.parse(rows);
    console.log("===parsed===", parsed);

    const count = await importTbmPlcTags(tbmId, parsed);

    return {
      success: true,
      data: { count },
      message: "导入TBM PLC标签成功",
    };
  } catch (error) {
    console.error("Error importing TBM PLC tags:", error);
    return toActionError(error);
  }
}

export async function deleteTbmPlcTagAction(id: number): Promise<ActionResult<void>> {
  console.log("===deleteTbmPlcTagAction===", id);

  try {
    const result = await deleteTbmPlcTag(id);

    return {
      success: true,
      data: undefined,
      message: "删除TBM PLC标签成功",
    };
  } catch (error) {
    console.error("Error deleting TBM PLC tag:", error);
    return toActionError(error);
  }
}
