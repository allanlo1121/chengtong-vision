import { CreateTbmRuntimeParameter } from "@/lib/domain/tbm-runtime/components/forms/create-parameter";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  return (
    <main>
      <CreateTbmRuntimeParameter
        title="新建TBM"
        description="在此处创建一个新的TBM。请确保提供准确的信息，以便正确设置TBM的结构和权限。"
      />
    </main>
  );
}
