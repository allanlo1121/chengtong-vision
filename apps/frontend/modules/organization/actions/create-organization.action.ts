"use server";

import { z } from "zod";
import { createOrganizationService } from "../services/create-organization.service";
import { CreateOrganizationSchema } from "../schemas";
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
  adminRegionCode?: string[];
  address?: string[];
  latitude?: string[];
  longitude?: string[];
  isActive?: string[];
}>;

export async function createOrganizationAction(formData: FormData) {
  console.log("SERVER ACTION RUNNING");
  console.log("create organization formData", formData);

  const parsed = CreateOrganizationSchema.safeParse({
    name: formData.get("name"),
    code: formData.get("code"),
    fullName: formData.get("fullName"),
    parentId: formData.get("parentId"),
    description: formData.get("description"),
    orgTypeId: formData.get("orgTypeId"),
    businessId: formData.get("businessId"),
    regionId: formData.get("regionId"),
    countryCode: formData.get("countryCode"),
    adminRegionCode: formData.get("adminRegionCode"),
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
    };
  }
  try {
    await createOrganizationService(parsed.data);
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message ?? "创建失败",
    };
  }
}
