import { useContext } from "react";
import { OrgScopeContext } from "./OrgScopeProvider";

export function useOrgScope() {
  const ctx = useContext(OrgScopeContext);

  if (!ctx) {
    throw new Error("useOrgScope must be used inside OrgScopeProvider");
  }

  return ctx;
}
