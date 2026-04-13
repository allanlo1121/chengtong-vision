"use server";

import { CreateOrganizationInput, UpdateOrganizationInput } from "../schemas";
import { WriterResult } from "@/lib/core/import/types";

import { organizationRepository } from "../repositories";
import { OrganizationInsertRow, OrganizationUpdateRow } from "../types";
import { mapOrganization, mapOrganizationToInsert } from "../mappers";

export const organizationWriter = async (data: CreateOrganizationInput): Promise<WriterResult> => {
  try {
    const result = await organizationRepository.findByCode(data.code);

    const id = result?.id ?? null;
    const version = result?.external_version ?? null;

    const currentVersion = data.externalVersion ?? 0;

    // skip
    if (version !== null && version >= currentVersion) {
      return {
        success: true,
        action: "skipped",
        id: id ?? null,
      };
    }

    // insert
    const baseData: OrganizationInsertRow = mapOrganizationToInsert(data);

    if (!id) {
      const res = await organizationRepository.insert(baseData);

      if (!res.id) {
        throw new Error("Failed to insert organization");
      }

      return {
        success: true,
        action: "inserted",
        id: res.id ?? null,
      };
    }

    // update
    const updateRes = await organizationRepository.update(id, baseData as OrganizationUpdateRow);

    if (!updateRes.id) {
      throw new Error("Failed to update organization");
    }

    return {
      success: true,
      action: "updated",
      id: updateRes.id ?? null,
    };
  } catch (err) {
    return {
      success: false,
      error: {
        message: err instanceof Error ? err.message : String(err),
        raw: data,
      },
    };
  }
};
