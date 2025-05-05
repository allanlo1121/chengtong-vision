import Form from "@/components/resource-center/tunnel/edit-form";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { fetchTunnelById } from "@/lib/resource-center/tunnel/data";
import { notFound } from "next/navigation";
import { fetchAllProjectsBasic } from "@/lib/project/data";
import { fetchAllTbms } from "@/lib/tbm/data";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id; 
  const [tunnel, projects, tbms] = await Promise.all([
    fetchTunnelById(id),
    fetchAllProjectsBasic(),
    fetchAllTbms(),
  ]);

  if (!tunnel) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "工程区间", href: "/resource-center/tunnel" },
          {
            label: "编辑工程区间",
            href: "/resource-center/tunnel/${id}/edit",
            active: true,
          },
        ]}
      />
      <Form tunnel={tunnel} projects={projects} tbms={tbms} />
    </main>
  );
}
