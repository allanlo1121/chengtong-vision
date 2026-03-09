// import Form from "@/components/hrm/departments/edit-form";
// import Breadcrumbs from "@/components/hrm/departments/breadcrumbs";
// import { fetchDepartmentById, fetchManagers } from "@/lib/hrm/data";
import { Breadcrumbs } from "@/components/common/bread-crubms";
import { getOrganizationById } from "@/modules/organization/services/organization.service";
import { CrudFormPage } from "@/modules/shared/crud/components/crud-form-page";
import { notFound } from "next/navigation";
import { UpdateOrganizationSchema } from "@/modules/organization/schemas";
import UpdateOrganization from "@/modules/organization/forms/update-organization";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  console.log("===organization page ===");

  const params = await props.params;
  const id = params.id;
  const organization = await getOrganizationById(id);
  // const [department, managers] = await Promise.all([
  //     fetchDepartmentById(id),
  //     fetchManagers(),
  // ]);

  if (!organization || organization.success === false) {
    notFound();
  }
  console.log("organization page", organization);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "系统设置", href: "/system" },
          { label: "组织", href: "/system/organizations" },
          {
            label: "编辑组织",
            active: true,
          },
        ]}
      />
      org id: {id}
      <UpdateOrganization title="编辑组织" description="org" initialValues={organization.data} />
      {/* <Form department={department} managers={managers} /> */}
    </main>
  );
}
