import { ImportConfig } from "@/modules/import/types";
import { OrganizationSchema } from "../schemas";

export const organizationImportConfig: ImportConfig = {
  entity: "organizations",

  schema: OrganizationSchema,

  fields: {
    org_id: "id",
    org_short: "name",
    org_code: "code",
    org_name: "fullName",

    org_parent_transName: "parentId",

    org_type: "orgTypeId",
    org_business: "businessId",

    org_country: "countryCode",
    org_province: "provinceCode",
    org_city: "cityCode",
    org_county: "districtCode",
  },

  lookups: {
    parentId: "organizations",
    orgTypeId: "masterDatas",
    businessId: "masterDatas",
  },
};
