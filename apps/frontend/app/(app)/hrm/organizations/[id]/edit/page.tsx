import { getOrganizationById } from "@/lib/domain/organization/services";
import { notFound } from "next/navigation";
import { UpdateOrganization } from "@/lib/domain/organization/components/forms";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  console.log("===organization page ===");

  const { id } = await params;

  const organization = await getOrganizationById(id);

  if (!organization?.success) notFound();
  console.log("organization page", organization);

  return (
    <main>
      <UpdateOrganization title="编辑组织" description="org" initialValues={organization.data} />
    </main>
  );
}
