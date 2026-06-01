import { Breadcrumbs } from "@/components/common/bread-crubms";
import { getTbmById } from "@/lib/domain/tbm/services";
import { notFound } from "next/navigation";
import { UpdateTbm } from "@/lib/domain/tbm/components/forms";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  console.log("===organization page ===");

  const { id } = await params;

  const tbm = await getTbmById(id);

  if (!tbm?.success) notFound();
  console.log("tbm page", tbm);

  return (
    <main>
      <UpdateTbm title="编辑TBM" description="TBM信息" initialValues={tbm.data} />
    </main>
  );
}
