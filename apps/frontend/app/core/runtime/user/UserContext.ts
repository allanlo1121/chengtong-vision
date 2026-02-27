// user/UserContext.ts

import { createContext } from "react";
import type { RuntimeUser } from "./types";

export const UserContext = createContext<RuntimeUser | undefined>(undefined);
