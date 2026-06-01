// apps/frontend/lib/supabase/get-user.ts

import { createClient } from "./server";

export async function getCurrentUser() {
    const supabase = await createClient();

    // 1. 取得 Supabase Auth 用户
    const {
        data: { user: authUser },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) return null;

    // 2. 查询员工基础信息（employees）
    const { data: employee, error: employeeError } = await supabase
        .from("employees")
        .select(
            `
      id,
      name,
      avatar_url,
      phone,
      organization_id,
      position,
      auth_id
    `
        )
        .eq("auth_id", authUser.id)
        .single();

    if (employeeError || !employee) {
        console.warn("Employee profile missing:", employeeError);
        return {
            id: authUser.id,
            email: authUser.email,
            name: authUser.email,
            roles: [],
            permissions: [],
            isAdmin: false,
            employee: null,
        };
    }

    // 3. 查询组织信息（organizations）
    const { data: org } = await supabase
        .from("organizations")
        .select("id, name, display_path")
        .eq("id", employee.organization_id)
        .single();

    // 4. 查询角色（employee_roles → roles）
    const { data: roles } = await supabase
        .from("user_roles")
        .select(
            `
      roles (
        code,
        name,
        permissions
      )
    `
        )
        .eq("employee_id", employee.id);

    const roleList = roles?.map((r) => r.roles.code) ?? [];
    const permissionList = roles?.flatMap((r) => r.roles.permissions ?? []) ?? [];

    return {
        // Auth 层用户
        id: authUser.id,
        email: authUser.email,

        // 员工层用户
        name: employee.name,
        avatar: employee.avatar_url ?? "/avatars/default.png",
        phone: employee.phone,
        position: employee.position,

        // 组织信息
        organization: org
            ? {
                id: org.id,
                name: org.name,
                path: org.display_path,
            }
            : null,

        // 权限角色（统一格式）
        roles: roleList,
        permissions: permissionList,

        // 权限判断（快速访问）
        isAdmin: roleList.includes("admin"),

        // 原始记录备份
        employee,
    };
}
