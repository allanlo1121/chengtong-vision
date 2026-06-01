import { getEmployeeById } from "@/lib/domain/employee/services";
import { notFound } from "next/navigation";
import { UpdateEmployee } from "@/lib/domain/employee/components/forms";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  console.log("===employee page ===");

  const { id } = await params;

  const employee = await getEmployeeById(id);

  if (!employee?.success) notFound();
  console.log("employee page", employee);

  return (
    <main>
      <UpdateEmployee title="编辑员工" description="employee" initialValues={employee.data} />
    </main>
  );
}
