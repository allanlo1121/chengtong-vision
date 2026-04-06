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