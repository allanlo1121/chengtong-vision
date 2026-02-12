// frontend/constants/master-data-preload.ts
import { MASTER_DOMAIN } from "./master-data-type";

export const PRELOAD_MASTER_DOMAINS = [
  MASTER_DOMAIN.PROJECT_STATUS,
  MASTER_DOMAIN.PROJECT_TYPE,
  MASTER_DOMAIN.PROJECT_STATUS,
  MASTER_DOMAIN.PROJECT_RISK_LEVEL,
  MASTER_DOMAIN.REGION,
] as const;
