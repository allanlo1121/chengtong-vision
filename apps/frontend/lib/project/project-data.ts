import { createClient } from "@/utils/supabase/server";
import { ISubProject, IProject } from "./projectType";


export async function fetchSubProjectByTbmcode(
  tbmcode: string
): Promise<ISubProject> {
  const supabase = await createClient();
  try {
    // 查询线路信息，仅选择需要的字段，并按员工编号排序
    const { data: sub_project, error } = await supabase
      .from("sub_projects")
      .select("*")
      .eq("tbm_code", tbmcode)
      .limit(1);

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch employees.");
    }
    const result: ISubProject = {
      id: sub_project[0].id,
      projectId: sub_project[0].project_id,
      shortName: sub_project[0].short_name,
      projectName: sub_project[0].project_name,
      tbmCode: sub_project[0].tbm_code,
      ringStart: sub_project[0].ring_start,
      ringEnd: sub_project[0].ring_end,
      opNumStart: sub_project[0].op_num_start,
      opNumEnd: sub_project[0].op_num_end,
      areaName: sub_project[0].area_name,
      startDate: sub_project[0].start_date,
      endDate: sub_project[0].end_date,
      subProjectStatus: sub_project[0].sub_project_status,
    };
    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch employees.");
  }
}

export async function fetchProjectByProjectId(
  projectId: number
): Promise<IProject> {
  const supabase = await createClient();
  try {
    // 查询员工信息，仅选择需要的字段，并按员工编号排序
    const { data: project, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .limit(1);

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch employees.");
    }
    const result: IProject = {
      id: project[0].id,
      projectName: project[0].project_name,
      areaName: project[0].area_name,
      projectLeader: project[0].project_leader,
      startDate: project[0].start_date,
      endDate: project[0].end_date,
      projectStatus: project[0].project_status,
    };
    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch employees.");
  }
}
