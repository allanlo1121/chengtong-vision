"use server";

import { ProjectInsertInput } from "../schemas";
import { WriterResult } from "@/lib/core/import/types";

import { OrganizationRoleAssignmentInsertRow, ProjectInsertRow, ProjectUpdateRow } from "../types";
import {
  projectRepository,
  employeeAssignmentsRepository,
  insertProjectStatusTimeline,
  insertProjectRiskLevelTimeline,
  insertProjectAttentionLevelTimeline,
  insertProjectAttentionTypeTimeline,
  insertProjectControlLevelTimeline,
  insertOrganizationRoleAssignment,
} from "../repositories";

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

export const projectWriter = async (data: ProjectInsertInput): Promise<WriterResult | void> => {
  console.log("Upserting project with data:", data);
  try {
    const currentVersion = data.externalVersion ?? 0;

    // 1️⃣ 查版本
    const result = await projectRepository.findByCode(data.code);

    const id = result?.id ?? null;
    const version = result?.external_version ?? null;

    console.log(
      "project code:",
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
    const baseData = {
      code: data.code,
      name: data.name,
      full_name: data.fullName,
      project_overview: data.projectOverview,
      project_key_points: data.projectKeyPoints,
      project_scope: data.projectScope,

      project_type_id: data.projectTypeId,
      project_sub_type_id: data.projectSubTypeId,
      project_management_mode_id: data.projectManagementModeId,

      organization_id: data.organizationId,
      region_id: data.regionId,

      country_code: data.countryCode,
      province_code: data.provinceCode,
      city_code: data.cityCode,
      district_code: data.districtCode,
      address: data.address,
      longitude: data.longitude,
      latitude: data.latitude,
      actual_start_date: data.actualStartDate,
      actual_end_date: data.actualEndDate,
      remark: data.remark,

      external_id: data.externalId,
      external_version: currentVersion,
    };

    //     projectStatusId: data.projectStatusId,
    // projectSubStatusId: data.projectSubStatusId,
    // projectRiskLevelId: data.projectRiskLevelId,
    // projectControlLevelId: data.projectControlLevelId,
    // projectAttentionLevelId: data.projectAttentionLevelId,
    // projectAttentionTypeId: data.projectAttentionTypeId,
    //       projectChiefEngineerId: data.projectChiefEngineerId,
    // projectManagerId: data.projectManagerId,
    // projectOversightLeaderId: data.projectOversightLeaderId,
    // projectPartySecretaryId: data.projectPartySecretaryId,
    // projectSafeDirectorId: data.projectSafeDirectorId,

    // ======================
    // 4️⃣ 不存在 → INSERT
    // ======================
    if (!id) {
      const insertData: ProjectInsertRow = baseData;
      console.log("Inserting new employee with data:", insertData);

      const res = await projectRepository.insert(insertData);

      if (!res?.id) {
        throw new Error("Failed to insert employee: no id returned");
      }

      const hasStatus = data.projectStatusId != null || data.projectSubStatusId != null;

      if (hasStatus) {
        const now = new Date();

        const res2 = await insertProjectStatusTimeline({
          project_id: res.id,
          project_status_id: data.projectStatusId ?? null,
          project_sub_status_id: data.projectSubStatusId ?? null,
          valid_from: now.toISOString(),
          change_type: "initial",
        });
      }

      const hasRiskLevel = data.projectRiskLevelId != null;

      if (hasRiskLevel) {
        const now = new Date();

        const res3 = await insertProjectRiskLevelTimeline({
          project_id: res.id,
          project_risk_level_id: data.projectRiskLevelId ?? null,
          valid_from: now.toISOString(),
          change_type: "initial",
        });
      }

      const hasControlLevel = data.projectControlLevelId != null;

      if (hasControlLevel) {
        const now = new Date();

        const res4 = await insertProjectControlLevelTimeline({
          project_id: res.id,
          project_control_level_id: data.projectControlLevelId ?? null,
          valid_from: now.toISOString(),
          change_type: "initial",
        });
      }

      const hasAttentionLevel = data.projectAttentionLevelId != null;

      if (hasAttentionLevel) {
        const now = new Date();

        const res4 = await insertProjectAttentionLevelTimeline({
          project_id: res.id,
          project_attention_level_id: data.projectAttentionLevelId ?? null,
          valid_from: now.toISOString(),
          change_type: "initial",
        });
      }

      const hasAttentionType =
        data.projectAttentionTypeId != null && data.projectAttentionTypeId != undefined;

      if (hasAttentionType) {
        const now = new Date();

        const attentionTypeId = data.projectAttentionTypeId;

        if (attentionTypeId != null) {
          await insertProjectAttentionTypeTimeline({
            project_id: res.id,
            attention_type_id: attentionTypeId,
            valid_from: new Date().toISOString(),
            change_type: "initial",
          });
        }
      }

      // 👉 插入项目经理角色
      const assignmentManagerData: OrganizationRoleAssignmentInsertRow = {
        employee_id: data.organizationManagerId!,
        organization_id: data.organizationId,
        role_type_id: data.organizationManagerRoleTypeId!,
        start_date: new Date().toISOString(),
      };

      await insertOrganizationRoleAssignment(assignmentManagerData);

      // 👉 插入项目总工角色
      const assignmentChiefEngineerData: OrganizationRoleAssignmentInsertRow = {
        employee_id: data.organizationChiefEngineerId!,
        organization_id: data.organizationId,
        role_type_id: data.organizationChiefEngineerRoleTypeId!,
        start_date: new Date().toISOString(),
      };

      await insertOrganizationRoleAssignment(assignmentChiefEngineerData);

      // 👉 插入包保领导角色
      const assignmentOversightLeaderData: OrganizationRoleAssignmentInsertRow = {
        employee_id: data.organizationOversightLeaderId!,
        organization_id: data.organizationId,
        role_type_id: data.organizationOversightLeaderRoleTypeId!,
        start_date: new Date().toISOString(),
      };

      await insertOrganizationRoleAssignment(assignmentOversightLeaderData);

      // 👉 插入书记角色
      const assignmentSecretaryData: OrganizationRoleAssignmentInsertRow = {
        employee_id: data.organizationPartySecretaryId!,
        organization_id: data.organizationId,
        role_type_id: data.organizationPartySecretaryRoleTypeId!,
        start_date: new Date().toISOString(),
      };

      await insertOrganizationRoleAssignment(assignmentSecretaryData);

      // 👉 插入安全负责人角色
      const assignmentSafetyDirectorData: OrganizationRoleAssignmentInsertRow = {
        employee_id: data.organizationSafetyDirectorId!,
        organization_id: data.organizationId,
        role_type_id: data.organizationSafetyDirectorRoleTypeId!,
        start_date: new Date().toISOString(),
      };

      await insertOrganizationRoleAssignment(assignmentSafetyDirectorData);
    }
    // await employeeAssignmentsRepository.insert(assignmentData);

    // return {
    //   success: true,
    //   action: "inserted",
    //   id: res.id,
    // };
    // }

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
