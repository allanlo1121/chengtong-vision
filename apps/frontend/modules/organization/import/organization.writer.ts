"use server";

import { insertOrganization } from "../repositories";
import { getVersionsByCode } from "@/modules/shared/repositories/common.repository";
import { CreateOrganizationInput } from "../schemas";
import { WriterResult } from "@/modules/import/types";

export const organizationWriter = async (data: CreateOrganizationInput): Promise<WriterResult> => {
  try {
    const version = await getVersionsByCode("organizations", data.code);
    const currentVersion = data.externalVersion ?? 0;

    if (version !== undefined && version >= currentVersion) {
      return {
        success: true,
        action: "skipped",
        id: undefined,
      };
    }

    const res = await insertOrganization(data);

    if (!res) {
      throw new Error("Failed to insert organization: no result returned");
    }

    return {
      success: true,
      action: "inserted", // { organization_id, action }
      id: res.id,
    };
  } catch (err) {
    console.error("Failed to upsert organization:", err);

    return {
      success: false,
      error: {
        message: err instanceof Error ? err.message : String(err),
        raw: data, // 很关键，方便 UI 展示
      },
    };
  }
};
