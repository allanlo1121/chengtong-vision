
-- ============================================
-- RBAC MINIMUM SEED
-- ============================================

-- 1️⃣ 基础角色
insert into rbac.roles (code, name)
values
  ('SUPER_ADMIN', '超级管理员'),
  ('COMPANY_LEADER', '公司领导'),
  ('PROJECT_ADMIN', '项目管理员'),
  ('PROJECT_LEADER', '项目领导'),
  ('USER', '普通用户')
on conflict (code) do nothing;



-- 2️⃣ 基础权限
insert into rbac.permissions (code, name, module, action)
values
('dashboard.read', '查看仪表盘', 'dashboard', 'read'),
  ('employee.read', '查看员工', 'employee', 'read'),
  ('employee.write', '编辑员工', 'employee', 'write'),

  ('project.read', '查看项目', 'project', 'read'),
  ('project.write', '编辑项目', 'project', 'write'),

  ('organization.read', '查看组织架构', 'organization', 'read'),
  ('organization.write', '编辑组织架构', 'organization', 'write'  )
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
  on p.code in ('employee.read', 'project.read', 'organization.read')
where r.code = 'USER'
on conflict do nothing;