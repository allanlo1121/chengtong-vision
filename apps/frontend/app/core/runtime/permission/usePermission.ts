import { useContext } from "react";
import { PermissionContext } from "./PermissionProvider";

export function usePermission() {
  const ctx = useContext(PermissionContext);

  if (!ctx) {
    throw new Error("usePermission must be used inside PermissionProvider");
  }

  return ctx;
}
