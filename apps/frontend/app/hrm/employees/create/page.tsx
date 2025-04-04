import Form from "@/components/hrm/employees/create-form";
import Breadcrumbs from "@/components/hrm/departments/breadcrumbs";
import {
  fetchDepartments,
  fetchEmploymentTypes,
  fetchEmployers,
} from "@/lib/hrm/data";

export default async function Page() {
  const departments = await fetchDepartments();
  const employmentTypes = await fetchEmploymentTypes();
  const employers = await fetchEmployers();
  console.log(employers);
  console.log(employmentTypes);
  console.log(departments);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "员工", href: "/hrm/employees" },
          {
            label: "新建员工",
            href: "/hrm/employees/create",
            active: true,
          },
        ]}
      />
      <Form
        departments={departments}
        employmentTypes={employmentTypes}
        employers={employers}
      />
    </main>
  );
}
