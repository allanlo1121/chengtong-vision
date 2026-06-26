import { Breadcrumbs } from "@/components/common/bread-crubms";
import { fetchProjectById } from "@/lib/domain/project/services";

import UpdateProject from "@/lib/domain/project/components/forms/update";
import { ErrorBlock } from "@/components/common/error-block";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  console.log("===project page ===");

  const { id } = await params;

  let project;
  try {
    project = await fetchProjectById(id);
  } catch (error) {
    console.error("Failed to fetch project detail", error);
    return (
      <ErrorBlock
        message={error instanceof Error ? error.message : "Failed to fetch project detail"}
      />
    );
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "系统设置", href: "/system" },
          { label: "项目", href: "/system/projects" },
          {
            label: "编辑项目",
            active: true,
          },
        ]}
      />
      <UpdateProject title="编辑项目" description="project" initialValues={project} />
    </main>
  );
}
