import Form from "@/components/hrm/departments/edit-form";
import Breadcrumbs from "@/components/hrm/departments/breadcrumbs";
import { fetchDepartmentById, fetchManagers } from "@/lib/hrm/data";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  const id = params.id;
  const [department, managers] = await Promise.all([
    fetchDepartmentById(id),
    fetchManagers(),
  ]);

  if (!department) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "部门", href: "/hrm/departments" },
          {
            label: "编辑部门",
            href: `/hrm/departments/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form department={department} managers={managers} />
    </main>
  );
}
