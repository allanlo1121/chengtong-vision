// org/types.ts

export interface OrganizationScopeState {
  organizationId: string;
  organizationPath: string;
  isInScope: (organizationPath: string) => boolean;
}
