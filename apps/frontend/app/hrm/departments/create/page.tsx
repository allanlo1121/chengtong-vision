import Form from "@/components/hrm/departments/create-form";
import Breadcrumbs from "@/components/hrm/departments/breadcrumbs";
import { fetchManagers } from "@/lib/hrm/data";

export default async function Page() {
  const managers = await fetchManagers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "部门", href: "/hrm/departments" },
          {
            label: "新建部门",
            href: "/hrm/departments/create",
            active: true,
          },
        ]}
      />
      <Form managers={managers} />
    </main>
  );
}
