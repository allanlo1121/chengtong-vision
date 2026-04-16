import { RemoveNull } from "@/lib/utils/remove-nullable";
import { Database } from "@/lib/core/types/database";
import { Camelize } from "@/lib/shared/utils/case-converter";

export type ProjectDetailRow = Database["public"]["Views"]["v_projects_list"]["Row"];

export type ProjectListRow = Database["public"]["Views"]["v_projects_list"]["Row"];

export type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
export type ProjectInsertRow = Database["public"]["Tables"]["projects"]["Insert"];
export type ProjectUpdateRow = Database["public"]["Tables"]["projects"]["Update"];

export type Project = Camelize<ProjectRow>;

export type ProjectAttentionTypesRow =
  Database["public"]["Tables"]["project_attention_types"]["Row"];
export type ProjectAttentionTypesInsertRow =
  Database["public"]["Tables"]["project_attention_types"]["Insert"];
export type ProjectAttentionTypesUpdateRow =
  Database["public"]["Tables"]["project_attention_types"]["Update"];

export type ProjectAttentionTypes = Camelize<ProjectAttentionTypesRow>;
