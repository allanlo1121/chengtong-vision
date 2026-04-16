
-- Master_definitions audit triggers
select system.attach_audit_triggers('public.master_definitions');
select system.attach_audit_triggers('public.master_data');
select system.attach_audit_triggers('public.countries');
select system.attach_audit_triggers('public.admin_regions');
select system.attach_audit_triggers('public.organizations');
select system.attach_audit_triggers('hr.employees');
select system.attach_audit_triggers('hr.educations');
select system.attach_audit_triggers('hr.employee_assignments');
select system.attach_audit_triggers('hr.employee_titles');
select system.attach_audit_triggers('public.import_batches');
select system.attach_audit_triggers('public.import_records');
select system.attach_audit_triggers('public.projects');
select system.attach_audit_triggers('public.project_leader_timeline');
select system.attach_audit_triggers('public.project_attention_type_timeline');
select system.attach_audit_triggers('public.project_contracts');
select system.attach_audit_triggers('public.project_contract_versions');
select system.attach_audit_triggers('public.project_schedule_versions');
select system.attach_audit_triggers('public.project_risk_level_timeline');
select system.attach_audit_triggers('public.project_attention_level_timeline');
select system.attach_audit_triggers('public.project_status_timeline');
select system.attach_audit_triggers('public.project_control_level_timeline');
select system.attach_audit_triggers('rbac.roles');
select system.attach_audit_triggers('rbac.permissions');
select system.attach_audit_triggers('system.menus');

