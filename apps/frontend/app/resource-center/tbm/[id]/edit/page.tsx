import Form from "@/components/resource-center/tbm/edit-form";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { notFound } from "next/navigation";
import {
  fetchTbmFormByTbmId,
  fetchTbmOwners,
  fetchTbmProducers,
  fetchTbmTypes,
} from "@/lib/tbm/data";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [tbm, producers, owners, types] = await Promise.all([
    fetchTbmFormByTbmId(id),
    fetchTbmProducers(),
    fetchTbmOwners(),
    fetchTbmTypes(),
  ]);

  if (!tbm) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "盾构机", href: "/resource-center/tbm" },
          {
            label: "编辑盾构机信息",
            href: "/resource-center/tbm/${id}/edit",
            active: true,
          },
        ]}
      />
      <Form tbm={tbm} producers={producers} owners={owners} types={types} />
    </main>
  );
}
