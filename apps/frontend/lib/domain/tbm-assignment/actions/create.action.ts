"use server";

import { z } from "zod";

import { TbmAssignment } from "../types";
import { ActionResult, toActionError } from "@/lib/shared/contracts";
import { createTbmAssignment } from "../services";
import { CreateTbmAssignmentInput } from "../schemas";

export async function createTbmAssignmentAction(
  data: CreateTbmAssignmentInput
): Promise<ActionResult<TbmAssignment>> {
  console.log("SERVER ACTION RUNNING");
  console.log("create TBM assignment formData", data);

  try {
    const result = await createTbmAssignment(data);

    return {
      success: true,
      data: result,
      message: "创建TBM分配成功",
    };
  } catch (error) {
    console.error("Error creating TBM assignment:", error);
    return toActionError(error);
  }
}
