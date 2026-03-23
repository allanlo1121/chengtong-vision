create function org_before_insert()
returns trigger
language plpgsql
as $$
declare
  parent_path ltree;
begin

  if new.node_key is null then
    new.node_key :=
      substr(replace(gen_random_uuid()::text,'-',''),1,8);
  end if;

  if new.parent_id is null then
    new.path = text2ltree(new.node_key);
  else
    select path into parent_path
    from organizations
    where id = new.parent_id;

    if parent_path is null then
      raise exception 'Parent path not found for id=%', new.parent_id;
    end if;

    new.path = parent_path || text2ltree(new.node_key);
  end if;

  return new;

end;
$$;

create trigger trg_org_before_insert
before insert on organizations
for each row
execute function org_before_insert();


create unique index if not exists idx_org_node_key
on organizations(node_key);

insert into organizations (name, parent_id,code,org_type_id) values ('test', 'f6605963-beb1-4fc2-8aa6-ca37ee0bdcfd','0-001-002','74354005-1823-45c5-9ecf-83a45d8818f1');

drop trigger if exists trg_org_node_key on organizations;
drop trigger if exists trg_org_path on organizations;

drop function if exists org_generate_node_key;
drop function if exists org_generate_path;

select *
from organizations o
where not exists (
  select 1
  from organizations p
  where p.node_key = subpath(o.path, nlevel(o.path)-1, 1)::text
)
and o.parent_id is not null;

drop view v_tree_nodes cascade;
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
where o.deleted_at is  null;