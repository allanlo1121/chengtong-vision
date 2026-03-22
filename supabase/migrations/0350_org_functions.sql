


create or replace function org_move_node(
  p_id uuid,
  p_new_parent uuid
)
returns void
language plpgsql
as $$
declare
  old_path ltree;
  new_parent_path ltree;
begin

  -- 获取当前节点 path
  select path
  into old_path
  from organizations
  where id = p_id;

  if old_path is null then
    raise exception 'Organization not found: %', p_id;
  end if;


  -- 获取新父节点 path
  select path
  into new_parent_path
  from organizations
  where id = p_new_parent;

  if new_parent_path is null then
    raise exception 'Parent organization not found: %', p_new_parent;
  end if;

  --防止移到自己
  if p_id = p_new_parent then
    raise exception 'Cannot move node to itself';
  end if;

  -- 防止移动到自己的子树
  if exists (
    select 1
    from organizations
    where id = p_new_parent
      and path <@ old_path
  ) then
    raise exception 'Cannot move node into its subtree';
  end if;


  -- 更新整个子树 path
  update organizations
  set path = new_parent_path || subpath(path, nlevel(old_path))
  where path <@ old_path;


  -- 更新 parent
  update organizations
  set parent_id = p_new_parent
  where id = p_id;

end
$$;

--查询子树函数
create or replace function public.fn_organizations_subtree(
  p_id uuid
)
returns table (
  id uuid,
  name text,
  parent_id uuid,
  level int
)
language sql
stable
as $$
select
  id,
  name,
  parent_id,
  nlevel(path) as level
from public.organizations
where path <@ (
  select path
  from public.organizations
  where id = p_id
)
and deleted_at is null
order by path;
$$;


--  查询祖先函数
create or replace function public.fn_organizations_ancestors(
  p_id uuid
)
returns table (
  id uuid,
  name text,
  level int
)
language sql
stable
as $$
select
  id,
  name,
  nlevel(path) as level
from public.organizations
where path @> (
  select path
  from public.organizations
  where id = p_id
)
order by path;
$$;

--直接子节点函数
create or replace function public.fn_organizations_children(
  p_parent_id uuid
)
returns table (
  id uuid,
  name text,
  parent_id uuid,
  level int,
  has_children boolean,
  sort_order int
)
language sql
stable
as $$
select
  o.id,
  o.name,
  o.parent_id,
  o.level,
  exists (
    select 1
    from public.organizations c
    where c.parent_id = o.id
    and c.deleted_at is null
  ) as has_children,
  o.sort_order
from public.organizations o
where o.parent_id = p_parent_id
and o.deleted_at is null
order by o.sort_order, o.name;
$$;

--查询根节点
create or replace function public.fn_organizations_roots()
returns table (
  id uuid,
  name text,
  level int,
  has_children boolean
)
language sql
stable
as $$
select
  o.id,
  o.name,
  o.level,
  exists (
    select 1
    from organizations c
    where c.parent_id = o.id
    and c.deleted_at is null
  ) as has_children
from organizations o
where o.parent_id is null
and o.deleted_at is null
order by o.sort_order;
$$;


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