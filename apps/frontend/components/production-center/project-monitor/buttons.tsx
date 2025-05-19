import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteTbm } from "@/lib/tbm/actions";
import { ITunnelBasic } from "@/lib/project/tunnel/types";

export function CreateTbm() {
  return (
    <Link
      href="/resource-center/tbm/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">添加盾构机</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateTbm({ id }: { id: string }) {
  return (
    <Link
      href={`/resource-center/tbm/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteTbm({ id }: { id: string }) {
  const deleteTbmWithId = deleteTbm.bind(null, id);
  return (
    <form action={deleteTbmWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function EditTunnel({
  tunnel,
  index,
}: {
  tunnel: ITunnelBasic;
  index: number;
}) {
  return (
    <Link href={`/resource-center/tunnel/${tunnel.id}/edit`}>
      <div
        className="col-span-1 w-3/4 h-12 border-blue-500 border-4 rounded-l-2xl p-0   hover:bg-blue-50 hover:cursor-pointer"
        key={tunnel.id}
      >
        <span className="pl-2 leading-10 font-bold">{index + 1}</span>
        <span className="pl-2 leading-10">{tunnel.projectShortName}</span>
        <span className="pl-1 leading-10"> {tunnel.shortName}</span>
      </div>
    </Link>
  );
}

export function EditProgress({ tunnel }: { tunnel: ITunnelBasic }) {
  return (
    <Link
      className="text-blue-500 hover:text-blue-700"
      href={`/production-center/construction-progress/${tunnel.id}/edit`}
    >
      {tunnel.shortName}
    </Link>
  );
}


// export function EditTunnel({
//   tunnel,
//   index,
// }: {
//   tunnel: ITunnelBasic;
//   index: number;
// }) {
//   return (
//     <Link href={`/resource-center/tunnel/${tunnel.id}/edit`}>
//       <div
//         className="col-span-1 w-3/4 h-12 border-blue-500 border-4 rounded-l-2xl p-0   hover:bg-blue-50 hover:cursor-pointer"
//         key={tunnel.id}
//       >
//         <span className="pl-2 leading-10 font-bold">{index + 1}</span>
//         <span className="pl-2 leading-10">{tunnel.projectShortName}</span>
//         <span className="pl-1 leading-10"> {tunnel.shortName}</span>
//       </div>
//     </Link>
//   );
// }

// export function EditProgress({ tunnel }: { tunnel: ITunnelBasic }) {
//   return (
//     <Link
//       className="text-blue-500 hover:text-blue-700"
//       href={`/production-center/construction-progress/${tunnel.id}/edit`}
//     >
//       {tunnel.projectShortName}
//     </Link>
//   );
// }