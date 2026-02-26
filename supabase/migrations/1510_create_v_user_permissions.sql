create view rbac.v_user_permissions as
select
  ur.user_id,
  p.code as permission_code
from rbac.user_roles ur
join rbac.role_permissions rp on ur.role_id = rp.role_id
join rbac.permissions p on rp.permission_id = p.id;