import Form from "@/components/hrm/employees/edit-form";
import Breadcrumbs from "@/components/hrm/employees/breadcrumbs";
import {
  fetchDepartments,
  fetchEmploymentTypes,
  fetchEmployers,
  fetchEmployeeById,
} from "@/lib/hrm/data";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  const id = params.id;
  const [employee, departments, employmentTypes, employers] =
    await Promise.all([
      fetchEmployeeById(id),
      fetchDepartments(),
      fetchEmploymentTypes(),
      fetchEmployers(),
    ]);

  if (!employee) {
    notFound();
  }

  console.log("edit employee", employee);
  console.log(employers);
  console.log(employmentTypes);
  console.log(departments);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "员工", href: "/hrm/employees" },
          {
            label: "编辑员工",
            href: "/hrm/employees/${id}/edit",
            active: true,
          },
        ]}
      />
      <Form
        employee={employee}
        departments={departments}
        employmentTypes={employmentTypes}
        employers={employers}
      />
    </main>
  );
}
