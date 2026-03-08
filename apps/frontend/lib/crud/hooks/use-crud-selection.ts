"use client";

import { useState } from "react";

export function useCrudSelection<T>() {
  const [selected, setSelected] = useState<T[]>([]);

  const clearSelection = () => setSelected([]);

  return {
    selected,
    setSelected,
    clearSelection,
  };
}
