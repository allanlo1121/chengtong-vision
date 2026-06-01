import { ServiceResult } from "@/lib/shared/contracts";

import { ParameterSubsystemNode } from "../types";
import { searchTbmSubsystems } from "../repositories";
import { mapSubsystemRowToNode } from "../mappers";

export async function listTbmSubsystems(): Promise<ServiceResult<ParameterSubsystemNode[]>> {
  try {
    const data = await searchTbmSubsystems();

    console.log("tbm subsystem list data:", data);

    return {
      success: true,
      data: data.map(mapSubsystemRowToNode),
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message ?? "查询失败",
    };
  }
}
