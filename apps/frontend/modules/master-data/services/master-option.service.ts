import { PaginatedResult } from "@/lib/shared/contracts/paginated-result";
import { MasterOptionItem } from "../types";
import { ActionResult } from "@/lib/shared/contracts/action-result";
import { findMasterOptionsByDefinitionCode } from "../repositories/master-data.repository";
import { mapMasterOptionRowToItem } from "../mapper/master-option.mapper";

export async function getMasterOptions(
  definitionCode: string
): Promise<ActionResult<MasterOptionItem[]>> {
  try {
    const rows = await findMasterOptionsByDefinitionCode(definitionCode);

    return {
      success: true,
      data: rows.map(mapMasterOptionRowToItem),
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: (error as Error)?.message ?? "查询失败",
    };
  }
}
