// org/OrgScopeProvider.tsx

import { createContext, useContext, useMemo } from "react";
import { useUser } from "../user/useUser";

interface OrgScopeContextType {
  orgNodeId: string;
  isInScope: (orgId: string) => boolean;
}

export const OrgScopeContext = createContext<OrgScopeContextType | null>(null);

export function OrgScopeProvider({ children }: { children: React.ReactNode }) {
  const user = useUser();

  const value = useMemo(
    () => ({
      orgNodeId: user.orgNodeId,
      isInScope: (orgId: string) => {
        return orgId.startsWith(user.orgPath);
      },
    }),
    [user]
  );

  return <OrgScopeContext.Provider value={value}>{children}</OrgScopeContext.Provider>;
}

// export const useOrgScope = () => {
//   const ctx = useContext(OrgScopeContext)
//   if (!ctx) throw new Error("OrgScopeProvider missing")
//   return ctx
// }
