"use client";

import { OrganizationListPage } from "../pages/organization-list-page";
import { OrganizationListItem } from "../types";

interface Props {
  data: OrganizationListItem[];
  total: number;
  page: number;
  pageSize: number;
  search?: string;
}

export function OrganizationTable({ data, total, page, pageSize, search }: Props) {
  return (
    <OrganizationListPage
      data={data}
      total={total}
      page={page}
      pageSize={pageSize}
      search={search}
    />
  );
}
