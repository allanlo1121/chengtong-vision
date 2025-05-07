import Form from "@/components/project/projects/edit-form";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { fetchAllRegion, fetchProjectById } from "@/lib/project/data";
import { fetchEmployeeByPosition } from "@/lib/hrm/data";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  console.log("params", params); // { id: "1" }
  console.log("id", id); // "1"
  const [project, regions, leaders] = await Promise.all([
    fetchProjectById(id),
    fetchAllRegion(),
    fetchEmployeeByPosition("项目经理"),
  ]);

  if (!project) {
    notFound();
  }

  console.log("edit project", project);
  console.log(regions);
  console.log(leaders);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "隧道进度",
            href: "/production-center/construction-progress",
          },
          {
            label: "编辑进度",
            href: "/production-center/construction-progress/${id}/edit",
            active: true,
          },
        ]}
      />
      <Form project={project} regions={regions} leaders={leaders} />
    </main>
  );
}
