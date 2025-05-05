import Form from "@/components/resource-center/tunnel/create-form";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { fetchAllProjectsBasic } from "@/lib/project/data";
import { fetchAllTbms } from "@/lib/tbm/data";
import { ITbmBaseInfo } from "@/lib/tbm/types";

export default async function Page() {
  // Fetch data for the form
  
  const projects = await fetchAllProjectsBasic();
  const tbms: ITbmBaseInfo[] = await fetchAllTbms(); 
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "区间", href: "/resource-center/tunnel" },
          {
            label: "新建区间",
            href: "/resource-center/tunnel/create",
            active: true,
          },
        ]}
      />
      <Form projects={projects} tbms={tbms} />
    </main>
  );
}
