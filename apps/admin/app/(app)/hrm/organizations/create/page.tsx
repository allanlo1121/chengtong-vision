import { CreateOrganization } from "@/lib/domain/organization/components/forms";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  const parentId = typeof params.parentId === "string" ? params.parentId : undefined;

  console.log("organization create page parentId", parentId);
  return (
    <main>
      <CreateOrganization
        title="新建组织"
        description="在此处创建一个新的组织。请确保提供准确的信息，以便正确设置组织的结构和权限。"
        parentId={parentId}
      />
    </main>
  );
}
