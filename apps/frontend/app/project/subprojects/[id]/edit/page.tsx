import Form from "@/components/project/subprojects/edit-form";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { fetchSubprojectById } from "@/lib/project/subproject/data";
import { notFound } from "next/navigation";
import { fetchAllProjectsBasic } from "@/lib/project/data";
import { fetchAllTbms } from "@/lib/tbm/data";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  console.log("params", params); // { id: "1" }
  console.log("id", id); // "1"
  const [subproject, projects, tbms] = await Promise.all([
    fetchSubprojectById(id),
    fetchAllProjectsBasic(),
    fetchAllTbms(),
  ]);

  if (!subproject) {
    notFound();
  }

  console.log("edit subproject", subproject);
  // console.log(regions);
  // console.log(leaders);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "工程区间", href: "/project/subproject" },
          {
            label: "编辑工程区间",
            href: "/project/subproject/${id}/edit",
            active: true,
          },
        ]}
      />
      <Form subproject={subproject} projects={projects} tbms={tbms} />
    </main>
  );
}
