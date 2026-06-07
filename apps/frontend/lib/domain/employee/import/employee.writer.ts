"use server";

import {
  CreateEmployeeAssignmentInput,
  CreateEmployeeInput,
  CreateEmployeeWithAssignmentInput,
  EmployeeInsertInput,
  UpdateEmployeeInput,
} from "../schemas";
import { WriterResult } from "@/lib/core/import/types";

import {
  EmployeeAssignmentInsertRow,
  EmployeeAssignmentRow,
  EmployeeInsertRow,
  EmployeeUpdateRow,
} from "../types";
import { employeeRepository, employeeAssignmentsRepository } from "../repositories";

// async function syncEmployeeAssignment(
//   employeeId: string,
//   data: EmployeeAssignmentInsertRow
// ): Promise<EmployeeAssignmentRow | void> {
//   const old = await employeeAssignmentsRepository.getByEmployeeId(employeeId); // 👈 关键
//   console.log("Existing assignment for employee ID", employeeId, ":", old);

//   if (!old) {
//     return employeeAssignmentsRepository.insert(data);
//   }

//   const changed = old.organization_id !== data.organization_id || old.post_id !== data.post_id;

//   console.log("Assignment changed for employee ID", employeeId, ":", changed);

//   if (!changed) return;

//   console.log("Deactivating existing assignment for employee ID", employeeId);
//   await employeeAssignmentsRepository.deactivateByEmployeeId(employeeId);
//   console.log("Inserting new assignment for employee ID", employeeId, "with data:", data);

//   return employeeAssignmentsRepository.insert(data);
// }

export const employeeWriter = async (data: EmployeeInsertInput): Promise<WriterResult> => {
  console.log("Upserting employee with data:", data);
  try {
    const currentVersion = data.externalVersion ?? 0;

    // 1️⃣ 查版本
    const result = await employeeRepository.findByCode(data.code);

    const id = result?.id ?? null;
    const version = result?.externalVersion ?? null;

    console.log(
      "Employee code:",
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
    // 3️⃣ 组装通用数据（避免重复）
    // ======================
    const baseData: CreateEmployeeInput = {
      code: data.code,
      name: data.name,
      phone: data.phone,
      email: data.email,
      employmentTypeId: data.employmentTypeId,
      genderId: data.genderId,
      hireDate: data.hireDate,
      organizationId: data.organizationId,
      sortOrder: 0,
      externalId: data.externalId,
      externalVersion: currentVersion,
    };

    // ======================
    // 4️⃣ 不存在 → INSERT
    // ======================
    if (!id) {
      const insertData: CreateEmployeeInput = baseData;
      console.log("Inserting new employee with data:", insertData);

      const res = await employeeRepository.insert(insertData);

      if (!res?.id) {
        throw new Error("Failed to insert employee: no id returned");
      }

      // 👉 插入岗位
      const assignmentData: CreateEmployeeAssignmentInput = {
        employeeId: res.id,
        organizationId: data.organizationId,
        postId: data.postId!,
        isPrimary: true,
      };

      await employeeAssignmentsRepository.insert(assignmentData);

      return {
        success: true,
        action: "inserted",
        id: res.id,
      };
    }

    // ======================
    // 5️⃣ 存在 → UPDATE
    // ======================
    const updateData: UpdateEmployeeInput = {
      ...baseData,
      id,
    };

    console.log("Updating existing employee (ID:", id, ") with data:", updateData);

    const updateRes = await employeeRepository.update(updateData);

    if (!updateRes?.id) {
      throw new Error("Failed to update employee: no id returned");
    }

    // await syncEmployeeAssignment(updateRes.id, {
    //   employeeId: updateRes.id,
    //   organizationId: data.organizationId,
    //   postId: data.postId,
    //   isPrimary: true,
    // });

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
