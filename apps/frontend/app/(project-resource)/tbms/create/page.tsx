import Form from "@frontend/components/tbms/create-form";
import { getMasterOptions } from "@frontend/lib/services/master-data/master-option";
import { getSubjectOptions } from "@frontend/lib/services/subject/subject-option";
// import Breadcrumbs from "@/components/hrm/departments/breadcrumbs";
// import {
//   fetchDepartments,
//   fetchEmploymentTypes,
//   fetchEmployers,
// } from "@/lib/hrm/data";

export default async function Page() {
  //   const departments = await fetchDepartments();
  //   const employmentTypes = await fetchEmploymentTypes();
  //   const employers = await fetchEmployers();
  //   console.log(employers);
  //   console.log(employmentTypes);
  //   console.log(departments);
  const tbmTypeOptions = await getMasterOptions("TBM_TYPE");
  console.log("tbmTypeOptions", tbmTypeOptions);
  const manufacturerOptions = await getSubjectOptions("10810012");
  const mechSourceTypeOptions = await getMasterOptions("MECH_SOURCE_TYPE");
  const ownerOptions = await getSubjectOptions("10810013");

  return (
    <main>
      新建盾构机
      {/* <Breadcrumbs
        breadcrumbs={[
          { label: "员工", href: "/hrm/employees" },
          {
            label: "新建员工",
            href: "/hrm/employees/create",
            active: true,
          },
        ]}
      /> */}
      <Form
        tbmTypeOptions={tbmTypeOptions}
        manufacturerOptions={manufacturerOptions}
        mechSourceTypeOptions={mechSourceTypeOptions}
        ownerOptions={ownerOptions}
      />
    </main>
  );
}
