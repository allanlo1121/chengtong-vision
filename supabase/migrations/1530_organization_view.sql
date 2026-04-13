create or replace view public.v_organization_detail as
select
  o.id,
  o.code,
  o.name,
  o.full_name,
  o.description,

  p.name as parent_org_name,

  t.name as org_type_name,
  c.name as org_category_name,
  b.name as business_name,

  ct.name as country_name,
  ap.name as province_name,
  ac.name as city_name,
  ad.name as district_name,

  o.address,
  o.latitude,
  o.longitude,

  o.is_active,
  o.external_id,
  o.external_version,
  o.created_at,
  o.updated_at

from public.organizations o
left join organizations p on p.id = o.parent_id
left join public.master_data t on t.id = o.org_type_id
left join public.master_data c on c.id = o.org_category_id
left join public.master_data b on b.id = o.business_id
left join public.countries ct on ct.code = o.country_code
left join public.admin_regions ap on ap.code = o.province_code
left join public.admin_regions ac on ac.code = o.city_code
left join public.admin_regions ad on ad.code = o.district_code
where o.deleted_at is null;


create or replace view public.v_organization_list as
select
  o.id,
  o.name,
  o.parent_id,
  p.name as parent_org_name,
  o.path,
  nlevel(o.path) as level,
  o.sort_order,
  o.created_at,

  t.name as org_type_name,
  c.name as org_category_name,
  b.name as business_name,
  ct.name as country_name,
  ap.name as province_name,
  ac.name as city_name,
  ad.name as district_name

from public.organizations o
left join organizations p on p.id = o.parent_id
left join public.master_data t on t.id = o.org_type_id
left join public.master_data c on c.id = o.org_category_id
left join public.master_data b on b.id = o.business_id
left join public.countries ct on ct.code = o.country_code
left join public.admin_regions ap on ap.code = o.province_code
left join public.admin_regions ac on ac.code = o.city_code
left join public.admin_regions ad on ad.code = o.district_code
where o.deleted_at is null;




create or replace function public.tree_query_organizations(
  p_parent_id uuid default null,
  p_include_children boolean default false,
  p_search text default null,
  p_limit int default 20,
  p_offset int default 0
)
returns setof v_organization_list
language plpgsql
as $$
declare
  v_parent_path ltree;
begin

  if p_parent_id is not null then
    select path into v_parent_path
    from organizations
    where id = p_parent_id;
  end if;

  return query
  select o.*
  from v_organization_list o   -- ✅ 改这里
  where
    (
      p_parent_id is null

      or (
        p_include_children = true
        and o.path <@ v_parent_path
      )

      or (
        p_include_children = false
        and (
          o.id = p_parent_id
          or o.parent_id = p_parent_id
        )
      )
    )
    and (
      p_search is null
      or o.name ilike '%' || p_search || '%'
    )
  order by o.created_at desc
  limit p_limit
  offset p_offset;

end;
$$;