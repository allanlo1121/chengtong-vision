"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { RuntimeUser } from "../../domain/system/types";

// ======================================================
// TYPES
// ======================================================

type OrganizationContextValue = {
  // 树根（权限根）
  rootOrganizationId?: string;

  // 当前选中组织
  currentOrganizationId?: string;

  // 当前选中组织（setter）
  setCurrentOrganizationId: (id?: string) => void;

  // 是否 Super Admin
  isSuperAdmin: boolean;

  // RuntimeUser
  runtimeUser: RuntimeUser;
};

// ======================================================
// CONTEXT
// ======================================================

const OrganizationContext = createContext<OrganizationContextValue | undefined>(undefined);

// ======================================================
// ROOT ORGANIZATION
// ======================================================

// ⭐ 后面建议改成数据库查询
// system.get_root_organization_id()

const ROOT_ORGANIZATION_ID = "ROOT_ORGANIZATION_ID";

// ======================================================
// PROVIDER
// ======================================================

interface Props {
  runtimeUser: RuntimeUser;

  children: React.ReactNode;
}

export function OrganizationContextProvider({ runtimeUser, children }: Props) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  // ======================================================
  // SUPER ADMIN
  // ======================================================

  const isSuperAdmin = runtimeUser.roles?.includes("SUPER_ADMIN") ?? false;

  // ======================================================
  // ROOT ORGANIZATION
  // ======================================================

  // 普通用户：
  //   organization_id
  //
  // SUPER_ADMIN：
  //   ROOT_ORGANIZATION_ID

  const rootOrganizationId = runtimeUser.organizationId ?? ROOT_ORGANIZATION_ID;

  // ======================================================
  // CURRENT ORGANIZATION
  // ======================================================

  const urlOrganizationId = searchParams.get("parentId") ?? undefined;

  const [currentOrganizationId, setCurrentOrganizationIdState] = useState<string | undefined>(
    urlOrganizationId
  );

  // ======================================================
  // URL → STATE
  // ======================================================

  useEffect(() => {
    setCurrentOrganizationIdState(urlOrganizationId);
  }, [urlOrganizationId]);

  // ======================================================
  // FIRST ENTER
  // ======================================================

  // 第一次进入：
  //
  // /organizations
  //
  // 自动：
  //
  // /organizations?parentId=xxx

  useEffect(() => {
    if (urlOrganizationId) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    params.set("parentId", rootOrganizationId);

    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams, rootOrganizationId, urlOrganizationId]);

  // ======================================================
  // SET CURRENT ORGANIZATION
  // ======================================================

  const setCurrentOrganizationId = useCallback(
    (id?: string) => {
      setCurrentOrganizationIdState(id);

      const params = new URLSearchParams(searchParams.toString());

      if (id) {
        params.set("parentId", id);
      } else {
        params.delete("parentId");
      }

      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  // ======================================================
  // VALUE
  // ======================================================

  const value = useMemo(
    () => ({
      rootOrganizationId,

      currentOrganizationId,

      setCurrentOrganizationId,

      isSuperAdmin,

      runtimeUser,
    }),
    [rootOrganizationId, currentOrganizationId, setCurrentOrganizationId, isSuperAdmin, runtimeUser]
  );

  return <OrganizationContext.Provider value={value}>{children}</OrganizationContext.Provider>;
}

// ======================================================
// HOOK
// ======================================================

export function useOrganizationContext() {
  const context = useContext(OrganizationContext);

  if (!context) {
    throw new Error("useOrganizationContext must be used inside OrganizationContextProvider");
  }

  return context;
}
