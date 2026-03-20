import { TableName } from "../types/entity.types";
import { TableMapper } from "./table-mapper";

export const mapperRegistry = {
  organizations: {
    conflict: "code",
    toInsert: (input) => ({
      code: input.code!,
      name: input.name,
      full_name: input.fullName ?? null,
      parent_id: input.parentId ?? null,
      org_type_id: input.orgTypeId,
      business_id: input.businessId,
      country_code: input.countryCode ?? "CN",
      province_code: input.provinceCode ?? null,
      city_code: input.cityCode ?? null,
      district_code: input.districtCode ?? null,
      address: input.address ?? null,
      latitude: input.latitude ?? null,
      longitude: input.longitude ?? null,
      node_key: input.nodeKey ?? null,
      path: input.path ?? null,
      is_active: input.isActive ?? true,
      sort_order: input.sortOrder ?? 0,
    }),
  },

  countries: {
    conflict: "code",
    toInsert: (input) => ({
      code: input.code!,
      name: input.name,
    }),
  },
} as const satisfies {
  [K in TableName]?: TableMapper<K>;
};
