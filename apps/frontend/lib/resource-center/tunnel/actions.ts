"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  insertTunnelMutation,
  updateTunnelMutation,
  deleteTunnelMutation,
} from "./mutations";
import { ITunnelBasicForm } from "./types";
import { ProjectStatus } from "../types";

export type State = {
  errors?: {
    name?: string[];
    shortName?: string[];
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
  planLaunchDate: z.string().min(1, { message: "必须填写始发时间。" }),
  planBreakthroughDate: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), {
      message: "请输入合法的日期(YYYY-MM-DD)。",
    }),
  actualLaunchDate: z.string().optional(),
  actualBreakthroughDate: z.string().optional(),
  tbmId: z.string().nullable().optional(), 
  projectId: z.coerce.string().min(1, { message: "请选择所属项目。" }),
  wtype: z.coerce.string().optional(),
  status: z.nativeEnum(ProjectStatus, {
    errorMap: () => ({ message: "必须选择一个项目状态。" }),
  }),
});

const CreateTunnel = FormSchema;
const UpdateTunnel = FormSchema;

export async function createTunnel(prevState: State, formData: FormData) {
  console.log("formData", formData);
  //Validate from using Zod
  const validatedFields = CreateTunnel.safeParse({
    name: formData.get("name"),
    shortName: formData.get("shortName"),
    ringStart: formData.get("ringStart"),
    ringEnd: formData.get("ringEnd"),
    opNumStart: formData.get("opNumStart"),
    opNumEnd: formData.get("opNumEnd"),
    planLaunchDate: formData.get("planLaunchDate"),
    planBreakthroughDate: formData.get("planBreakthroughDate"),
    actualLaunchDate: formData.get("actualLaunchDate"),
    actualBreakthroughDate: formData.get("actualBreakthroughDate"),
    tbmId: formData.get("tbmId"),
    projectId: formData.get("projectId"),
    wtype: formData.get("wtype"),
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
    planLaunchDate,
    planBreakthroughDate,
    actualLaunchDate,
    actualBreakthroughDate,
    tbmId,
    projectId,
    wtype,
    status,
  } = validatedFields.data;

  const data: Omit<ITunnelBasicForm,"id"> = {
    name: name,
    shortName: shortName,
    ringStart: Number(ringStart),
    ringEnd: Number(ringEnd),
    opNumStart: Number(opNumStart),
    opNumEnd: Number(opNumEnd),
    planLaunchDate: planLaunchDate,
    planBreakthroughDate: planBreakthroughDate,
    actualLaunchDate: actualLaunchDate,
    actualBreakthroughDate: actualBreakthroughDate,
    wtype: wtype,
    projectId: projectId,
    tbmId: tbmId,
    status: status,
  };

  console.log(projectId, "projectId");

  try {
    // 1. 插入项目
    const tunnelId = await insertTunnelMutation(data);

    if (!tunnelId) {
      throw new Error("项目区间插入失败");
    }
  } catch (error) {
    console.error("创建项目区间失败：", error);
    return {
      message: "创建项目区间失败，请稍后重试。",
      error,
    };
  }

  // 3. 跳转页面（刷新 + 重定向）
  revalidatePath("/resource-center/tunnel");
  redirect("/resource-center/tunnel");
}

export async function updateTunnel(
  id: string,
  prevState: State,
  formData: FormData
) {
  console.log("formData", formData);

  const rawForm = {
    name: formData.get("name"),
    shortName: formData.get("shortName"),
    ringStart: formData.get("ringStart"),
    ringEnd: formData.get("ringEnd"),
    opNumStart: formData.get("opNumStart"),
    opNumEnd: formData.get("opNumEnd"),
    planLaunchDate: formData.get("planLaunchDate"),
    planBreakthroughDate: formData.get("planBreakthroughDate"),
    actualLaunchDate: formData.get("actualLaunchDate"),
    actualBreakthroughDate: formData.get("actualBreakthroughDate"),
    tbmId: formData.get("tbmId"), 
    projectId: formData.get("projectId"),
    wtype: formData.get("wtype"),
    status: formData.get("status"),
  };
  
  const validatedFields = CreateTunnel.safeParse(rawForm);




  //Validate from using Zod
  // const validatedFields = UpdateTunnel.safeParse({
  //   name: formData.get("name"),
  //   shortName: formData.get("shortName"),
  //   ringStart: formData.get("ringStart"),
  //   ringEnd: formData.get("ringEnd"),
  //   opNumStart: formData.get("opNumStart"),
  //   opNumEnd: formData.get("opNumEnd"),
  //   planLaunchDate: formData.get("planLaunchDate"),
  //   planBreakthroughDate: formData.get("planBreakthroughDate"),
  //   tbmId: formData.get("tbmId"),
  //   projectId: formData.get("projectId"),
  //   status: formData.get("status"),
  // });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log("validatedFields", validatedFields);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields.Failed to Update tunnel.",
    };
  }

  //Prepare data for insertion into the database
  const {
    name,
    shortName,
    wtype,
    ringStart,
    ringEnd,
    opNumStart,
    opNumEnd,
    planLaunchDate,
    planBreakthroughDate,
    actualLaunchDate,
    actualBreakthroughDate,
    tbmId,
    projectId,
    status,
  } = validatedFields.data;

  try {
    //1. 更新项目
    const data: Partial<ITunnelBasicForm> = {
      name: name,
      shortName: shortName,
      wtype: wtype,
      ringStart: Number(ringStart),
      ringEnd: Number(ringEnd),
      opNumStart: Number(opNumStart),
      opNumEnd: Number(opNumEnd),
      planLaunchDate: planLaunchDate,
      planBreakthroughDate: planBreakthroughDate,
      actualLaunchDate: actualLaunchDate,
      actualBreakthroughDate: actualBreakthroughDate,
      projectId: projectId,
      tbmId: tbmId,
      status: status,
    };
    console.log("data", data);
    console.log("id", id);
    await updateTunnelMutation(id, data);
   
  } catch (error) {
    console.error("修改项目区间失败：", error);
    return {
      message: "修改项目区间失败，请稍后重试。",
      error,
    };
  }

  revalidatePath("/resource-center/tunnel");
  redirect("/resource-center/tunnel");
}

export async function deleteTunnel(id: string): Promise<void> {
  try {
    // 执行删除操作
    await deleteTunnelMutation(id);

    console.log("区间删除成功,ID:", id);
  } catch (error) {
    console.error("操作失败:", error);
    throw new Error("Failed to delete tunnel.");
  }

  // 刷新路径，重定向
  revalidatePath("/resource-center/tunnel");
  redirect("/resource-center/tunnel");
}
