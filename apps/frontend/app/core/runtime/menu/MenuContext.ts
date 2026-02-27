import { createContext } from "react";
import type { MenuNode } from "./types";

export const MenuContext = createContext<MenuNode[] | undefined>(undefined);
