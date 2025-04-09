import { ITbmMainInfo } from "./tbmDataTypes";

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
    // 查询员工信息，仅选择需要的字段，并按员工编号排序
    const { data: sub_project, error } = await supabase
      .from("tbm_infos")
      .select("*")
      .eq("code", tbmcode)
      .limit(1);

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch employees.");
    }
    const result: ITbmMainInfo = {
      id: sub_project[0].id,
      code: sub_project[0].code,
      name: sub_project[0].name,
      type: sub_project[0].tbm_type,
      thrustAreaNumber: sub_project[0].thrust_group_num,
      earthPressureNumber: sub_project[0].earth_pressure_bar_num,
    };
    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch employees.");
  }
}

export async function fetchActivatedTbms() {
  const supabase = await createClient();
  try {
    // 查询员工信息，仅选择需要的字段，并按员工编号排序
    const { data: tbmcodes, error } = await supabase
      .from("tbm_infos")
      .select("code")
      .eq("is_active", true);

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch employees.");
    }
    return tbmcodes.map((item) => item.code);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch employees.");
  }
}
