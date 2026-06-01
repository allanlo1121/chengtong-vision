import {
  mapCreateTbmAssignmentInputToRow,
  mapTbmAssignmentRowToEntity,
} from "../mappers/tbm-assignment.mapper";
import { TbmAssignment } from "../types";
import {
  getTbmAssignmentByTbmId,
  getTbmAssignmentByTunnelId,
  insertTbmAssignment,
} from "../repositories/tbm-assignment.repository";
import { appErrors } from "@/lib/shared/contracts";
import { CreateTbmAssignmentFormInput } from "../schemas/tbm-assignment.schema";

export async function createTbmAssignment(
  input: CreateTbmAssignmentFormInput
): Promise<TbmAssignment> {
  // TODO: Implement the logic to create a TBM assignment based on the input data, which may include:
  // 1. Validating the input data
  const insertData = mapCreateTbmAssignmentInputToRow(input);
  // 2. Inserting a new record into the database to represent the TBM assignment
  const result = await insertTbmAssignment(insertData);
  // 3. Returning the created TBM assignment data
  // For now, we will throw an error to indicate that this function is not yet implemented.
  if (!result) {
    throw appErrors.internal("Failed to create TBM assignment: no data returned from database");
  }

  return mapTbmAssignmentRowToEntity(result);
}

export async function fetchTbmAssignmentByTunnelId(tunnelId: string): Promise<TbmAssignment> {
  const data = await getTbmAssignmentByTunnelId(tunnelId);
  if (!data) {
    throw appErrors.notFound("TBM assignment not found for tunnel ID: " + tunnelId);
  }
  return mapTbmAssignmentRowToEntity(data);
}

export async function fetchTbmAssignmentByTbmId(tbmId: string): Promise<TbmAssignment> {
  const data = await getTbmAssignmentByTbmId(tbmId);
  if (!data) {
    throw appErrors.notFound("TBM assignment not found for TBM ID: " + tbmId);
  }
  return mapTbmAssignmentRowToEntity(data);
}
