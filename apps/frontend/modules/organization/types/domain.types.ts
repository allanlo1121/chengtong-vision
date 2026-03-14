import { Camelize } from "@/modules/shared/utils/case-converter";
import { OrganizationDetailRow } from "./db.types";

export type OrganizationDetail = Camelize<OrganizationDetailRow>;
