// RuntimeProvider.tsx

import { AuthProvider } from "./auth/AuthProvider";
// import { MenuProvider } from "./menu/MenuProvider";
import { OrgScopeProvider } from "./org/OrgScopeProvider";
import { PermissionProvider } from "./permission/PermissionProvider";
import { UserProvider } from "./user/UserProvider";

export function RuntimeProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <UserProvider>
        <PermissionProvider>
          <OrgScopeProvider>
            {/* <MenuProvider>*/}
            {children}
            {/* </MenuProvider> */}
          </OrgScopeProvider>
        </PermissionProvider>
      </UserProvider>
    </AuthProvider>
  );
}
