import { getEmployeeById } from "@/lib/domain/employee/services";
import { notFound } from "next/navigation";
import { UpdateEmployee } from "@/lib/domain/employee/components/forms";
import { ErrorBlock } from "@/components/common/error-block";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  console.log("===employee page ===");

  const { id } = await params;
  let employee;
  try {
    employee = await getEmployeeById(id);
  } catch (error) {
    console.error("Failed to fetch employee:", error);
    return <ErrorBlock message={error instanceof Error ? error.message : "查询失败"} />;
  }

  return (
    <main>
      <UpdateEmployee title="编辑员工" description="employee" initialValues={employee} />
    </main>
  );
}
