// user/types.ts

export interface RuntimeUser {
  userId: string;
  employeeId: string;
  name: string;
  orgNodeId: string;
  orgPath: string;
  roles: string[];
  permissions: string[];
}
