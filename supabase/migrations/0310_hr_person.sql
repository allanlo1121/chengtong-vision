
create schema if not exists hr;

create table hr.persons (
  id uuid primary key default gen_random_uuid(),

  auth_id uuid unique references auth.users(id) on delete set null,
  
  code text unique not null,
  name text not null,
  gender_id uuid  references master_data(id),

  birth_date date,
  id_card text,
  phone text,
  email text
);
