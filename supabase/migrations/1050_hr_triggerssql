

create trigger trg_employee_insert_init_history
after insert on public.employees
for each row
execute function hr.trg_employee_insert_init_history();


create trigger trg_employee_org_change
after update of org_node_id, job_title_id
on public.employees
for each row
execute function hr.trg_employee_org_change();