import {
  ITbmMainInfo,
  ITbmBaseInfo,
  ITbmWorkInfo,
  ITbmType,
  ITbmOwner,
  ITbmProducer,
} from "./types";

const ITEMS_PER_PAGE = 20;

import { createClient } from "@/utils/supabase/server";

export async function fetchTbmTypes(): Promise<ITbmType[]> {
  const supabase = await createClient();
  try {
    // 查询员工信息，仅选择需要的字段，并按员工编号排序I
    const { data, error } = await supabase
      .from("tbm_types")
      .select("id,code,name")
      .order("name", { ascending: true });

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch tbm types.");
    }

    const tbmTypes: ITbmType[] = data.map((item) => ({
      id: item.id,
      code: item.code,
      name: item.name,
    }));

    return tbmTypes;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tbm types.");
  }
}

export async function fetchTbmProducers(): Promise<ITbmProducer[]> {
  const supabase = await createClient();
  try {
    // 查询员工信息，仅选择需要的字段，并按员工编号排序
    const { data, error } = await supabase
      .from("producers")
      .select("id,name")
      .order("name", { ascending: true });

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch tbm producers.");
    }

    const tbmProducers = data.map((item) => ({
      id: item.id,
      name: item.name,
    }));

    return tbmProducers;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tbm producers.");
  }
}

export async function fetchTbmOwners(): Promise<ITbmOwner[]> {
  const supabase = await createClient();
  try {
    // 查询员工信息，仅选择需要的字段，并按员工编号排序
    const { data, error } = await supabase
      .from("owners")
      .select("id,name")
      .order("name", { ascending: true });

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch tbm owners.");
    }

    const tbmOwners = data.map((item) => ({
      id: item.id,
      name: item.name,
    }));

    return tbmOwners;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tbm owners.");
  }
}

export async function fetchActivatedTbms(): Promise<ITbmWorkInfo[]> {
  const supabase = await createClient();
  try {
    // 使用 .is("end_date", null) 来查询 end_date 为 null 的记录
    const { data: tbms, error } = await supabase
      .from("v_tbm_subproject_overview")
      .select(
        "tbm_id,tbm_name,tbm_type_name,subproject_short_name,project_short_name,region_name"
      )
      .order("region_name", { ascending: true });

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch activated TBMs." + error.message);
    }
    if (!tbms) {
      console.error("查询结果为空:", error);
    }

    const data: ITbmWorkInfo[] = tbms.map((tbm) => ({
      id: tbm.tbm_id,
      name: tbm.tbm_name,
      type: tbm.tbm_type_name,
      regionName: tbm.region_name,
      projectShortName: tbm.project_short_name,
      subprojectShortName: tbm.subproject_short_name,
    }));
    // 输出查询结果
    console.log("activatedTbms", data);

    // 返回查询到的结果
    return data;
  } catch (error) {
    console.error("数据库错误:", error);
    throw new Error("Failed to fetch activated TBMs.");
  }
}

export async function fetchAllTbms(): Promise<ITbmBaseInfo[]> {
  const supabase = await createClient();
  try {
    // 查询员工信息，仅选择需要的字段，并按员工编号排序
    const { data, error } = await supabase
      .from("tbms")
      .select("id,name,tbm_type")
      .order("id", { ascending: true });

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch employees.");
    }

    const tbms: ITbmBaseInfo[] = data.map((item) => ({
      id: item.id,
      name: item.name,
      type: item.tbm_type,
    }));

    return tbms;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch employees.");
  }
}

export async function fetchFilteredTbms(
  query: string,
  currentPage: number
): Promise<ITbmMainInfo[]> {
  const supabase = await createClient();
  try {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE; // 计算偏移量
    // 查询员工信息，仅选择需要的字段，并按员工编号排序
    const { data, error } = await supabase
      .from("tbms")
      .select("*")
      .ilike("name", `%${query}%`)
      .range(offset, offset + ITEMS_PER_PAGE - 1) // 添加偏移量;
      .order("id", { ascending: true });

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch employees.");
    }

    const tbms: ITbmMainInfo[] = data.map((item) => ({
      id: item.id,
      name: item.name,
      type: item.tbm_type,
      diameter: item.diameter,
      segmentOuter: item.segment_outer,
      productionDate: item.production_date,
      owner: item.owner,
      geo: item.geo,
      remark: item.remark,
    }));

    return tbms;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch employees.");
  }
}

export async function fetchFilteredTbmsPages(query: string): Promise<number> {
  const supabase = await createClient();
  try {
    // 查询员工信息，仅选择需要的字段，并按员工编号排序
    const { count, error } = await supabase
      .from("tbms")
      .select("*", {
        count: "exact",
      })
      .ilike("name", `%${query}%`)
      .order("id", { ascending: true });

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
    throw new Error("Failed to fetch employees.");
  }
}
