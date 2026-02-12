import { Plus } from "lucide-react";
import Link from "next/link";
// import { deleteEmployee } from "@/lib/hrm/emp-actions";

export function CreateTbm() {
  return (
    <Link
      href="/tbms/create"
      className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <Plus className="h-5 md:ml-2" />
      <span className="hidden md:block">新建盾构机</span>{" "}
    </Link>
  );
}

// export function UpdateEmployee({ id }: { id: number}) {
//   return (
//     <Link
//       href={`/hrm/employees/${id}/edit`}
//       className="rounded-md border p-2 hover:bg-gray-100"
//     >
//       <PencilIcon className="w-5" />
//     </Link>
//   );
// }

// export function DeleteEmployee({ id }: { id: number }) {
//   const deleteEmployeeWithId = deleteEmployee.bind(null, id);
//   return (
//     <form action={deleteEmployeeWithId}>
//       <button className="rounded-md border p-2 hover:bg-gray-100">
//         <span className="sr-only">Delete</span>
//         <TrashIcon className="w-5" />
//       </button>
//     </form>
//   );
// }
