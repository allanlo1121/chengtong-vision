import { MapperOptions } from "./base-mapper";
import { TableMapper } from "./table-mapper";
import { TableName } from "../types/entity.types";

type MapperRegistry = {
  base?: MapperOptions;
  table?: TableMapper<any>;
};

const registry = new Map<TableName, MapperRegistry>();

export function registerMapper<T extends TableName>(
  table: T,
  config: {
    base?: MapperOptions;
    table?: TableMapper<T>;
  }
) {
  registry.set(table, config);
}

export function getMapper<T extends TableName>(table: T) {
  return registry.get(table) as {
    base?: MapperOptions;
    table?: TableMapper<T>;
  };
}
