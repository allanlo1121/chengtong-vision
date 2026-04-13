import { usePermission } from "@/lib/runtime/permission/usePermission";

export function useCrudPermission(permission: string) {
  const { hasPermission } = usePermission();

  return {
    canRead: hasPermission(permission),
    canCreate: hasPermission(permission.replace(".read", ".create")),
    canDelete: hasPermission(permission.replace(".read", ".delete")),
  };
}
