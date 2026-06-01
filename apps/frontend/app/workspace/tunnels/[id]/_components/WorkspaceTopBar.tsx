"use client";

import { usePathname } from "next/navigation";
import { Breadcrumbs } from "@/components/common/bread-crubms";
import { generateBreadcrumbs } from "@/lib/core/router/generate-breadcrumbs";
import { Separator } from "@/components/ui/separator";

function WorkspaceTopBar() {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      {breadcrumbs.length > 0 && <Breadcrumbs breadcrumbs={breadcrumbs} />}
    </header>
  );
}

export { WorkspaceTopBar };
