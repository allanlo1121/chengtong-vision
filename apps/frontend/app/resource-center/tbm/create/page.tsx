import Form from "@/components/resource-center/tbm/create-form";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { fetchAllProjectsBasic } from "@/lib/project/data";
import { fetchTbmOwners, fetchTbmProducers, fetchTbmTypes } from "@/lib/tbm/data";
import { fetchAllTbms } from "@/lib/tbm_del/data";
import { ITbmBaseInfo } from "@/lib/tbm_del/types";

export default async function Page() {
  // Fetch data for the form
  
 const producers = await fetchTbmProducers();
 const owners = await fetchTbmOwners();
 const types = await fetchTbmTypes();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "盾构机", href: "/resource-center/tbm" },
          {
            label: "添加盾构机",
            href: "/resource-center/tbm/create",
            active: true,
          },
        ]}
      />
      <Form producers={producers} owners={owners} types={types} />
    </main>
  );
}
