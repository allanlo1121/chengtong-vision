import { Breadcrumbs } from "@/components/common/bread-crubms";
import { CreateEmployee } from "@/lib/domain/employee/components/forms";

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
      <Breadcrumbs
        breadcrumbs={[
          { label: "系统设置", href: "/system" },
          { label: "员工", href: "/hrm/employees" },
          {
            label: "新建员工",
            active: true,
          },
        ]}
      />

      <CreateEmployee
        title="新建员工"
        description="在此处创建一个新的员工。请确保提供准确的信息，以便正确设置员工的角色和权限。"
        parentId={parentId}
      />
    </main>
  );
}
