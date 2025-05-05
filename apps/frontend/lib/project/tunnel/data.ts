import { createClient } from "@/utils/supabase/server";
import { convertKeysToCamelCase } from "../../utils";
import { ISubproject, ProjectStatus, ISubprojectForm } from "../types";
import { ITunnelBasic } from "./types";

const ITEMS_PER_PAGE = 20;

export async function fetchSubprojectById(
  id: string
): Promise<ISubprojectForm> {
  console.log("spbyid", id); // 打印总记录数

  const supabase = await createClient();
  try {
    // 查询员工信息，仅选择需要的字段，并按员工编号排序
    const { data: sp, error: subError } = await supabase
      .from("subprojects")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (subError) throw subError;
    if (!sp) throw new Error("Subproject not found.");

    const { data: usage, error: usageError } = await supabase
      .from("tbm_usage_history")
      .select(
        `
      tbm_id,
      tbms(id, name, code)
    `
      )
      .eq("related_id", id) // id = subproject.id
      .eq("usage_type", "subproject")
      .is("end_date", null)
      .maybeSingle();

    if (usageError) throw usageError;

    const result: Omit<ISubprojectForm, "regionId"> = {
      id: id,
      name: sp.name,
      shortName: sp.short_name,
      projectId: sp.project_id,
      ringStart: sp.ring_start,
      ringEnd: sp.ring_end,
      opNumStart: sp.op_num_start,
      opNumEnd: sp.op_num_end,
      planStartDate: sp.plan_start_date,
      planEndDate: sp.plan_end_date,
      tbmId: usage?.tbm_id || null,
      status: sp.status,
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

export async function fetchSubprojectsPages(query: string): Promise<number> {
  const supabase = await createClient();
  try {
    // 查询员工信息，仅选择需要的字段，并按员工编号排序
    let filterQuery = supabase
      .from("v_subprojects_overview")
      .select("*", {
        count: "exact",
      })
      .order("id", { ascending: true });

    if (query) {
      if (Object.values(ProjectStatus).includes(query as ProjectStatus)) {
        filterQuery = filterQuery.in("status", [query]);
      } else {
        const conditions = [
          `name.ilike.%${query}%`,
          `short_name.ilike.%${query}%`,
          `project_short_name.ilike.%${query}%`,
          `region_name.ilike.%${query}%`,
          `tbm_name.ilike.%${query}%`,
        ];
        filterQuery = filterQuery.or(conditions.join(","));
      }
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

export async function fetchFilteredTunnels(
  query: string,
  currentPage: number
): Promise<ITunnelBasic[]> {
  const supabase = await createClient();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE; // 计算偏移量
  try {
    // 查询工程项目信息，仅选择需要的字段，并按编号排序
    let filterQuery = supabase
      .from("v_tunnels_overview")
      .select("*")
      .range(offset, offset + ITEMS_PER_PAGE - 1) // 添加偏移量;
      .order("id", { ascending: true });

    if (query) {
      if (Object.values(ProjectStatus).includes(query as ProjectStatus)) {
        filterQuery = filterQuery.in("status", [query]);
      } else {
        const conditions = [
          `name.ilike.%${query}%`,
          `short_name.ilike.%${query}%`,
          `project_short_name.ilike.%${query}%`,
          `region_name.ilike.%${query}%`,
          `tbm_name.ilike.%${query}%`,
        ];
        filterQuery = filterQuery.or(conditions.join(","));
      }
    }

    const { data: tunnels, error } = await filterQuery;

    //  console.log("subprojects", subprojects); // 打印总记录数

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch projects.");
    }

    if (tunnels && tunnels.length > 0) {
      // 转换为 camelCase 命名
      //const camelData = convertKeysToCamelCase(subprojects);
      //  console.log("camelData", camelData); // 打印总记录数

      const result: ITunnelBasic[] = tunnels.map((tunnel) => ({
        id: tunnel.id,
        name: tunnel.name,
        shortName: tunnel.short_name,
        projectShortName: tunnel.project_short_name,
        regionName: tunnel.region_name,
        tbmName: tunnel.tbm_name,
        ringStart: tunnel.ring_start,
        ringEnd: tunnel.ring_end,
        opNumStart: tunnel.op_num_start,
        opNumEnd: tunnel.op_num_end,
        planStartDate: tunnel.plan_start_date,
        planEndDate: tunnel.plan_end_date,
        status: tunnel.status as ProjectStatus,
      }));
      // console.log("result", result); // 打印总记录数
      return result;
    }

    return [];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch projects.");
  }
}

export async function fetchFilteredTunnelsPages(
  query: string
): Promise<number> {
  const supabase = await createClient();

  try {
    // 查询工程项目信息，仅选择需要的字段，并按编号排序
    let filterQuery = supabase
      .from("v_tunnels_overview")
      .select("*", {
        count: "exact",
      })
      .order("id", { ascending: true });

    if (query) {
      if (Object.values(ProjectStatus).includes(query as ProjectStatus)) {
        filterQuery = filterQuery.in("status", [query]);
      } else {
        const conditions = [
          `name.ilike.%${query}%`,
          `short_name.ilike.%${query}%`,
          `project_short_name.ilike.%${query}%`,
          `region_name.ilike.%${query}%`,
          `tbm_name.ilike.%${query}%`,
        ];
        filterQuery = filterQuery.or(conditions.join(","));
      }
    }

    const { count, error } = await filterQuery;

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch projects.");
    }

    if (!count) return 0; // 如果没有数据，返回 0

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    console.log("Total Pages:", totalPages); // 打印总页数
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch projects.");
  }
}
