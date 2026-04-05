
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



create or replace function system.bootstrap(p_user_id uuid)
returns void
language plpgsql
security definer
as $$
declare
  v_role_id uuid;
  v_group_org_id uuid;
begin

  if auth.role() <> 'service_role' then
    raise exception 'permission denied';
  end if;

  if exists (
    select 1
    from system.bootstrap_state
    where version = '1.0.0'
      and completed = true
  ) then
    return;
  end if;

  -- 创建角色
  insert into rbac.roles (code, name)
  values ('SUPER_ADMIN', '超级管理员')
  on conflict (code) do nothing;

  select id into v_role_id
  from rbac.roles
  where code = 'SUPER_ADMIN';

  -- 创建 employee
  select id into v_group_org_id
  from public.organizations
  where code = '0-001-003';

  if v_group_org_id is null then
    raise exception 'Group organization not found';
  end if;

  insert into public.employees (
    id,
    name,
    code,
    org_node_id,
    is_active
  )
  values (
    p_user_id,
    '系统管理员',
    'admin',
    v_group_org_id,
    true
  )
  on conflict (id) do nothing;

  -- 绑定角色
  insert into rbac.user_roles (user_id, role_id)
  values (p_user_id, v_role_id)
  on conflict do nothing;

  -- 标记完成
  insert into system.bootstrap_state (version, completed, executed_at)
  values ('1.0.0', true, now())
  on conflict (version)
  do update set completed = true,
                executed_at = now();

end;
$$;


create table public.import_batches (
  id uuid primary key default gen_random_uuid(),

  entity_type text not null,

  total int default 0,
  success int default 0,
  failed int default 0,

  status text default 'running', -- running / done / failed

  created_at timestamptz default now()
);


create table public.import_records (
  id uuid primary key default gen_random_uuid(),

  batch_id uuid references public.import_batches(id),

  entity_type text not null,
  entity_id uuid,

  external_id text,
  external_source text default 'import',

  status text not null, -- success / failed

  import_json jsonb,
  mapped_json jsonb,
  error_json jsonb,

  round int,

  created_at timestamptz default now()
);

drop view v_organizations_tree cascade;
create or replace view v_organizations_tree as
select
  o.id,
  o.name,
  o.parent_id,
  o.is_active,
  o.sort_order,

  -- ✅ 保留 level（辅助字段）
  nlevel(o.path) as level,

  -- ⭐ 强烈建议加这个
  exists (
    select 1
    from organizations c
    where c.parent_id = o.id
      and c.deleted_at is null
  ) as has_children

from organizations o
where o.deleted_at is null;


create table public.external_maps (
  id uuid primary key default gen_random_uuid(),

  entity_type text not null,   -- organizations / projects / tbm
  entity_id uuid not null,     -- 真实表 id

  external_id text not null,
  external_source text not null default 'default',

  created_at timestamptz default now()
);

create unique index uniq_external_map
on public.external_maps (entity_type, external_source, external_id);



create or replace function public.sync_entity_with_record(
  p_table text,
  p_rows jsonb
)
returns jsonb
language plpgsql
as $$
declare
  v_row jsonb;
  v_raw jsonb;
  v_data jsonb;

  v_external_id text;
  v_inserted int := 0;
  v_updated int := 0;
  v_skipped int := 0;
  v_failed int := 0;

  v_sql text;
  v_inserted_flag boolean;
  v_affected int;
  v_set_clause text;
begin

  -- 🔥 动态生成 update 字段（关键修复）
  select string_agg(
    format('%I = excluded.%I', column_name, column_name),
    ', '
  )
  into v_set_clause
  from information_schema.columns
  where table_name = p_table
    and column_name not in ('id', 'created_at');

  -- 🔁 逐行处理
  for v_row in select * from jsonb_array_elements(p_rows)
  loop
    begin
      v_raw := v_row->'raw';
      v_data := v_row->'data';

      v_external_id := v_data->>'external_id';

      if v_external_id is null then
        raise exception 'external_id 不能为空';
      end if;

      -- 🔥 动态 SQL（已修复）
      v_sql := format($f$
        insert into %1$I
        select (jsonb_populate_record(null::%1$I, $1)).*

        on conflict (external_id)
        do update
        set %2$s

        where
          %1$I.external_version is null
          or excluded.external_version > %1$I.external_version

        returning xmax = 0 as inserted_flag
      $f$, p_table, v_set_clause);

      -- 🔹 执行
      execute v_sql
      using v_data
      into v_inserted_flag;

      GET DIAGNOSTICS v_affected = ROW_COUNT;

      -- 🔹 判断状态（关键修复）
      if v_affected = 0 then
        -- 👉 被 WHERE 拦住 = skipped
        v_skipped := v_skipped + 1;

        insert into import_records (
          entity_type,
          external_id,
          status,
          import_json,
          mapped_json
        )
        values (
          p_table,
          v_external_id,
          'skipped',
          v_raw,
          v_data
        );

      elsif v_inserted_flag then
        v_inserted := v_inserted + 1;

        insert into import_records (
          entity_type,
          external_id,
          status,
          import_json,
          mapped_json
        )
        values (
          p_table,
          v_external_id,
          'inserted',
          v_raw,
          v_data
        );

      else
        v_updated := v_updated + 1;

        insert into import_records (
          entity_type,
          external_id,
          status,
          import_json,
          mapped_json
        )
        values (
          p_table,
          v_external_id,
          'updated',
          v_raw,
          v_data
        );
      end if;

    exception when others then
      v_failed := v_failed + 1;

      insert into import_records (
        entity_type,
        external_id,
        status,
        import_json,
        error_json
      )
      values (
        p_table,
        v_external_id,
        'failed',
        v_raw,
        jsonb_build_array(
          jsonb_build_object(
            'message', SQLERRM
          )
        )
      );
    end;
  end loop;

  return jsonb_build_object(
    'inserted', v_inserted,
    'updated', v_updated,
    'failed', v_failed,
    'skipped', v_skipped,
    'total', v_inserted + v_updated + v_failed + v_skipped
  );

end;
$$;


create or replace function system.bootstrap(p_user_id uuid)
returns void
language plpgsql
security definer
as $$
declare
  v_role_id uuid;
  v_person_id uuid;
begin

  -- 🔒 防并发
  perform pg_advisory_xact_lock(999999);

  if auth.role() <> 'service_role' then
    raise exception 'permission denied';
  end if;

  -- 已初始化直接返回
  if exists (
    select 1
    from system.bootstrap_state
    where version = '1.0.0'
      and completed = true
  ) then
    return;
  end if;

  -- =========================
  -- 1️⃣ 创建角色
  -- =========================
  insert into rbac.roles (code, name)
  values ('SUPER_ADMIN', '超级管理员')
  on conflict (code) do nothing;

  select id into v_role_id
  from rbac.roles
  where code = 'SUPER_ADMIN';

  -- =========================
  -- 2️⃣ 创建 / 获取 person
  -- =========================
  select id into v_person_id
  from hr.persons
  where auth_id = p_user_id
  limit 1;

  if v_person_id is null then
    insert into hr.persons (
      id,
      auth_id,
      name,
      code
    )
    values (
      gen_random_uuid(),
      p_user_id,
      '系统管理员',
      'admin'
    )
    returning id into v_person_id;
  end if;

  -- =========================
  -- 3️⃣ 绑定角色
  -- =========================
  insert into rbac.user_roles (user_id, role_id)
  values (v_person_id, v_role_id)
  on conflict do nothing;

  -- =========================
  -- 4️⃣ 标记完成
  -- =========================
  insert into system.bootstrap_state (version, completed, executed_at)
  values ('1.0.0', true, now())
  on conflict (version)
  do update set completed = true,
                executed_at = now();

end;
$$;