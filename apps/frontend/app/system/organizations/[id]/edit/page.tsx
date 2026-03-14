import { Breadcrumbs } from "@/components/common/bread-crubms";
import { getOrganizationById } from "@/modules/organization/services/organization.service";
import { notFound } from "next/navigation";
import UpdateOrganization from "../../_forms/update-organization";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  console.log("===organization page ===");

  const { id } = await params;

  const organization = await getOrganizationById(id);

  if (!organization?.success) notFound();
  console.log("organization page", organization);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "系统设置", href: "/system" },
          { label: "组织", href: "/system/organizations" },
          {
            label: "编辑组织",
            active: true,
          },
        ]}
      />
      <UpdateOrganization title="编辑组织" description="org" initialValues={organization.data} />
    </main>
  );
}
