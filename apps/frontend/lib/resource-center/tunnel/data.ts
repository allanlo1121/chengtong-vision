import { createClient } from "@/utils/supabase/server";

import { ProjectStatus } from "../types";
import { ITunnelBasic, ITunnelBasicForm } from "./types";

const ITEMS_PER_PAGE = 20;

export async function fetchTunnelById(id: string): Promise<ITunnelBasicForm> {
  const supabase = await createClient();
  try {
    // 查询员工信息，仅选择需要的字段，并按员工编号排序
    const { data: tunnel, error } = await supabase
      .from("tunnels")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    if (!tunnel) throw new Error("tunnel not found.");

    const result: ITunnelBasicForm = {
      id: id,
      name: tunnel.name,
      shortName: tunnel.short_name,
      projectId: tunnel.project_id,
      ringStart: tunnel.ring_start,
      ringEnd: tunnel.ring_end,
      opNumStart: tunnel.op_num_start,
      opNumEnd: tunnel.op_num_end,
      planLaunchDate: tunnel.plan_launch_date,
      planBreakthroughDate: tunnel.plan_breakthrough_date,
      actualLaunchDate: tunnel.actual_launch_date,
      actualBreakthroughDate: tunnel.actual_breakthrough_date,
      wtype: tunnel.wtype,
      tbmId: tunnel.tbm_id,
      status: tunnel.status,
    };
    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch employees.");
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
    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch tunnels.");
    }

    if (tunnels && tunnels.length > 0) {
      const result: ITunnelBasic[] = tunnels.map((tunnel) => ({
        id: tunnel.id,
        name: tunnel.name,
        shortName: tunnel.short_name,
        projectShortName: tunnel.project_short_name,
        regionName: tunnel.region_name,
        wtype: tunnel.wtype,
        ringStart: tunnel.ring_start,
        ringEnd: tunnel.ring_end,
        opNumStart: tunnel.op_num_start,
        opNumEnd: tunnel.op_num_end,
        planLaunchDate: tunnel.plan_launch_date,
        planBreakthroughDate: tunnel.plan_breakthrough_date,
        actualLaunchDate: tunnel.actual_launch_date,
        actualBreakthroughDate: tunnel.actual_breakthrough_date,
        status: tunnel.status as ProjectStatus,
        tbmName: tunnel.tbm_name,
      }));

      return result;
    }

    return [];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tunnels.");
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
      throw new Error("Failed to fetch tunnels.");
    }

    if (!count) return 0; // 如果没有数据，返回 0

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
   // console.log("Total Pages:", totalPages); // 打印总页数
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tunnels.");
  }
}

export async function fetchInprogressTunnels() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("v_tunnels_overview")
      .select("id,project_short_name,short_name,tbm_name,tbm_code,ring_start,ring_end,op_num_start,op_num_end,plan_launch_date,plan_breakthrough_date,actual_launch_date,actual_breakthrough_date")
      
      .eq("status", "InProgress")
      .order("project_short_name", { ascending: true });

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch tunnels.");
    }

    if (data && data.length > 0) {
      console.log("Fetched Tunnels:", data); // 打印获取的隧道数据
      const result = data.map((item) => ({
        id: item.id,
        projectShortName: item.project_short_name,
        shortName: item.short_name,
        tbmName: item.tbm_name,
        tbmcode: item.tbm_code,
        ringStart: item.ring_start,
        ringEnd: item.ring_end,
        opNumStart: item.op_num_start,
        opNumEnd: item.op_num_end,
        planLaunchDate: item.plan_launch_date,
        planBreakthroughDate: item.plan_breakthrough_date,
        actualLaunchDate: item.actual_launch_date,
        actualBreakthroughDate: item.actual_breakthrough_date,
      }));

      return result;
    }

    return [];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tunnels.");
  }
}
