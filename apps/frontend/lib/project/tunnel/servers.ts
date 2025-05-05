import { createClient } from "@/utils/supabase/server";

// 辅助：格式化日期为 YYYY-MM-DD
const today = () => new Date().toISOString().slice(0, 10);

export async function insertSubprojectTbm(
  subprojectId: string,
  tbmId: string
): Promise<void> {
  const supabase = await createClient();
  const insertNew = await supabase.from("tbm_subproject_history").insert([
    {
      subproject_id: subprojectId,
      tbm_id: tbmId,
      start_date: today(),
      end_date: null,
    },
  ]);
  if (insertNew.error) {
    console.error("插入盾构机失败", insertNew.error);
    throw insertNew.error;
  }

  console.log("插入盾构机成功");
}

// 通用方法：处理负责人变更
export async function changeProjectLeader(
  projectId: string,
  newLeaderId: number
): Promise<void> {
  const supabase = await createClient();

  // 获取当前绑定的负责人
  const { data: current, error: fetchError } = await supabase
    .from("project_leader_history")
    .select("leader_id")
    .eq("project_id", projectId)
    .is("end_date", null)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.error("获取当前负责人失败", fetchError);
    throw fetchError;
  }

  const currentLeaderId = current?.leader_id;
  const isChanged = currentLeaderId !== newLeaderId;

  if (!isChanged) return; // 没变化直接跳过

  const now = today();

  // 开始事务
  const supabaseClient = await createClient();
  const updateOld = await supabaseClient
    .from("project_leader_history")
    .update({ end_date: now })
    .eq("project_id", projectId)
    .eq("leader_id", currentLeaderId)
    .is("end_date", null);

  if (updateOld.error) {
    console.error("关闭旧负责人记录失败", updateOld.error);
    throw updateOld.error;
  }

  const insertNew = await supabaseClient.from("project_leader_history").insert([
    {
      project_id: projectId,
      leader_id: newLeaderId,
      start_date: now,
      end_date: null,
    },
  ]);

  if (insertNew.error) {
    console.error("插入新负责人失败", insertNew.error);
    throw insertNew.error;
  }

  console.log("负责人变更成功");
}

export async function bindTbmToSubproject(
  tbmId: string,
  subprojectId: string,
  startDate: string = new Date().toISOString().split("T")[0]  // 默认绑定日期为今天
): Promise<void> {
  console.log("开始绑定 tbmId:", tbmId, "到子项目 subprojectId:", subprojectId);  
  const supabase = await createClient();

  // 1. 查询当前是否已有绑定记录（end_date IS NULL）
  const { data: existing, error: queryError } = await supabase
    .from("tbm_subproject_history")
    .select("id, tbm_id")
    .eq("subproject_id", subprojectId)
    .is("end_date", null)
    .maybeSingle();

  if (queryError) throw queryError;

  console.log("existing", existing); // 打印当前绑定记录  

  if (existing) {
    if (existing.tbm_id !== tbmId) {
      // ✅ 当前绑定与目标 tbmId 不一致，执行更新
      console.log("更新 tbm_id", existing.tbm_id, "->", tbmId);      
      const { error: updateError } = await supabase
        .from("tbm_subproject_history")
        .update({ tbm_id: tbmId })
        .eq("id", existing.id);

      if (updateError) throw updateError;
    }
    // ✅ 如果一致，则不做任何操作
  } else {
    // 2. 插入新的绑定记录
    const { error: insertError } = await supabase
      .from("tbm_subproject_history")
      .insert({
        tbm_id: tbmId,
        subproject_id: subprojectId,
        start_date: startDate
      });

    if (insertError) throw insertError;
  }
}