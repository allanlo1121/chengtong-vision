// parse-list-query.ts

// import type { BaseListQuery } from "../../crud/core/base-list-query.schema";
// import { ListQuerySchema } from "./list-query.schema";

// function normalizeSearchParams(params: Record<string, string | string[] | undefined>) {
//   if (!params || typeof params !== "object") {
//     return {};
//   }
//   const normalized: Record<string, string | undefined> = {};

//   for (const key in params) {
//     const value = params[key];
//     normalized[key] = Array.isArray(value) ? value[0] : value;
//   }

//   return normalized;
// }

// export function parseListQuery(
//   searchParams: Record<string, string | string[] | undefined>
// ): BaseListQuery {
//   return ListQuerySchema.parse(normalizeSearchParams(searchParams));
// }
