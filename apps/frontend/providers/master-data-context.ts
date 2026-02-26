// frontend/providers/master-data-context.ts
import { createContext } from "react";
import type { MasterOption } from "@/types/master";
import type { MasterDomainCode } from "@/constants/master-data-type";

export interface MasterDataContextValue {
  isReady: boolean;
  getOptions: (domain: MasterDomainCode) => MasterOption[];
}

export const MasterDataContext = createContext<MasterDataContextValue | null>(null);
