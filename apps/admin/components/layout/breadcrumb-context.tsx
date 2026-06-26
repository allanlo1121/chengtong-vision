"use client";

import { createContext, useContext, useEffect, useState } from "react";

import type { BreadcrumbItem, BreadcrumbLabelMap } from "@/lib/domain/system/breadcrumb/types";
import { buildBreadcrumbsFromPathname } from "@/lib/domain/system/breadcrumb/Bread-crubms-pathname";

import { usePathname } from "next/dist/client/components/navigation";

type BreadcrumbContextValue = {
  breadcrumbs: BreadcrumbItem[];

  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void;
};

const BreadcrumbContext = createContext<BreadcrumbContextValue | undefined>(undefined);

export function BreadcrumbProvider({
  children,
  breadcrumbMap,
}: {
  children: React.ReactNode;
  breadcrumbMap: BreadcrumbLabelMap;
}) {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  useEffect(() => {
    console.log("BreadcrumbProvider useEffect - current pathname:", pathname);
    if (!pathname) return;

    async function build() {
      console.log("Building breadcrumbs for pathname:", pathname);

      const crumbs = buildBreadcrumbsFromPathname({ pathname, breadcrumbMap });
      console.log("Built breadcrumbs:", crumbs);
      setBreadcrumbs(crumbs);
    }

    void build();
  }, [pathname]);

  return (
    <BreadcrumbContext.Provider
      value={{
        breadcrumbs,
        setBreadcrumbs,
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumbContext() {
  const context = useContext(BreadcrumbContext);

  if (!context) {
    throw new Error("useBreadcrumbContext must be used within BreadcrumbProvider");
  }

  return context;
}
