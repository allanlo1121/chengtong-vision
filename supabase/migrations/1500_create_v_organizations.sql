create or replace view public.v_organizations_detail as
select
  o.*,

  p.name as parent_org_name, 

  t.code as org_type_code,
  t.name as org_type_name,
  
  b.code as business_code,
  b.name as business_name,


  c.name as country_name,
  ap.name as province_name,
  ac.name as city_name,
  ad.name as district_name

from public.organizations o
left join organizations p on p.id = o.parent_id
left join public.master_data t on t.id = o.org_type_id
left join public.master_data b on b.id = o.business_id
left join public.countries c on c.code = o.country_code
left join public.admin_regions ap on ap.code = o.province_code
left join public.admin_regions ac on ac.code = o.city_code
left join public.admin_regions ad on ad.code = o.district_code
where o.deleted_at is null;


create or replace view public.v_organizations_list as
select
  o.id,
  o.name,
  o.parent_id,
  p.name as parent_org_name,
  o.is_active,
  o.created_at,

  t.name as org_type_name,
  b.name as business_name,
  c.name as country_name,
  ap.name as province_name,
  ac.name as city_name,
  ad.name as district_name

from public.organizations o
left join organizations p on p.id = o.parent_id
left join public.master_data t on t.id = o.org_type_id
left join public.master_data b on b.id = o.business_id
left join public.countries c on c.code = o.country_code
left join public.admin_regions ap on ap.code = o.province_code
left join public.admin_regions ac on ac.code = o.city_code
left join public.admin_regions ad on ad.code = o.district_code
where o.deleted_at is null;