import { createClient } from "@/lib/core/supabase/server";
import { CreateOrganizationInput } from "../schemas";

export async function insertOrganization(input: CreateOrganizationInput) {
  const supabase = await createClient();

  const { error } = await supabase.from("organizations").insert({
    parent_id: input.parentId ?? null,
    name: input.name,
    fullname: input.fullName,
    description: input.description,

    org_type_id: input.orgTypeId,
    business_id: input.businessId,
    region_id: input.regionId,

    country_code: input.countryCode,
    admin_region_code: input.adminRegionCode,

    address: input.address,

    latitude: input.latitude,
    longitude: input.longitude,
    is_active: input.isActive,
  });

  if (error) {
    throw new Error(error.message);
  }
}
