import { Breadcrumbs } from "@/components/common/bread-crubms";
import CreateOrganization from "@/modules/organization/forms/create-organization";

export default function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "系统设置", href: "/system" },
          { label: "组织", href: "/system/organizations" },
          {
            label: "新建组织",
            active: true,
          },
        ]}
      />

      <CreateOrganization
        title="新建组织"
        description="在此处创建一个新的组织。请确保提供准确的信息，以便正确设置组织的结构和权限。"
      />
    </main>
  );
}
