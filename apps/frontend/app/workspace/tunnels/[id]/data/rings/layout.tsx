"use client";

import { useEffect } from "react";
import { useParameterNameMap } from "@/lib/domain/tbm-runtime/stores/use-parameter-name-map";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const loadParameterMetaMap = useParameterNameMap((s) => s.loadParameterMetaMap);

  useEffect(() => {
    loadParameterMetaMap();
  }, [loadParameterMetaMap]);

  return <>{children}</>;
}
