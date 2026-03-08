// permission/types.ts

export interface PermissionState {
  hasPermission: (code: string) => boolean;
  hasAnyPermission: (codes: string[]) => boolean;
  hasRole: (role: string) => boolean;
  isSuperAdmin: boolean;
}
