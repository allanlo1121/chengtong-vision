create function org_generate_node_key()
returns trigger
language plpgsql
as $$
begin
  if new.node_key is null then
    new.node_key =
      substr(replace(gen_random_uuid()::text,'-',''),1,8);
  end if;

  return new;
end
$$;

create trigger trg_org_node_key
before insert on organizations
for each row
execute function org_generate_node_key();

create function org_generate_path()
returns trigger
language plpgsql
as $$
declare
  parent_path ltree;
begin

  if new.parent_id is null then
     new.path = new.node_key::ltree;
  else

     select path
     into parent_path
     from organizations
     where id = new.parent_id;

     new.path = parent_path || text2ltree(new.node_key);

  end if;

  return new;

end
$$;

create trigger trg_org_path
before insert on organizations
for each row
execute function org_generate_path();


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
