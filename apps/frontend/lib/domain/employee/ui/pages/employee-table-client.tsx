"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/data-table/data-table";
import { organizationColumns } from "@/lib/domain/organization/ui/components/organization-columns";

export function EmployeeTableClient(props: {
  items: any[];
  total: number;
  page: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: string;
}) {
  const router = useRouter();

  return (
    <DataTable
      columns={organizationColumns}
      data={props.items}
      total={props.total}
      page={props.page}
      pageSize={props.pageSize}
      manualPagination
      sorting={props.sortBy ? [{ id: props.sortBy, desc: props.sortDirection === "desc" }] : []}
      onSortingChange={(sorting) => {
        if (!sorting.length) return;

        const s = sorting[0];

        const params = new URLSearchParams(window.location.search);

        params.set("sortBy", s.id);
        params.set("sortDirection", s.desc ? "desc" : "asc");

        router.push(`?${params.toString()}`);
      }}
      onPaginationChange={(page, pageSize) => {
        const params = new URLSearchParams(window.location.search);

        params.set("page", String(page));
        params.set("pageSize", String(pageSize));

        router.push(`?${params.toString()}`);
      }}
    />
  );
}
