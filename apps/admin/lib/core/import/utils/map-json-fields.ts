export const organizationMapping: Record<string, string> = {
  org_id: "id",
  org_name: "name",
  org_code: "code",
  org_parent: "parentId",
  org_type: "orgTypeId",
  org_address: "address",
  org_address_lat: "latitude",
  org_address_lon: "longitude",
};

export function mapJsonFields(rows: any[], mapping: Record<string, string>) {
  return rows.map((row) => {
    const result: any = {};

    for (const key in mapping) {
      result[mapping[key]] = row[key];
    }

    return result;
  });
}
