"use server";

import { z } from "zod";
import { updateOrganizationService } from "../services/update-organization.service";
import { UpdateOrganizationSchema } from "../schemas";
import { ActionState } from "@/modules/shared/types/action-state";

export type OrganizationFormState = ActionState<{
  name?: string[];
  code?: string[];
  fullName?: string[];
  parentId?: string[];
  description?: string[];
  orgTypeId?: string[];
  businessId?: string[];
  regionId?: string[];
  countryCode?: string[];
  provinceCode?: string[];
  cityCode?: string[];
  districtCode?: string[];
  address?: string[];
  latitude?: string[];
  longitude?: string[];
  isActive?: string[];
}>;

export async function updateOrganizationAction(formData: FormData) {
  console.log("SERVER ACTION RUNNING");
  console.log("update organization formData", formData);

  const parsed = UpdateOrganizationSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    code: formData.get("code"),
    fullName: formData.get("fullName"),
    parentId: formData.get("parentId"),
    description: formData.get("description"),
    orgTypeId: formData.get("orgTypeId"),
    businessId: formData.get("businessId"),
    regionId: formData.get("regionId"),
    countryCode: formData.get("countryCode"),
    provinceCode: formData.get("provinceCode"),
    cityCode: formData.get("cityCode"),
    districtCode: formData.get("districtCode"),
    address: formData.get("address"),
    latitude: formData.get("latitude") ? Number(formData.get("latitude")) : undefined,
    longitude: formData.get("longitude") ? Number(formData.get("longitude")) : undefined,
    isActive: formData.get("isActive") === "true",
  });

  console.log("parsed", parsed);

  if (!parsed.success) {
    return {
      success: false,
      errors: z.flattenError(parsed.error).fieldErrors,
      message: "表单校验失败",
    };
  }
  const result = await updateOrganizationService(parsed.data);

  return result;
}
