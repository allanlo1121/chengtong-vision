import { createContext } from "react";
import type { MenuNode } from "@/lib/domain/system/navigation";

export const MenuContext = createContext<MenuNode[] | undefined>(undefined);
