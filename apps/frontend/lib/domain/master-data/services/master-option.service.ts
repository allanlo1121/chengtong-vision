import { MasterOption } from "../types";

import { findMasterOptionsByDefinitionCode } from "../repositories/master-data.repository";

export async function getMasterOptions(definitionCode: string): Promise<MasterOption[]> {
  return await findMasterOptionsByDefinitionCode(definitionCode);
}
