import { ImportConfig } from "@/modules/import/types";
import { OrganizationSchema } from "../../schemas";

export const organizationImportConfig: ImportConfig<"organizations"> = {
  entity: "organizations",

  schema: OrganizationSchema,

  fields: {
    org_short: "name",
    org_code: "code",
    org_name: "fullName",
    org_parent: "parentId",
    org_type: "orgTypeId",
    org_business: "businessId",

    org_country: "countryCode",
    org_province: "provinceCode",
    org_city: "cityCode",
    org_county: "districtCode",
    org_number: "sortOrder",

    org_id: "externalId",
    ctcemti_bltjzz_serial_version: "externalVersion",
  },

  lookups: {
    parentId: "parentOrganizations",
    orgTypeId: "masterDatas",
    businessId: "masterDatas",
  },
};

// export const organizationImportConfig: ImportConfig<"organizations"> = {
//     entity: "organizations",

//     schema: OrganizationSchema,

//     fields: {
//         org_short: "name",
//         org_code: "code",
//         org_name: "fullName",
//         org_type: "orgTypeId",
//         org_business: "businessId",

//         org_country: "countryCode",
//         org_province: "provinceCode",
//         org_city: "cityCode",
//         org_county: "districtCode",
//         org_number: "sortOrder",
//     },

//     lookups: {
//         parentId: "organizations",
//         orgTypeId: "masterDatas",
//         businessId: "masterDatas",
//     },

//     extraFields: {

//         parentId: (_, mapped, lookupMap) => {
//             const code = mapped.code
//             if (!code) return null
//             const parentCode = code.split("-").slice(0, -1).join("-")
//             return lookupMap?.get(parentCode) ?? null
//         }

//     },
// };
