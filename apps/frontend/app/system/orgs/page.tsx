import { Suspense } from "react";
import { TableSkeleton } from "@/components/common/loading-skeleton";
import OrganizationTable from "./organization-table";

export default function Page() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <OrganizationTable />
    </Suspense>
  );
}
