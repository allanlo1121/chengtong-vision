import { toSelectOptions } from "../mappers/option.mapper";
import { findCustomers, findMasterOptions } from "../repositories/server";
import { SelectOption } from "../types";

export async function getMasterSelectOptions(definitionCode: string): Promise<SelectOption[]> {
  const options = await findMasterOptions(definitionCode);

  return toSelectOptions(options);
}

export async function getCustomerSelectOptions(categoryCode: string): Promise<SelectOption[]> {
  const options = await findCustomers(categoryCode);

  return toSelectOptions(options);
}
