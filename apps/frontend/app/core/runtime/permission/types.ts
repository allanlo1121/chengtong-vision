// permission/types.ts

export interface PermissionState {
  can: (code: string) => boolean;
  canAny: (codes: string[]) => boolean;
  hasRole: (role: string) => boolean;
  isSuperAdmin: boolean;
}
