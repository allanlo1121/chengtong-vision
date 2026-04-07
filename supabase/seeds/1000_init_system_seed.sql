
insert into system.menus (name, label, path, icon, sort_order)
values
('system','系统设置',null,'Settings',0);

insert into system.menus (name, label, path, icon, sort_order, permission_code)
values
('dashboard','总览','/dashboard','LayoutDashboard',0,'dashboard.read');



insert into system.menus (
  name,label,path,icon,sort_order,parent_id,permission_code
)
select
  'organizations','组织系统','/system/organizations','Building2',0,id,'organization.read'
from system.menus
where name = 'system';

insert into system.menus (
  name,label,path,icon,sort_order,parent_id,permission_code
)
select
  'employees','员工管理','/system/employees','Users',1,id,'employee.read'
from system.menus
where name = 'system';

insert into system.menus (
  name,label,path,icon,sort_order,parent_id,permission_code
)
select
  'projects','项目管理','/system/projects','FolderKanban',2,id,'project.read'
from system.menus
where name = 'system';