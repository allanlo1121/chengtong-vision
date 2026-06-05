import { Database } from "@/lib/core/database/types";
import { Camelize } from "@/lib/shared/utils/case-converter";

export type TunnelListRow = Database["proj"]["Views"]["v_tunnel_list"]["Row"];

export type TunnelListItem = Camelize<TunnelListRow>;

export type TunnelDetailRow = Database["proj"]["Views"]["v_tunnel_detail"]["Row"];

export type TunnelDetail = Camelize<TunnelDetailRow>;

export type TunnelPickerRow = Database["proj"]["Views"]["v_tunnel_picker"]["Row"];
export type TunnelWorkspaceDetailRow =
  Database["proj"]["Views"]["v_tunnel_workspace_detail"]["Row"];

export type TunnelRow = Database["proj"]["Tables"]["tunnels"]["Row"];
export type TunnelInsertRow = Database["proj"]["Tables"]["tunnels"]["Insert"];
export type TunnelUpdateRow = Database["proj"]["Tables"]["tunnels"]["Update"];

export type Tunnel = Camelize<TunnelRow>;

export type TunnelStatusTimelineRow = Database["proj"]["Tables"]["tunnel_status_timeline"]["Row"];
export type TunnelStatusTimelineInsertRow =
  Database["proj"]["Tables"]["tunnel_status_timeline"]["Insert"];
export type TunnelStatusTimelineUpdateRow =
  Database["proj"]["Tables"]["tunnel_status_timeline"]["Update"];

export type TunnelStatusTimeline = Camelize<TunnelStatusTimelineRow>;

export type TunnelScheduleVersionRow =
  Database["proj"]["Tables"]["tunnel_schedule_versions"]["Row"];
export type TunnelScheduleVersionInsertRow =
  Database["proj"]["Tables"]["tunnel_schedule_versions"]["Insert"];
export type TunnelScheduleVersionUpdateRow =
  Database["proj"]["Tables"]["tunnel_schedule_versions"]["Update"];

export type TunnelScheduleVersion = Camelize<TunnelScheduleVersionRow>;
