import { OrganizationListPage } from "@/modules/organization/pages/organization-list-page";
import { ErrorBlock } from "@/components/common/error-block";
import {
  OrganizationListQuerySchema,
  OrganizationListQueryType,
} from "@/modules/organization/schemas/query.schema";
import { listOrganizations, getOrganizationTree } from "@/modules/organization/services";
import { OrganizationTree } from "@/modules/organization/pages/organization-tree";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const rawParams = await searchParams;

  const params = OrganizationListQuerySchema.parse(rawParams);

  console.log("parsed params", params);

  const data = await getOrganizationTree();
  if (!data.success) {
    return <ErrorBlock message={data.error} />;
  }

  const tree = data.data;
  const result = await listOrganizations(params);

  if (!result.success) {
    return <ErrorBlock message={result.error} />;
  }

  const { items, total, page, pageSize } = result.data;

  return (
    <div className="flex h-full">
      <OrganizationTree tree={tree} />
      <div className="flex-1 p-4">
        <OrganizationListPage
          data={items}
          total={total}
          page={page}
          pageSize={pageSize}
          search={params.search}
        />
      </div>
    </div>
  );
}
