
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

create or replace function auth.jwt_custom_claims()
returns jsonb
language sql
stable
security definer
as $$
  select jsonb_build_object(
    'permissions',
    rbac.jwt_permissions()
  );
$$;

create table public.employee_org_access (
  employee_id uuid references public.employees(id),
  org_id uuid references public.organizations(id),
  primary key (employee_id, org_id)
);

create view public.v_user_orgs as
select
  o.id,
  o.name,
  o.fullname
from employee_org_access eoa
join organizations o on eoa.org_id = o.id
where eoa.employee_id = auth.uid();

create table public.projects (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null
);

create table public.user_favorite_projects (
  user_id uuid references public.employees(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  sort_order int default 0,
  primary key (user_id, project_id)
);

create view public.v_user_favorite_projects as
select
  p.id,
  p.name
from user_favorite_projects uf
join projects p on uf.project_id = p.id
where uf.user_id = auth.uid()
order by uf.sort_order;


INSERT INTO public.master_definitions (name, code)
VALUES ('业务板块', 'ORG_CATEGORY')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.master_data (definition_id, code, name)
SELECT md.id, v.code, v.name
FROM public.master_definitions md
JOIN (
    VALUES 
    ('10250001', '生产型'),
    ('10250002', '综合生产'),
    ('10250003', '专业生产'),
    ('10250004', '设计勘探'),
    ('10250005', '地产开发'),
    ('10250006', '物资贸易'),
    ('10250007', '典当'),
    ('10250008', '文化传媒'),
    ('10250009', '餐饮娱乐'),
    ('10250010', '其他多元')
) AS v(code, name)
ON true
WHERE md.code = 'ORG_CATEGORY'
ON CONFLICT (definition_id, code) DO NOTHING;



create or replace view v_organizations_tree as
select
  id,
  name,
  parent_id,
  is_active,  
  nlevel(path) as level,
  sort_order
from organizations
where deleted_at is null
order by path, sort_order;


create table entity_external_map (
  id uuid primary key default gen_random_uuid(),

  organization_id uuid not null
    references organizations(id) on delete cascade,

  external_system text not null,
  external_id text not null,

  created_at timestamptz default now(),

  unique (external_system, external_id)
);


create table organization_external_map (

  organization_id uuid primary key
    references organizations(id) on delete cascade,

  external_id text not null unique,

  created_at timestamptz default now()

);