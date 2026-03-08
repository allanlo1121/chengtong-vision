// ============================================
// 🚨 AUTO-GENERATED FILE. DO NOT EDIT MANUALLY.
// ============================================

export const Permission = {
  EMPLOYEE: {
    READ: "employee.read",
    WRITE: "employee.write",
  },
  ORGANIZATION: {
    READ: "organization.read",
    WRITE: "organization.write",
  },
  PROJECT: {
    READ: "project.read",
    WRITE: "project.write",
  },
} as const;

type ValueOf<T> = T[keyof T];
type NestedValueOf<T> = ValueOf<ValueOf<T>>;
export type PermissionCode = NestedValueOf<typeof Permission>;
