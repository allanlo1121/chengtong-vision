"use server";

import { CreateTbmInput } from "../schemas";
import { WriterResult } from "@/lib/core/import/types";
import { tbmRepository } from "../repositories";

import { TbmInsertRow } from "../types/db.types";
import { mapTbmRowFromTbmFormInput } from "../mappers";

export const tbmWriter = async (data: CreateTbmInput): Promise<WriterResult | void> => {
  console.log("Upserting tbm with data:", data);
  try {
    const currentVersion = data.externalVersion ?? 0;

    // 1️⃣ 查版本
    const result = await tbmRepository.findByCode(data.code);

    const id = result?.id ?? null;
    const version = result?.external_version ?? null;

    console.log(
      "tbm code:",
      data.code,
      "Current version:",
      currentVersion,
      "Existing version:",
      version
    );

    // ======================
    // 2️⃣ 如果已有版本且不需要更新 → 跳过
    // ======================
    if (version !== null && version >= currentVersion) {
      return {
        success: true,
        action: "skipped",
        id: id ?? null,
      };
    }

    // ======================
    // 4️⃣ 不存在 → INSERT
    // ======================
    if (!id) {
      const insertData: TbmInsertRow = mapTbmRowFromTbmFormInput(data);
      console.log("Inserting new employee with data:", insertData);

      const res = await tbmRepository.insert(insertData);

      if (!res?.id) {
        throw new Error("Failed to insert employee: no id returned");
      }
      return {
        success: true,
        action: "inserted",
        id: res.id,
      };
    } else {
      return {
        success: true,
        action: "skipped",
        id: id,
      };
    }

    // ======================
    // 5️⃣ 存在 → UPDATE
    // ======================
    // const updateData: ProjectUpdateRow = baseData;

    // console.log("Updating existing employee (ID:", id, ") with data:", updateData);

    // const updateRes = await projectRepository.update(id, updateData);

    // if (!updateRes?.id) {
    //   throw new Error("Failed to update employee: no id returned");
    // }

    // await syncEmployeeAssignment(updateRes.id, {
    //   employee_id: updateRes.id,
    //   organization_id: data.organizationId,
    //   post_id: data.postId,
    //   is_primary: true,
    // });

    // return {
    //   success: true,
    //   action: "updated",
    //   id: updateRes?.id,
    // };
  } catch (err) {
    console.error("Failed to upsert project:", err);

    return {
      success: false,
      error: {
        message: err instanceof Error ? err.message : String(err),
        raw: data,
      },
    };
  }
};
