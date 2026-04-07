

insert into hr.persons (
    id,
    code,
    name  
)
select
  '00000000-0000-0000-0000-000000000001',
  'SYSTEM',
  '系统用户'
on conflict (code) do nothing;