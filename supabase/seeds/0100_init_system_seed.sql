insert into system.menus (name,label, path, icon, sort_order, group_name, permission_code)
values
('dashboard','Dashboard','/dashboard','LayoutDashboard',0,'System','dashboard.read'),
('organizations','Organizations','/system/orgs','Building2',1,'System','organization.read'),
('employees','Employees','/system/employees','Users',2,'System','employee.read'),
('projects','Projects','/projects','FolderKanban',1,'Project','project.read');