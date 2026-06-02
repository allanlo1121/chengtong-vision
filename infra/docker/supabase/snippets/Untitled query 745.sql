

drop policy if exists employees_insert on hr.employees;

create policy "employees_insert"
on hr.employees
for insert
to authenticated
with check (true);


select relrowsecurity
from pg_class
where relname = 'employees';

grant select, insert, update, delete
on all tables in schema hr
to authenticated;