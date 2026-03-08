

create trigger trg_master_definitions_updated
before update on master_definitions
for each row execute function system.set_updated_at();

create trigger trg_master_data_updated
before update on master_data
for each row execute function system.set_updated_at();

create trigger trg_countries_updated
before update on public.countries
for each row execute function system.set_updated_at();

create trigger trg_admin_regions_updated
before update on public.admin_regions
for each row execute function system.set_updated_at();

create or replace function system.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_employees_updated_at
before update on public.employees
for each row execute function system.set_updated_at();

create trigger trg_organizations_updated
before update on public.organizations
for each row execute function system.set_updated_at();


create trigger trg_set_updated_by
before update on public.organizations
for each row
execute function system.set_updated_by();