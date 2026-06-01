"use client";

import { createContext, useContext, useState } from "react";

import type { BreadcrumbItem } from "@/components/common/bread-crubms";

type BreadcrumbContextValue = {
  breadcrumbs: BreadcrumbItem[];

  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void;
};

const BreadcrumbContext = createContext<BreadcrumbContextValue | undefined>(undefined);

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

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
