
create or replace function public.fn_organizations_tree()
returns table (
  id uuid,
  name text,
  parent_id uuid,
  is_active boolean,
  level int
)
language sql
as $$
with recursive org_tree as (
  select
    o.id,
    o.name,
    o.parent_id,
    o.is_active,
    1 as level
  from organizations o
  where o.parent_id is null
    and o.deleted_at is null

  union all

  select
    c.id,
    c.name,
    c.parent_id,
    c.is_active,
    p.level + 1
  from organizations c
  join org_tree p on c.parent_id = p.id
  where c.deleted_at is null
)
select * from org_tree
order by level;
$$;