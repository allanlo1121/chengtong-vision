
with new_user as (
  insert into auth.users (
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at
  )
  values (
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admin@company.com',
    crypt('Admin@123456', gen_salt('bf')),
    now(),
    now(),
    now()
  )
  returning id
)

insert into public.employees (
  id,
  code,
  name,
  is_active
)
select
  id,
  'ADMIN',
  '系统管理员',
  true
from new_user;



insert into public.roles (code, name)
values ('SUPER_ADMIN', '超级管理员')
on conflict (code) do nothing;

insert into public.user_roles (user_id, role_id)
select e.id, r.id
from public.employees e, public.roles r
where e.code = 'ADMIN'
and r.code = 'SUPER_ADMIN';