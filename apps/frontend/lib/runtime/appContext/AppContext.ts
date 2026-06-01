import { createContext } from "react";
import type { AppContextType } from "@/lib/domain/system/appContext/types";

export const AppContext = createContext<AppContextType | undefined>(undefined);
