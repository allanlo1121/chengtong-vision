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
export async function fetchTbmInfoByTbmId(
  id: number
): Promise<ITbmMainInfo> {
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

export async function fetchActivatedTbms() {
  const supabase = await createClient();
  try {
    // 使用 .is("end_date", null) 来查询 end_date 为 null 的记录
    const { data: activatedTbms, error } = await supabase
      .from("tbm_sub_project_history")
      .select("tbm_id, sub_project_id")
      .is("end_date", null);  // 修正为 .is("end_date", null)

    if (error) {
      console.error("查询失败:", error);
      throw new Error("Failed to fetch activated TBMs.");
    }

    // 输出查询结果
    console.log("activatedTbms", activatedTbms);

    // 返回查询到的结果
    return activatedTbms;
  } catch (error) {
    console.error("数据库错误:", error);
    throw new Error("Failed to fetch activated TBMs.");
  }
}



