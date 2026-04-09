
create schema if not exists hr;

-- 允许 API 访问 schema
grant usage on schema hr to anon, authenticated, service_role;

-- 允许读取表
grant select on all tables in schema hr
to anon, authenticated, service_role;

create table hr.persons (
  id uuid primary key default gen_random_uuid(),

  auth_id uuid unique references auth.users(id) on delete set null,
  
  name text not null,
  gender_id uuid  references master_data(id),

  birth_date date,
  id_card text,
  phone text,
  email text
);
