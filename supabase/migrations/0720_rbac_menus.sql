create table system.menus (
  id uuid primary key default gen_random_uuid(),

  parent_id uuid
    references system.menus(id)
    on delete cascade,

  label text not null,
  name text not null unique,      -- 唯一标识（如 project.list）

  path text,
  icon text,

  sort_order int default 0,
  level int default 0,

  group_name text,                -- System / Project / TBM

  permission_code text
    references rbac.permissions(code),

  is_visible boolean default true,
  is_active boolean default true

);

create index idx_menus_parent on system.menus(parent_id);
create index idx_menus_sort on system.menus(sort_order);
create index idx_menus_group on system.menus(group_name);
create index idx_menus_permission on system.menus(permission_code);



create or replace function system.set_menu_level()
returns trigger
language plpgsql
as $$
begin
  if new.parent_id is null then
    new.level := 0;
  else
    select level + 1
    into new.level
    from system.menus
    where id = new.parent_id;
  end if;

  return new;
end;
$$;

create trigger trg_set_menu_level
before insert or update on system.menus
for each row
execute function system.set_menu_level();