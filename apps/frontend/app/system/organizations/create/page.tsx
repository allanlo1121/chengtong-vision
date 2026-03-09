import CreateOrganization from "@/modules/organization/forms/create-organization";

export default function Page() {
  return (
    <CreateOrganization
      title="新建组织"
      description="在此处创建一个新的组织。请确保提供准确的信息，以便正确设置组织的结构和权限。"
    />
  );
}
