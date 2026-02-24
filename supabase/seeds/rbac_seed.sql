
-- ============================================
-- RBAC MINIMUM SEED
-- ============================================

-- 1️⃣ 基础角色
insert into rbac.roles (code, name, is_system)
values
  ('SUPER_ADMIN', '超级管理员', true),
  ('COMPANY_LEADER', '公司领导', true),
  ('PROJECT_ADMIN', '项目管理员', true),
  ('PROJECT_LEADER', '项目领导', true),
  ('USER', '普通用户', true)
on conflict (code) do nothing;



-- 2️⃣ 基础权限
insert into rbac.permissions (code, name, module, action, is_system)
values
  ('employee.read', '查看员工', 'employee', 'read', true),
  ('employee.write', '编辑员工', 'employee', 'write', true),

  ('project.read', '查看项目', 'project', 'read', true),
  ('project.write', '编辑项目', 'project', 'write', true),

  ('system.full', '系统完全控制', 'system', 'full', true)
on conflict (code) do nothing;



-- 3️⃣ 角色-权限绑定

-- SUPER_ADMIN 拥有全部权限
insert into rbac.role_permissions (role_id, permission_id)
select r.id, p.id
from rbac.roles r
join rbac.permissions p on true
where r.code = 'SUPER_ADMIN'
on conflict do nothing;


-- PROJECT_ADMIN 拥有项目权限
insert into rbac.role_permissions (role_id, permission_id)
select r.id, p.id
from rbac.roles r
join rbac.permissions p 
  on p.code in ('project.read', 'project.write')
where r.code = 'PROJECT_ADMIN'
on conflict do nothing;


-- USER 只读权限
insert into rbac.role_permissions (role_id, permission_id)
select r.id, p.id
from rbac.roles r
join rbac.permissions p 
  on p.code in ('employee.read', 'project.read')
where r.code = 'USER'
on conflict do nothing;