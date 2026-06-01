// export type EmployeeListItem = {
//   id: string;
//   name: string;
//   code: string | null;
//   organizationId: string | null;
//   organizationName: string | null;
//   statusName: string | null;

import { RemoveNull } from "@/lib/utils/remove-nullable";
import { TunnelInsertRow, TunnelListRow } from "./db.types";
import { Camelize } from "@/lib/utils/case-converter";

//   sortOrder: number;
//   createdAt: string;
// };

export type TunnelListItem = {
  id: string;
  name: string;
  fullName: string | null;
  organizationId: string | null;
  organizationName: string | null;
  projectId: string | null;
  projectName: string | null;
  prefix: string | null;
  startChainage: number | null;
  endChainage: number | null;
  startRing: number | null;
  endRing: number | null;
  actualStartDate: string | null;
  actualEndDate: string | null;
  geology: string | null;
  longitude: number | null;
  latitude: number | null;
  tunnelStatusId: string | null;
  tunnelStatusName: string | null;
  scheduleStartDate: string | null;
  scheduleEndDate: string | null;
  remark: string | null;
  sortOrder: number | null;
};

// export type TunnelInsertItem = Camelize<TunnelInsertRow>;
