-- HR business functions

create or replace function hr.sync_employee_post_history()
returns trigger as $$
begin

  -- 1️⃣ INSERT（新增岗位）
  if (tg_op = 'INSERT') then

    insert into hr.employee_post_history (
      employee_id,
      post_id,
      organization_id,
      start_date
    )
    values (
      new.employee_id,
      new.post_id,
      new.organization_id,
      current_date
    );

    return new;
  end if;


  -- 2️⃣ DELETE（岗位结束）
  if (tg_op = 'DELETE') then

    update hr.employee_post_history
    set end_date = current_date
    where employee_id = old.employee_id
      and post_id = old.post_id
      and end_date is null;

    return old;
  end if;


  return null;
end;
$$ language plpgsql;


create trigger trg_employee_post_history_insert
after insert on hr.employee_posts
for each row
execute function hr.sync_employee_post_history();

create trigger trg_employee_post_history_delete
after delete on hr.employee_posts
for each row
execute function hr.sync_employee_post_history();