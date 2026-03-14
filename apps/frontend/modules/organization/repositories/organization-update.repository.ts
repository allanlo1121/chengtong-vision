import { createClient } from "@/lib/core/supabase/server";
import { UpdateOrganizationInput } from "../schemas";

import { removeUndefined } from "@/modules/shared/utils/remove-undefined";

export async function updateOrganization(input: UpdateOrganizationInput) {
  const supabase = await createClient();

  const updateData = removeUndefined({
    parent_id: input.parentId ?? null,
    code: input.code,
    name: input.name,
    full_name: input.fullName,
    description: input.description,

    org_type_id: input.orgTypeId,
    business_id: input.businessId,
    region_id: input.regionId,

    country_code: input.countryCode,
    province_code: input.provinceCode,
    city_code: input.cityCode,
    district_code: input.districtCode,

    address: input.address,

    latitude: input.latitude,
    longitude: input.longitude,
    is_active: input.isActive,
  });

  const { error } = await supabase.from("organizations").update(updateData).eq("id", input.id);

  if (error) {
    throw new Error(error.message);
  }
}
