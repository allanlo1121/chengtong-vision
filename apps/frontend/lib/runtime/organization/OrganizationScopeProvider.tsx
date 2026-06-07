// org/OrgScopeProvider.tsx

import { createContext, useMemo } from "react";
import { useUser } from "../user/useUser";

interface OrganizationScopeContextType {
  organizationId: string;
  organizationIds: string[];
  isInScope: (organizationPath: string) => boolean;
}

export const OrganizationScopeContext = createContext<OrganizationScopeContextType | null>(null);

export function OrganizationScopeProvider({ children }: { children: React.ReactNode }) {
  const user = useUser();

  const value = useMemo(
    () => ({
      organizationId: user.organizationId,
      organizationIds: user.organizationIds,
      isInScope: (organizationPath: string) => {
        return user.organizationIds.some((id) => organizationPath.startsWith(id));
      },
    }),
    [user]
  );

  return (
    <OrganizationScopeContext.Provider value={value}>{children}</OrganizationScopeContext.Provider>
  );
}
