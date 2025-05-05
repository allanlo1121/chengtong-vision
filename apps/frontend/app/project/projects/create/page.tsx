import Form from "@/components/project/projects/create-form";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { fetchEmployeeByPosition } from "@/lib/hrm/data";
import { Leader } from "@/lib/hrm/definitions";
import { fetchAllRegion } from "@/lib/project/data";
import { IRegion } from "@/lib/project/types";

export default async function Page() {
  const regions: IRegion[] = await fetchAllRegion();
  const leaders: Leader[] = await fetchEmployeeByPosition("项目经理");
  console.log("regions", regions); // 片区
  console.log("leaders", leaders); // 领导
  

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "项目", href: "/projects/projects" },
          {
            label: "新建项目",
            href: "/projects/projects/create",
            active: true,
          },
        ]}
      />
      <Form regions={regions} leaders={leaders} />
    </main>
  );
}
