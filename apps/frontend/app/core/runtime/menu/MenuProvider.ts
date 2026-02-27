// menu/MenuProvider.tsx

// import { createContext, useContext, useMemo } from "react"
// import { usePermission } from "../permission/usePermission"
// import { menuConfig } from "./menuConfig"

// export const MenuContext = createContext<any[]>([])

// export function MenuProvider({ children }: { children: React.ReactNode }) {
//   const { can } = usePermission()

//   const visibleMenus = useMemo(() => {
//     return menuConfig.filter(
//       (m) => !m.permission || can(m.permission)
//     )
//   }, [can])

//   return (
//     <MenuContext.Provider value={visibleMenus}>
//       {children}
//     </MenuContext.Provider>
//   )
// }
