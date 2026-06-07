import { getTbmRuntimeParameterById } from "@/lib/domain/tbm-runtime/services";

import { UpdateTbmRuntimeParameter } from "@/lib/domain/tbm-runtime/components/forms";
import { ErrorBlock } from "@/components/common/error-block";

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  console.log("===update tbm runtime parameter page ===");

  const { id } = await params;

  let tbmParameter;

  try {
    tbmParameter = await getTbmRuntimeParameterById(id);
  } catch (error) {
    console.error("Error fetching TBM runtime parameter:", error);
    return <ErrorBlock message="加载TBM运行参数失败，请稍后再试" />;
  }

  return (
    <main>
      <UpdateTbmRuntimeParameter
        title="编辑TBM运行参数"
        description="TBM运行参数信息"
        initialValues={tbmParameter}
      />
    </main>
  );
}
