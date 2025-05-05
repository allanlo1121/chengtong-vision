import { ITbmMainInfo, ITbmBaseInfo, ITbmWorkInfo } from "./types";

export const tbmProfile: ITbmMainInfo[] = [
  {
    id: 1,
    code: "crec988", // TBM 编号
    name: "中铁装备988", // TBM 名称
    type: "ttm8", // TBM 类型
    thrustAreaNumber: 6, // TBM 推力
    earthPressureNumber: 7, // TBM 地层压力
  },
];

import { createClient } from "@/utils/supabase/server";

// 查询子项目数据
export async function fetchTbmInfoByTbmcode(
  tbmcode: string
): Promise<ITbmMainInfo> {
  const supabase = await createClient();
  try {
    // 查询盾构信息，仅选择需要的字段
    const { data: tbmInfos, error } = await supabase
      .from("tbm_infos")
      .select("*")
      .eq("code", tbmcode)
      .limit(1);

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch employees.");
    }
    const result: ITbmMainInfo = {
      id: tbmInfos[0].id,
      code: tbmInfos[0].code,
      name: tbmInfos[0].name,
      type: tbmInfos[0].tbm_type,
      thrustAreaNumber: tbmInfos[0].thrust_group_num,
      earthPressureNumber: tbmInfos[0].earth_pressure_bar_num,
    };
    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch employees.");
  }
}

// 查询子项目数据
export async function fetchTbmInfoByTbmId(id: number): Promise<ITbmMainInfo> {
  const supabase = await createClient();
  try {
    // 查询员工信息，仅选择需要的字段，并按员工编号排序
    const { data: tbmInfos, error } = await supabase
      .from("tbm_infos")
      .select("*")
      .eq("id", id)
      .limit(1);

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch employees.");
    }
    const result: ITbmMainInfo = {
      id: tbmInfos[0].id,
      code: tbmInfos[0].code,
      name: tbmInfos[0].name,
      type: tbmInfos[0].tbm_type,
      thrustAreaNumber: tbmInfos[0].thrust_group_num,
      earthPressureNumber: tbmInfos[0].earth_pressure_bar_num,
    };
    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch employees.");
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
