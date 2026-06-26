// org/types.ts

export interface OrganizationScopeState {
  organizationId: string;
  organizationIds: string[];
  isInScope: (organizationIds: string) => boolean;
}
