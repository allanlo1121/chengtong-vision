"use server";

import { z } from "zod";
import validator from "validator";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { insertProjectMutation, updateProjectMutation, deleteProjectMutation } from "./mutations";
import { IProjectForm, ProjectStatus } from "./types";
import { insertProjectLeader, changeProjectLeader } from "./servers";

export type State = {
  errors?: {
    name?: string[];
    shortName?: string[];
    addressName?: string[];
    leaderId?: string[];
    regionId?: string[];
    constructionCosts?: string[];
    contractStartDate?: string[];
    contractEndDate?: string[];
    status?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  name: z.string().min(1, { message: "必须输入一个工程名称。" }),
  shortName: z.string().min(1, { message: "必须输入一个工程简称。" }),
  addressName: z.string().min(1, { message: "必须输入一个工程地址。" }),
  leaderId: z.coerce.number().min(1, { message: "请选择项目负责人。" }),
  regionId: z.coerce.number().min(1, { message: "请选择所在片区。" }),
  constructionCosts: z.string().refine((val) => validator.isNumeric(val), {
    message: "必须输入一个数字格式的合约造价。",
  }),
  contractStartDate: z.string().min(1, { message: "必须填写合同开始时间。" }),
  contractEndDate: z.string().min(1, { message: "必须填写合同结束时间。" }),
  status: z.nativeEnum(ProjectStatus, {
    errorMap: () => ({ message: "必须选择一个项目状态。" }),
  }),
});

const CreateProject = FormSchema;
const UpdateProject = FormSchema;

export async function createProject(prevState: State, formData: FormData) {
  console.log("formData", formData);
  //Validate from using Zod
  const validatedFields = CreateProject.safeParse({
    name: formData.get("name"),
    shortName: formData.get("shortName"),
    addressName: formData.get("addressName"),
    leaderId: formData.get("leaderId"),
    regionId: formData.get("regionId"),
    constructionCosts: formData.get("constructionCosts"),
    contractStartDate: formData.get("contractStartDate"),
    contractEndDate: formData.get("contractEndDate"),
    status: formData.get("status"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "表单字段缺失或不合法，创建失败。",
    };
  }

  // Prepare data for insertion into the database

  const {
    name,
    shortName,
    addressName,
    leaderId,
    regionId,
    constructionCosts,
    contractStartDate,
    contractEndDate,
    status,
  } = validatedFields.data;

  const data: Omit<IProjectForm, "id"> = {
    name: name,
    shortName: shortName,
    addressName: addressName,
    leaderId: leaderId,
    regionId: regionId,
    constructionCosts: Number(constructionCosts),
    contractStartDate: contractStartDate,
    contractEndDate: contractEndDate,
    status: status,
  };

  try {
    // 1. 插入项目
    const projectId = await insertProjectMutation(data);
    if (!projectId) {
      throw new Error("项目插入失败");
    }

    // 2. 插入负责人记录
    await insertProjectLeader(projectId, leaderId);
  } catch (error) {
    console.error("创建项目失败：", error);
    return {
      message: "创建项目失败，请稍后重试。",
      error,
    };
  }

  // 3. 跳转页面（刷新 + 重定向）
  revalidatePath("/project/projects");
  redirect("/project/projects");
}

export async function updateProject(
  id: string, 
  prevState: State,
  formData: FormData
) {
  console.log("formData", formData);
  

  //Validate from using Zod
  const validatedFields = UpdateProject.safeParse({
    name: formData.get("name"),
    shortName: formData.get("shortName"),
    addressName: formData.get("addressName"),
    leaderId: formData.get("leaderId"),
    regionId: formData.get("regionId"),
    constructionCosts: formData.get("constructionCosts"),
    contractStartDate: formData.get("contractStartDate"),
    contractEndDate: formData.get("contractEndDate"),
    status: formData.get("status"),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log("validatedFields", validatedFields);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields.Failed to Update Employee",
    };
  }

  //Prepare data for insertion into the database
  const {
    name,
    shortName,
    addressName,
    leaderId,
    regionId,
    constructionCosts,
    contractStartDate,
    contractEndDate,
    status,
  } = validatedFields.data;

  try {
    //1. 更新项目
    const data: Partial<IProjectForm> = {
      name: name,
      shortName: shortName,
      addressName: addressName,
      regionId: regionId,
      constructionCosts: Number(constructionCosts),
      contractStartDate: contractStartDate,
      contractEndDate: contractEndDate,
      status: status,
    };
    await updateProjectMutation(id, data);
    //2. 更新项目负责人
    await changeProjectLeader(id, leaderId);
  } catch (error) {
    console.error("修改项目失败：", error);
    return {
      message: "修改项目失败，请稍后重试。",
      error,
    };
  }

  revalidatePath("/project/projects");
  redirect("/project/projects");
}

export async function deleteProject(id: string): Promise<void> {
  try {
    // 执行删除操作
    await deleteProjectMutation(id);

    console.log("员工删除成功,ID:", id);
  } catch (error) {
    console.error("操作失败:", error);
    throw new Error("Failed to delete employee.");
  }

  // 刷新路径，重定向
  revalidatePath("/project/projects");
  redirect("/project/projects");
}

export async function createProject11(prevState: State, formData: FormData) {
  console.log("formData", formData);
  //Validate from using Zod
  const validatedFields = CreateProject.safeParse({
    name: formData.get("name"),
    shortName: formData.get("shortName"),
    addressName: formData.get("addressName"),
    leaderId: formData.get("leaderId"),
    regionId: formData.get("regionId"),
    constructionCosts: formData.get("constructionCosts"),
    contractStartDate: formData.get("contractStartDate"),
    contractEndDate: formData.get("contractEndDate"),
    status: formData.get("status"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields.Failed to Create Employee",
    };
  }

  // Prepare data for insertion into the database

  const {
    name,
    shortName,
    addressName,
    leaderId,
    regionId,
    constructionCosts,
    contractStartDate,
    contractEndDate,
    status,
  } = validatedFields.data;

  const data: IProjectForm = {
    name: name,
    shortName: shortName,
    addressName: addressName,
    leaderId: leaderId,
    regionId: regionId,
    constructionCosts: Number(constructionCosts),
    contractStartDate: contractStartDate,
    contractEndDate: contractEndDate,
    status: status,
  };

  // const supabase = await createClient();

  // try {
  //   const { data: insertedProjects, error: insertError } = await supabase
  //     .from("projects")
  //     .insert({
  //       name: name,
  //       short_name: shortName,
  //       address_name: addressName,
  //       region_id: regionId,
  //       construction_costs: constructionCosts,
  //       contract_start_date: contractStartDate,
  //       contract_end_date: contractEndDate,
  //       status: status,
  //     })
  //     .select("id");

  //   if (insertError || !insertedProjects || insertedProjects.length === 0) {
  //     console.log("insertError", insertError);
  //     throw new Error("项目插入失败");
  //   }
  const projectId = await insert(data);

  if (!projectId) {
    throw new Error("项目插入失败");
  }

  await insertProjectLeader(projectId, leaderId).catch((error) => {
    console.error("插入项目负责人失败", error);
    throw new Error("插入项目负责人失败");
  });

  // Step 2: 插入负责人历史
  // const { error: leaderError } = await supabase
  //   .from("project_leader_history")
  //   .insert([
  //     {
  //       project_id: projectId,
  //       leader_id: leaderId,
  //       start_date: new Date().toISOString().slice(0, 10),
  //       end_date: null,
  //     },
  //   ]);
  // if (leaderError) {
  //   throw new Error("项目负责人历史插入失败");
  // }
  // } catch (error) {
  //   console.error("Failed to Create Project:", error);
  //   return {
  //     message: "Database Error: Failed to Create Project",
  //   };
  // }

  revalidatePath("/project/projects");
  redirect("/project/projects");
}
