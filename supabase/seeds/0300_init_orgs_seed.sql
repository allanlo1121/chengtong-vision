-- 1️⃣ 获取 org_type
with org_type as (
  select id
  from public.master_data
  where name = '集团公司'
  limit 1
),

-- 2️⃣ 插入 organizations 并返回 id
inserted_org as (
  insert into public.organizations (
    code,
    name,
    full_name,
    parent_id,
    org_type_id,
    business_id,
    country_code
  )
  select
    '0-001-003',
    '集团公司',
    '中铁二局集团有限公司',
    null,
    org_type.id,
    null,
    'CN'
  from org_type
  on conflict (code) do update
    set name = excluded.name  -- 防止 nothing 时拿不到 id
  returning id, code
)

-- 3️⃣ 插入 external map
insert into public.organization_external_map (
  organization_id,
  external_id  
)
select
  id,
  '20181127101355650-A278-632689E5E'
from inserted_org;


-- 虚拟机构
with
root_org as (
  select id
  from public.organizations
  where code = '0-001-003'
  limit 1
),
org_type as (
  select id
  from public.master_data
  where name = '分组（虚拟组织）'
  limit 1
),

inserted_org2 as (
  insert into public.organizations (
    code,
    name,
    full_name,
    parent_id,
    org_type_id,
    business_id,
    country_code
  )
  select
    '0-001-003-006',
    '子(分)公司',
    '中铁二局集团子(分)公司',
    r.id,
    t.id,
    null,
    'CN'
  from root_org r
  join org_type t on true
  on conflict (code) do update
    set name = excluded.name
  returning id
)

insert into public.organization_external_map (
  organization_id,
  external_id
)
select
  id,
  '20181127101433134-3D54-B309C4374'
from inserted_org2
on conflict (external_id) do update
  set organization_id = excluded.organization_id;


