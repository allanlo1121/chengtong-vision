import { Breadcrumbs } from "@/components/common/bread-crubms";
import CreateTunnel from "@/lib/domain/tunnel/pages/create-tunnel";

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "指挥平台", href: "/" },
          { label: "隧道", href: "/tunnels" },
          {
            label: "新建隧道",
            active: true,
          },
        ]}
      />

      <CreateTunnel
        title="新建隧道"
        description="在此处创建一个新的隧道。请确保提供准确的信息，以便正确设置隧道的结构和权限。"
      />
    </main>
  );
}
