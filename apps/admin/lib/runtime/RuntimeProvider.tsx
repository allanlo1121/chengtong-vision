// RuntimeProvider.tsx

import { AuthProvider } from "./auth/AuthProvider";
import { MenuProvider } from "./menu/MenuProvider";
import { AppContextProvider } from "./appContext/AppProvider";
import { MenuNode } from "@/lib/domain/system/navigation";
import { OrganizationScopeProvider } from "./organization/OrganizationScopeProvider";
import { PermissionProvider } from "./permission/PermissionProvider";
import { RuntimeUser } from "../domain/system/types";
import { UserProvider } from "./user/UserProvider";
import { AppContextType } from "../domain/system/appContext/types";

interface RuntimeProviderProps {
  children: React.ReactNode;
  runtimeUser: RuntimeUser;
  appContext: AppContextType;
  menus: MenuNode[];
}

export function RuntimeProvider({
  children,
  runtimeUser,
  appContext,
  menus,
}: RuntimeProviderProps) {
  return (
    <AuthProvider>
      <UserProvider initialUser={runtimeUser}>
        <PermissionProvider>
          <OrganizationScopeProvider>
            <AppContextProvider initialContext={appContext}>
              {/* You can expand this context as needed */}
              <MenuProvider initialMenus={menus}>{children}</MenuProvider>
            </AppContextProvider>
          </OrganizationScopeProvider>
        </PermissionProvider>
      </UserProvider>
    </AuthProvider>
  );
}
