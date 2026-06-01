// org/OrgScopeProvider.tsx

import { createContext, useMemo } from "react";
import { useUser } from "../user/useUser";

interface OrganizationScopeContextType {
  organizationId: string;
  organizationPath: string;
  isInScope: (organizationPath: string) => boolean;
}

export const OrganizationScopeContext = createContext<OrganizationScopeContextType | null>(null);

export function OrganizationScopeProvider({ children }: { children: React.ReactNode }) {
  const user = useUser();

  const value = useMemo(
    () => ({
      organizationId: user.organizationId,
      organizationPath: user.organizationPath,
      isInScope: (organizationPath: string) => {
        return organizationPath.startsWith(user.organizationPath);
      },
    }),
    [user]
  );

  return (
    <OrganizationScopeContext.Provider value={value}>{children}</OrganizationScopeContext.Provider>
  );
}
