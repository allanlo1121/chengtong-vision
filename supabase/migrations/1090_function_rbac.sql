create or replace function rbac.jwt_permissions()
returns jsonb
language sql
stable
security definer
as $$
  select jsonb_agg(p.code)
  from rbac.user_roles ur
  join rbac.role_permissions rp on ur.role_id = rp.role_id
  join rbac.permissions p on rp.permission_id = p.id
  where ur.user_id = auth.uid()
$$;

-- create or replace function auth.jwt_custom_claims()
-- returns jsonb
-- language sql
-- stable
-- security definer
-- as $$
--   select jsonb_build_object(
--     'permissions',
--     rbac.jwt_permissions()
--   );
-- $$;


