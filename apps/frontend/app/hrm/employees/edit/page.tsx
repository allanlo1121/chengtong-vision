import Form from "@/components/hrm/departments/create-form";
import Breadcrumbs from "@/components/hrm/departments/breadcrumbs";
import { fetchEmployeeById } from "@/lib/hrm/data";

export default async function Page() {
  //nst managers = await fetchManagers();
  const employee = await fetchEmployeeById('22010001');
    console.log("edit employee",employee);

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
      {/* <Form managers={managers} /> */}
    </main>
  );
}