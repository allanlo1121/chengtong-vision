"use server";

import {
  getEmployeePrimaryPosition,
  insertEmployee,
  insertEmployeePosition,
  updateEmployee,
  deactivateOldPosition,
} from "../repositories";
import { getVersionsByCode } from "@/lib/shared/repositories/common.repository";
import { EmployeeInsertInput } from "../schemas";
import { WriterResult } from "@/lib/core/import/types";
import { TableInsert, TableRow, TableUpdate } from "@/lib/core/types/entity.types";
import { EmployeeInsertRow, EmployeePositionInsertRow } from "../types";
import { employeeRepository } from "../repositories/employee.respository";
import { employeePositionsRepository } from "../repositories/employee-positions.repository";

async function syncEmployeePosition(employeeId: string, data: TableInsert<"employee_positions">) {
  const old = await getEmployeePrimaryPosition(employeeId); // 👈 关键

  if (!old) {
    return insertEmployeePosition(data);
  }

  const changed = old.organization_id !== data.organization_id || old.post_id !== data.post_id;

  if (!changed) return;

  await deactivateOldPosition(employeeId);

  return insertEmployeePosition(data);
}

export const employeeWriter = async (data: EmployeeInsertInput): Promise<WriterResult> => {
  try {
    const currentVersion = data.externalVersion ?? 0;

    // 1️⃣ 查版本
    const { id, version } = await getVersionsByCode("employees", data.code);

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
    // 3️⃣ 组装通用数据（避免重复）
    // ======================
    const baseData = {
      code: data.code,
      name: data.name,
      phone: data.phone,
      email: data.email,
      employment_type_id: data.employmentTypeId,
      hire_date: data.hireDate,
      external_id: data.externalId,
      external_version: currentVersion,
    };

    // ======================
    // 4️⃣ 不存在 → INSERT
    // ======================
    if (!id) {
      const insertData: EmployeeInsertRow = baseData;

      const res = await employeeRepository.insert(insertData);

      if (!res?.id) {
        throw new Error("Failed to insert employee: no id returned");
      }

      // 👉 插入岗位
      const positionData: EmployeePositionInsertRow = {
        employee_id: res.id,
        organization_id: data.organizationId,
        post_id: data.postId,
        is_primary: true,
      };

      await employeePositionsRepository.insert(positionData);

      return {
        success: true,
        action: "inserted",
        id: res.id,
      };
    }

    // ======================
    // 5️⃣ 存在 → UPDATE
    // ======================
    const updateData: TableUpdate<"employees"> = baseData;

    const updateRes = await updateEmployee(data.code, updateData);

    if (!updateRes?.id) {
      throw new Error("Failed to update employee: no id returned");
    }

    await syncEmployeePosition(updateRes.id, {
      employee_id: updateRes.id,
      organization_id: data.organizationId,
      post_id: data.postId,
      is_primary: true,
    });

    return {
      success: true,
      action: "updated",
      id: updateRes?.id,
    };
  } catch (err) {
    console.error("Failed to upsert employee:", err);

    return {
      success: false,
      error: {
        message: err instanceof Error ? err.message : String(err),
        raw: data,
      },
    };
  }
};
