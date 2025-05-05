import { createClient } from "@/utils/supabase/server";
import { convertKeysToCamelCase } from "../utils";
import {
  IProjectBasic,
  IProject,
  ISubProject,
  ProjectStatus,
  ISubProjectBasic,
  IRegion,
  IProjectForm,
} from "./types";

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

export async function fetchProjectById(id: string): Promise<IProjectForm> {
  const supabase = await createClient();
  try {
    // 查询员工信息，仅选择需要的字段，并按员工编号排序
    const { data: project, error } = await supabase
      .from("projects")
      .select(
        "name,short_name,address_name,current_project_leader!inner(leader_id),region_id,construction_costs,contract_start_date,contract_end_date,status"
      )
      .eq("id", id)
      .limit(1);

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch employees.");
    }
    const result: IProjectForm = {
      id: id,
      name: project[0].name,
      shortName: project[0].short_name,
      addressName: project[0].address_name,
      leaderId: project[0].current_project_leader[0].leader_id,
      regionId: project[0].region_id,
      constructionCosts: project[0].construction_costs,
      contractStartDate: project[0].contract_start_date,
      contractEndDate: project[0].contract_end_date,
      status: project[0].status,
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
      .from("v_projects_overview")
      .select("*", {
        count: "exact",
      })
      .order("id", { ascending: true });

    if (query) {
      const statusValues = ["在建", "停工", "竣工"];
      // 用 includes 判断 query 是否是 region 或 status
      if (statusValues.includes(query)) {
        filterQuery = filterQuery.in("status", [query]);
      }
      const conditions = [
        `name.ilike.%${query}%`,
        `short_name.ilike.%${query}%`,
        `address_name.ilike.%${query}%`,
        `leader.ilike.%${query}%`,
        `region_name.ilike.%${query}%`,
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
      return totalPages;
    }
    return 0;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch projects.");
  }
}

export async function fetchFilteredProjects(
  query: string,
  currentPage: number
): Promise<IProject[]> {
  const supabase = await createClient();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE; // 计算偏移量
  try {
    // 查询工程项目信息，仅选择需要的字段，并按编号排序
    let filterQuery = supabase
      .from("v_projects_overview")
      .select("*")
      .range(offset, offset + ITEMS_PER_PAGE - 1) // 添加偏移量;
      .order("id", { ascending: true });

    if (query) {
      const statusValues = ["在建", "停工", "竣工"];
      const likeValue = `%${query}%`;

      if (statusValues.includes(query)) {
        filterQuery = filterQuery.in("project_status", [query]);
      } else {
        const conditions = [
          `name.ilike.${likeValue}`,
          `short_name.ilike.${likeValue}`,
          `address_name.ilike.${likeValue}`,
          `leader.ilike.${likeValue}`,
          `region_name.ilike.${likeValue}`,
        ];
        filterQuery = filterQuery.or(conditions.join(","));
      }
    }

    const { data: projects, error } = await filterQuery;

    // console.log("projects", projects); // 打印总记录数

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch projects.");
    }

    if (projects && projects.length > 0) {
      // 转换为 camelCase 命名
      const camelData: IProject[] = convertKeysToCamelCase(projects);
      //  console.log("camelData", camelData); // 打印总记录数

      const result: IProject[] = camelData.map((project) => ({
        id: project.id,
        name: project.name,
        shortName: project.shortName,
        addressName: project.addressName,
        leader: project.leader,
        regionName: project.regionName,
        constructionCosts: project.constructionCosts,
        contractStartDate: project.contractStartDate,
        contractEndDate: project.contractEndDate,
        status: project.status as ProjectStatus,
        subProjects: (project.subProjects || []).map(
          (sp): ISubProjectBasic => ({
            id: sp.id,
            shortName: sp.shortName,
            status: sp.status as ProjectStatus,
          })
        ),
      }));
      console.log("result", result); // 打印总记录数
      return result;
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
    let filterQuery = supabase
      .from("v_subproject_full")
      .select(
        `id,project_short_name,sub_project_short_name,project_address_name,region,ring_end,op_num_start,op_num_end,start_date,end_date,sub_project_status,tbm_name`,
        { count: "exact" }
      )
      .order("id", { ascending: true }); // 添加偏移量;

    if (query) {
      const regionValues = ["华东", "华南", "西南", "西北", "华北", "东北"];
      const statusValues = ["在建", "停工", "竣工"];

      // 用 includes 判断 query 是否是 region 或 status
      if (regionValues.includes(query)) {
        filterQuery = filterQuery.in("region", [query]);
      } else if (statusValues.includes(query)) {
        filterQuery = filterQuery.in("project_status", [query]);
      } else {
        //默认模糊搜索匹配多个字段
        const conditions = [
          `sub_project_short_name.ilike.%${query}%`,
          `project_short_name.ilike.%${query}%`,
          `project_address_name.ilike.%${query}%`,
          `tbm_name.ilike.%${query}%`,
        ];
        filterQuery = filterQuery.or(conditions.join(","));
      }
    }

    const { count, error } = await filterQuery;

    if (error) {
      console.error("查询失败", error);
      throw new Error("Failed to fetch subprojects.");
    }
    if (count) {
      console.log("count", count); // 打印总记录数
      const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
      console.log("Total Pages:", totalPages); // 打印总页数
      return totalPages;
    }
    return 0;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch subprojects.");
  }
}

export async function fetchFilteredSubProjects(
  query: string,
  currentPage: number
) {
  const supabase = await createClient();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE; // 计算偏移量

  try {
    let filterQuery = supabase
      .from("v_subproject_full")
      .select(
        `id,project_short_name,sub_project_short_name,project_address_name,region,ring_end,op_num_start,op_num_end,start_date,end_date,sub_project_status,tbm_name`
      )
      .range(offset, offset + ITEMS_PER_PAGE - 1)
      .order("id", { ascending: true }); // 添加偏移量;

    if (query) {
      const regionValues = ["华东", "华南", "西南", "西北", "华北", "东北"];
      const statusValues = ["在建", "停工", "竣工"];

      // 用 includes 判断 query 是否是 region 或 status
      if (regionValues.includes(query)) {
        filterQuery = filterQuery.in("region", [query]);
      } else if (statusValues.includes(query)) {
        filterQuery = filterQuery.in("sub_project_status", [query]);
      } else {
        //默认模糊搜索匹配多个字段
        const conditions = [
          `sub_project_short_name.ilike.%${query}%`,
          `project_short_name.ilike.%${query}%`,
          `project_address_name.ilike.%${query}%`,
          `tbm_name.ilike.%${query}%`,
        ];
        filterQuery = filterQuery.or(conditions.join(","));
      }
    }

    const { data: sub_projects, error } = await filterQuery;

    if (error) {
      console.error("查询失败", error);
      throw new Error("Failed to fetch subprojects.");
    }

    return sub_projects || [];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch subprojects.");
  }
}

export async function fetchAllRegion(): Promise<IRegion[]> {
  const supabase = await createClient();
  try {
    // 查询线路信息，仅选择需要的字段，并按员工编号排序
    const { data: regions, error } = await supabase
      .from("regions")
      .select("id,name")
      .order("id", { ascending: true });

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch employees.");
    }

    if (!regions || regions.length === 0) {
      return []; // 返回空数组而不是 undefined
    }
    const result: IRegion[] = regions.map((region) => ({
      id: region.id,
      name: region.name,
    }));
    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch employees.");
  }
}

export async function fetchAllProjectsBasic(): Promise<IProjectBasic[]> {
  const supabase = await createClient();
  try {
    // 查询线路信息，仅选择需要的字段，并按员工编号排序
    const { data: projects, error } = await supabase
      .from("projects")
      .select("id,name,short_name")
      .order("id", { ascending: true });

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch projects.");
    }

    if (!projects || projects.length === 0) {
      return []; // 返回空数组而不是 undefined
    }
    const result: IProjectBasic[] = projects.map((project) => ({
      id: project.id,
      name: project.name,
      shortName: project.short_name,
    }));
    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch projects.");
  }
}
