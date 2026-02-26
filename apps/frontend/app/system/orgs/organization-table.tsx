// organization-table.tsx (Server Component)
import { DataTable } from "@/components/common/data-table";
import { PageState } from "@/components/common/page-state";
import { ErrorBlock } from "@/components/common/error-block";
import { getOrganizationListAction } from "@/lib/modules/organization/service";
import { columns } from "./columns";

export default async function OrganizationTable() {
  const result = await getOrganizationListAction();

  if (!result.success) {
    return <ErrorBlock message={result.error} />;
  }

  return (
    <PageState data={result.data} isEmpty={(d) => d.length === 0} emptyTitle="No organizations yet">
      {(data) => <DataTable data={data} columns={columns} />}
    </PageState>
  );
}
