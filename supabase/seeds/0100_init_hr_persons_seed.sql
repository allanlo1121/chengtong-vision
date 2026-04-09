

insert into hr.persons (
    id,
    name  
)
select
  '00000000-0000-0000-0000-000000000001',
  '系统用户'
on conflict (code) do nothing;