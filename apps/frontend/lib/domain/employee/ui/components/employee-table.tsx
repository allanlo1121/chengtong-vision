// "use client";

// import { useCallback } from "react";
// import { EmployeeListPage } from "../pages/employee-list-page";
// import { EmployeeListItem } from "../../types";
// import { EmployeeEditDialog } from "../pages/edit-dialog";

// interface Props {
//   data: EmployeeListItem[];
//   total: number;
//   page: number;
//   pageSize: number;
//   setEditingOrg: (id: string | null) => void;
//   search?: string;
// }

// export function EmployeeTable({ data, total, page, pageSize, setEditingOrg, search }: Props) {
//   const onEdit = useCallback(
//     (id: string | null) => {
//       setEditingOrg(id);
//     },
//     [setEditingOrg]
//   );
//   return (
//     <EmployeeListPage
//       data={data}
//       total={total}
//       page={page}
//       pageSize={pageSize}
//       search={search}
//       onEdit={onEdit}
//     />
//   );
// }
