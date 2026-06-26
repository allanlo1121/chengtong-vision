import { Breadcrumbs } from "@/components/common/bread-crubms";
import { fetchTunnelById } from "@/lib/domain/tunnel/services";
import { fetchProjectById } from "@/lib/domain/project/services";
import { getErrorMessage } from "@/lib/shared/contracts/error-codes";
import { ErrorBlock } from "@/components/common/error-block";
import { UpdateTunnel } from "@/lib/domain/tunnel/components/forms";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  console.log("===tunnel page ===");

  const { id } = await params;
  let tunnel;
  let project;
  try {
    tunnel = await fetchTunnelById(id);
    project = await fetchProjectById(tunnel.projectId);
  } catch (error) {
    console.error("Error fetching tunnel:", error);
    return <ErrorBlock message={getErrorMessage(error)} />;
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "系统设置", href: "/system" },
          { label: "隧道", href: "/system/tunnels" },
          {
            label: "编辑隧道",
            active: true,
          },
        ]}
      />
      <UpdateTunnel title="编辑隧道" description="隧道" initialValues={tunnel} />
    </main>
  );
}
