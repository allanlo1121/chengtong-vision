import CreateProject from "@/lib/domain/project/components/forms/create";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  return (
    <main>
      <CreateProject
        title="新建项目"
        description="在此处创建一个新的项目。请确保提供准确的信息，以便正确设置项目的结构和权限。"
      />
    </main>
  );
}
