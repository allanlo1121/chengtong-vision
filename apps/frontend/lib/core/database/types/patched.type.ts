import type { Database as GeneratedDatabase } from "./database";

type PatchedOrganizationsInsert = Omit<
  GeneratedDatabase["hr"]["Tables"]["organizations"]["Insert"],
  "node_key" | "path"
> & {
  node_key?: string;
  path?: string;
};

export type AppDatabase = Omit<GeneratedDatabase, "hr"> & {
  hr: Omit<GeneratedDatabase["hr"], "Tables"> & {
    Tables: Omit<GeneratedDatabase["hr"]["Tables"], "organizations"> & {
      organizations: Omit<GeneratedDatabase["hr"]["Tables"]["organizations"], "Insert"> & {
        Insert: PatchedOrganizationsInsert;
      };
    };
  };
};
