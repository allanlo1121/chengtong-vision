// frontend/hooks/use-master-data.ts
import { useContext } from "react";
import { MasterDataContext } from "@frontend/providers/master-data-context";

export function useMasterData() {
  const ctx = useContext(MasterDataContext);
  if (!ctx) {
    throw new Error("useMasterData must be used within MasterDataProvider");
  }
  return ctx;
}
