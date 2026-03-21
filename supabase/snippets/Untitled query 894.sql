
drop view v_organizations_list cascade;

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

select tree_query_organizations('f6605963-beb1-4fc2-8aa6-ca37ee0bdcfd',true,'宁波')

create or replace function public.tree_query_organizations(
  p_parent_id uuid default null,
  p_include_children boolean default false,
  p_search text default null,
  p_limit int default 20,
  p_offset int default 0
)
returns setof v_organizations_list
language plpgsql
as $$
declare
  v_parent_path ltree;
begin

  -- ✅ 获取 parent path（仍然需要）
  if p_parent_id is not null then
    select path into v_parent_path
    from organizations
    where id = p_parent_id;
  end if;

  return query
  select o.*
  from v_organizations_list o
  where
    (
      p_parent_id is null

      or (

        -- 🌳 子树（ltree 核心）
        p_include_children = true
        and o.path <@ v_parent_path

      )

      or (

        -- 🌿 当前 + 直接子
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

select tree_context_nodes('b456cf3e-e36b-49ac-ad63-2615c0876b56','organization')

create or replace function public.tree_context_with_children(
  p_node_id uuid
)
returns setof v_organizations_tree
language plpgsql
as $$
declare
  v_path ltree;
begin

  select path into v_path
  from organizations
  where id = p_node_id;

  return query
  select distinct o.*
  from v_organizations_tree o
  where
    -- ancestors + self
    o.path @> v_path

    or

    -- children（只一层）
    o.parent_id = p_node_id;

end;
$$;

select tree_context_nodes('00dcf1fd-9c09-42e1-9553-d51eee914ebb','organization')

create or replace function public.tree_context_nodes(
  p_node_id uuid,
  p_entity text
)
returns setof v_tree_nodes
language plpgsql
as $$
declare
  v_path ltree;
begin

  -- 1️⃣ 拿 path
  select path into v_path
  from v_tree_nodes
  where id = p_node_id
    and entity = p_entity;

  -- 2️⃣ 查询
  return query
  select distinct o.*
  from v_tree_nodes o
  where
    o.entity = p_entity
    and (
      -- ancestors + self
      o.path @> v_path

      or

      -- children（一层）
      o.parent_id = p_node_id
    );

end;
$$;


drop view v_tree_nodes cascade;
create or replace view v_tree_nodes as
select
  o.id,
  o.parent_id,
  o.name,

  o.path,
  nlevel(o.path) as level,

  o.sort_order,   -- ✅ 必加

  exists (
    select 1
    from organizations c
    where c.parent_id = o.id
  ) as has_children,

  'organization' as entity

from organizations o;