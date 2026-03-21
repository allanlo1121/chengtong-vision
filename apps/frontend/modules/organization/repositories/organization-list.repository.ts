import { createClient } from "@/lib/infra/supabase/server";

import { mapOrganizationList } from "../types/organization.mapper";
import { OrganizationQueryType } from "../queries";
// import {
//   OrganizationDetail,
//   OrganizationDetailRow,
//   OrganizationListItem,
//   OrganizationListRow,
//   OrganizationTreeItem,
//   OrganizationTreeRow,
//   OrganizationRow,
// } from "../types";
import { PageData } from "@/modules/shared/contracts";

import { applyPagination, assertNoError } from "@/lib/infra/repositories/base.repository";

import { OrganizationDetailRow, OrganizationListRow, OrganizationTreeRow } from "../types";
import { rpc } from "@/lib/core/rpc";

export async function listOrganizationsRepository(
  query: OrganizationQueryType
): Promise<PageData<OrganizationListRow>> {
  const { data, error } = await rpc("tree_query_organizations", query);

  assertNoError(error);

  const total = data?.[0]?.total_count ?? 0;

  return {
    items: data as OrganizationListRow[],
    total,
  };
}
