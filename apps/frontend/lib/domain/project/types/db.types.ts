import { Database } from "@/lib/core/database/types";
import { Camelize } from "@/lib/shared/utils/case-converter";

export type ProjectDetailRow = Database["proj"]["Views"]["v_project_detail"]["Row"];

export type ProjectDetail = Camelize<ProjectDetailRow>;

export type ProjectListRow = Database["proj"]["Views"]["v_project_list"]["Row"];

export type ProjectPickerRow = Database["proj"]["Views"]["v_project_picker"]["Row"];

export type ProjectRow = Database["proj"]["Tables"]["projects"]["Row"];
export type ProjectInsertRow = Database["proj"]["Tables"]["projects"]["Insert"];
export type ProjectUpdateRow = Database["proj"]["Tables"]["projects"]["Update"];

export type Project = Camelize<ProjectRow>;

export type ProjectStatusTimelineRow = Database["proj"]["Tables"]["project_status_timeline"]["Row"];
export type ProjectStatusTimelineInsertRow =
  Database["proj"]["Tables"]["project_status_timeline"]["Insert"];
export type ProjectStatusTimelineUpdateRow =
  Database["proj"]["Tables"]["project_status_timeline"]["Update"];

export type ProjectStatusTimeline = Camelize<ProjectStatusTimelineRow>;

export type ProjectRiskLevelTimelineRow =
  Database["proj"]["Tables"]["project_risk_level_timeline"]["Row"];
export type ProjectRiskLevelTimelineInsertRow =
  Database["proj"]["Tables"]["project_risk_level_timeline"]["Insert"];
export type ProjectRiskLevelTimelineUpdateRow =
  Database["proj"]["Tables"]["project_risk_level_timeline"]["Update"];

export type ProjectRiskLevelTimeline = Camelize<ProjectRiskLevelTimelineRow>;

export type ProjectControlLevelTimelineRow =
  Database["proj"]["Tables"]["project_control_level_timeline"]["Row"];
export type ProjectControlLevelTimelineInsertRow =
  Database["proj"]["Tables"]["project_control_level_timeline"]["Insert"];
export type ProjectControlLevelTimelineUpdateRow =
  Database["proj"]["Tables"]["project_control_level_timeline"]["Update"];

export type ProjectControlLevelTimeline = Camelize<ProjectControlLevelTimelineRow>;

export type ProjectAttentionLevelTimelineRow =
  Database["proj"]["Tables"]["project_attention_level_timeline"]["Row"];
export type ProjectAttentionLevelTimelineInsertRow =
  Database["proj"]["Tables"]["project_attention_level_timeline"]["Insert"];
export type ProjectAttentionLevelTimelineUpdateRow =
  Database["proj"]["Tables"]["project_attention_level_timeline"]["Update"];

export type ProjectAttentionLevelTimeline = Camelize<ProjectAttentionLevelTimelineRow>;

export type ProjectAttentionTypeTimelineRow =
  Database["proj"]["Tables"]["project_attention_type_timeline"]["Row"];
export type ProjectAttentionTypeTimelineInsertRow =
  Database["proj"]["Tables"]["project_attention_type_timeline"]["Insert"];
export type ProjectAttentionTypeTimelineUpdateRow =
  Database["proj"]["Tables"]["project_attention_type_timeline"]["Update"];

export type ProjectAttentionTypeTimeline = Camelize<ProjectAttentionTypeTimelineRow>;

export type OrganizationRoleAssignmentRow =
  Database["hr"]["Tables"]["organization_role_assignments"]["Row"];
export type OrganizationRoleAssignmentInsertRow =
  Database["hr"]["Tables"]["organization_role_assignments"]["Insert"];
export type OrganizationRoleAssignmentUpdateRow =
  Database["hr"]["Tables"]["organization_role_assignments"]["Update"];

export type OrganizationRoleAssignment = Camelize<OrganizationRoleAssignmentRow>;

export type ProjectContractRow = Database["proj"]["Tables"]["project_contracts"]["Row"];
export type ProjectContractInsertRow = Database["proj"]["Tables"]["project_contracts"]["Insert"];
export type ProjectContractUpdateRow = Database["proj"]["Tables"]["project_contracts"]["Update"];

export type ProjectContract = Camelize<ProjectContractRow>;

export type ProjectContractVersionRow =
  Database["proj"]["Tables"]["project_contract_versions"]["Row"];
export type ProjectContractVersionInsertRow =
  Database["proj"]["Tables"]["project_contract_versions"]["Insert"];
export type ProjectContractVersionUpdateRow =
  Database["proj"]["Tables"]["project_contract_versions"]["Update"];

export type ProjectContractVersion = Camelize<ProjectContractVersionRow>;

export type ProjectScheduleVersionRow =
  Database["proj"]["Tables"]["project_schedule_versions"]["Row"];
export type ProjectScheduleVersionInsertRow =
  Database["proj"]["Tables"]["project_schedule_versions"]["Insert"];
export type ProjectScheduleVersionUpdateRow =
  Database["proj"]["Tables"]["project_schedule_versions"]["Update"];

export type ProjectScheduleVersion = Camelize<ProjectScheduleVersionRow>;
