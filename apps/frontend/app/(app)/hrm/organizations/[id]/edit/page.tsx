import { fetchOrganizationFormById, getOrganizationById } from "@/lib/domain/organization/services";

import { UpdateOrganization } from "@/lib/domain/organization/components/forms";
import { ErrorBlock } from "@/components/common/error-block";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  console.log("===organization page ===");

  const { id } = await params;

  let organization;
  try {
    organization = await fetchOrganizationFormById(id);
    console.log("Fetched organization for editing:", organization);
  } catch (error) {
    console.error("Failed to fetch organization detail", error);
    return (
      <ErrorBlock
        message={error instanceof Error ? error.message : "Failed to fetch organization"}
      />
    );
  }

  return (
    <main>
      <UpdateOrganization title="编辑组织" description="org" initialValues={organization} />
    </main>
  );
}
