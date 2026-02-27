insert into system.menus (label, path, icon, sort_order, group_name, permission_code)
values
('Dashboard','/dashboard','LayoutDashboard',0,'System','dashboard.read'),
('Organizations','/system/orgs','Building2',1,'System','organization.read'),
('Employees','/system/employees','Users',2,'System','employee.read'),
('Projects','/projects','FolderKanban',1,'Project','project.read');