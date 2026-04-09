
-- Master_definitions audit triggers
select system.attach_audit_triggers('public.master_definitions');
select system.attach_audit_triggers('public.master_data');
select system.attach_audit_triggers('public.countries');
select system.attach_audit_triggers('public.admin_regions');
select system.attach_audit_triggers('public.organizations');
select system.attach_audit_triggers('hr.employees');
select system.attach_audit_triggers('hr.educations');
select system.attach_audit_triggers('hr.employee_positions');
select system.attach_audit_triggers('hr.employee_titles');
select system.attach_audit_triggers('public.import_batches');
select system.attach_audit_triggers('public.import_records');
select system.attach_audit_triggers('public.projects');
select system.attach_audit_triggers('rbac.roles');
select system.attach_audit_triggers('rbac.permissions');
select system.attach_audit_triggers('system.menus');

