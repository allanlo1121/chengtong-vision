import { z } from "zod";
import { CreateOrganizationInput, OrganizationSchema } from "@/modules/organization/schemas";

export interface IdNameRef {
  id: string;
  name: string;
}

export interface CodeNameRef {
  code: string;
  name: string;
}

export interface MasterRef {
  id: string;
  code: string;
  name: string;
}

export type ActionResult<T> = { success: true; data: T } | { success: false; error: string };

// export type TableRowMap = {
//   organizations: CreateOrganizationInput

// }

export const TableSchemaMap = {
  organizations: OrganizationSchema,
} as const;

export type SchemaRowType<T extends TableSchemaName> = z.infer<(typeof TableSchemaMap)[T]>;

export type TableSchemaName = keyof typeof TableSchemaMap;
