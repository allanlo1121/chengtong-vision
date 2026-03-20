-- 1️⃣ 获取 org_type
with org_type as (
  select id
  from public.master_data
  where name = '集团公司'
  limit 1
),

-- 2️⃣ 插入 organizations root

  insert into public.organizations (
    code,
    name,
    full_name,
    parent_id,
    org_type_id,
    business_id,
    country_code,
    external_id
  )
  select
    '0-001-003',
    '集团公司',
    '中铁二局集团有限公司',
    null,
    org_type.id,
    null,
    'CN',
    '20181127101355650-A278-632689E5E'
  from org_type
  on conflict (code) do nothing;



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


insert into public.organizations (
  code,
  name,
  full_name,
  parent_id,
  org_type_id,
  business_id,
  country_code,
  external_id
)
select
  '0-001-003-006',
  '子(分)公司',
  '中铁二局集团子(分)公司',
  r.id,
  t.id,
  null,
  'CN',
  '20181127101433134-3D54-B309C4374'
from root_org r
cross join org_type t
on conflict (code) do nothing;
