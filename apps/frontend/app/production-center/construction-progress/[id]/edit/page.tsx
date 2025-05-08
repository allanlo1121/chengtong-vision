//import Form from "@/components/project/projects/edit-form";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { fetchProgressByTunnelId } from "@/lib/project/progress/data";
// import { fetchAllRegion, fetchProjectById } from "@/lib/project/data";
// import { fetchEmployeeByPosition } from "@/lib/hrm/data";
import EditProgressForm from "@/components/production-center/construction-progress/edit-progress";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const progressData = await fetchProgressByTunnelId(id);

  if (!progressData) {
    notFound();
  }
  // console.log("edit progressData ", progressData);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "隧道进度",
            href: "/production-center/construction-progress",
          },
          {
            label: "编辑隧道进度",
            href: "/production-center/construction-progress/${id}/edit",
            active: true,
          },
        ]}
      />
      <EditProgressForm progressData={progressData} />
    </main>
  );
}
