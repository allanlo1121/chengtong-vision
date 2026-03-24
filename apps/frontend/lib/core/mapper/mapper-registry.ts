import { TableName } from "../types/entity.types";
import { createMapper } from "./mapper-factory";
import { TableMapper } from "./table-mapper";

export const mapperRegistry = {
  organizations: createMapper({
    conflict: "code",
  }),

  countries: createMapper({
    conflict: "code",
  }),
  import_batches: createMapper(),
} as const satisfies {
  [K in TableName]?: TableMapper<K>;
};

export type MapperTable = keyof typeof mapperRegistry;
