"use server";

import { getVersionsByCode } from "@/lib/shared/repositories/common.repository";
import { CreateOrganizationInput, UpdateOrganizationInput } from "../schemas";
import { WriterResult } from "@/lib/core/import/types";

import { createOrganization } from "../services";
import { updateOrganization } from "../services/update-organizations.service";
import { map } from "zod";

export const organizationWriter = async (data: CreateOrganizationInput): Promise<WriterResult> => {
  try {
    const { id, version } = await getVersionsByCode("organizations", data.code);

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
    if (!id) {
      const res = await createOrganization(data);

      if (!res.success || !res.data) {
        throw new Error("Failed to insert organization");
      }

      return {
        success: true,
        action: "inserted",
        id: res.data.id ?? null,
      };
    }

    // update
    const res = await updateOrganization(id, data as UpdateOrganizationInput);

    if (!res.success || !res.data) {
      throw new Error("Failed to update organization");
    }

    return {
      success: true,
      action: "updated",
      id: res.data.id ?? null,
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
