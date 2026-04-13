-- schema
grant usage on schema hr to anon, authenticated;

-- tables
grant select on all tables in schema hr to anon, authenticated;

-- views
grant select on all views in schema hr to anon, authenticated;

-- default
alter default privileges in schema hr
grant select on tables to anon, authenticated;

grant select on hr.v_employee_list
to anon, authenticated, service_role;


-- 1. schema
grant usage on schema hr to anon, authenticated;

-- 2. 表
grant select on all tables in schema hr to anon, authenticated;

-- 3. view（批量）
do $$
declare r record;
begin
  for r in
    select table_name
    from information_schema.views
    where table_schema = 'hr'
  loop
    execute format(
      'grant select on hr.%I to anon, authenticated;',
      r.table_name
    );
  end loop;
end $$;

-- 4. 默认权限（未来）
alter default privileges in schema hr
grant select on tables to anon, authenticated;