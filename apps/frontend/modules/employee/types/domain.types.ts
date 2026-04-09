export type EmployeeListItem = {
  id: string;
  name: string;
  code: string | null;
  organizationId: string | null;
  organizationName: string | null;
  statusName: string | null;

  sortOrder: number;
  createdAt: string;
};
