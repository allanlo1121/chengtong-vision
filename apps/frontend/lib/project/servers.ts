import { createClient } from "@/utils/supabase/server";


// 辅助：格式化日期为 YYYY-MM-DD
const today = () => new Date().toISOString().slice(0, 10);

export async function insertProjectLeader(
  projectId: number,
  leaderId: number
): Promise<void> {
  const supabase = await createClient();
  const insertNew = await supabase.from("project_leader_history").insert([
    {
      project_id: projectId,
      leader_id: leaderId,
      start_date: today(),
      end_date: null,
    },
  ]);
  if (insertNew.error) {
    console.error("插入负责人失败", insertNew.error);
    throw insertNew.error;
  }

  console.log("插入项目负责人成功");
}

// 通用方法：处理负责人变更
export async function changeProjectLeader(
  projectId: string,
  newLeaderId: number
): Promise<void> {

  const supabase =await createClient();

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
  const supabaseClient =await createClient();
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

// 示例：项目更新主流程
// export async function updateProjectAndLeader(
//   projectId: number,
//   leader
// ) {
//   const {
//     name,
//     shortName,
//     addressName,
//     leaderId,
//     regionId,
//     constructionCosts,
//     contractStartDate,
//     contractEndDate,
//     status,
//   } = validatedFields;

//   const supabase = createClient();
//   const sanitizeDate = (val: string | null | undefined) => (val ? val : null);

//   const { error: updateError } = await supabase
//     .from("projects")
//     .update({
//       name,
//       short_name: shortName,
//       address_name: addressName,
//       region_id: regionId,
//       construction_costs: constructionCosts,
//       contract_start_date: sanitizeDate(contractStartDate),
//       contract_end_date: sanitizeDate(contractEndDate),
//       status,
//     })
//     .eq("id", projectId);

//   if (updateError) {
//     console.error("项目更新失败", updateError);
//     throw updateError;
//   }

//   // 👇 调用负责人变更逻辑
//   await changeProjectLeader(projectId, leaderId);
//   return { success: true };
// }
