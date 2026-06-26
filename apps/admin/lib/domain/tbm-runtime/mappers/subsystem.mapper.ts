import { ParameterSubsystemNode, ParameterSubsystemRow } from "../types";

export function mapSubsystemRowToNode(row: ParameterSubsystemRow): ParameterSubsystemNode {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    sortOrder: row.sort_order,
    parameterCount: row.parameter_count,
  };
}
