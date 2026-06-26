import { ParameterSubsystemNode } from "../types";
import { searchTbmSubsystems } from "../repositories";

export async function listTbmSubsystems(): Promise<ParameterSubsystemNode[]> {
  return await searchTbmSubsystems();
}
