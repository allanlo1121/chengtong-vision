import { getTbmRuntimeParameterById } from "@/lib/domain/tbm-runtime/services";
import { notFound } from "next/navigation";
import { UpdateTbmRuntimeParameter } from "@/lib/domain/tbm-runtime/components/forms";

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  console.log("===update tbm runtime parameter page ===");

  const { id } = await params;

  const tbm = await getTbmRuntimeParameterById(id);

  if (!tbm?.success) notFound();
  console.log("tbm page", tbm);

  return (
    <main>
      <UpdateTbmRuntimeParameter
        title="编辑TBM运行参数"
        description="TBM运行参数信息"
        initialValues={tbm.data}
      />
    </main>
  );
}
