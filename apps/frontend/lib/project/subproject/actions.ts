"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  insertSubprojectMutation,
  updateSubprojectMutation,
  deleteSubprojectMutation,
} from "./mutations";
import { ISubprojectForm, ProjectStatus } from "../types";
import { insertSubprojectTbm, bindTbmToSubproject } from "./servers";

export type State = {
  errors?: {
    name?: string[];
    shortName?: string[];
    projectId?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  name: z.string().min(1, { message: "必须输入一个工程名称。" }),
  shortName: z.string().min(1, { message: "必须输入一个工程简称。" }),
  ringStart: z.coerce.number().min(0, { message: "必须输入一个起始环号。" }),
  ringEnd: z.coerce.number().min(1, { message: "必须输入一个结束环号。" }),
  opNumStart: z.coerce.number().min(0, { message: "必须输入一个起始里程。" }),
  opNumEnd: z.coerce.number().min(1, { message: "必须输入一个结束里程。" }),
  planStartDate: z.string().min(1, { message: "必须填写始发时间。" }),
  planEndDate: z.string().min(1, { message: "必须填写贯通时间。" }),
  tbmId: z.coerce.string().min(1, { message: "请选择TBM机型。" }),
  projectId: z.coerce.string().min(1, { message: "请选择所属项目。" }),
  status: z.nativeEnum(ProjectStatus, {
    errorMap: () => ({ message: "必须选择一个项目状态。" }),
  }),
});

const CreateSubproject = FormSchema;
const UpdateSubproject = FormSchema;

export async function createSubproject(prevState: State, formData: FormData) {
  console.log("formData", formData);
  //Validate from using Zod
  const validatedFields = CreateSubproject.safeParse({
    name: formData.get("name"),
    shortName: formData.get("shortName"),
    ringStart: formData.get("ringStart"),
    ringEnd: formData.get("ringEnd"),
    opNumStart: formData.get("opNumStart"),
    opNumEnd: formData.get("opNumEnd"),
    planStartDate: formData.get("planStartDate"),
    planEndDate: formData.get("planEndDate"),
    tbmId: formData.get("tbmId"),
    projectId: formData.get("projectId"),
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
    ringStart,
    ringEnd,
    opNumStart,
    opNumEnd,
    planStartDate,
    planEndDate,
    tbmId,
    projectId,
    status,
  } = validatedFields.data;

  const data: Omit<ISubprojectForm, "id" | "tbmId"> = {
    name: name,
    shortName: shortName,
    ringStart: Number(ringStart),
    ringEnd: Number(ringEnd),
    opNumStart: Number(opNumStart),
    opNumEnd: Number(opNumEnd),
    planStartDate: planStartDate,
    planEndDate: planEndDate,
    projectId: projectId,
    status: status,
  };

  console.log(projectId, "projectId");

  try {
    // 1. 插入项目
    const subprojectId = await insertSubprojectMutation(data);

    if (!subprojectId) {
      throw new Error("项目插入失败");
    }

    // 2. 插入负责人记录
    await insertSubprojectTbm(subprojectId, tbmId);
  } catch (error) {
    console.error("创建项目失败：", error);
    return {
      message: "创建项目失败，请稍后重试。",
      error,
    };
  }

  // 3. 跳转页面（刷新 + 重定向）
  revalidatePath("/project/subprojects");
  redirect("/project/subprojects");
}

export async function updateSubproject(
  id: string,
  prevState: State,
  formData: FormData
) {
  console.log("formData", formData);

  //Validate from using Zod
  const validatedFields = UpdateSubproject.safeParse({
    name: formData.get("name"),
    shortName: formData.get("shortName"),
    ringStart: formData.get("ringStart"),
    ringEnd: formData.get("ringEnd"),
    opNumStart: formData.get("opNumStart"),
    opNumEnd: formData.get("opNumEnd"),
    planStartDate: formData.get("planStartDate"),
    planEndDate: formData.get("planEndDate"),
    tbmId: formData.get("tbmId"),
    projectId: formData.get("projectId"),
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
    ringStart,
    ringEnd,
    opNumStart,
    opNumEnd,
    planStartDate,
    planEndDate,
    tbmId,
    projectId,
    status,
  } = validatedFields.data;

  try {
    //1. 更新项目
    const data: Partial<ISubprojectForm> = {
      name: name,
      shortName: shortName,
      ringStart: Number(ringStart),
      ringEnd: Number(ringEnd),
      opNumStart: Number(opNumStart),
      opNumEnd: Number(opNumEnd),
      planStartDate: planStartDate,
      planEndDate: planEndDate,
      projectId: projectId,
      status: status,
    };
    await updateSubprojectMutation(id, data);
    //2. 更新项目负责人
    await bindTbmToSubproject(tbmId,id);
  } catch (error) {
    console.error("修改项目区间失败：", error);
    return {
      message: "修改项目区间失败，请稍后重试。",
      error,
    };
  }

  revalidatePath("/project/subprojects");
  redirect("/project/subprojects");
}

export async function deleteSubproject(id: string): Promise<void> {
  try {
    // 执行删除操作
    await deleteSubprojectMutation(id);

    console.log("区间删除成功,ID:", id);
  } catch (error) {
    console.error("操作失败:", error);
    throw new Error("Failed to delete subproject.");
  }

  // 刷新路径，重定向
  revalidatePath("/project/subprojects");
  redirect("/project/subprojects");
}

