-- ROOT
with
org_type as (
  select id
  from public.master_data
  where name = '集团公司'
  limit 1
),
region as (
  select id
  from public.master_data
  where name = '川渝区域'
  limit 1
)

insert into public.organizations (
  code,
  name,
  parent_id,
  org_type_id,
  business_id,
  region_id,
  country_code
)
select
  'ROOT',
  '集团',
  null,
  org_type.id,
  null,
  region.id,
  'CN'
from org_type, region
on conflict (code) do nothing;


-- SYS
with
root_org as (
  select id
  from public.organizations
  where code = 'ROOT'
  limit 1
),
org_type as (
  select id
  from public.master_data
  where name = '部门'
  limit 1
),
region as (
  select id
  from public.master_data
  where name = '川渝区域'
  limit 1
)

insert into public.organizations (
  code,
  name,
  parent_id,
  org_type_id,
  business_id,
  region_id,
  country_code
)
select
  'SYS',
  '系统管理部',
  root_org.id,
  org_type.id,
  null,
  region.id,
  'CN'
from root_org, org_type, region
on conflict (code) do nothing;