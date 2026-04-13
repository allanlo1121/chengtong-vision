/// @description: 员工数据映射器

import { CreateOrganizationInput } from "../schemas";
import { OrganizationImportRow } from "../types";

export const organizationMapper = (row: OrganizationImportRow) =>
  ({
    name: row["org_short"],
    code: row["org_code"],
    fullName: row["org_name"],
    countryCode: row["org_country"],
    provinceCode: row["org_province"],
    cityCode: row["org_city"],
    districtCode: row["org_county"],
    sortOrder: row["org_number"] ? Number(row["org_number"]) : 0,
    externalId: row["org_id"],

    externalVersion: row["ctcemti_bltjzz_serial_version"]
      ? Number(row["ctcemti_bltjzz_serial_version"])
      : 0,
  }) satisfies Omit<
    CreateOrganizationInput,
    "orgTypeId" | "orgCategoryId" | "parentId" | "jobTitleId"
  >;
