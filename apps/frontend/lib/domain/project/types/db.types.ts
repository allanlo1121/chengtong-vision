import { RemoveNull } from "@/lib/utils/remove-nullable";
import { Database } from "@/lib/core/types/database";
import { Camelize } from "@/lib/shared/utils/case-converter";

export type ProjectDetailRow = Database["public"]["Views"]["v_project_full"]["Row"];

// export type ProjectDetailRow = RemoveNull<RawProjectDetailRow> & {
//   full_name: string | null;
//   parent_org_name: string | null;

//   province_name: string | null;
//   city_name: string | null;
//   district_name: string | null;
//   address: string | null;

//   org_type_name: string | null;
//   business_name: string | null;
//   country_name: string | null;
// };

export type ProjectListRow = Database["public"]["Views"]["v_project_list"]["Row"];

// export type ProjectListRow = RemoveNull<RawProjectListRow> & {
//   fullname: string | null;
//   employment_status_name: string | null;
// };

// export type ProjectListRow = {
//     business_name: string | null;
//     city_name: string | null;
//     country_name: string | null;
//     created_at: string | null;
//     district_name: string | null;
//     id: string;
//     is_active: boolean | null;
//     level: number | null;
//     name: string | null;
//     org_type_name: string | null;
//     parent_id: string | null;
//     parent_org_name: string | null;
//     province_name: string | null;
//     sort_order: number | null;
// }

// export type RawOrganizationTreeRow = Database["public"]["Views"]["v_organizations_tree"]["Row"];

// export type OrganizationTreeRow = RemoveNull<RawOrganizationTreeRow> & {
//   parent_id: string | null;
// };

export type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
export type ProjectInsertRow = Database["public"]["Tables"]["projects"]["Insert"];
export type ProjectUpdateRow = Database["public"]["Tables"]["projects"]["Update"];

export type Project = Camelize<ProjectRow>;

export type ProjectStatusTimelineRow =
  Database["public"]["Tables"]["project_status_timeline"]["Row"];
export type ProjectStatusTimelineInsertRow =
  Database["public"]["Tables"]["project_status_timeline"]["Insert"];
export type ProjectStatusTimelineUpdateRow =
  Database["public"]["Tables"]["project_status_timeline"]["Update"];

export type ProjectStatusTimeline = Camelize<ProjectStatusTimelineRow>;

export type ProjectRiskLevelTimelineRow =
  Database["public"]["Tables"]["project_risk_level_timeline"]["Row"];
export type ProjectRiskLevelTimelineInsertRow =
  Database["public"]["Tables"]["project_risk_level_timeline"]["Insert"];
export type ProjectRiskLevelTimelineUpdateRow =
  Database["public"]["Tables"]["project_risk_level_timeline"]["Update"];

export type ProjectRiskLevelTimeline = Camelize<ProjectRiskLevelTimelineRow>;

export type ProjectControlLevelTimelineRow =
  Database["public"]["Tables"]["project_control_level_timeline"]["Row"];
export type ProjectControlLevelTimelineInsertRow =
  Database["public"]["Tables"]["project_control_level_timeline"]["Insert"];
export type ProjectControlLevelTimelineUpdateRow =
  Database["public"]["Tables"]["project_control_level_timeline"]["Update"];

export type ProjectControlLevelTimeline = Camelize<ProjectControlLevelTimelineRow>;

export type ProjectAttentionLevelTimelineRow =
  Database["public"]["Tables"]["project_attention_level_timeline"]["Row"];
export type ProjectAttentionLevelTimelineInsertRow =
  Database["public"]["Tables"]["project_attention_level_timeline"]["Insert"];
export type ProjectAttentionLevelTimelineUpdateRow =
  Database["public"]["Tables"]["project_attention_level_timeline"]["Update"];

export type ProjectAttentionLevelTimeline = Camelize<ProjectAttentionLevelTimelineRow>;

export type ProjectAttentionTypeTimelineRow =
  Database["public"]["Tables"]["project_attention_type_timeline"]["Row"];
export type ProjectAttentionTypeTimelineInsertRow =
  Database["public"]["Tables"]["project_attention_type_timeline"]["Insert"];
export type ProjectAttentionTypeTimelineUpdateRow =
  Database["public"]["Tables"]["project_attention_type_timeline"]["Update"];

export type ProjectAttentionTypeTimeline = Camelize<ProjectAttentionTypeTimelineRow>;

export type ProjectLeaderTimelineRow =
  Database["public"]["Tables"]["project_leader_timeline"]["Row"];
export type ProjectLeaderTimelineInsertRow =
  Database["public"]["Tables"]["project_leader_timeline"]["Insert"];
export type ProjectLeaderTimelineUpdateRow =
  Database["public"]["Tables"]["project_leader_timeline"]["Update"];

export type ProjectLeaderTimeline = Camelize<ProjectLeaderTimelineRow>;

export type ProjectContractRow = Database["public"]["Tables"]["project_contracts"]["Row"];
export type ProjectContractInsertRow = Database["public"]["Tables"]["project_contracts"]["Insert"];
export type ProjectContractUpdateRow = Database["public"]["Tables"]["project_contracts"]["Update"];

export type ProjectContract = Camelize<ProjectContractRow>;

export type ProjectContractVersionRow =
  Database["public"]["Tables"]["project_contract_versions"]["Row"];
export type ProjectContractVersionInsertRow =
  Database["public"]["Tables"]["project_contract_versions"]["Insert"];
export type ProjectContractVersionUpdateRow =
  Database["public"]["Tables"]["project_contract_versions"]["Update"];

export type ProjectContractVersion = Camelize<ProjectContractVersionRow>;

export type ProjectScheduleVersionRow =
  Database["public"]["Tables"]["project_schedule_versions"]["Row"];
export type ProjectScheduleVersionInsertRow =
  Database["public"]["Tables"]["project_schedule_versions"]["Insert"];
export type ProjectScheduleVersionUpdateRow =
  Database["public"]["Tables"]["project_schedule_versions"]["Update"];

export type ProjectScheduleVersion = Camelize<ProjectScheduleVersionRow>;
