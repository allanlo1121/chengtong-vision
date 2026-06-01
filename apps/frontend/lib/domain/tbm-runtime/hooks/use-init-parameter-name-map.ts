"use client";

import { useEffect } from "react";
import { useParameterNameMap } from "../stores/use-parameter-name-map";

export function useInitParameterNameMap() {
  const loadParameterMetaMap = useParameterNameMap((state) => state.loadParameterMetaMap);

  useEffect(() => {
    void loadParameterMetaMap();
  }, [loadParameterMetaMap]);
}
