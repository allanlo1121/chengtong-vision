create or replace view public.v_organizations_detail as
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


create or replace view public.v_organizations_list as
select
  o.id,
  o.name,
  o.parent_id,
  p.name as parent_org_name,
  o.is_active,
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

create or replace view v_tree_nodes as
select
  o.id,
  o.parent_id,
  o.name,

  o.path,
  nlevel(o.path) as level,

  o.sort_order,

  exists (
    select 1
    from organizations c
    where c.parent_id = o.id
  ) as has_children,

  'organization' as entity

from organizations o
where o.deleted_at is null;


create or replace function public.tree_context_nodes(
  p_node_id uuid,
  p_entity text
)
returns setof v_tree_nodes
language plpgsql
as $$
declare
  v_path ltree;
  v_parent_id uuid;
begin

  -- 1️⃣ 当前节点 path + parent
  select path, parent_id
  into v_path, v_parent_id
  from v_tree_nodes
  where id = p_node_id
    and entity = p_entity;

  if v_path is null then
    raise exception 'Node not found: %', p_node_id;
  end if;

  -- 2️⃣ 查询：祖先 + 同级 + 子节点
  return query
  select distinct o.*
  from v_tree_nodes o
  where
    o.entity = p_entity
    and (
      -- ✅ ancestors + self
      o.path @> v_path

      or

      -- ✅ siblings（同级节点）
      o.parent_id = v_parent_id

      or

      -- ✅ children（一层）
      o.parent_id = p_node_id
    )
  order by o.path;

end;
$$;