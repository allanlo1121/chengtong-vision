import { useContext } from "react";
import { OrganizationScopeContext } from "./OrganizationScopeProvider";

export function useOrganizationScope() {
  const ctx = useContext(OrganizationScopeContext);

  if (!ctx) {
    throw new Error("useOrganizationScope must be used inside OrganizationScopeProvider");
  }

  return ctx;
}
