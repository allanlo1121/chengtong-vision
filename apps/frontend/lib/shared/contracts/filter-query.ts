// filter-query.ts

export interface FilterCondition {
  field: string;
  operator: "eq" | "ilike" | "gt" | "lt" | "in";
  value: any;
}

export interface FilterQuery {
  filters?: FilterCondition[];
}
