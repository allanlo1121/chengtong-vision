
create table public.roles (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null
);

create table public.permissions (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null
);


create table public.role_permissions (
  role_id uuid references roles(id) on delete cascade,
  permission_id uuid references permissions(id) on delete cascade,
  primary key (role_id, permission_id)
);


create table public.user_roles (
  user_id uuid references employees(id) on delete cascade,
  role_id uuid references roles(id) on delete cascade,
  primary key (user_id, role_id)
);