create or replace function public.org_before_insert()
returns trigger
language plpgsql
as $$
declare
  parent_path ltree;
begin

  -- 1️⃣ id 保证存在
  if new.id is null then
    new.id := gen_random_uuid();
  end if;

  -- 2️⃣ node_key
  if new.node_key is null then
    new.node_key :=
      substr(replace(new.id::text,'-',''),1,8);
  end if;

  -- 3️⃣ path
  if new.parent_id is null then
    new.path := text2ltree(new.node_key);
  else
    select o.path
    into parent_path
    from public.organizations o
    where o.id = new.parent_id;

    if parent_path is null then
      raise exception 'Parent path not found for id %', new.parent_id;
    end if;

    new.path := parent_path || text2ltree(new.node_key);
  end if;

  return new;
end;
$$;


create trigger trg_org_before_insert
before insert on organizations
for each row
execute function public.org_before_insert();


-- ltree 核心索引
create index idx_organizations_path on organizations using gist(path);

-- parent_id
create index idx_organizations_parent on organizations(parent_id);

-- node_key（可选）
create unique index idx_organizations_node_key on organizations(node_key);