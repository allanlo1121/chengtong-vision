-- HR business functions

create or replace function hr.trg_employee_insert_init_history()
returns trigger as $$
begin

    insert into hr.employee_assignments (
        employee_id,
        org_node_id,
        job_title_id,
        start_at,
        change_reason,
        changed_by
    )
    values (
        new.id,
        new.org_node_id,
        new.job_title_id,
        coalesce(new.effect_at, now()),
        '入职初始化',
        new.created_by
    );

    return new;
end;
$$ language plpgsql;


create or replace function hr.trg_employee_org_change()
returns trigger as $$
begin

    -- 只有在组织或岗位发生变化时才处理
    if (new.org_node_id is distinct from old.org_node_id)
       or (new.job_title_id is distinct from old.job_title_id) then

        -- 关闭旧记录
        update hr.employee_assignments
        set end_at = now()
        where employee_id = old.id
          and end_at is null;

        -- 插入新记录
        insert into hr.employee_assignments (
            employee_id,
            org_node_id,
            job_title_id,
            start_at,
            change_reason,
            changed_by
        )
        values (
            old.id,
            new.org_node_id,
            new.job_title_id,
            now(),
            '组织或岗位变更',
            public.employees(id) 
        );

    end if;

    return new;
end;
$$ language plpgsql;

create trigger trg_employee_insert_init_history
after insert on public.employees
for each row
execute function hr.trg_employee_insert_init_history();


create trigger trg_employee_org_change
after update of org_node_id, job_title_id
on public.employees
for each row
execute function hr.trg_employee_org_change();