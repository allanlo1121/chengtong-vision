// export type EmployeeListItem = {
//   id: string;
//   name: string;
//   code: string | null;
//   organizationId: string | null;
//   organizationName: string | null;
//   statusName: string | null;

import { RemoveNull } from "@/lib/utils/remove-nullable";
import { EmployeeListRow } from "./db.types";
import { Camelize } from "@/lib/utils/case-converter";

//   sortOrder: number;
//   createdAt: string;
// };

export type EmployeeListItem = Camelize<EmployeeListRow>;
