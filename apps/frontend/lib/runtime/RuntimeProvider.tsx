// RuntimeProvider.tsx

import { AuthProvider } from "./auth/AuthProvider";
import { MenuProvider } from "./menu/MenuProvider";
import { MenuNode } from "./menu/types";
import { OrgScopeProvider } from "./org/OrgScopeProvider";
import { PermissionProvider } from "./permission/PermissionProvider";
import { RuntimeUser } from "./user/types";
import { UserProvider } from "./user/UserProvider";

interface RuntimeProviderProps {
  children: React.ReactNode;
  runtimeUser: RuntimeUser;
  menus: MenuNode[];
}

export function RuntimeProvider({ children, runtimeUser, menus }: RuntimeProviderProps) {
  return (
    <AuthProvider>
      <UserProvider initialUser={runtimeUser}>
        <PermissionProvider>
          <OrgScopeProvider>
            <MenuProvider initialMenus={menus}>{children}</MenuProvider>
          </OrgScopeProvider>
        </PermissionProvider>
      </UserProvider>
    </AuthProvider>
  );
}
