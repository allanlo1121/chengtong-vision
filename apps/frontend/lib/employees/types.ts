// lib/employees/types.ts

export type SupabaseEmployeeRaw = {
  id: string;

  name: string;
  employee_code: string;

  phone: string | null;
  email: string | null;

  organization_id: string;
  position_code: string;

  is_leader: boolean;
  is_active: boolean;
};

export type EmployeeQueryFilter = {
  organizationId?: string;
  isActive?: boolean;
};
