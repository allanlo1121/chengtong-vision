"use server";

import {
  CreateOrganizationInput,
  ImportOrganizationInput,
  UpdateOrganizationInput,
} from "../schemas";
import { WriterResult } from "@/lib/core/import/types";

import { organizationRepository } from "../repositories";
import { OrganizationInsertRow, OrganizationUpdateRow } from "../types";
import { mapOrganizationToInsert } from "../mappers";

export const organizationWriter = async (data: ImportOrganizationInput): Promise<WriterResult> => {
  console.log("organizationWriter received data:", data);
  try {
    const result = await organizationRepository.findByCode(data.code);

    const id = result?.id ?? null;
    const version = result?.externalVersion ?? null;

    const currentVersion = data.externalVersion ?? 0;

    // skip
    if (version !== null && version >= currentVersion) {
      console.log(
        `Skipping organization with code ${data.code} because existing version (${version}) is >= current version (${currentVersion})`
      );
      return {
        success: true,
        action: "skipped",
        id: id ?? null,
      };
    }

    // insert
    const baseData: ImportOrganizationInput = {
      ...data,
    };

    if (!id) {
      console.log(`Inserting new organization with code ${data.code}`);
      const res = await organizationRepository.insertByImport(baseData);

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
    console.log(`Updating existing organization with code ${data.code} and id ${id}`);
    // const updateData: UpdateOrganizationInput = {
    //   id,
    //   ...baseData,
    // };
    // const updateRes = await organizationRepository.update(updateData);

    // if (!updateRes.id) {
    //   throw new Error("Failed to update organization");
    // }

    return {
      success: true,
      action: "updated",
      id: null,
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
