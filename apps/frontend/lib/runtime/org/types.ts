// org/types.ts

export interface OrgScopeState {
  orgNodeId: string;
  orgPath: string;
  isInScope: (orgPath: string) => boolean;
}
