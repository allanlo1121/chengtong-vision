import { createClient } from "@/utils/supabase/server";
import { ISubProject, IProject } from "./projectType";

const ITEMS_PER_PAGE = 10;

export async function fetchSubProjectById(
  id: number
): Promise<ISubProject | undefined> {
  const supabase = await createClient();
  try {
    // 查询线路信息，仅选择需要的字段，并按员工编号排序
    const { data: sub_project, error } = await supabase
      .from("sub_projects")
      .select("*")
      .eq("id", id)
      .limit(1);

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch employees.");
    }
    console.log("sub_project", sub_project); // 打印子项目数据

    if (sub_project && sub_project.length > 0) {
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
    } else {
      console.error("No sub_project data found.");
    }
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
      shortName: project[0].short_name,
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

export async function fetchActivatedSubProjects() {
  const supabase = await createClient();
  try {
    // 查询员工信息，仅选择需要的字段，并按员工编号排序
    const { data: sub_projects, error } = await supabase
      .from("v_project_subproject_summary")
      .select("*")
      .eq("subproject_status", "在建")
      .order("id", { ascending: true });

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch employees.");
    }
    return sub_projects;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch employees.");
  }
}

export async function fetchProjectsPages(query: string): Promise<number> {
  const supabase = await createClient();
  try {
    // 查询员工信息，仅选择需要的字段，并按员工编号排序
    let filterQuery = supabase
      .from("projects")
      .select("id,project_name,short_name,project_address_name,region", {
        count: "exact",
      });

    if (query) {
      const conditions = [
        `project_name.ilike.%${query}%`,
        `short_name.ilike.%${query}%`,
        `project_address_name.ilike.%${query}%`,
      ];
      filterQuery = filterQuery.or(conditions.join(","));
    }

    const { count, error } = await filterQuery;

    console.log("count", count); // 打印总记录数
    

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch projects.");
    }

    if (count) {
      const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
      console.log("Total Pages:", totalPages); // 打印总页数
      return totalPages || 0;
    }
    return 0;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch projects.");
  }
}

export async function fetchProjects(query: string,currentPage:number)  {
  const supabase = await createClient();

  const offset= (currentPage - 1) * ITEMS_PER_PAGE;   // 计算偏移量
  try {
    
    // 查询员工信息，仅选择需要的字段，并按员工编号排序
    let filterQuery = supabase
      .from("projects")
      .select("id,project_name,short_name,project_address_name,region"  )
      .range(offset, offset + ITEMS_PER_PAGE - 1) // 添加偏移量;

    if (query) {
      const conditions = [
        `project_name.ilike.%${query}%`,
        `short_name.ilike.%${query}%`,
        `project_address_name.ilike.%${query}%`,
      ];
      filterQuery = filterQuery.or(conditions.join(","));
    }

    const {data:projects,error} = await filterQuery;

    console.log("projects", projects); // 打印总记录数
    

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch projects.");
    }

   
    return projects || [];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch projects.");
  }
}


export async function fetchSubProjectsPages(query: string): Promise<number> {
  const supabase = await createClient();
  try {
    // 查询员工信息，仅选择需要的字段，并按员工编号排序
    const { count, error } = await supabase
      .from("sub_projects")
      .select("*", { count: "exact" })
      .ilike("project_name", `%${query}%`)
      .order("id", { ascending: true });

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch employees.");
    }
    return count || 0;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch employees.");
  }
}
