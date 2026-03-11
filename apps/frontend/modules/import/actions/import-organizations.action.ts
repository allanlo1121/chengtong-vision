export async function importOrganizationsAction(
  rows: CreateOrganizationInput[]
): Promise<ActionResult<any>> {
  return importOrganizationsService(rows);
}
