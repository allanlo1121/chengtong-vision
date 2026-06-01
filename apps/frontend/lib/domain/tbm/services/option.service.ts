import {
  getCustomerSelectOptions,
  getMasterSelectOptions,
} from "@/lib/shared/options/services/server";
import {
  findManufacturerCounts,
  findTbmTypeCounts,
} from "@/lib/domain/tbm/repositories/count.repository";
import { mergeOptionCounts } from "@/lib/shared/options/utils/merge-option-counts";
import { SelectOption } from "@/lib/shared/options/types";

export async function getTbmTypeOptions(): Promise<SelectOption[]> {
  const [options, counts] = await Promise.all([
    getMasterSelectOptions("TBM_TYPE"),
    findTbmTypeCounts(),
  ]);

  return mergeOptionCounts(
    options,
    counts.map((row) => ({
      id: row.id,
      count: row.count,
    }))
  );
}

export async function getTbmManufacturerOptions(): Promise<SelectOption[]> {
  const [options, counts] = await Promise.all([
    getCustomerSelectOptions("10500009"),
    findManufacturerCounts(),
  ]);

  return mergeOptionCounts(
    options,
    counts.map((row) => ({
      id: row.id,
      count: row.count,
    }))
  );
}
