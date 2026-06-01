import { Skeleton } from "@/components/ui/skeleton";

import { notFound } from "next/navigation";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-3 w-[200px]" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 w-[300px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
